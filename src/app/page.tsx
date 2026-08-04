"use client";

import { useStore } from "@/store/useStore";
import { Header } from "@/components/Header";
import { StickyCart } from "@/components/StickyCart";
import { OpeningAnimation } from "@/components/steps/OpeningAnimation";
import { PlanSelection } from "@/components/steps/PlanSelection";
import { PackageBuilder } from "@/components/steps/PackageBuilder";
import { ReviewForm } from "@/components/steps/ReviewForm";
import { SuccessScreen } from "@/components/steps/SuccessScreen";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const { step } = useStore();

  return (
    <main className="flex-1 flex flex-col relative pt-24">
      <Header />
      
      <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col justify-center relative">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <OpeningAnimation />
            </motion.div>
          )}
          
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <PlanSelection />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <PackageBuilder />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <ReviewForm />
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <SuccessScreen />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <StickyCart />
    </main>
  );
}
