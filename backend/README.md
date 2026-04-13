# Plain-Language Insurance — Backend

Hackathon backend for the "Plain-Language Insurance" project.  
Built with Node.js + Express. No database needed. Runs in 2 minutes.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the server
npm start

# Server runs at http://localhost:3001
```

---

## Endpoints & Sample Requests (Postman)

### Health Check
```
GET http://localhost:3001/
```

---

### 1. Upload Policy (PDF or TXT)
```
POST http://localhost:3001/upload-policy
Content-Type: multipart/form-data

Body (form-data):
  file: [select your PDF or TXT file]
```

---

### 2. Analyze Coverage
```
POST http://localhost:3001/analyze
Content-Type: application/json

Body:
{
  "policy_text": "Hospitalization is covered up to sum insured. Dental treatment is excluded unless due to accident. Maternity is not covered under this plan. Prescriptions for generic drugs are covered at 90%."
}
```

Response:
```json
{
  "success": true,
  "hospitalization": 100,
  "dental": 40,
  "maternity": 0,
  "prescriptions": 90,
  "coverage_items": [...]
}
```

---

### 3. Get Exclusions
```
GET http://localhost:3001/exclusions
```
(Uses the last uploaded policy. Returns demo data if nothing uploaded.)

---

### 4. Risk Score
```
POST http://localhost:3001/risk-score
Content-Type: application/json

Body:
{
  "age": 35,
  "policy_type": "health",
  "pre_existing": true,
  "smoker": false,
  "num_claims": 1
}
```

Response:
```json
{
  "risk_score": 58,
  "risk_label": "Moderate Risk",
  "risk_color": "#f59e0b",
  "advice": "..."
}
```

---

### 5. Smart Suggestions
```
GET http://localhost:3001/suggestions
```

---

### 6. Simplify Legal Text
```
POST http://localhost:3001/simplify
Content-Type: application/json

Body:
{
  "text": "The insurer shall indemnify the policyholder notwithstanding any pre-existing condition, insofar as the waiting period has elapsed."
}
```

---

### 7. Full Analysis (all-in-one)
```
POST http://localhost:3001/full-analysis
Content-Type: application/json

Body:
{
  "policy_text": "...",
  "age": 30,
  "policy_type": "health",
  "pre_existing": false,
  "smoker": false
}
```

---

## Free Deployment on Render

1. Push this folder to GitHub
2. Go to https://render.com → New → Web Service
3. Connect repo, set build command: `npm install`
4. Set start command: `npm start`
5. Add env var: `HF_API_KEY` (optional)
6. Deploy — get a free public URL in ~2 minutes

---

## HuggingFace AI (Optional)

1. Go to https://huggingface.co/settings/tokens
2. Create a free token (read access is enough)
3. Paste it in `.env` as `HF_API_KEY`
4. The backend will use AI summarization for `/simplify` and enhanced classification for `/analyze`

**Without HuggingFace key:** the backend still works using smart keyword-based analysis — perfect for the hackathon demo.
