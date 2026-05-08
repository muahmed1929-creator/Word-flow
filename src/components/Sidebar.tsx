"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PenTool, CreditCard, History, LogOut, Sparkles, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [usage, setUsage] = useState({ used: 0, limit: 1000 });

  useEffect(() => {
    const fetchUsage = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('usage')
          .select('words_used, words_limit')
          .eq('user_id', user.id)
          .single();
        
        if (data) {
          setUsage({ used: data.words_used, limit: data.words_limit });
        }
      }
    };

    fetchUsage();
    
    // Optional: Set up real-time subscription for usage updates
    const channel = supabase
      .channel('usage_updates')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'usage' }, (payload) => {
        setUsage({ used: payload.new.words_used, limit: payload.new.words_limit });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const percentage = Math.round((usage.used / usage.limit) * 100);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/dashboard" },
    { name: "Editor", icon: <PenTool size={20} />, path: "/editor" },
    { name: "Billing", icon: <CreditCard size={20} />, path: "/billing" },
    { name: "History", icon: <History size={20} />, path: "/history" },
  ];

  return (
    <div className="w-72 h-screen bg-white/80 backdrop-blur-xl border-r border-gray-100 fixed left-0 top-0 flex flex-col z-50">
      <div className="p-10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 premium-gradient rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
            <Sparkles className="text-white" size={20} />
          </div>
          <span className="text-2xl font-black text-primary tracking-tighter">WordFlow</span>
        </Link>
      </div>

      <nav className="flex-grow px-6 mt-4">
        <ul className="space-y-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`group flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 font-bold text-sm ${
                    isActive
                      ? "bg-primary text-white shadow-2xl shadow-primary/20"
                      : "text-gray-400 hover:bg-gray-50 hover:text-primary"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`${isActive ? "text-white" : "text-gray-400 group-hover:text-primary"} transition-colors`}>
                      {item.icon}
                    </span>
                    {item.name}
                  </div>
                  {isActive && (
                    <motion.div layoutId="active-pill">
                      <ChevronRight size={16} />
                    </motion.div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Usage Indicator */}
      <div className="px-6 mb-6">
        <div className="bg-surface-50 rounded-3xl p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Usage</span>
            <span className="text-xs font-black text-primary">{percentage}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full premium-gradient rounded-full transition-all duration-500" 
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-[10px] text-gray-400 mt-3 font-bold uppercase tracking-wider">
            {usage.used.toLocaleString()} / {usage.limit.toLocaleString()} WORDS
          </p>
        </div>
      </div>

      <div className="p-6 border-t border-gray-50">
        <button 
          onClick={handleSignOut}
          className="flex items-center gap-4 px-5 py-4 text-gray-400 hover:text-red-500 font-bold text-sm transition-all duration-300 w-full hover:bg-red-50 rounded-2xl"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
