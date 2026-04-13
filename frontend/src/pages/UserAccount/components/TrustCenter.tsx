import { motion } from 'motion/react';
import { ShieldCheck, Lock, Fingerprint, Key, ShieldAlert } from 'lucide-react';

const trustItems = [
  {
    title: 'AES-256 Encryption',
    description: 'All policy documents and personal data are encrypted at rest and in transit.',
    status: 'Active',
    icon: Lock,
    active: true,
  },
  {
    title: 'Biometric Lock',
    description: 'Face ID or Touch ID is required for mobile access to claims and billing.',
    status: 'Active',
    icon: Fingerprint,
    active: true,
  },
  {
    title: '2FA Authentication',
    description: 'Add an extra layer of protection to your account logins via SMS or App.',
    status: 'Setup Needed',
    icon: Key,
    active: false,
  },
  {
    title: 'SOC2 Type II',
    description: 'We undergo annual rigorous audits to maintain the highest security standards.',
    status: 'Compliant',
    icon: ShieldCheck,
    active: true,
  },
];

export default function TrustCenter() {
  return (
    <section>
      <div className="bg-surface-container-lowest p-10 rounded-xl shadow-[0_12px_40px_rgba(19,27,46,0.06)] relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 fill-primary/10" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Trust Center</h2>
              <p className="text-sm text-on-surface-variant">Your privacy and security are our foundational layers.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-surface-container-low p-6 rounded-lg group hover:bg-surface-container transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className={`w-2 h-2 rounded-full ${item.active ? 'bg-primary animate-pulse' : 'bg-secondary'}`} />
                  <span className={`text-xs font-bold uppercase ${item.active ? 'text-primary' : 'text-secondary'}`}>
                    {item.status}
                  </span>
                </div>
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <item.icon className="w-4 h-4 text-on-surface-variant" />
                  {item.title}
                </h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
          <ShieldAlert className="w-[240px] h-[240px]" />
        </div>
      </div>
    </section>
  );
}
