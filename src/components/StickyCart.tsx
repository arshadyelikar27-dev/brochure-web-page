"use client";

import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

export function StickyCart() {
  const { 
    step, 
    selectedPlan, 
    selectedServices, 
    getGrandTotal, 
    getTimeline,
    nextStep,
    prevStep
  } = useStore();
  
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Auto close mobile cart when step changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [step]);

  // Only show on Step 1 and Step 2
  if (step < 1 || step > 2) return null;

  const grandTotal = getGrandTotal();
  const timeline = getTimeline();

  return (
    <>
      {/* Desktop Sticky Cart (Floating Pill) */}
      <motion.div 
        initial={{ y: 100, opacity: 0, x: "-50%" }}
        animate={{ y: 0, opacity: 1, x: "-50%" }}
        className="fixed bottom-6 left-1/2 z-50 hidden md:block w-[95%] max-w-5xl"
      >
        <div className="bg-black/80 backdrop-blur-2xl border border-white/20 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.8)] px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div>
              <p className="text-[10px] text-foreground-muted uppercase tracking-wider mb-0.5">Selected Plan</p>
              <p className="font-bold text-white text-sm">{selectedPlan || "None"}</p>
            </div>
            <div className="h-6 w-px bg-white/20" />
            <div>
              <p className="text-[10px] text-foreground-muted uppercase tracking-wider mb-0.5">Services</p>
              <p className="font-bold text-white text-sm">{selectedServices.length} Added</p>
            </div>
            <div className="h-6 w-px bg-white/20" />
            <div>
              <p className="text-[10px] text-foreground-muted uppercase tracking-wider mb-0.5">Timeline</p>
              <p className="font-bold text-white text-sm">{timeline}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-[10px] text-accent uppercase tracking-wider mb-0.5">Total</p>
              <motion.p 
                key={grandTotal}
                initial={{ scale: 1.1, color: "#d9f99d" }}
                animate={{ scale: 1, color: "#ffffff" }}
                className="font-bold text-lg leading-none"
              >
                ₹{grandTotal.toLocaleString()}
              </motion.p>
            </div>
            
            <div className="flex items-center gap-3">
              {step > 1 && (
                <button 
                  onClick={prevStep}
                  className="px-5 py-2.5 bg-white/10 text-white text-sm rounded-full font-semibold flex items-center gap-2 transition-all hover:bg-white/20"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              )}
              <button 
                onClick={nextStep}
                disabled={!selectedPlan}
                className="px-6 py-2.5 bg-primary text-white text-sm rounded-full font-semibold flex items-center gap-2 transition-all hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {step === 1 ? "Customize" : "Review"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Sticky Cart Trigger (Floating) */}
      <motion.div 
        initial={{ y: 100, x: "-50%" }}
        animate={{ y: 0, x: "-50%" }}
        className="fixed bottom-4 left-1/2 w-[95%] z-50 md:hidden"
      >
        <div className="bg-black/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-4 flex items-center justify-between">
          <div className="flex flex-col items-start">
            <span className="text-[10px] text-foreground-muted uppercase">Total</span>
            <span className="font-bold text-base">₹{grandTotal.toLocaleString()}</span>
          </div>

          <div className="flex items-center gap-2">
             {step > 1 && (
                <button 
                  onClick={prevStep}
                  className="p-2 bg-white/10 text-white rounded-xl font-semibold flex items-center justify-center transition-all hover:bg-white/20"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
            <button 
              onClick={nextStep}
              disabled={!selectedPlan}
              className="px-5 py-2 bg-primary text-white text-sm rounded-xl font-semibold flex items-center gap-2 disabled:opacity-50"
            >
              {step === 1 ? "Next" : "Review"}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
