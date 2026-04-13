import { Bell, User, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-[0_12px_40px_rgba(19,27,46,0.06)]">
      <div className="flex justify-between items-center h-16 px-8 max-w-[1440px] mx-auto">
        <div className="text-2xl font-bold tracking-tighter text-slate-900">LucidLayer</div>
        
        <nav className="hidden md:flex items-center space-x-8">
          {['Dashboard', 'Visualizer', 'Simulator', 'Compare'].map((item) => (
            <a
              key={item}
              href="#"
              className="font-headline font-semibold text-sm tracking-tight text-slate-600 hover:text-slate-900 transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 hover:bg-slate-50 rounded-full transition-all duration-200"
          >
            <Bell className="w-5 h-5 text-slate-600" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 hover:bg-slate-50 rounded-full transition-all duration-200 text-green-700 border-b-2 border-green-600 pb-1"
          >
            <User className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-primary text-on-primary px-6 py-2 rounded-full font-headline font-bold text-sm shadow-md"
          >
            File Claim
          </motion.button>
        </div>
      </div>
    </header>
  );
}
