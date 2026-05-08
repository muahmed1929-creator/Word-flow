"use client";

import { useState } from "react";
import { Send, Mail, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const supabase = createClient();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (resetError) throw resetError;

      setIsSuccess(true);
    } catch (err: any) {
      if (err.message?.includes("rate limit")) {
        setError("Email limit exceeded. Supabase only allows 3 emails per hour on the free plan. Please try again after 1 hour or use a different email.");
      } else {
        setError(err.message || "An error occurred");
      }
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
          <p className="text-gray-500 font-medium mt-4">Reset your password securely.</p>
        </div>

        <div className="glass-card shadow-2xl shadow-primary/5 p-10 border-white/50">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center tracking-tight">Forgot Password</h2>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
              {error}
            </div>
          )}

          {isSuccess ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail size={40} />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-2">Check your email</h3>
              <p className="text-gray-500 font-medium">We've sent you a link to reset your password.</p>
              <Link 
                href="/login" 
                className="inline-flex items-center gap-2 text-primary font-bold mt-8 hover:text-accent transition-colors"
              >
                <ArrowLeft size={16} />
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-6">
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
                    Send Reset Link
                    <Send size={18} />
                  </>
                )}
              </button>

              <div className="text-center">
                <Link href="/login" className="text-sm font-bold text-gray-400 hover:text-primary transition-colors inline-flex items-center gap-2">
                  <ArrowLeft size={14} />
                  Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>

        <p className="mt-10 text-center text-xs text-gray-400 font-bold uppercase tracking-widest">
          © 2026 WORDFLOW AI. SECURE RESET.
        </p>
      </div>
    </div>
  );
}