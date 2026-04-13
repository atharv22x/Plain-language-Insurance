import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProfileSection from './components/ProfileSection';
import PaymentSection from './components/PaymentSection';
import TrustCenter from './components/TrustCenter';
import Footer from './components/Footer';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />
      
      <main className="flex-grow pt-24 pb-20 px-8 max-w-[1440px] mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-12">
          <Sidebar />
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-grow space-y-16"
          >
            <ProfileSection />
            <PaymentSection />
            <TrustCenter />
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
