"use client";

import { motion } from "framer-motion";
import { useStore, PlanType, basePlanPrices } from "@/store/useStore";
import { Check, Star } from "lucide-react";

const plans = [
  {
    id: "GOOD" as PlanType,
    name: "Starter",
    label: "GOOD",
    price: basePlanPrices.GOOD,
    description: "Perfect for small businesses starting their digital journey.",
    features: [
      "Basic Website Setup",
      "Essential SEO",
      "Social Media Setup",
      "Monthly Report",
    ],
  },
  {
    id: "BETTER" as PlanType,
    name: "Growth",
    label: "BETTER",
    isPopular: true,
    price: basePlanPrices.BETTER,
    description: "Comprehensive package for growing businesses seeking visibility.",
    features: [
      "Custom Website Design",
      "Advanced SEO & AEO",
      "Social Media Management",
      "Performance Marketing",
      "Weekly Reports & Strategy",
    ],
  },
  {
    id: "BEST" as PlanType,
    name: "Scale",
    label: "BEST",
    price: basePlanPrices.BEST,
    description: "All-in-one dominant digital presence for industry leaders.",
    features: [
      "Premium Web App",
      "Enterprise SEO & GEO",
      "Full Creative Suite (CGI/Anim)",
      "Aggressive Ad Campaigns",
      "Dedicated Account Manager",
    ],
  },
];

export function PlanSelection() {
  const { selectedPlan, setSelectedPlan, nextStep } = useStore();

  const handleSelect = (id: PlanType) => {
    setSelectedPlan(id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] w-full px-3 md:px-4 pt-16 md:py-8 pb-28 md:pb-32">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 md:mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3">Choose Your <span className="text-gradient">Plan</span></h2>
        <p className="text-foreground-muted text-xs md:text-sm max-w-[280px] md:max-w-xl mx-auto leading-relaxed">
          Select a base plan to start building your custom package.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5 max-w-5xl w-full">
        {plans.map((plan, index) => {
          const isSelected = selectedPlan === plan.id;
          const isOtherSelected = selectedPlan && selectedPlan !== plan.id;

          return (
            <motion.div
              key={plan.id}
              onClick={() => handleSelect(plan.id)}
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: isOtherSelected ? 0.6 : 1, 
                y: 0,
                scale: isSelected ? 1.05 : 1,
              }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: isSelected ? 1.05 : 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className={`relative cursor-pointer flex flex-col p-4 md:p-6 rounded-2xl md:rounded-3xl border transition-all duration-300 ${
                isSelected 
                  ? "border-primary bg-primary/10 shadow-[0_0_30px_rgba(139,92,246,0.3)]" 
                  : "border-white/10 glass hover:border-primary/50"
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-black px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[8px] md:text-[10px] font-bold flex items-center gap-1 shadow-[0_0_15px_rgba(217,249,157,0.5)]">
                  <Star className="w-2 h-2 md:w-3 md:h-3 fill-black" /> MOST POPULAR
                </div>
              )}

              <div className="flex justify-between items-start mb-2 md:mb-6 pointer-events-none">
                <div>
                  <div className="text-[9px] md:text-xs font-semibold tracking-widest text-foreground-muted mb-0.5 md:mb-1 uppercase">
                    {plan.label}
                  </div>
                  <h3 className="text-lg md:text-2xl font-bold">{plan.name}</h3>
                </div>
                <div className="text-right">
                  <span className="text-lg md:text-3xl font-bold block md:inline leading-none">₹{plan.price.toLocaleString()}</span>
                  <span className="text-[10px] md:text-sm text-foreground-muted block md:inline md:ml-1 mt-0.5">/mo</span>
                </div>
              </div>

              <p className="text-[11px] md:text-sm text-foreground-muted mb-3 md:mb-6 pointer-events-none line-clamp-2 md:line-clamp-none">
                {plan.description}
              </p>

              <div className="flex-grow pointer-events-none">
                <ul className="grid grid-cols-2 md:grid-cols-1 gap-y-1.5 gap-x-2 md:space-y-3 mb-4 md:mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-1.5 md:gap-2">
                      <div className="mt-0.5 md:mt-0.5 bg-primary/20 p-0.5 md:p-1 rounded-full flex-shrink-0">
                        <Check className="w-2 h-2 md:w-3 md:h-3 text-primary" />
                      </div>
                      <span className="text-[10px] md:text-sm text-foreground/90 leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className={`w-full py-2 text-xs md:py-3 md:text-sm rounded-lg md:rounded-xl font-semibold transition-all text-center mt-auto ${
                  isSelected 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "bg-white/5 group-hover:bg-white/10 text-white border border-white/10"
                }`}
              >
                {isSelected ? "Selected" : "Select Plan"}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
