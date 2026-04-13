/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Share2, 
  Bell, 
  UserCircle2, 
  Verified,
  Star,
  Download
} from 'lucide-react';
import { ComparisonCategory } from './types';

const COMPARISON_DATA: ComparisonCategory[] = [
  {
    title: "Core Protections",
    features: [
      {
        name: "Liability Limit",
        description: "Maximum payout for third-party damages",
        standardValue: "$500,000 Combined Single",
        eliteValue: "$1,500,000 Aggregate",
        standardStatus: 'check',
        eliteStatus: 'check',
        isEliteHighlight: true
      },
      {
        name: "Medical Payments",
        description: "Coverage for hospital visits regardless of fault",
        standardValue: "$5,000 per person",
        eliteValue: "$50,000 per person",
        standardStatus: 'warning',
        eliteStatus: 'check'
      }
    ]
  },
  {
    title: "Lifestyle Extras",
    features: [
      {
        name: "Rental Reimbursement",
        description: "Cost coverage for a replacement vehicle",
        standardValue: "Not Included",
        eliteValue: "Unlimited Duration (Luxury Class)",
        standardStatus: 'cancel',
        eliteStatus: 'check'
      },
      {
        name: "Digital Asset Protection",
        description: "Identity theft and online fraud coverage",
        standardValue: "$10,000 Basic Support",
        eliteValue: "$250,000 Concierge Recovery",
        standardStatus: 'check',
        eliteStatus: 'check'
      }
    ]
  }
];

const StatusIcon = ({ status, className }: { status: 'check' | 'warning' | 'cancel', className?: string }) => {
  switch (status) {
    case 'check': return <CheckCircle2 className={`w-5 h-5 text-primary ${className}`} />;
    case 'warning': return <AlertCircle className={`w-5 h-5 text-secondary ${className}`} />;
    case 'cancel': return <XCircle className={`w-5 h-5 text-tertiary ${className}`} />;
  }
};

