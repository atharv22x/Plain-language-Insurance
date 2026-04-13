/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Bell, 
  Download, 
  Bolt, 
  CheckCircle2, 
  Hospital, 
  Pill, 
  Stethoscope, 
  Baby, 
  Brain, 
  Sparkles, 
  Send, 
  AlertTriangle, 
  Ban, 
  UploadCloud, 
  ArrowLeftRight, 
  Eye 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";

// --- Components ---

const Navbar = () => (
  <nav className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-xl shadow-lucid">
    <div className="flex justify-between items-center px-8 h-20 max-w-7xl mx-auto">
      <div className="flex items-center gap-8">
        <span className="text-xl font-extrabold tracking-tighter text-primary">Plain-Language Insurance</span>
        <div className="hidden md:flex gap-6 items-baseline">
          <a className="text-primary border-b-2 border-primary pb-1 font-headline font-semibold tracking-tight" href="#">Dashboard</a>
          <a className="text-on-surface-variant/60 font-headline font-semibold tracking-tight hover:text-primary transition-colors" href="#">Visualizer</a>
          <a className="text-on-surface-variant/60 font-headline font-semibold tracking-tight hover:text-primary transition-colors" href="#">Simulator</a>
          <a className="text-on-surface-variant/60 font-headline font-semibold tracking-tight hover:text-primary transition-colors" href="#">Compare</a>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 text-on-surface-variant/60 hover:text-primary transition-colors">
          <Bell className="w-6 h-6" />
        </button>
        <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary/20">
          <img 
            alt="User profile" 
            src="https://picsum.photos/seed/jane/100/100" 
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  </nav>
);

const OverviewCard = ({ title, value, subtitle, status, icon: Icon, active }: any) => (
  <div className={cn(
    "bg-surface-container-lowest p-8 rounded-xl shadow-lucid flex flex-col justify-between h-48 transition-all hover:scale-[1.02]",
    active && "border-l-4 border-primary"
  )}>
    <span className="text-on-surface-variant/60 font-medium tracking-wide text-sm uppercase">{title}</span>
    <div className="space-y-1">
      <span className={cn("font-extrabold text-on-surface", value.length > 8 ? "text-2xl" : "text-4xl")}>{value}</span>
      {status ? (
        <div className="flex items-center gap-1">
          <div className="px-3 py-1 bg-primary-container text-on-primary-container text-[10px] font-bold rounded-sm">
            {status}
          </div>
        </div>
      ) : subtitle ? (
        <p className="text-xs text-on-surface-variant font-medium">{subtitle}</p>
      ) : null}
      {active && (
        <p className="text-[10px] text-primary font-bold flex items-center gap-1 mt-1">
          <CheckCircle2 className="w-3 h-3 fill-primary text-white" />
          MAX PROTECT ACTIVE
        </p>
      )}
    </div>
  </div>
);

const ProgressBar = ({ label, icon: Icon, percentage, colorClass, rider }: any) => (
  <div className="group">
    <div className="flex justify-between mb-3 items-end">
      <span className="font-bold text-lg flex items-center gap-2">
        <Icon className={cn("w-5 h-5", colorClass)} />
        {label}
      </span>
      <span className={cn("font-extrabold", colorClass)}>{percentage}% Covered</span>
    </div>
    <div className="h-4 w-full bg-surface-container rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={cn("h-full rounded-full", percentage === 0 ? "bg-tertiary-container/30" : "bg-primary-container")}
      />
    </div>
    {rider && <p className="text-xs mt-2 text-tertiary font-medium">{rider}</p>}
  </div>
);

