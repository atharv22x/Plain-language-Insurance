/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Bell, 
  User, 
  Plus, 
  Hospital, 
  Stethoscope, 
  Baby, 
  Pill, 
  Download, 
  AlertTriangle, 
  X, 
  History, 
  Sparkles, 
  ArrowRight,
  PiggyBank,
  Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

// --- Components ---

const Navbar = () => (
  <header className="glass-nav">
    <div className="flex justify-between items-center w-full px-6 md:px-8 py-4 max-w-7xl mx-auto">
      <div className="flex items-center gap-8">
        <span className="text-xl font-bold tracking-tight text-primary font-headline">
          Plain-Language Insurance
        </span>
        <nav className="hidden md:flex items-center gap-6">
          <a className="text-primary font-bold border-b-2 border-primary pb-1" href="#">Dashboard</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Visualizer</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Simulator</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Compare</a>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <button className="hidden sm:block bg-primary text-on-primary px-6 py-2.5 rounded-full font-semibold transition-transform hover:scale-95 active:opacity-80">
          Upload Policy
        </button>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-surface-container-low rounded-lg transition-all text-on-surface-variant">
            <Bell size={20} />
          </button>
          <button className="p-2 hover:bg-surface-container-low rounded-lg transition-all text-on-surface-variant">
            <User size={20} />
          </button>
          <button className="md:hidden p-2 hover:bg-surface-container-low rounded-lg transition-all text-on-surface-variant">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </div>
  </header>
);

interface CoverageCardProps {
  icon: React.ReactNode;
  title: string;
  status: string;
  percentage: number;
  label: string;
  colorClass: string;
  bgColorClass: string;
  textColorClass: string;
}

const CoverageCard = ({ 
  icon, 
  title, 
  status, 
  percentage, 
  label, 
  colorClass, 
  bgColorClass,
  textColorClass 
}: CoverageCardProps) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-surface-container-lowest p-8 rounded-xl ambient-shadow flex flex-col justify-between h-full"
  >
    <div>
      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-6", bgColorClass)}>
        <div className={textColorClass}>{icon}</div>
      </div>
      <h3 className="text-xl font-bold mb-1">{title}</h3>
      <p className={cn("text-sm font-bold mb-4", textColorClass)}>{status}</p>
    </div>
    <div>
      <div className="flex justify-between items-end mb-2">
        <span className="text-3xl font-bold">{percentage}%</span>
        <span className="text-xs text-on-surface-variant font-medium">{label}</span>
      </div>
      <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn("h-full rounded-full", colorClass)} 
        />
      </div>
    </div>
  </motion.div>
);

const Footer = () => (
  <footer className="bg-surface-container-low/30 border-t border-outline-variant/10 mt-24">
    <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto py-12 px-8">
      <div className="mb-8 md:mb-0 text-center md:text-left">
        <div className="text-lg font-bold text-on-surface mb-2">Plain-Language Insurance</div>
        <p className="text-on-surface-variant text-sm font-medium">
          © 2024 Plain-Language Insurance. The Transparent Advocate for your coverage.
        </p>
      </div>
      <nav className="flex flex-wrap justify-center gap-6 md:gap-8 items-center">
        <a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="#">Privacy Policy</a>
        <a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="#">Terms of Service</a>
        <a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="#">Help Center</a>
        <a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="#">API Documentation</a>
      </nav>
    </div>
  </footer>
);

