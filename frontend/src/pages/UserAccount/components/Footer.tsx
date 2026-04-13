export default function Footer() {
  return (
    <footer className="w-full py-12 mt-auto bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <span className="font-headline font-bold text-slate-900">LucidLayer</span>
          <p className="font-body text-xs text-slate-500">
            © 2024 LucidLayer Insurance. The Transparent Advocate.
          </p>
        </div>
        
        <div className="flex gap-6">
          {['Privacy Policy', 'Terms of Service', 'Coverage Guide', 'Support'].map((link) => (
            <a
              key={link}
              href="#"
              className="font-body text-xs text-slate-500 hover:text-green-700 hover:underline transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