const ScenarioSimulator = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSimulate = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenario: query }),
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface-container-high rounded-xl p-10 shadow-inner relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
        <Brain className="w-48 h-48" />
      </div>
      <div className="relative z-10 max-w-2xl">
        <h2 className="text-2xl font-extrabold mb-2">Scenario Simulator</h2>
        <p className="text-on-surface-variant mb-8">Ask in plain language. We'll simulate the financial outcome.</p>
        
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {result && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex justify-end">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-surface-container-high max-w-md">
                    <p className="text-sm font-medium">"{query}"</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-primary/5 p-6 rounded-lg border border-primary/10 space-y-4">
                    <p className="text-sm font-semibold text-primary">AI Simulation Result:</p>
                    <p className="text-sm leading-relaxed text-on-surface">{result.result}</p>
                    <div className="flex gap-4 pt-2 flex-wrap">
                      <div className="text-center bg-white px-4 py-2 rounded-lg shadow-sm">
                        <p className="text-[10px] text-on-surface-variant/60 uppercase font-bold">Transport</p>
                        <p className="text-primary font-bold">{result.transport || "Covered"}</p>
                      </div>
                      <div className="text-center bg-white px-4 py-2 rounded-lg shadow-sm">
                        <p className="text-[10px] text-on-surface-variant/60 uppercase font-bold">Surgery</p>
                        <p className="text-primary font-bold">{result.surgery || "Covered"}</p>
                      </div>
                      <div className="text-center bg-white px-4 py-2 rounded-lg shadow-sm">
                        <p className="text-[10px] text-on-surface-variant/60 uppercase font-bold">Out-of-pocket</p>
                        <p className="text-on-surface font-extrabold">{result.outOfPocket || "$0.00"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative">
            <input 
              className="w-full bg-white border-none rounded-full px-6 py-4 pr-12 shadow-sm focus:ring-2 focus:ring-primary outline-none" 
              placeholder="Type a scenario (e.g., 'If I lose my glasses...')" 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSimulate()}
            />
            <button 
              onClick={handleSimulate}
              disabled={loading}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-primary p-2 hover:scale-110 transition-transform disabled:opacity-50"
            >
              {loading ? <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-8 py-10 space-y-12">
        {/* Welcome Section */}
        <section className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h1 className="text-5xl font-extrabold tracking-tight text-on-surface mb-2">Welcome back, Jane</h1>
            <p className="text-xl text-on-surface-variant font-medium">Your protection layer is active and up to date.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-3 bg-surface-container-lowest text-on-surface font-semibold rounded-full shadow-sm flex items-center gap-2 hover:bg-surface-container-low transition-all">
              <Download className="w-4 h-4" />
              Statement
            </button>
            <button className="px-6 py-3 bg-primary text-white font-semibold rounded-full shadow-lg shadow-primary/20 flex items-center gap-2 hover:opacity-90 transition-all bg-gradient-to-br from-primary to-primary-container">
              <Bolt className="w-4 h-4" />
              Quick Claim
            </button>
          </div>
        </section>

        {/* Policy Overview Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <OverviewCard title="Total Coverage" value="$2.5M" active />
          <OverviewCard title="Policy Type" value="Premium Global Health" subtitle="Family Umbrella Plan" />
          <OverviewCard title="Status" value="FULLY COVERED" status="FULLY COVERED" subtitle="Last verified: 2 days ago" />
          <OverviewCard title="Expiry" value="Dec 2025" subtitle="Auto-renewal enabled" />
        </section>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-surface-container-lowest rounded-xl p-10 shadow-lucid">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h2 className="text-3xl font-extrabold tracking-tight">Coverage Visualizer</h2>
                  <p className="text-on-surface-variant">See exactly what's ready to use</p>
                </div>
                <div className="flex bg-surface-container p-1 rounded-full">
                  <button className="px-6 py-2 bg-white rounded-full text-sm font-bold shadow-sm">Simple</button>
                  <button className="px-6 py-2 text-sm font-medium text-on-surface-variant/60">Legal View</button>
                </div>
              </div>
              <div className="space-y-8">
                <ProgressBar label="Hospitalization" icon={Hospital} percentage={100} colorClass="text-primary" />
                <ProgressBar label="Medicines" icon={Pill} percentage={90} colorClass="text-primary" />
                <ProgressBar label="Dental" icon={Stethoscope} percentage={65} colorClass="text-secondary" />
                <ProgressBar 
                  label="Maternity" 
                  icon={Baby} 
                  percentage={0} 
                  colorClass="text-tertiary" 
                  rider='Add "Family Expansion" rider to enable this coverage.' 
                />
              </div>
            </div>

            <ScenarioSimulator />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-8">
            {/* Exclusions */}
            <div className="bg-tertiary/5 rounded-xl p-8 border border-tertiary/10">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-6 h-6 text-tertiary" />
                <h2 className="text-xl font-extrabold text-on-surface">What's Not Covered</h2>
              </div>
              <ul className="space-y-6">
                {[
                  { title: "Cosmetic Procedures", desc: "Anything done purely for looks (like teeth whitening or plastic surgery) isn't in your plan." },
                  { title: "Experimental Treatments", desc: "Medical procedures that haven't been officially approved by the board aren't covered yet." },
                  { title: "Pre-existing High Risk", desc: "Any conditions you declared as 'dormant' are currently in a 12-month waiting period." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <Ban className="w-5 h-5 text-tertiary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-sm">{item.title}</p>
                      <p className="text-xs text-on-surface-variant leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <button className="w-full mt-8 py-3 text-sm font-bold text-tertiary border-2 border-tertiary/20 rounded-full hover:bg-tertiary/5 transition-colors">
                View Detailed Exclusions
              </button>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <h3 className="font-extrabold text-lg px-2">Quick Actions</h3>
              {[
                { title: "Upload New Policy", desc: "Sync documents from other providers", icon: UploadCloud, color: "bg-emerald-50 text-emerald-600" },
                { title: "Compare Policies", desc: "See how you'd fare on other plans", icon: ArrowLeftRight, color: "bg-blue-50 text-blue-600" },
                { title: "View Full Summary", desc: "The 'Legal Speak' translated to English", icon: Eye, color: "bg-zinc-50 text-zinc-600" }
              ].map((action, i) => (
                <button key={i} className="group w-full bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-lucid transition-all flex items-center gap-4 text-left">
                  <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center group-hover:bg-on-surface group-hover:text-white transition-colors", action.color)}>
                    <action.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold">{action.title}</p>
                    <p className="text-xs text-on-surface-variant">{action.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Ad Card */}
            <div className="relative rounded-xl overflow-hidden aspect-[4/5] shadow-xl group">
              <img 
                alt="Family playing" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                src="https://picsum.photos/seed/family/800/1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
                <p className="text-xs font-bold tracking-widest uppercase mb-2 text-primary-container">Limited Offer</p>
                <h4 className="text-2xl font-bold mb-4">Add your partner for 50% less this month.</h4>
                <button className="bg-white text-black py-3 rounded-full font-bold text-sm w-fit px-8 hover:bg-primary-container hover:text-white transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-20 border-t border-surface-container py-12 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 opacity-60">
          <span className="text-sm font-bold tracking-tighter">Plain-Language Insurance</span>
          <div className="flex gap-8 text-xs font-medium">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Claim Ethics</a>
            <a href="#" className="hover:text-primary transition-colors">Contact Advocate</a>
          </div>
          <p className="text-xs">© 2024 Lucid Insurance Systems. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
