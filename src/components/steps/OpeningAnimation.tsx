"use client";

import { motion } from "framer-motion";
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
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-[100]">
      {/* Background Gradients */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] -z-10"
      />

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl md:text-8xl font-bold tracking-tighter text-white flex items-center"
        >
          GMM<motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-accent"
          >.</motion.span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-6 text-xl md:text-2xl text-foreground-muted tracking-widest uppercase font-medium"
        >
          Growth Package
        </motion.div>
        
        {/* Loading line */}
        <motion.div 
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 200, opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.5, ease: "easeInOut" }}
          className="mt-12 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent"
        />
      </div>
    </div>
  );
}
