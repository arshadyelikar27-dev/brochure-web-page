"use client";

import { motion } from "framer-motion";
import { useStore, PlanType } from "@/store/useStore";
import { Check, Star, Settings2 } from "lucide-react";

const plans = [
  {
    id: "GOOD" as PlanType,
    name: "Starter",
    label: "GOOD",
    description: "Perfect for small businesses starting their digital journey.",
    monthlyPrice: "21,000",
    yearlyPrice: "252,000",
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
    description: "Comprehensive package for growing businesses seeking visibility.",
    monthlyPrice: "31,000",
    yearlyPrice: "372,000",
    features: [
      "Custom Website Design",
      "Advanced SEO",
      "Social Media Management",
      "Performance Marketing",
      "Weekly Reports & Strategy",
    ],
  },
  {
    id: "BEST" as PlanType,
    name: "Scale",
    label: "BEST",
    description: "All-in-one dominant digital presence for industry leaders.",
    monthlyPrice: "41,000",
    yearlyPrice: "492,000",
    features: [
      "Premium Web App",
      "Enterprise SEO",
      "Full Creative Suite (Ai/Anim)",
      "Aggressive Ad Campaigns",
      "Dedicated Account Manager",
    ],
  },
];

export function PlanSelection() {
  const { selectedPlan, setSelectedPlan, setStep, billingCycle, setBillingCycle } = useStore();

  const handleSelectStandardPlan = (id: PlanType) => {
    setSelectedPlan(id);
    setStep(3); // Skip straight to Review
  };

  const handleSelectCustomPlan = () => {
    setSelectedPlan("CUSTOM");
    setStep(2); // Go to Package Builder for add-ons
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] w-full px-3 md:px-4 pt-16 md:py-8 pb-28 md:pb-32">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 md:mb-8 w-full max-w-5xl flex flex-col items-center"
      >
        <div className="w-full flex justify-end mb-4">
           {/* Billing Toggle in Top Right */}
           <div className="flex items-center bg-black/5 p-1 rounded-full relative z-10 shadow-sm border border-black/5">
             <button
               onClick={() => setBillingCycle('MONTHLY')}
               className={`px-4 py-1.5 md:px-5 md:py-2 rounded-full text-xs md:text-sm font-bold transition-all relative z-10 ${
                 billingCycle === 'MONTHLY' ? 'text-white' : 'text-foreground-muted hover:text-foreground'
               }`}
             >
               Monthly
             </button>
             <button
               onClick={() => setBillingCycle('YEARLY')}
               className={`px-4 py-1.5 md:px-5 md:py-2 rounded-full text-xs md:text-sm font-bold transition-all relative z-10 ${
                 billingCycle === 'YEARLY' ? 'text-white' : 'text-foreground-muted hover:text-foreground'
               }`}
             >
               Yearly
             </button>
             
             <motion.div 
               className="absolute top-1 bottom-1 w-[50%] bg-primary rounded-full z-0 shadow-sm"
               animate={{ 
                 x: billingCycle === 'MONTHLY' ? '2%' : '98%' 
               }}
               transition={{ type: "spring", stiffness: 300, damping: 25 }}
             />
           </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3 mt-4 md:mt-0">Choose Your <span className="text-gradient">Plan</span></h2>
        <p className="text-foreground-muted text-xs md:text-sm max-w-[280px] md:max-w-xl mx-auto leading-relaxed">
          Select a base plan or build a custom package for your specific needs.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5 max-w-5xl w-full mb-6">
        {plans.map((plan, index) => {
          const isSelected = selectedPlan === plan.id;
          const isOtherSelected = selectedPlan && selectedPlan !== plan.id;
          const price = billingCycle === 'MONTHLY' ? plan.monthlyPrice : plan.yearlyPrice;
          const duration = billingCycle === 'MONTHLY' ? '/mo' : '/yr';

          return (
            <motion.div
              key={plan.id}
              onClick={() => handleSelectStandardPlan(plan.id)}
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
                  ? "border-primary bg-primary/5 shadow-xl shadow-primary/10" 
                  : "border-black/5 bg-slate-50 shadow-sm hover:shadow-md hover:border-primary/30"
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-black px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[8px] md:text-[10px] font-bold flex items-center gap-1 shadow-lg shadow-accent/20">
                  <Star className="w-2 h-2 md:w-3 md:h-3 fill-black" /> MOST POPULAR
                </div>
              )}

              <div className="mb-2 md:mb-4 pointer-events-none">
                <div className="text-[9px] md:text-xs font-semibold tracking-widest text-foreground-muted mb-0.5 md:mb-1 uppercase">
                  {plan.label}
                </div>
                <h3 className="text-lg md:text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <div className="flex items-end gap-1">
                  <span className="text-2xl md:text-3xl font-bold text-foreground">₹{price}</span>
                  <span className="text-xs md:text-sm text-foreground-muted font-medium mb-1">{duration}</span>
                </div>
              </div>

              <p className="text-[11px] md:text-sm text-foreground-muted mb-3 md:mb-6 pointer-events-none line-clamp-2 md:line-clamp-none">
                {plan.description}
              </p>

              <div className="flex-grow pointer-events-none">
                <ul className="grid grid-cols-2 md:grid-cols-1 gap-y-1.5 gap-x-2 md:space-y-3 mb-4 md:mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-1.5 md:gap-2">
                      <div className="mt-0.5 md:mt-0.5 bg-primary/10 p-0.5 md:p-1 rounded-full flex-shrink-0">
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
                    : "bg-black/5 group-hover:bg-black/10 text-foreground border border-black/5"
                }`}
              >
                {isSelected ? "Selected" : "Select Plan"}
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="max-w-5xl w-full"
      >
        <button
          onClick={handleSelectCustomPlan}
          className={`w-full flex items-center justify-between p-4 md:p-6 rounded-2xl md:rounded-3xl border transition-all duration-300 ${
            selectedPlan === "CUSTOM"
              ? "border-primary bg-primary/5 shadow-xl shadow-primary/10"
              : "border-black/10 bg-white shadow-sm hover:shadow-md hover:border-primary/50"
          }`}
        >
          <div className="flex items-center gap-3 md:gap-4 text-left">
            <div className={`p-3 md:p-4 rounded-xl ${selectedPlan === "CUSTOM" ? "bg-primary text-white" : "bg-black/5 text-foreground"}`}>
              <Settings2 className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <h3 className="text-sm md:text-lg font-bold text-foreground mb-0.5">Customizable Plan</h3>
              <p className="text-xs md:text-sm text-foreground-muted">Build a custom package tailored specifically to your goals.</p>
            </div>
          </div>
          <div className={`text-xs md:text-sm font-bold px-4 py-2 rounded-lg ${selectedPlan === "CUSTOM" ? "bg-primary text-white" : "bg-black/5 text-foreground"}`}>
            Customize Now
          </div>
        </button>
      </motion.div>
    </div>
  );
}