export default function App() {
  const [viewMode, setViewMode] = useState<'simple' | 'legal'>('simple');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto px-6 md:px-8 py-12 w-full">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Your Coverage at a Glance
            </h1>
            <p className="text-on-surface-variant text-lg max-w-2xl">
              We've translated your complex policy into simple visual blocks. No jargon, just the facts about what you're paying for.
            </p>
          </motion.div>
          
          <div className="bg-surface-container-low p-1.5 rounded-full flex items-center self-start md:self-auto">
            <button 
              onClick={() => setViewMode('simple')}
              className={cn(
                "px-6 py-2 rounded-full font-semibold transition-all",
                viewMode === 'simple' ? "bg-white text-on-surface shadow-sm" : "text-on-surface-variant hover:bg-surface-container-high/50"
              )}
            >
              Simple View
            </button>
            <button 
              onClick={() => setViewMode('legal')}
              className={cn(
                "px-6 py-2 rounded-full font-semibold transition-all",
                viewMode === 'legal' ? "bg-white text-on-surface shadow-sm" : "text-on-surface-variant hover:bg-surface-container-high/50"
              )}
            >
              Legal View
            </button>
          </div>
        </div>

        {/* Coverage Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <CoverageCard 
            icon={<Hospital size={24} />}
            title="Hospitalization"
            status="Fully Covered"
            percentage={100}
            label="Standard Ward"
            colorClass="bg-primary"
            bgColorClass="bg-primary-container/20"
            textColorClass="text-primary"
          />
          <CoverageCard 
            icon={<Stethoscope size={24} />}
            title="Dental Care"
            status="Partial Coverage"
            percentage={65}
            label="Limits apply"
            colorClass="bg-secondary-container"
            bgColorClass="bg-secondary-container/20"
            textColorClass="text-secondary"
          />
          <CoverageCard 
            icon={<Baby size={24} />}
            title="Maternity"
            status="Not Covered"
            percentage={0}
            label="Add-on required"
            colorClass="bg-tertiary-container"
            bgColorClass="bg-tertiary-container/20"
            textColorClass="text-tertiary"
          />
          <CoverageCard 
            icon={<Pill size={24} />}
            title="Prescriptions"
            status="Highly Covered"
            percentage={90}
            label="Generic Drugs"
            colorClass="bg-primary"
            bgColorClass="bg-primary-container/20"
            textColorClass="text-primary"
          />
        </section>

        {/* Exclusions Highlighter */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold">Exclusions Highlighter</h2>
            <div className="h-px flex-1 bg-surface-container-high"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Policy Text */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 bg-surface-container-low rounded-lg p-6 md:p-10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4">
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Policy Document Excerpt</span>
              </div>
              <div className="space-y-6 text-on-surface-variant leading-relaxed">
                <p className="font-bold text-on-surface">Article 14.2 — General Limitations</p>
                <p>
                  The insurer shall indemnify the policyholder for expenses incurred during inpatient stays. However, the insurer 
                  <span className="bg-tertiary-container/40 text-on-tertiary-container font-medium px-1 rounded mx-1">
                    will not be liable for any cosmetic or reconstructive surgeries
                  </span> 
                  unless deemed life-saving by three independent board-certified practitioners.
                </p>
                <p>
                  Furthermore, any 
                  <span className="bg-tertiary-container/40 text-on-tertiary-container font-medium px-1 rounded mx-1">
                    pre-existing conditions documented within the last 24 months
                  </span> 
                  before the policy commencement date are strictly excluded from the standard plan coverage until a continuous period of 36 months has elapsed.
                </p>
                <p>
                  Coverage for 
                  <span className="bg-tertiary-container/40 text-on-tertiary-container font-medium px-1 rounded mx-1">
                    alternative therapies including acupuncture and homeopathy
                  </span> 
                  is restricted to plans labeled 'Elite Wellness' and is explicitly barred from this 'Core Plus' policy.
                </p>
              </div>
              <div className="mt-8 flex gap-4">
                <button className="text-primary font-semibold flex items-center gap-2 text-sm hover:underline">
                  <Download size={18} />
                  Download Full Legal PDF
                </button>
              </div>
            </motion.div>

            {/* What's Not Covered Summary */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-5 bg-surface-container-lowest rounded-xl ambient-shadow p-8 border border-outline-variant/15"
            >
              <div className="flex items-center gap-3 mb-8">
                <AlertTriangle className="text-tertiary" size={24} />
                <h3 className="text-2xl font-bold">What's Not Covered</h3>
              </div>
              
              <div className="space-y-8">
                {[
                  { icon: <X size={16} />, title: "Cosmetic Procedures", desc: "Surgery for looks isn't covered. Only surgeries needed to save your life are included." },
                  { icon: <History size={16} />, title: "Past Health Issues", desc: "Illnesses you had in the 2 years before joining won't be covered for another 3 years." },
                  { icon: <Sparkles size={16} />, title: "Alternative Therapies", desc: "Treatments like acupuncture aren't in this plan. You'll need to upgrade to 'Elite Wellness'." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-tertiary-container/10 flex items-center justify-center">
                      <div className="text-tertiary">{item.icon}</div>
                    </div>
                    <div>
                      <h4 className="font-bold text-on-surface mb-1">{item.title}</h4>
                      <p className="text-sm text-on-surface-variant">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-6 bg-surface-container rounded-lg">
                <p className="text-sm font-semibold mb-3">Want to cover these gaps?</p>
                <button className="w-full bg-secondary text-white py-3 rounded-full font-bold hover:opacity-90 transition-opacity">
                  View Upgrade Options
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Insights Section */}
        <section className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Claim Probability */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-gradient-to-br from-primary to-green-800 rounded-xl p-8 md:p-10 text-on-primary flex flex-col md:flex-row items-center gap-10"
          >
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-extrabold mb-4">Claim Probability Analysis</h2>
              <p className="text-on-primary/80 mb-6">
                Based on your age and policy type, you are most likely to use your Dental and Hospitalization coverage this year.
              </p>
              <button className="bg-white text-primary px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">
                Run Simulator
              </button>
            </div>
            
            <div className="w-48 h-48 relative flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle className="opacity-20" cx="50%" cy="50%" fill="transparent" r="45%" stroke="white" strokeWidth="8" />
                <motion.circle 
                  cx="50%" cy="50%" fill="transparent" r="45%" stroke="white" 
                  strokeDasharray="280" 
                  initial={{ strokeDashoffset: 280 }}
                  whileInView={{ strokeDashoffset: 140 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  strokeLinecap="round" strokeWidth="8" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold">50%</span>
                <span className="text-[10px] uppercase font-bold tracking-widest">Risk Score</span>
              </div>
            </div>
          </motion.div>

          {/* Smart Suggestion */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-surface-container-high rounded-xl p-8 md:p-10 flex flex-col justify-between overflow-hidden relative"
          >
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">Smart Suggestion</h3>
              <p className="text-on-surface-variant leading-relaxed">
                Switch to annual billing to save 12% on your premium immediately.
              </p>
            </div>
            <button className="relative z-10 text-primary font-bold flex items-center gap-2 mt-4 hover:translate-x-1 transition-transform">
              Change Plan 
              <ArrowRight size={20} />
            </button>
            <div className="absolute -bottom-4 -right-4 opacity-10">
              <PiggyBank size={120} />
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
