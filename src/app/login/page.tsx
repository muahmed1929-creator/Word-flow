"use client";

import { useState } from "react";
import { Send, Lock, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] animate-float" style={{ animationDelay: '-3s' }} />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 text-3xl font-bold text-primary mb-2 group">
            <div className="w-12 h-12 premium-gradient rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
              <Sparkles className="text-white" size={24} />
            </div>
            WordFlow
          </Link>
          <p className="text-gray-500 font-medium mt-4">Elevate your content with AI intelligence.</p>
        </div>

        <div className="glass-card shadow-2xl shadow-primary/5 p-10 border-white/50">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center tracking-tight">Sign In</h2>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary/60 uppercase tracking-widest block ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 bg-white/50 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 focus:bg-white transition-all font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-bold text-primary/60 uppercase tracking-widest block">Password</label>
                <Link href="/forgot-password" className="text-xs font-bold text-primary hover:text-accent transition-colors">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 bg-white/50 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 focus:bg-white transition-all font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className={`w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl ${
                isLoading 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none" 
                : "premium-gradient text-white hover:scale-[1.02] active:scale-95 shadow-primary/30"
              }`}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Sign In
                  <Send size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500 font-medium">
              Don't have an account? 
              <Link href="/signup" className="ml-2 font-bold text-primary hover:text-accent transition-colors underline underline-offset-4 decoration-2 decoration-primary/10 hover:decoration-accent/20">
                Create an account
              </Link>
            </p>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-gray-400 font-bold uppercase tracking-widest">
          © 2026 WORDFLOW AI. SECURE LOGIN.
        </p>
      </div>
    </div>
  );
}
