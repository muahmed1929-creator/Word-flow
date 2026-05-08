"use client";

import { useState } from "react";
import { Sparkles, Copy, Download, RefreshCw, Send, Type, Globe, MessageSquare, List, Zap, Target } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/utils/supabase/client";

export default function EditorPage() {
  const [keywords, setKeywords] = useState("");
  const [intent, setIntent] = useState("informational");
  const [tone, setTone] = useState("professional");
  const [language, setLanguage] = useState("english");
  const [length, setLength] = useState("medium");
  const [output, setOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const supabase = createClient();

  const handleGenerate = async () => {
    if (!keywords) return;
    setIsGenerating(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // 1. Check usage limit
      const { data: usage } = await supabase
        .from('usage')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (usage && usage.words_used >= usage.words_limit) {
        alert("Monthly word limit reached. Please upgrade your plan.");
        setIsGenerating(false);
        return;
      }

      // Simulate AI generation (In reality, you'd call an API route here)
      const generatedText = "## The Future of AI in Content Creation\n\nArtificial Intelligence is no longer just a buzzword; it's a transformative force reshaping how we think about creativity and production. As we move into 2026, the integration of advanced LLMs into daily workflows has become the standard for high-performing teams.\n\n### Key Benefits of AI Integration\n\n1. **Unprecedented Scale**: Produce content across multiple channels simultaneously.\n2. **Data-Driven Insights**: Leverage SEO data directly within the writing process.\n3. **Dynamic Personalization**: Tailor your message to specific audience segments instantly.\n\nThis generated response is based on your keywords: " + keywords;
      const wordCount = generatedText.split(/\s+/).length;

      // 2. Save to history
      const { error: historyError } = await supabase
        .from('history')
        .insert({
          user_id: user.id,
          keywords,
          intent,
          tone,
          language,
          content_length: length,
          generated_content: generatedText,
          words_count: wordCount
        });

      if (historyError) throw historyError;

      // 3. Update usage
      const { error: usageError } = await supabase
        .from('usage')
        .update({ words_used: (usage?.words_used || 0) + wordCount })
        .eq('user_id', user.id);

      if (usageError) throw usageError;

      setOutput(generatedText);
    } catch (error: any) {
      console.error("Generation error:", error);
      alert(error.message || "An error occurred during generation");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 h-full">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-primary tracking-tight">AI Studio</h1>
          <p className="text-gray-400 font-bold mt-2 uppercase tracking-widest text-xs">Craft perfect content with precision</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Editor Controls */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          <div className="glass-card !p-8 flex flex-col gap-8">
            <div className="flex items-center gap-3 pb-6 border-b border-gray-100">
              <div className="w-12 h-12 premium-gradient rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                <Sparkles className="text-white" size={24} />
              </div>
              <h2 className="text-xl font-black text-primary tracking-tight">Studio Config</h2>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] block">Core Keywords</label>
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="e.g. AI, Content Marketing, SEO" 
                  className="w-full bg-surface-50 px-6 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all font-bold text-primary placeholder:text-gray-300"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] block flex items-center gap-2">
                  <Target size={14} className="text-primary" />
                  Intent
                </label>
                <select 
                  className="w-full bg-surface-50 px-4 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-primary/5 font-bold text-primary appearance-none cursor-pointer text-sm"
                  value={intent}
                  onChange={(e) => setIntent(e.target.value)}
                >
                  <option value="informational">Informational</option>
                  <option value="transactional">Transactional</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
              <div className="space-y-4">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] block flex items-center gap-2">
                  <MessageSquare size={14} className="text-primary" />
                  Tone
                </label>
                <select 
                  className="w-full bg-surface-50 px-4 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-primary/5 font-bold text-primary appearance-none cursor-pointer text-sm"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                >
                  <option value="professional">Professional</option>
                  <option value="casual">Casual</option>
                  <option value="authoritative">Authoritative</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] block flex items-center gap-2">
                  <Globe size={14} className="text-primary" />
                  Language
                </label>
                <select 
                  className="w-full bg-surface-50 px-4 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-primary/5 font-bold text-primary appearance-none cursor-pointer text-sm"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                </select>
              </div>
              <div className="space-y-4">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] block flex items-center gap-2">
                  <List size={14} className="text-primary" />
                  Length
                </label>
                <select 
                  className="w-full bg-surface-50 px-4 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-primary/5 font-bold text-primary appearance-none cursor-pointer text-sm"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                >
                  <option value="short">Short</option>
                  <option value="medium">Medium</option>
                  <option value="long">Long</option>
                </select>
              </div>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={isGenerating || !keywords}
              className={`w-full py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 transition-all shadow-2xl ${
                isGenerating || !keywords 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none" 
                : "premium-gradient text-white hover:scale-[1.02] active:scale-[0.98] shadow-primary/20"
              }`}
            >
              {isGenerating ? <RefreshCw className="animate-spin" size={20} /> : <Zap size={20} />}
              {isGenerating ? "Synthesizing..." : "Initialize Gen"}
            </button>
          </div>
        </div>

        {/* Output Display */}
        <div className="lg:col-span-8 flex flex-col min-h-[600px]">
          <div className="glass-card !p-0 flex-grow flex flex-col relative overflow-hidden group">
            <div className="flex items-center justify-between px-10 py-8 border-b border-gray-100 bg-white/50 backdrop-blur-md sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-lg font-black text-primary tracking-tight">Generated Output</h3>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => navigator.clipboard.writeText(output)}
                  disabled={!output}
                  className="p-3 bg-surface-50 text-gray-400 hover:text-primary hover:shadow-premium rounded-xl transition-all disabled:opacity-30"
                  title="Copy to clipboard"
                >
                  <Copy size={20} />
                </button>
                <button 
                  disabled={!output}
                  className="p-3 bg-surface-50 text-gray-400 hover:text-primary hover:shadow-premium rounded-xl transition-all disabled:opacity-30"
                  title="Export PDF"
                >
                  <Download size={20} />
                </button>
              </div>
            </div>
            
            <div className="flex-grow p-12 overflow-y-auto custom-scrollbar relative">
              <AnimatePresence mode="wait">
                {output ? (
                  <motion.div 
                    key="output"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="prose prose-slate max-w-none prose-headings:text-primary prose-headings:font-black prose-p:text-gray-500 prose-p:font-medium prose-p:leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: output.replace(/\n/g, '<br/>') }}
                  />
                ) : (
                  <motion.div 
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    className="h-full flex flex-col items-center justify-center text-center py-20"
                  >
                    <div className="w-24 h-24 bg-surface-50 rounded-[2.5rem] flex items-center justify-center mb-8 border border-gray-100 shadow-inner">
                      <Type className="w-10 h-10 text-gray-200" />
                    </div>
                    <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-xs">Waiting for configuration...</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Decorative Grid Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

