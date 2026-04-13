import { motion } from 'motion/react';
import { Nfc, Plus, ArrowRight } from 'lucide-react';

export default function PaymentSection() {
  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight text-on-surface mb-8">Payment Methods</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Primary Card */}
        <motion.div
          whileHover={{ y: -5 }}
          className="relative overflow-hidden p-8 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-2xl aspect-[1.58/1] flex flex-col justify-between group"
        >
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 bg-white/10 rounded-md backdrop-blur-md flex items-center justify-center">
              <Nfc className="w-6 h-6" />
            </div>
            <span className="font-headline font-bold text-sm tracking-widest opacity-80">
              LucidLayer Preferred
            </span>
          </div>
          
          <div className="space-y-4">
            <div className="text-2xl font-mono tracking-widest">•••• •••• •••• 4290</div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] uppercase tracking-wider opacity-50 mb-1">Card Holder</p>
                <p className="text-xs font-bold uppercase">Alexander Sterling</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-wider opacity-50 mb-1">Expires</p>
                <p className="text-xs font-bold">09 / 27</p>
              </div>
            </div>
          </div>
          
          {/* Decorative glow */}
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors" />
        </motion.div>

        {/* Add New Method */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-surface-container-lowest p-8 rounded-xl border-2 border-dashed border-outline-variant flex flex-col items-center justify-center gap-4 text-center aspect-[1.58/1] hover:border-primary/50 transition-colors"
        >
          <div className="w-12 h-12 bg-surface-container-low rounded-full flex items-center justify-center">
            <Plus className="w-6 h-6 text-outline" />
          </div>
          <div>
            <p className="font-bold text-on-surface">Add New Method</p>
            <p className="text-xs text-on-surface-variant">Credit card or Direct Bank Link</p>
          </div>
        </motion.button>

        {/* Billing Summary */}
        <div className="bg-surface-container-high p-8 rounded-xl flex flex-col justify-between aspect-[1.58/1]">
          <div>
            <h4 className="font-bold text-sm mb-4">Next Payment</h4>
            <div className="text-4xl font-extrabold text-on-surface mb-2">$142.50</div>
            <p className="text-xs text-on-surface-variant">Auto-pay scheduled for Oct 1, 2024</p>
          </div>
          
          <motion.button
            whileHover={{ x: 4 }}
            className="flex items-center justify-center gap-2 text-primary font-bold text-sm"
          >
            View Billing History <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