export default function App() {
  return (
    <div className="min-h-screen bg-surface selection:bg-primary/10">
      {/* Navigation */}
      <header className="sticky top-0 z-50 glass-nav">
        <nav className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tight text-primary font-headline">
            Plain-Language Insurance
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {['Dashboard', 'Simulator'].map((item) => (
              <a key={item} href="#" className="text-on-surface-variant hover:text-primary transition-colors font-medium text-sm">
                {item}
              </a>
            ))}
            <a href="#" className="text-primary font-bold border-b-2 border-primary pb-1 text-sm">
              Compare
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-all">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-all">
              <UserCircle2 className="w-5 h-5" />
            </button>
            <button className="bg-primary hover:bg-primary/90 text-on-primary px-6 py-2.5 rounded-full font-semibold transition-transform active:scale-95 shadow-lg shadow-primary/20">
              Upload Policy
            </button>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-12">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h1 className="font-headline text-5xl font-extrabold tracking-tight text-on-surface mb-4 leading-tight">
                Policy Comparison
              </h1>
              <p className="text-xl text-on-surface-variant font-body leading-relaxed">
                Deciphering the fine print. We've mapped "Standard Plus" against "Elite Care" to show you exactly where your protection stands.
              </p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-surface-container-low text-on-surface font-semibold rounded-full hover:bg-surface-container-high transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download Analysis
              </button>
              <button className="px-6 py-3 bg-primary text-on-primary font-semibold rounded-full hover:shadow-xl transition-all flex items-center gap-2 group">
                <Share2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                Share View
              </button>
            </div>
          </div>
        </motion.section>

        {/* Sticky Headers */}
        <div className="sticky top-[72px] z-40 bg-surface/80 backdrop-blur-sm py-4 mb-8">
          <div className="grid grid-cols-12 gap-8 items-center px-4">
            <div className="col-span-4">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-outline-variant">
                Features & Coverage
              </span>
            </div>
            
            <motion.div 
              whileHover={{ y: -4 }}
              className="col-span-4 bg-surface-container-lowest p-6 rounded-xl ambient-shadow flex items-center justify-between border-l-4 border-primary"
            >
              <div>
                <h3 className="font-headline font-bold text-lg">Standard Plus</h3>
                <p className="text-primary font-bold">$142<span className="text-xs text-on-surface-variant font-normal"> /mo</span></p>
              </div>
              <Verified className="w-6 h-6 text-primary-container fill-primary-container/20" />
            </motion.div>

            <motion.div 
              whileHover={{ y: -4 }}
              className="col-span-4 bg-surface-container-lowest p-6 rounded-xl ambient-shadow flex items-center justify-between border-l-4 border-secondary"
            >
              <div>
                <h3 className="font-headline font-bold text-lg">Elite Care</h3>
                <p className="text-secondary font-bold">$218<span className="text-xs text-on-surface-variant font-normal"> /mo</span></p>
              </div>
              <Star className="w-6 h-6 text-secondary fill-secondary/20" />
            </motion.div>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="space-y-12">
          {COMPARISON_DATA.map((category, catIdx) => (
            <div key={category.title}>
              <div className="bg-surface-container-high/30 p-4 rounded-lg mb-4">
                <h2 className="font-headline font-bold text-on-surface">{category.title}</h2>
              </div>
              
              <div className="space-y-2">
                {category.features.map((feature, featIdx) => (
                  <motion.div 
                    key={feature.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: featIdx * 0.1 }}
                    className="grid grid-cols-12 gap-8 px-4 py-8 items-center group hover:bg-surface-container-low transition-colors rounded-xl"
                  >
                    <div className="col-span-4">
                      <h4 className="font-semibold text-on-surface">{feature.name}</h4>
                      <p className="text-sm text-on-surface-variant">{feature.description}</p>
                    </div>
                    
                    <div className="col-span-4">
                      <div className="flex items-center gap-3">
                        <StatusIcon status={feature.standardStatus} />
                        <span className="font-medium text-sm">{feature.standardValue}</span>
                      </div>
                    </div>
                    
                    <div className="col-span-4">
                      <div className="flex items-center gap-3">
                        <StatusIcon status={feature.eliteStatus} />
                        <span className={`font-medium text-sm ${feature.isEliteHighlight ? 'font-bold text-primary' : ''}`}>
                          {feature.eliteValue}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Summary Bento */}
        <section className="mt-24 grid grid-cols-12 gap-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="col-span-12 md:col-span-7 bg-primary-container/5 p-12 rounded-[3rem] relative overflow-hidden group"
          >
            <div className="relative z-10">
              <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest mb-6 inline-block">
                The Advocate's Choice
              </span>
              <h2 className="font-headline text-4xl font-bold mb-6 text-on-surface">
                Why Elite Care wins for your lifestyle
              </h2>
              <p className="text-lg mb-8 max-w-md text-on-surface-variant leading-relaxed">
                Based on your frequent travel and high-value digital assets, the <span className="font-bold text-primary">Elite Care</span> plan provides a 400% increase in critical coverage for only 35% more in premium.
              </p>
              <button className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform active:scale-95">
                Upgrade Now
              </button>
            </div>
            
            {/* Abstract Background Pattern */}
            <div className="absolute right-[-10%] top-[-10%] w-[60%] h-[120%] opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-primary">
                <path d="M44.7,-76.4C58.1,-69.2,69.2,-58.1,76.4,-44.7C83.7,-31.3,87.1,-15.7,86.1,-0.6C85.1,14.5,79.7,29,71.4,41.4C63.1,53.8,51.9,64.1,38.9,71.4C25.9,78.7,13,83,0.3,82.5C-12.4,82,-24.8,76.7,-36.5,69.1C-48.2,61.5,-59.2,51.6,-67.4,39.6C-75.6,27.6,-81,13.8,-81.4,-0.2C-81.8,-14.2,-77.2,-28.4,-68.8,-40.1C-60.4,-51.8,-48.2,-61,-35.1,-68.5C-22,-76,-11,-81.8,2.4,-86C15.8,-90.2,31.3,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
              </svg>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="col-span-12 md:col-span-5 bg-surface-container-lowest p-10 rounded-[3rem] ambient-shadow border border-outline-variant/10 flex flex-col justify-center"
          >
            <h3 className="font-headline font-bold text-xl mb-8">Total Annual Impact</h3>
            <div className="space-y-8">
              <div className="flex justify-between items-end border-b border-surface-container-high pb-4">
                <span className="text-on-surface-variant font-medium">Current (Standard)</span>
                <span className="text-3xl font-bold font-headline">$1,704</span>
              </div>
              <div className="flex justify-between items-end border-b border-surface-container-high pb-4">
                <span className="text-on-surface-variant font-medium">Proposed (Elite)</span>
                <span className="text-3xl font-bold font-headline text-primary">$2,616</span>
              </div>
              <p className="text-xs text-on-surface-variant italic leading-relaxed">
                Reflects all applicable multi-policy discounts and loyalty credits.
              </p>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low/50 mt-24 border-t border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-8 py-16 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="text-lg font-bold text-on-surface mb-2 font-headline">
              Plain-Language Insurance
            </div>
            <p className="text-on-surface-variant text-sm max-w-xs leading-relaxed">
              © 2024 Plain-Language Insurance. The Transparent Advocate for your coverage.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
            {['Privacy Policy', 'Terms of Service', 'Help Center', 'API Documentation'].map((link) => (
              <a key={link} href="#" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
