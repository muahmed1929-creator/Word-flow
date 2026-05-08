"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Zap, Shield, Target, ArrowRight, Star, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow pt-32">
        {/* Hero Section */}
        <section className="relative px-6 pb-24 md:pb-32 overflow-hidden">
          {/* Animated Background Orbs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] animate-float" style={{ animationDelay: '-3s' }} />

          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/5 border border-accent/10 mb-8"
            >
              <Sparkles className="text-accent" size={16} />
              <span className="text-xs font-bold text-accent uppercase tracking-widest">Next-Gen AI Content Tool</span>
            </motion.div>

            <motion.h1 
              {...fadeInUp}
              className="text-6xl md:text-8xl font-bold text-primary tracking-tight mb-8 leading-[1.1]"
            >
              Write with the <br />
              <span className="text-gradient">Power of Intelligence</span>
            </motion.h1>

            <motion.p 
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto mb-12 leading-relaxed font-medium"
            >
              Experience the future of content generation. WordFlow combines cutting-edge AI models with a premium interface to elevate your writing workflow.
            </motion.p>

            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link 
                href="/login" 
                className="premium-gradient text-white px-10 py-5 rounded-2xl text-lg font-bold shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group"
              >
                Start Free Trial
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="glass-card !p-5 !rounded-2xl text-lg font-bold text-primary border-gray-200 hover:border-primary/20 hover:shadow-premium transition-all">
                View Demo
              </button>
            </motion.div>

            {/* Social Proof */}
            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.6 }}
              className="mt-24 flex flex-col items-center gap-6"
            >
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Trusted by 10,000+ Creators</p>
              <div className="flex gap-8 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                {/* Brand Placeholders */}
                {["FORBES", "TECHCRUNCH", "VERGE", "WIRED"].map((brand) => (
                  <span key={brand} className="text-xl font-black text-primary tracking-tighter">{brand}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-32 px-6 relative bg-white/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 tracking-tight">Advanced Features for Professionals</h2>
              <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto">Everything you need to produce high-quality, SEO-optimized content at scale.</p>
            </div>

            <motion.div 
              variants={stagger}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-10"
            >
              {[
                { 
                  icon: <Zap className="text-amber-500" size={32} />, 
                  title: "Instant Generation", 
                  desc: "Generate full-length articles, blogs, and social posts in under 10 seconds with zero latency."
                },
                { 
                  icon: <Target className="text-accent" size={32} />, 
                  title: "SEO Optimization", 
                  desc: "Built-in intelligence to ensure your content ranks #1. Keyword density and readability analysis included."
                },
                { 
                  icon: <Shield className="text-emerald-500" size={32} />, 
                  title: "Safety First", 
                  desc: "Advanced content filtering and plagiarism detection to keep your brand safe and original."
                }
              ].map((feature, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeInUp}
                  className="glass-card group hover:-translate-y-2 transition-all"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-8 group-hover:bg-primary/5 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-4">{feature.title}</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="premium-gradient rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-primary/20">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">Ready to Transform Your Workflow?</h2>
                <p className="text-white/80 text-xl font-medium max-w-2xl mx-auto mb-12">Join thousands of high-performing teams who use WordFlow to scale their content production.</p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link 
                    href="/login" 
                    className="bg-white text-primary px-10 py-5 rounded-2xl text-lg font-bold shadow-xl hover:scale-105 active:scale-95 transition-all"
                  >
                    Get Started Now
                  </Link>
                  <div className="flex items-center gap-2 text-white/90 font-bold">
                    <CheckCircle2 size={20} />
                    <span>No credit card required</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
