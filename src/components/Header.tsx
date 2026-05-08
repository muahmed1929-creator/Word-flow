"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
        ? "py-4 px-6" 
        : "py-6 px-8"
      }`}
    >
      <div 
        className={`max-w-7xl mx-auto transition-all duration-500 ${
          isScrolled 
          ? "bg-white/80 backdrop-blur-lg border border-white/20 shadow-glass rounded-2xl px-6 py-3" 
          : "bg-transparent px-0 py-0"
        } flex items-center justify-between`}
      >
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 premium-gradient rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
            <Sparkles className="text-white" size={20} />
          </div>
          <span className="text-2xl font-bold text-primary tracking-tight">WordFlow</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {["Features", "Pricing", "About", "Contact"].map((item) => (
            <Link 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-sm font-semibold text-gray-600 hover:text-primary transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <Link 
              href="/dashboard" 
              className="premium-gradient text-white text-sm font-bold px-8 py-3 rounded-xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link 
                href="/login" 
                className="text-sm font-bold text-primary hover:opacity-70 transition-opacity px-4"
              >
                Log in
              </Link>
              <Link 
                href="/signup" 
                className="premium-gradient text-white text-sm font-bold px-6 py-3 rounded-xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
              >
                Start Free
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
