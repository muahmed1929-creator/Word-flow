"use client";

import { Check, CreditCard, ExternalLink, History, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { plans as stripePlans } from "@/lib/constants";

export default function BillingPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [currentPlan, setCurrentPlan] = useState<string>("Free");
  const [usage, setUsage] = useState({ used: 0, limit: 1000 });
  const supabase = createClient();

  useEffect(() => {
    const fetchBillingData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('usage')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        if (data) {
          setCurrentPlan(data.plan || "Free");
          setUsage({ used: data.words_used, limit: data.words_limit });
        }
      }
    };
    fetchBillingData();
  }, []);

  const onUpgrade = async (planName: string) => {
    try {
      setLoading(planName);
      const priceId = planName === "Pro" ? stripePlans.pro.id : stripePlans.business.id;
      
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        body: JSON.stringify({ priceId, planName }),
        headers: { "Content-Type": "application/json" }
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Upgrade error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for trying out WordFlow",
      features: ["1,000 words limit", "Basic AI models", "Email support"],
      current: currentPlan === "Free",
    },
    {
      name: "Pro",
      price: "$10",
      period: "/month",
      description: "Best for individual creators",
      features: ["10,000 words limit", "Advanced AI models", "Priority support", "Custom tones"],
      current: currentPlan === "Pro",
    },
    {
      name: "Business",
      price: "$18",
      period: "/month",
      description: "Scale your content production",
      features: ["100,000 words limit", "All AI models", "24/7 Priority support", "API Access"],
      current: currentPlan === "Business",
    },
  ];

  const percentage = Math.round((usage.used / usage.limit) * 100);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-primary">Billing & Subscription</h1>
          <p className="text-gray-500 mt-2">Manage your plan and view your payment history.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20">
          Manage Billing
          <ExternalLink size={18} />
        </button>
      </div>

      {/* Current Plan Card */}
      <div className="card bg-primary text-white border-none relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <p className="text-primary-foreground/70 font-medium">Current Plan</p>
            <h2 className="text-3xl font-bold">{currentPlan} Plan</h2>
            <p className="text-primary-foreground/80">
              You have used {usage.used.toLocaleString()} out of {usage.limit.toLocaleString()} words this month.
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full md:w-auto">
            <div className="w-full md:w-64 h-3 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all duration-500" 
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <p className="text-right text-sm font-medium">{percentage}% used</p>
          </div>
        </div>
        {/* Decorative circle */}
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/5 rounded-full"></div>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {plans.map((plan) => (
          <div key={plan.name} className={`card flex flex-col h-full relative ${plan.current ? "ring-2 ring-primary ring-offset-4" : ""}`}>
            {plan.current && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Current Plan
              </span>
            )}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-primary mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-primary">{plan.price}</span>
                <span className="text-gray-500 font-medium">{plan.period}</span>
              </div>
              <p className="text-gray-500 mt-4 text-sm">{plan.description}</p>
            </div>

            <ul className="space-y-4 mb-10 flex-grow">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-gray-600">
                  <div className="p-0.5 bg-green-100 text-green-600 rounded-full mt-0.5">
                    <Check size={14} />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <button 
              onClick={() => onUpgrade(plan.name)}
              disabled={plan.current || loading !== null}
              className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                plan.current 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                : "bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white"
              }`}
            >
              {loading === plan.name && <Loader2 className="animate-spin" size={18} />}
              {plan.current ? "Already Subscribed" : `Upgrade to ${plan.name}`}
            </button>
          </div>
        ))}
      </div>

      {/* Payment History Table */}
      <div className="mt-12">
        <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
          <History size={22} />
          Payment History
        </h3>
        <div className="card overflow-hidden p-0">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-6 py-4 text-sm font-bold text-gray-600">Date</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600">Plan</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600">Amount</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600">Status</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-600">Apr 1, 2026</td>
                <td className="px-6 py-4 text-sm font-medium text-primary">Free Plan</td>
                <td className="px-6 py-4 text-sm text-gray-600">$0.00</td>
                <td className="px-6 py-4 text-sm">
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Paid
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <button className="text-primary hover:underline font-medium">Download</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="p-8 text-center bg-gray-50/50">
            <p className="text-gray-400 text-sm italic">End of transaction history</p>
          </div>
        </div>
      </div>
    </div>
  );
}
