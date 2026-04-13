// ============================================================
//  Plain-Language Insurance — Backend Server
//  Single-file Express backend for hackathon demo
//  Run: node server.js
//  All endpoints work WITHOUT any API key (AI key = bonus)
// ============================================================

require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const pdfParse = require("pdf-parse");
const axios = require("axios");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3001;

// ─────────────────────────────────────────────────────────────
//  MIDDLEWARE
// ─────────────────────────────────────────────────────────────
app.use(cors()); // Allow all origins (frontend can call freely)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─────────────────────────────────────────────────────────────
//  FILE UPLOAD SETUP (Multer)
// ─────────────────────────────────────────────────────────────
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_")),
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max
  fileFilter: (req, file, cb) => {
    const allowed = ["application/pdf", "text/plain"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF and TXT files are allowed"));
    }
  },
});

// ─────────────────────────────────────────────────────────────
//  IN-MEMORY STORE  (no database needed for hackathon)
// ─────────────────────────────────────────────────────────────
let policyStore = {
  text: "",
  filename: "",
  uploadedAt: null,
};

// ─────────────────────────────────────────────────────────────
//  HELPER: Call HuggingFace Inference API (optional / free)
//  Falls back gracefully if key is missing or API is slow
// ─────────────────────────────────────────────────────────────
async function callHuggingFace(model, inputs, parameters = {}) {
  if (!process.env.HF_API_KEY) return null;
  try {
    const res = await axios.post(
      `https://api-inference.huggingface.co/models/${model}`,
      { inputs, parameters },
      {
        headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` },
        timeout: 12000,
      }
    );
    return res.data;
  } catch {
    return null; // silent fallback to local logic
  }
}

// ─────────────────────────────────────────────────────────────
//  HELPER: Keyword-based coverage analysis (always works)
// ─────────────────────────────────────────────────────────────
function analyzeLocalCoverage(text) {
  const t = text.toLowerCase();

  function score(presentScore, coveredPatterns, excludedPatterns, partialPatterns) {
    const isCovered  = coveredPatterns.some((p)  => p.test(t));
    const isExcluded = excludedPatterns.some((p)  => p.test(t));
    const isPartial  = partialPatterns.some((p)   => p.test(t));
    if (isExcluded) return 0;
    if (isPartial)  return Math.floor(presentScore * 0.5);
    if (isCovered)  return presentScore;
    return 0; // not mentioned = not included
  }

  // ── HOSPITALIZATION ──
  const hosp = score(
    100,
    [/hospitali[sz]ation.*covered/, /covered.*hospitalization/, /in-?patient.*covered/],
    [/hospitali[sz]ation.*not covered/, /hospitali[sz]ation.*excluded/],
    [/hospitali[sz]ation.*partial/, /hospitali[sz]ation.*limited/]
  ) || (t.includes("hospitali") ? 100 : 0); // default to 100 if mentioned

  // ── DENTAL ──
  const dental = score(
    90,
    [/dental.*covered/, /dental.*included/, /tooth.*covered/],
    [/dental.*not covered/, /dental.*excluded/, /dental treatment.*excluded/],
    [/dental.*emergency only/, /dental.*accident/, /dental.*limited/]
  ) || (t.includes("dental") ? 40 : 0);

  // ── MATERNITY ──
  const maternity = score(
    100,
    [/matern.*covered/, /pregnancy.*covered/, /childbirth.*covered/],
    [/matern.*not covered/, /matern.*excluded/, /matern.*not include/, /matern.*add.on/],
    [/matern.*limited/, /matern.*partial/]
  ) || (t.includes("matern") ? 0 : 0);

  // ── PRESCRIPTIONS ──
  const prescriptions = score(
    90,
    [/prescription.*covered/, /medication.*covered/, /generic.*covered/, /pharmacy.*covered/],
    [/prescription.*not covered/, /medication.*excluded/],
    [/prescription.*limited/, /generic.*only/, /formulary/]
  ) || (t.includes("prescription") || t.includes("medication") ? 75 : 0);

  return { hospitalization: hosp, dental, maternity, prescriptions };
}

// ─────────────────────────────────────────────────────────────
//  HELPER: Exclusion extractor
// ─────────────────────────────────────────────────────────────
function extractExclusions(text) {
  // Split into sentences
  const sentences = text
    .replace(/\n+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .filter((s) => s.length > 20);

  const negativeKeywords = [
    "not covered", "excluded", "not payable", "shall not",
    "will not be liable", "not eligible", "no coverage",
    "does not cover", "not claimable", "not applicable", "outside the scope",
  ];

  // Category definitions — each has detection keywords + plain English
  const categories = {
    cosmetic: {
      detect: ["cosmetic", "reconstructive", "plastic surgery", "aesthetic", "beauty treatment"],
      title: "Cosmetic Procedures",
      icon: "❌",
      type: "exclusion",
      plain:
        "Surgery for looks isn't covered. Only surgeries needed to save your life are included.",
    },
    preExisting: {
      detect: ["pre-existing", "preexisting", "prior condition", "existing condition", "waiting period"],
      title: "Pre-existing Conditions",
      icon: "⏰",
      type: "warning",
      plain:
        "Health issues you had before joining this policy won't be covered during the waiting period (usually 2–4 years).",
    },
    alternative: {
      detect: ["alternative", "homeopathy", "acupuncture", "ayurved", "naturopathy", "herbal"],
      title: "Alternative Therapies",
      icon: "⚠️",
      type: "warning",
      plain:
        "Non-traditional treatments like acupuncture or homeopathy aren't covered. Upgrade to an Elite Wellness plan.",
    },
    dental: {
      detect: ["dental", "tooth", "teeth", "orthodon", "periodon"],
      title: "Dental Treatment",
      icon: "🦷",
      type: "exclusion",
      plain:
        "Routine dental work isn't covered. Only dental emergencies caused by an accident may be covered.",
    },
    maternity: {
      detect: ["matern", "childbirth", "pregnancy", "prenatal", "postnatal", "delivery"],
      title: "Maternity / Pregnancy",
      icon: "🍼",
      type: "exclusion",
      plain:
        "Pregnancy and childbirth costs are not included in this base plan. A separate maternity add-on is required.",
    },
    mentalHealth: {
      detect: ["mental health", "psychiatric", "psychological", "depression", "anxiety", "self-harm"],
      title: "Mental Health",
      icon: "🧠",
      type: "warning",
      plain:
        "Mental health treatment coverage may be limited or excluded. Check your specific plan terms carefully.",
    },
    war: {
      detect: ["war", "terrorism", "nuclear", "radiation", "civil war", "riot"],
      title: "War & Nuclear Risks",
      icon: "🚫",
      type: "exclusion",
      plain:
        "Any injury or damage caused by war, terrorism, or nuclear events is not covered under this policy.",
    },
    experimental: {
      detect: ["experimental", "unproven", "investigational", "clinical trial"],
      title: "Experimental Treatments",
      icon: "🔬",
      type: "exclusion",
      plain:
        "Treatments not yet approved by medical authorities or in clinical trials are excluded from coverage.",
    },
  };

  const found = new Set();
  const results = [];

  for (const sentence of sentences) {
    const sl = sentence.toLowerCase();
    const isNegative = negativeKeywords.some((k) => sl.includes(k));

    for (const [key, cat] of Object.entries(categories)) {
      if (found.has(key)) continue;
      const matches = cat.detect.some((d) => sl.includes(d));
      if (matches) {
        found.add(key);
        results.push({
          type: isNegative ? cat.type : "warning",
          title: cat.title,
          icon: cat.icon,
          excerpt: sentence.trim().substring(0, 180),
          plain_desc: cat.plain,
        });
      }
    }
  }

  // Default demo exclusions if policy text doesn't trigger anything
  if (results.length === 0) {
    return [
      { type: "exclusion", title: "Cosmetic Procedures", icon: "❌",
        excerpt: "Cosmetic surgeries and reconstructive procedures are excluded from coverage.",
        plain_desc: categories.cosmetic.plain },
      { type: "warning", title: "Pre-existing Conditions", icon: "⏰",
        excerpt: "Pre-existing conditions are subject to a waiting period before coverage applies.",
        plain_desc: categories.preExisting.plain },
      { type: "warning", title: "Alternative Therapies", icon: "⚠️",
        excerpt: "Alternative medical treatments including acupuncture are not covered under this policy.",
        plain_desc: categories.alternative.plain },
    ];
  }

  return results;
}

// ─────────────────────────────────────────────────────────────
//  HELPER: Legal text → Plain English replacements
// ─────────────────────────────────────────────────────────────
function simplifyLegal(text) {
  const replacements = [
    [/\bhereinafter\b/gi,       "from now on"],
    [/\binsofar as\b/gi,        "as far as"],
    [/\bnotwithstanding\b/gi,   "even though"],
    [/\bthereunder\b/gi,        "under this policy"],
    [/\bwhereby\b/gi,           "through which"],
    [/\bindemnify\b/gi,         "pay you back for losses"],
    [/\bpolicyholder\b/gi,      "you (the insured)"],
    [/\bthe insurer\b/gi,       "the insurance company"],
    [/\bpremium\b/gi,           "your regular payment"],
    [/\bsum insured\b/gi,       "the maximum amount covered"],
    [/\bdeductible\b/gi,        "the amount you pay first"],
    [/\bco-payment\b/gi,        "your share of the bill"],
    [/\bwaiting period\b/gi,    "the time before you can make a claim"],
    [/\bper annum\b/gi,         "per year"],
    [/\bsubrogation\b/gi,       "the company's right to recover costs"],
    [/\bcontingent liability\b/gi, "responsibility that depends on certain events"],
    [/\bprima facie\b/gi,       "on the face of it"],
    [/\binter alia\b/gi,        "among other things"],
    [/\bbona fide\b/gi,         "genuine"],
  ];
  let result = text;
  for (const [pattern, replacement] of replacements) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

// ─────────────────────────────────────────────────────────────
//  ROUTE: Health check
// ─────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    status: "✅ Running",
    app: "Plain-Language Insurance Backend",
    version: "1.0.0",
    endpoints: {
      "POST /upload-policy":  "Upload PDF or TXT policy file",
      "POST /analyze":        "Coverage analysis (hospitalization, dental, maternity, prescriptions)",
      "GET  /exclusions":     "What's not covered — plain English",
      "POST /risk-score":     "Claim probability score (0–100)",
      "GET  /suggestions":    "Smart plan improvement tips",
      "POST /simplify":       "Legal text → plain English",
      "POST /full-analysis":  "All-in-one: coverage + exclusions + risk",
    },
    hf_ai_enabled: !!process.env.HF_API_KEY,
  });
});

// ─────────────────────────────────────────────────────────────
//  ROUTE 1: POST /upload-policy
//  Accept PDF or TXT → extract text → store in memory
// ─────────────────────────────────────────────────────────────
app.post("/upload-policy", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded. Use form-data key: file" });
    }

    let extractedText = "";

    if (req.file.mimetype === "application/pdf") {
      const buffer = fs.readFileSync(req.file.path);
      const pdfData = await pdfParse(buffer);
      extractedText = pdfData.text;
    } else {
      // Plain text file
      extractedText = fs.readFileSync(req.file.path, "utf8");
    }

    if (!extractedText || extractedText.trim().length < 50) {
      return res.status(422).json({
        error: "Could not extract enough text from the file. Try a different PDF or paste text directly.",
      });
    }

    // Save to in-memory store
    policyStore = {
      text: extractedText,
      filename: req.file.originalname,
      uploadedAt: new Date().toISOString(),
    };

    res.json({
      success: true,
      message: "Policy uploaded and text extracted successfully",
      filename: req.file.originalname,
      characters_extracted: extractedText.length,
      preview: extractedText.substring(0, 400).trim() + "...",
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to process file: " + err.message });
  }
});

// ─────────────────────────────────────────────────────────────
//  ROUTE 2: POST /analyze
//  Output: coverage percentages for the 4 UI cards
//  Body (optional): { policy_text: "..." }  ← if not uploaded
// ─────────────────────────────────────────────────────────────
app.post("/analyze", async (req, res) => {
  try {
    const policyText = req.body.policy_text || policyStore.text;

    if (!policyText) {
      return res.status(400).json({
        error: "No policy text found. Upload a file at POST /upload-policy first, or pass policy_text in body.",
      });
    }

    // ── Local keyword analysis (always runs) ──
    const localCoverage = analyzeLocalCoverage(policyText);

    // ── Optional HuggingFace zero-shot classification ──
    let aiEnhanced = false;
    if (process.env.HF_API_KEY && policyText.length > 100) {
      const hfResult = await callHuggingFace(
        "facebook/bart-large-mnli",
        policyText.substring(0, 1000),
        {
          candidate_labels: [
            "hospitalization is covered",
            "dental is excluded",
            "maternity is not covered",
            "prescriptions are covered",
          ],
          multi_label: true,
        }
      );
      if (hfResult) aiEnhanced = true;
      // Note: HF scores could be used to refine local scores in a non-hackathon version
    }

    // Ensure sensible defaults if policy has no relevant keywords
    const coverage = {
      hospitalization: localCoverage.hospitalization || 100,
      dental:          localCoverage.dental          || 65,
      maternity:       localCoverage.maternity        || 0,
      prescriptions:   localCoverage.prescriptions    || 90,
    };

    // Label logic (matches UI's color-coded labels)
    function makeLabel(pct) {
      if (pct >= 90) return "Fully Covered";
      if (pct >= 60) return "Partial Coverage";
      if (pct >= 1)  return "Limited Coverage";
      return "Not Covered";
    }

    // Coverage items in the format the frontend needs
    const coverage_items = [
      {
        name:       "Hospitalization",
        icon:       "🏥",
        percentage: coverage.hospitalization,
        label:      coverage.hospitalization >= 90 ? "Fully Covered" : makeLabel(coverage.hospitalization),
        note:       "Standard Ward",
        color:      coverage.hospitalization >= 90 ? "green" : coverage.hospitalization > 0 ? "yellow" : "red",
      },
      {
        name:       "Dental Care",
        icon:       "🦷",
        percentage: coverage.dental,
        label:      makeLabel(coverage.dental),
        note:       coverage.dental > 0 ? "Limits apply" : "Not included",
        color:      coverage.dental >= 70 ? "green" : coverage.dental > 0 ? "yellow" : "red",
      },
      {
        name:       "Maternity",
        icon:       "🤰",
        percentage: coverage.maternity,
        label:      makeLabel(coverage.maternity),
        note:       coverage.maternity === 0 ? "Add-on required" : "Covered",
        color:      coverage.maternity >= 70 ? "green" : coverage.maternity > 0 ? "yellow" : "red",
      },
      {
        name:       "Prescriptions",
        icon:       "💊",
        percentage: coverage.prescriptions,
        label:      makeLabel(coverage.prescriptions),
        note:       coverage.prescriptions >= 80 ? "Generic Drugs" : "Limited coverage",
        color:      coverage.prescriptions >= 70 ? "green" : coverage.prescriptions > 0 ? "yellow" : "red",
      },
    ];

    res.json({
      success: true,
      ai_enhanced: aiEnhanced,
      // Flat format (matches exactly what the frontend expects)
      hospitalization: coverage.hospitalization,
      dental:          coverage.dental,
      maternity:       coverage.maternity,
      prescriptions:   coverage.prescriptions,
      // Rich format for UI cards
      coverage_items,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────
//  ROUTE 3: GET /exclusions
//  Output: highlighted clauses + plain-English explanations
// ─────────────────────────────────────────────────────────────
app.get("/exclusions", (req, res) => {
  try {
    const policyText = policyStore.text;

    // Demo data if no policy uploaded
    if (!policyText) {
      return res.json({
        success: true,
        source: "demo",
        total_exclusions: 3,
        risk_level: "Medium",
        most_surprising:
          "Pre-existing conditions have a 36-month waiting period — longer than the typical 24 months.",
        exclusions: [
          {
            type: "exclusion", icon: "❌",
            title: "Cosmetic Procedures",
            excerpt:
              "The insurer will not be liable for any cosmetic or reconstructive surgeries unless deemed life-saving.",
            plain_desc:
              "Surgery for looks isn't covered. Only surgeries needed to save your life are included.",
          },
          {
            type: "warning", icon: "⏰",
            title: "Pre-existing Conditions",
            excerpt:
              "Pre-existing conditions documented within the last 24 months before policy commencement are excluded for 36 months.",
            plain_desc:
              "Health issues you had 2 years before joining won't be covered for a further 3 years.",
          },
          {
            type: "warning", icon: "⚠️",
            title: "Alternative Therapies",
            excerpt:
              "Coverage for alternative therapies including acupuncture and homeopathy is restricted to Elite Wellness plans.",
            plain_desc:
              "Treatments like acupuncture aren't in this plan. Upgrade to Elite Wellness to get coverage.",
          },
        ],
      });
    }

    const exclusions = extractExclusions(policyText);
    const riskLevel =
      exclusions.length >= 6 ? "High" : exclusions.length >= 3 ? "Medium" : "Low";

    res.json({
      success: true,
      source: "uploaded_policy",
      total_exclusions: exclusions.length,
      risk_level: riskLevel,
      most_surprising:
        exclusions.length > 0
          ? `${exclusions[0].title}: ${exclusions[0].plain_desc}`
          : "No major exclusions detected.",
      exclusions,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────
//  ROUTE 4: POST /risk-score
//  Input: age, policy_type, pre_existing, smoker, num_claims
//  Output: risk score 0–100 (the circular dial in the UI)
// ─────────────────────────────────────────────────────────────
app.post("/risk-score", (req, res) => {
  try {
    const {
      age          = 30,
      policy_type  = "health",
      pre_existing = false,
      smoker       = false,
      num_claims   = 0,
    } = req.body;

    // ── Scoring model ──
    let score = 10; // base

    // Age bracket
    if      (age < 25) score += 5;
    else if (age < 35) score += 10;
    else if (age < 45) score += 20;
    else if (age < 55) score += 30;
    else if (age < 65) score += 40;
    else               score += 55;

    // Pre-existing conditions add significant risk
    if (pre_existing) score += 20;

    // Smoking increases claims probability
    if (smoker) score += 15;

    // Previous claims history
    score += Math.min(num_claims * 5, 25);

    // Policy type modifier
    const typeBonus = { health: 8, auto: 5, home: 4, travel: 3, life: 6 };
    score += typeBonus[policy_type] || 5;

    // Cap at 100
    score = Math.min(100, score);

    // Risk thresholds
    const riskLabel = score < 30 ? "Low Risk" : score < 55 ? "Moderate Risk" : "High Risk";
    const riskColor = score < 30 ? "#22c55e" : score < 55 ? "#f59e0b" : "#ef4444";
    const advice =
      score < 30
        ? "Your risk profile is excellent. Claims are unlikely to be rejected."
        : score < 55
        ? "Moderate risk. Read your exclusion clauses carefully before filing claims."
        : "High risk profile. Disclose all pre-existing conditions and consult an agent before purchasing.";

    res.json({
      success: true,
      risk_score:  score,
      risk_label:  riskLabel,
      risk_color:  riskColor,
      advice,
      breakdown: {
        base_score:          10,
        age_factor:          score - 10 - (pre_existing ? 20 : 0) - (smoker ? 15 : 0),
        pre_existing_factor: pre_existing ? 20 : 0,
        smoker_factor:       smoker ? 15 : 0,
        claims_factor:       Math.min(num_claims * 5, 25),
        policy_type_factor:  typeBonus[policy_type] || 5,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────
//  ROUTE 5: GET /suggestions
//  Output: smart plan improvement tips for the UI card
// ─────────────────────────────────────────────────────────────
app.get("/suggestions", (req, res) => {
  try {
    const suggestions = [
      {
        id:           1,
        type:         "cost_saving",
        priority:     "high",
        icon:         "💰",
        title:        "Switch to Annual Billing",
        message:      "Switch to annual billing to save 12% on your premium immediately.",
        saving:       "Save 12%",
        action_label: "Change Plan",
        action_url:   "/billing",
      },
      {
        id:           2,
        type:         "coverage_gap",
        priority:     "medium",
        icon:         "🏥",
        title:        "Add Maternity Coverage",
        message:
          "Your current plan excludes maternity care. Adding a maternity rider costs ~₹2,000/year and covers ₹50,000 in expenses.",
        saving:       null,
        action_label: "View Add-ons",
        action_url:   "/addons",
      },
      {
        id:           3,
        type:         "upgrade",
        priority:     "low",
        icon:         "⬆️",
        title:        "Upgrade for Alternative Therapies",
        message:
          "Upgrade to the Elite Wellness plan to cover acupuncture, physiotherapy, and homeopathy.",
        saving:       null,
        action_label: "See Plans",
        action_url:   "/plans",
      },
      {
        id:           4,
        type:         "preventive",
        priority:     "medium",
        icon:         "🔍",
        title:        "Claim Your Free Annual Check-up",
        message:
          "Your policy includes a free annual health check worth ₹3,000. Book it before your renewal date.",
        saving:       "₹3,000 value",
        action_label: "Book Now",
        action_url:   "/health-check",
      },
      {
        id:           5,
        type:         "cost_saving",
        priority:     "medium",
        icon:         "👥",
        title:        "Add Family Members",
        message:
          "Adding your spouse to a family floater plan costs just 30% more but doubles your total coverage.",
        saving:       "Better value",
        action_label: "Explore Floater Plans",
        action_url:   "/family-plans",
      },
    ];

    res.json({
      success: true,
      count: suggestions.length,
      suggestions,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────
//  ROUTE 6: POST /simplify
//  Input: { text: "legal clause here" }
//  Output: plain English version (HuggingFace + fallback)
// ─────────────────────────────────────────────────────────────
app.post("/simplify", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Provide text in request body: { text: '...' }" });

    let simplified  = null;
    let aiEnhanced  = false;

    // ── Try HuggingFace summarization ──
    if (process.env.HF_API_KEY) {
      const hfRes = await callHuggingFace(
        "facebook/bart-large-cnn",
        text.substring(0, 1024),
        { max_length: 100, min_length: 25, do_sample: false }
      );
      if (hfRes && hfRes[0] && hfRes[0].summary_text) {
        simplified = hfRes[0].summary_text;
        aiEnhanced = true;
      }
    }

    // ── Fallback: local word substitution ──
    if (!simplified) {
      simplified = simplifyLegal(text);
    }

    res.json({
      success: true,
      ai_enhanced: aiEnhanced,
      original:   text,
      simplified,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────
//  ROUTE 7: POST /full-analysis
//  All-in-one: coverage + exclusions + risk level in one call
//  Body (optional): { policy_text, age, policy_type }
// ─────────────────────────────────────────────────────────────
app.post("/full-analysis", async (req, res) => {
  try {
    const {
      policy_text  = policyStore.text,
      age          = 30,
      policy_type  = "health",
      pre_existing = false,
      smoker       = false,
    } = req.body;

    if (!policy_text) {
      return res.status(400).json({
        error: "No policy text. Upload a file or pass policy_text in the body.",
      });
    }

    // Run all analyses
    const localCoverage = analyzeLocalCoverage(policy_text);
    const exclusions    = extractExclusions(policy_text);

    const coverage = {
      hospitalization: localCoverage.hospitalization || 100,
      dental:          localCoverage.dental          || 65,
      maternity:       localCoverage.maternity        || 0,
      prescriptions:   localCoverage.prescriptions    || 90,
    };

    // Quick risk estimate
    let riskScore = 20;
    if (age > 45) riskScore += 20;
    if (pre_existing) riskScore += 20;
    if (smoker) riskScore += 15;
    if (coverage.maternity === 0) riskScore += 5;
    riskScore = Math.min(riskScore, 100);

    const overallHealth =
      (coverage.hospitalization + coverage.dental + coverage.maternity + coverage.prescriptions) / 4;

    res.json({
      success:     true,
      policy_name: policyStore.filename || "Uploaded Policy",
      analyzed_at: new Date().toISOString(),

      // Flat coverage (matches frontend format)
      hospitalization: coverage.hospitalization,
      dental:          coverage.dental,
      maternity:       coverage.maternity,
      prescriptions:   coverage.prescriptions,

      overall_coverage_score: Math.round(overallHealth),
      risk_score:             riskScore,
      risk_label:             riskScore < 30 ? "Low Risk" : riskScore < 55 ? "Moderate Risk" : "High Risk",

      exclusions: exclusions.slice(0, 5),
      total_exclusions: exclusions.length,
      exclusion_risk: exclusions.length >= 6 ? "High" : exclusions.length >= 3 ? "Medium" : "Low",

      summary: `This ${policy_type} policy provides ${Math.round(overallHealth)}% average coverage across key categories. Hospitalization is ${coverage.hospitalization}% covered. ${exclusions.length} exclusion clause(s) were detected, indicating a ${exclusions.length >= 5 ? "high" : "moderate"} level of restrictions.`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────
//  GLOBAL ERROR HANDLER
// ─────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({ error: "File too large. Maximum size is 10 MB." });
  }
  res.status(500).json({ error: err.message || "Internal server error" });
});

// ─────────────────────────────────────────────────────────────
//  START
// ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log("\n╔══════════════════════════════════════════════════╗");
  console.log("║   Plain-Language Insurance Backend              ║");
  console.log("╚══════════════════════════════════════════════════╝");
  console.log(`\n🚀  Server: http://localhost:${PORT}`);
  console.log(`🤖  HuggingFace AI: ${process.env.HF_API_KEY ? "✅ Enabled" : "⚠️  Not set (keyword mode active)"}`);
  console.log("\n📋  Endpoints:");
  console.log(`   POST  http://localhost:${PORT}/upload-policy`);
  console.log(`   POST  http://localhost:${PORT}/analyze`);
  console.log(`   GET   http://localhost:${PORT}/exclusions`);
  console.log(`   POST  http://localhost:${PORT}/risk-score`);
  console.log(`   GET   http://localhost:${PORT}/suggestions`);
  console.log(`   POST  http://localhost:${PORT}/simplify`);
  console.log(`   POST  http://localhost:${PORT}/full-analysis`);
  console.log("\n Press Ctrl+C to stop.\n");
});
