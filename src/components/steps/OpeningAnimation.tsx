"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import { useEffect } from "react";

export function OpeningAnimation() {
  const nextStep = useStore((state) => state.nextStep);

  useEffect(() => {
    // Automatically move to the next step after the animation finishes
    const timer = setTimeout(() => {
      nextStep();
    }, 3500); // 3.5 seconds

    return () => clearTimeout(timer);
  }, [nextStep]);

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 flex flex-col items-center justify-center bg-background z-[100]"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated Background Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10"
        />

        <div className="relative z-10 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-8xl font-bold tracking-tighter text-foreground flex items-center gap-2"
          >
            GMM<motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-primary"
            >.</motion.span>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-6 text-foreground-muted text-sm md:text-base font-medium tracking-wide uppercase"
          >
            Building GMM Interactive Digital Brochure
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
