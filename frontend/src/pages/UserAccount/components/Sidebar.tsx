import { User, Shield, CreditCard, BellRing } from 'lucide-react';
import { motion } from 'motion/react';

const navItems = [
  { id: 'account', label: 'Account', icon: User, active: true },
  { id: 'security', label: 'Security', icon: Shield, active: false },
  { id: 'billing', label: 'Billing', icon: CreditCard, active: false },
  { id: 'notifications', label: 'Notifications', icon: BellRing, active: false },
];

export default function Sidebar() {
  return (
    <aside className="w-full md:w-64 flex-shrink-0">
      <div className="sticky top-24 space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-6 px-4">
          User Settings
        </h2>
        
        <nav className="space-y-1">
          {navItems.map((item) => (
            <motion.a
              key={item.id}
              href="#"
              whileHover={{ x: 4 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-full transition-colors ${
                item.active
                  ? 'bg-surface-container-high text-primary font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container-low'
              }`}
            >
              <item.icon className={`w-5 h-5 ${item.active ? 'fill-primary/20' : ''}`} />
              <span className="font-body text-sm">{item.label}</span>
            </motion.a>
          ))}
        </nav>

        <div className="mt-12 p-6 rounded-lg bg-surface-container-low border border-outline-variant/10">
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Need to pause your coverage? Contact our{' '}
            <span className="text-primary font-bold">Advocate Team</span> for direct assistance.
          </p>
        </div>
      </div>
    </aside>
  );
}
