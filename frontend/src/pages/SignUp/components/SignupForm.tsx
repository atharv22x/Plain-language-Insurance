import { useState } from "react";
import { motion } from "motion/react";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const getPasswordStrength = () => {
    if (password.length === 0) return { label: "", color: "bg-surface-container-high", width: "0%" };
    if (password.length < 6) return { label: "Weak", color: "bg-tertiary", width: "25%" };
    if (password.length < 10) return { label: "Medium", color: "bg-secondary-container", width: "60%" };
    return { label: "Strong", color: "bg-primary-container", width: "100%" };
  };

  const strength = getPasswordStrength();

  return (
    <main className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 bg-surface overflow-y-auto">
      <div className="w-full max-w-md">
        {/* Branding for Mobile */}
        <div className="lg:hidden mb-8 flex justify-center">
          <span className="text-primary font-headline font-extrabold text-2xl tracking-tight">
            Plain-Language
          </span>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center lg:text-left mb-10"
        >
          <h2 className="text-4xl font-headline font-bold text-on-surface mb-2">Create your account</h2>
          <p className="text-on-surface-variant font-sans">Start simplifying your insurance today</p>
        </motion.div>

        {/* Social Auth */}
        <motion.button 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full flex items-center justify-center gap-3 bg-white border border-outline-variant/15 py-3.5 rounded-full hover:bg-surface-container-low transition-all duration-200 ambient-shadow font-sans font-semibold text-on-surface"
        >
          <img 
            alt="Google Logo" 
            className="w-5 h-5" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbDel1eZSVa2EYyjkDSTxtA2dQDftq9kr-uTfbSrRj9Kk2PehQfWrWOVIKqheNIPTNf1iMTIZzRJ9nJfWTNn4bMLj_P0XKVp9Lmz3lsVAYyaoboSSMEKjn-lVUZeMCxxiCVnct0Z2e6gUMK59mfLzufGoiLNJfGAFNIofFo2W_BYwtWNBnMa5xwY7u8Q8VK8MpfKKthon34GJZVI8msDNrX7BkHfByJ_vHBUHPYnX13XMASv5xDPuGH55od3mD2gEXDQ1AlvEvs20"
            referrerPolicy="no-referrer"
          />
          Continue with Google
        </motion.button>

        <div className="flex items-center my-8">
          <div className="flex-grow h-px bg-outline-variant/20"></div>
          <span className="px-4 text-xs font-sans font-semibold text-on-surface-variant uppercase tracking-widest">or email</span>
          <div className="flex-grow h-px bg-outline-variant/20"></div>
        </div>

        {/* Signup Form */}
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-sans font-semibold text-on-surface mb-2 ml-1">Full Name</label>
            <input 
              className="w-full px-5 py-4 bg-surface-container-low border-none rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all font-sans text-on-surface placeholder:text-on-surface-variant/40" 
              placeholder="Jane Doe" 
              type="text" 
            />
          </div>

          <div>
            <label className="block text-sm font-sans font-semibold text-on-surface mb-2 ml-1">Email Address</label>
            <input 
              className="w-full px-5 py-4 bg-surface-container-low border-none rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all font-sans text-on-surface placeholder:text-on-surface-variant/40" 
              placeholder="jane@example.com" 
              type="email" 
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-sans font-semibold text-on-surface mb-2 ml-1">Password</label>
            <div className="relative">
              <input 
                className="w-full px-5 py-4 bg-surface-container-low border-none rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all font-sans text-on-surface placeholder:text-on-surface-variant/40" 
                placeholder="••••••••" 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60 hover:text-primary transition-colors" 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            {/* Password Strength Bar */}
            <div className="mt-3 flex gap-1 px-1">
              <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${password.length > 0 ? strength.color : 'bg-surface-container-high'}`}></div>
              <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${password.length >= 6 ? strength.color : 'bg-surface-container-high'}`}></div>
              <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${password.length >= 10 ? strength.color : 'bg-surface-container-high'}`}></div>
              <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 bg-surface-container-high`}></div>
            </div>
            {password && (
              <p className="text-[10px] mt-2 text-on-surface-variant font-sans px-1">
                Password strength: <span className="font-bold" style={{ color: strength.color.includes('primary') ? '#006e2f' : strength.color.includes('secondary') ? '#735c00' : '#b91a24' }}>{strength.label}</span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-sans font-semibold text-on-surface mb-2 ml-1">Confirm Password</label>
            <div className="relative">
              <input 
                className="w-full px-5 py-4 bg-surface-container-low border-none rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all font-sans text-on-surface placeholder:text-on-surface-variant/40" 
                placeholder="••••••••" 
                type="password" 
              />
            </div>
          </div>

          <div className="pt-2">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary hover:bg-primary/90 text-white font-headline font-bold py-4 rounded-full transition-all ambient-shadow" 
              type="submit"
            >
              Sign Up
            </motion.button>
          </div>
        </form>

        {/* Bottom Trust & Navigation */}
        <div className="mt-10 space-y-6 text-center">
          <div className="flex items-center justify-center gap-2 text-primary font-sans text-sm font-medium">
            <Lock size={16} fill="currentColor" />
            Your data is secure and encrypted
          </div>
          <p className="text-on-surface-variant font-sans text-sm">
            Already have an account? 
            <a className="text-primary font-bold hover:underline ml-1" href="#">Log in</a>
          </p>
        </div>

        {/* Footer Segment for Legal */}
        <div className="mt-12 flex justify-center gap-6 text-[10px] font-sans text-on-surface-variant/60 uppercase tracking-widest">
          <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
          <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
        </div>
      </div>
    </main>
  );
}
