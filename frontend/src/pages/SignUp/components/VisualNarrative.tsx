import { motion } from "motion/react";
import { Sparkles, ShieldCheck } from "lucide-react";

export default function VisualNarrative() {
  return (
    <section className="hidden lg:flex w-1/2 relative overflow-hidden bg-primary items-center justify-center p-16">
      {/* Abstract Background Gradients */}
      <div 
        className="absolute inset-0 z-0 opacity-40" 
        style={{ 
          background: "radial-gradient(circle at 20% 30%, #22c55e 0%, transparent 50%), radial-gradient(circle at 80% 70%, #6bff8f 0%, transparent 50%)" 
        }}
      />
      
      <div className="relative z-10 max-w-xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-[#6bff8f] font-headline font-extrabold text-2xl tracking-tight">
            Plain-Language
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-6xl font-headline font-extrabold text-white leading-tight mb-6"
        >
          Understand your insurance in seconds
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-white/80 font-sans leading-relaxed max-w-md"
        >
          We simplify complex policies into clear, visual insights. No jargon, just peace of mind.
        </motion.p>

        {/* Bento-style feature cards */}
        <div className="mt-16 grid grid-cols-2 gap-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-effect rounded-2xl p-6"
          >
            <Sparkles className="text-primary-container mb-3 w-8 h-8" />
            <h3 className="text-white font-headline font-bold text-lg">Smart Analysis</h3>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="glass-effect rounded-2xl p-6 translate-y-8"
          >
            <ShieldCheck className="text-primary-container mb-3 w-8 h-8" />
            <h3 className="text-white font-headline font-bold text-lg">Bank-level Security</h3>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
