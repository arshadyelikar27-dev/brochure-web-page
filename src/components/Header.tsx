"use client";

import { useStore } from "@/store/useStore";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export function Header() {
  const { step, prevStep, reset } = useStore();

  const getProgress = () => {
    switch (step) {
      case 1: return 0;
      case 2: return 50;
      case 3: return 90;
      case 4: return 100;
      default: return 0;
    }
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 p-3 md:p-4 border-b border-black/5 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          {step > 1 && (
            <button 
              onClick={prevStep}
              className="p-1.5 md:p-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors text-foreground"
            >
              <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
            </button>
          )}
          
          <motion.div 
            onClick={reset}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="cursor-pointer pl-1 md:pl-0 flex items-center relative"
          >
            {/* Invisible placeholder to keep the flex layout stable */}
            <div className="w-10 h-10 md:w-12 md:h-12"></div>
            {/* Absolutely positioned logo to grow without expanding navbar */}
            <img src="/Logo.png" alt="GMM Logo" className="absolute -top-4 md:-top-6 left-0 md:left-2 h-20 md:h-28 w-auto object-contain drop-shadow-md" />
          </motion.div>
        </div>

        {step > 0 && step < 4 && (
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:flex items-center gap-2 text-xs font-medium text-foreground-muted">
              <span className={step >= 1 ? "text-primary" : ""}>01 Plan</span>
              <span className="text-black/10">-</span>
              <span className={step >= 2 ? "text-primary" : ""}>02 Customize</span>
              <span className="text-black/10">-</span>
              <span className={step >= 3 ? "text-primary" : ""}>03 Review</span>
            </div>
            
            <div className="w-16 md:w-24 h-1.5 bg-black/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${getProgress()}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
