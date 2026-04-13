import { motion } from 'motion/react';
import { BadgeCheck } from 'lucide-react';

export default function ProfileSection() {
  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">Account Profile</h1>
        <p className="text-on-surface-variant">Update your personal information and how we reach you.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Area */}
        <div className="lg:col-span-2 bg-surface-container-lowest p-10 rounded-xl shadow-[0_12px_40px_rgba(19,27,46,0.06)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {[
              { label: 'Full Name', value: 'Alexander Sterling', type: 'text' },
              { label: 'Email Address', value: 'alex.sterling@example.com', type: 'email' },
              { label: 'Phone Number', value: '+1 (555) 234-8890', type: 'tel' },
              { label: 'Date of Birth', value: 'March 14, 1988', type: 'text' },
            ].map((field) => (
              <div key={field.label} className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase ml-2">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  defaultValue={field.value}
                  className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-primary/20 text-on-surface font-medium transition-shadow"
                />
              </div>
            ))}
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase ml-2">
                Primary Residence
              </label>
              <input
                type="text"
                defaultValue="742 Evergreen Terrace, Springfield, OR 97403"
                className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-primary/20 text-on-surface font-medium transition-shadow"
              />
            </div>
          </div>

          <div className="mt-10 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-primary text-on-primary px-8 py-3 rounded-full font-bold shadow-lg"
            >
              Save Changes
            </motion.button>
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="flex flex-col gap-6">
          <div className="bg-surface-container-low p-8 rounded-xl flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-surface-container-lowest shadow-lg">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDteZyBhube-oWadHI1sYzcdkHv2xpYHIAbIdEC_ANsJQBM8NVuZUlnauGNMzH5fNdpEFcFZd9DPk3VjX-v_k-WKoVjlSO0KCMJDhBJu3MBkN2-WjxDgFyLhc4leKQjn5O3We7fqYWMGtCtfD6-C-r7N24Kc0g2LHYFSlx6lXXOyFno-zvzUkoh9L7SXfsKs9pz-PS2whbijESUHI1VTvaoSHNRtD6_O26hUVIwNj8hlrK9wEtRTxHA3Tm45tb_aW_k_GEaC1YtG2Y"
                alt="Alexander Sterling"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <h3 className="font-bold text-lg mb-1">Alexander Sterling</h3>
            <p className="text-sm text-on-surface-variant mb-6">Member since 2021</p>
            <motion.button
              whileHover={{ backgroundColor: 'var(--color-surface-container-highest)' }}
              className="w-full py-3 rounded-full border border-outline-variant text-sm font-semibold transition-colors"
            >
              Change Photo
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-primary-container/10 p-8 rounded-xl border border-primary/10"
          >
            <div className="flex items-center gap-3 mb-4">
              <BadgeCheck className="w-6 h-6 text-primary" />
              <h4 className="font-bold text-primary">Elite Member</h4>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              You've reached Elite Status with 3 years of claim-free coverage. Enjoy 15% off your next policy.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
