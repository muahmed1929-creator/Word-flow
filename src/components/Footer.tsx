"use client";

import Link from "next/link";
import { Sparkles, Mail } from "lucide-react";

const SocialIcons = {
  X: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  Github: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.82 1.102.82 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
  Linkedin: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
    </svg>
  )
};

const Footer = () => {
  return (
    <footer className="relative pt-32 pb-12 overflow-hidden bg-surface-50">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1 space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 premium-gradient rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
                <Sparkles className="text-white" size={20} />
              </div>
              <span className="text-2xl font-bold text-primary tracking-tight">WordFlow</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              Revolutionizing content creation with high-performance AI. Generate, refine, and publish with unprecedented speed and intelligence.
            </p>
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/20 hover:shadow-premium transition-all">
                <SocialIcons.X />
              </button>
              <button className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/20 hover:shadow-premium transition-all">
                <SocialIcons.Github />
              </button>
              <button className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/20 hover:shadow-premium transition-all">
                <SocialIcons.Linkedin />
              </button>
              <button className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/20 hover:shadow-premium transition-all">
                <Mail size={18} />
              </button>
            </div>
          </div>

          <div className="col-span-1">
            <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-6">Product</h4>
            <ul className="space-y-4">
              {["Features", "Integrations", "Pricing", "Changelog"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm font-semibold text-gray-500 hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-6">Company</h4>
            <ul className="space-y-4">
              {["About Us", "Careers", "Press", "Contact"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm font-semibold text-gray-500 hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-6">Legal</h4>
            <ul className="space-y-4">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm font-semibold text-gray-500 hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400 font-bold tracking-wider">
            © 2026 WORDFLOW AI. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8 text-xs font-bold text-gray-400 tracking-wider">
            <Link href="#" className="hover:text-primary transition-colors">STATUS</Link>
            <Link href="#" className="hover:text-primary transition-colors">SECURITY</Link>
            <Link href="#" className="hover:text-primary transition-colors">SITEMAP</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
