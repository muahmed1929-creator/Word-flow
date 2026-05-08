import { TrendingUp, FileText, Clock, BarChart3, ArrowRight, Zap } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: { user } } = await supabase.auth.getUser();
  
  const { data: usage } = await supabase
    .from('usage')
    .select('*')
    .eq('user_id', user?.id)
    .single();

  const { data: history } = await supabase
    .from('history')
    .select('*')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })
    .limit(3);

  const stats = [
    { 
      name: "Monthly Usage", 
      value: usage?.words_used?.toLocaleString() || "0", 
      unit: "words", 
      icon: <FileText className="text-blue-500" />, 
      color: "bg-blue-50" 
    },
    { 
      name: "Monthly Remaining", 
      value: ((usage?.words_limit || 1000) - (usage?.words_used || 0)).toLocaleString(), 
      unit: "words", 
      icon: <TrendingUp className="text-emerald-500" />, 
      color: "bg-emerald-50" 
    },
    { 
      name: "Monthly Limit", 
      value: usage?.words_limit?.toLocaleString() || "1,000", 
      unit: "words", 
      icon: <BarChart3 className="text-indigo-500" />, 
      color: "bg-indigo-50" 
    },
  ];

  // Calculate days until reset (simplified)
  const daysUntilReset = 30 - Math.floor((new Date().getTime() - new Date(usage?.last_reset_date || new Date()).getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black text-primary tracking-tight">Analytics Overview</h1>
          <p className="text-gray-400 font-bold mt-2 uppercase tracking-widest text-xs">Monitor your AI content performance</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl px-6 py-3 text-sm font-bold text-gray-400 flex items-center gap-3 shadow-premium">
          <Clock size={18} className="text-primary" />
          <span className="text-primary">Resets in {daysUntilReset > 0 ? daysUntilReset : 0} days</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat) => (
          <div key={stat.name} className="glass-card !p-8 group hover:-translate-y-1 transition-all">
            <div className="flex items-center justify-between mb-6">
              <div className={`p-4 ${stat.color} rounded-2xl group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Live Data</span>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{stat.name}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-primary tracking-tighter">{stat.value}</span>
                <span className="text-sm text-gray-400 font-bold uppercase tracking-widest">{stat.unit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Usage Chart Placeholder */}
        <div className="lg:col-span-2 glass-card !p-10 flex flex-col min-h-[450px]">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-black text-primary tracking-tight">Usage Performance</h3>
            <select className="bg-surface-50 border-none text-xs font-black text-primary rounded-xl px-4 py-2 outline-none cursor-pointer uppercase tracking-widest">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="flex-grow bg-surface-50 rounded-[2rem] flex items-center justify-center border border-gray-100 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="text-center relative z-10">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-premium mx-auto mb-6">
                <BarChart3 className="w-8 h-8 text-primary/20" />
              </div>
              <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Visualization Engine Initializing</p>
            </div>
          </div>
        </div>

        {/* Quick Actions / Recent */}
        <div className="lg:col-span-1 space-y-8">
          <div className="premium-gradient rounded-[2.5rem] p-8 text-white shadow-2xl shadow-primary/20 relative overflow-hidden group">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10">
              <Zap className="mb-6 text-amber-300" size={32} />
              <h3 className="text-2xl font-black tracking-tight mb-2">Pro Power</h3>
              <p className="text-white/70 text-sm font-bold mb-8">Unlock 100k words and advanced AI models.</p>
              <Link href="/billing" className="block w-full">
                <button className="bg-white text-primary w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:scale-105 transition-all">
                  Upgrade Now
                </button>
              </Link>
            </div>
          </div>

          <div className="glass-card !p-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-black text-primary tracking-tight">Quick History</h3>
              <Link href="/history" className="text-[10px] font-black text-accent uppercase tracking-widest hover:underline">View All</Link>
            </div>
            <div className="space-y-6">
              {history && history.length > 0 ? history.map((item) => (
                <div key={item.id} className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 bg-surface-50 rounded-2xl flex items-center justify-center border border-gray-100 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <FileText size={20} className="text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-grow">
                    <p className="font-bold text-primary text-sm line-clamp-1">{item.keywords || 'Untitled'}</p>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                      {new Date(item.created_at).toLocaleDateString()} • {item.words_count}w
                    </p>
                  </div>
                  <ArrowRight size={16} className="text-gray-200 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              )) : (
                <p className="text-xs text-gray-400 font-bold text-center py-4">No history yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
