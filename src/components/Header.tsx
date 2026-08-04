"use client";

import { useStore } from "@/store/useStore";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export function Header() {
  const { step, prevStep, reset } = useStore();

  const getProgress = () => {
    switch (step) {
      case 0: return 0;
      case 1: return 33;
      case 2: return 66;
      case 3: return 90;
      case 4: return 100;
      default: return 0;
    }
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 p-3 md:p-4 border-b border-white/5 bg-black/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          {step > 1 && (
            <button 
              onClick={prevStep}
              className="p-1.5 md:p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white"
            >
              <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
            </button>
          )}
          
          <motion.div 
            onClick={reset}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-lg md:text-xl font-bold tracking-tighter cursor-pointer pl-1 md:pl-0"
          >
            GMM<span className="text-accent">.</span>
          </motion.div>
        </div>

        {step > 0 && step < 4 && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div className="hidden md:flex items-center gap-2 text-xs text-foreground-muted font-medium">
              <span className={step >= 1 ? "text-white" : ""}>01 Plan</span>
              <span className="w-3 h-px bg-white/20"></span>
              <span className={step >= 2 ? "text-white" : ""}>02 Customize</span>
              <span className="w-3 h-px bg-white/20"></span>
              <span className={step >= 3 ? "text-white" : ""}>03 Review</span>
            </div>
            
            {/* Progress Ring / Bar */}
            <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-accent"
                initial={{ width: 0 }}
                animate={{ width: `${getProgress()}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}
