"use client";

import { useState, useRef } from "react";
import { useStore, PlanType, BillingCycle } from "@/store/useStore";
import { Check, Settings2, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sparkles as SparklesComp } from "@/components/ui/sparkles";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { ShineBorder } from "@/components/ui/shine-border";

type StandardPlanType = Exclude<PlanType, null | 'CUSTOM'>;

interface Plan {
  id: StandardPlanType;
  name: string;
  label: string;
  description: string;
  price: number;
  yearlyPrice: number;
  features: string[];
  isPopular?: boolean;
}

const plans: Plan[] = [
  {
    id: "GOOD",
    name: "Starter",
    label: "GOOD",
    description: "Perfect for small businesses starting their digital journey.",
    price: 21000,
    yearlyPrice: 252000,
    features: [
      "Basic Website Setup",
      "Essential SEO",
      "Social Media Setup",
      "Monthly Report",
    ],
  },
  {
    id: "BETTER",
    name: "Growth",
    label: "BETTER",
    isPopular: true,
    description: "Comprehensive package for growing businesses seeking visibility.",
    price: 31000,
    yearlyPrice: 372000,
    features: [
      "Custom Website Design",
      "Advanced SEO",
      "Social Media Management",
      "Performance Marketing",
      "Weekly Reports & Strategy",
    ],
  },
  {
    id: "BEST",
    name: "Scale",
    label: "BEST",
    description: "All-in-one dominant digital presence for industry leaders.",
    price: 41000,
    yearlyPrice: 492000,
    features: [
      "Premium Web App",
      "Enterprise SEO",
      "Full Creative Suite (Ai/Anim)",
      "Aggressive Ad Campaigns",
      "Dedicated Account Manager",
    ],
  },
];

const PricingSwitch = ({ isYearly, setIsYearly }: { isYearly: boolean, setIsYearly: (v: boolean) => void }) => {
  return (
    <div className="flex justify-center">
      <div className="relative z-10 mx-auto flex w-fit rounded-full bg-black/5 border border-black/10 p-1">
        <button
          onClick={() => setIsYearly(false)}
          className={cn(
            "relative z-10 w-fit h-10 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors text-sm md:text-base",
            !isYearly ? "text-white" : "text-foreground-muted",
          )}
        >
          {!isYearly && (
            <motion.span
              layoutId="switch"
              className="absolute top-0 left-0 h-full w-full rounded-full bg-primary shadow-sm"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative">Monthly</span>
        </button>

        <button
          onClick={() => setIsYearly(true)}
          className={cn(
            "relative z-10 w-fit h-10 flex-shrink-0 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors text-sm md:text-base",
            isYearly ? "text-white" : "text-foreground-muted",
          )}
        >
          {isYearly && (
            <motion.span
              layoutId="switch"
              className="absolute top-0 left-0 h-full w-full rounded-full bg-primary shadow-sm"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative flex items-center gap-2">Yearly</span>
        </button>
      </div>
    </div>
  );
};

export function PlanSelection() {
  const { selectedPlan, setSelectedPlan, setStep, setBillingCycle } = useStore();
  const [isYearly, setIsYearly] = useState(false);
  const pricingRef = useRef<HTMLDivElement>(null);

  const handleSelectStandardPlan = (id: PlanType) => {
    setSelectedPlan(id);
    setBillingCycle(isYearly ? 'YEARLY' : 'MONTHLY');
    setStep(3);
  };

  const handleSelectCustomPlan = () => {
    setSelectedPlan("CUSTOM");
    setStep(2);
  };

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { delay: i * 0.15, duration: 0.5 },
    }),
    hidden: { filter: "blur(10px)", y: -20, opacity: 0 },
  };

  return (
    <div
      className="flex flex-col items-center justify-start w-full px-3 md:px-4 pt-2 md:pt-4 pb-16 md:pb-20 relative overflow-x-hidden min-h-[80vh]"
      ref={pricingRef}
    >
      {/* Background Sparkles & Glows adapted to light/clean theme */}
      <TimelineContent
        animationNum={4}
        timelineRef={pricingRef}
        customVariants={revealVariants}
        className="absolute top-0 h-96 w-[150vw] left-1/2 -translate-x-1/2 overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] pointer-events-none"
      >
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:70px_80px]"></div>
        <SparklesComp
          density={800}
          direction="bottom"
          speed={1}
          color="#6312E5"
          className="absolute inset-x-0 bottom-0 h-full w-full opacity-30 [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
        />
      </TimelineContent>

      <article className="text-center mb-6 md:mb-8 pt-0 md:pt-2 max-w-3xl mx-auto space-y-4 relative z-10 w-full">
        <h2 className="text-3xl md:text-5xl font-bold text-foreground">
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.1}
            staggerFrom="first"
            reverse={true}
            containerClassName="justify-center"
            transition={{ type: "spring", stiffness: 250, damping: 40, delay: 0 }}
          >
            Choose Your Plan
          </VerticalCutReveal>
        </h2>

        <TimelineContent
          as="p"
          animationNum={0}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="text-foreground-muted text-sm md:text-base max-w-xl mx-auto"
        >
          Select a base plan or build a custom package for your specific needs.
        </TimelineContent>

        <TimelineContent
          as="div"
          animationNum={1}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="pt-2"
        >
          <PricingSwitch isYearly={isYearly} setIsYearly={setIsYearly} />
        </TimelineContent>
      </article>

      <div className="grid grid-cols-3 gap-1.5 md:gap-5 max-w-5xl w-full mb-8 relative z-10">
        {plans.map((plan, index) => {
          const isSelected = selectedPlan === plan.id;

          return (
            <TimelineContent
              key={plan.id}
              as="div"
              animationNum={2 + index}
              timelineRef={pricingRef}
              customVariants={revealVariants}
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectStandardPlan(plan.id)}
                className="cursor-pointer h-full relative mt-3 md:mt-4"
              >
                {plan.isPopular && (
                  <div className="absolute -top-2 md:-top-3 left-1/2 -translate-x-1/2 z-20 bg-accent text-black px-1.5 md:px-3 py-0.5 md:py-1 rounded-full text-[6px] md:text-[10px] font-bold flex items-center gap-0.5 md:gap-1 shadow-lg shadow-accent/20 whitespace-nowrap">
                    <Star className="w-1.5 h-1.5 md:w-3 md:h-3 fill-black" /> MOST POPULAR
                  </div>
                )}
                <ShineBorder
                  className={cn(
                    "relative flex flex-col h-full w-full !rounded-2xl md:!rounded-3xl transition-all duration-300 overflow-hidden bg-primary/5",
                    plan.isPopular || isSelected
                      ? "shadow-xl shadow-primary/10"
                      : "shadow-sm hover:shadow-md"
                  )}
                  color={["#E1F840", "#6312E5"]}
                  borderRadius={24}
                  borderWidth={2}
                >
                  <Card className="bg-transparent border-none shadow-none h-full flex flex-col p-1 md:p-3">
                    <CardHeader className="text-left pb-1 md:pb-2 pt-1 md:pt-2 px-1 md:px-3">
                      <div className="text-[7px] md:text-[10px] font-semibold tracking-widest text-foreground-muted mb-0.5 md:mb-1 uppercase">
                        {plan.label}
                      </div>
                      <h3 className="text-sm md:text-2xl font-bold text-foreground mb-0.5 md:mb-1">{plan.name}</h3>
                      
                      <div className="flex items-baseline mb-1 md:mb-2">
                        <span className="text-sm md:text-4xl font-bold text-foreground flex items-center">
                          ₹<NumberFlow
                            value={isYearly ? plan.yearlyPrice : plan.price}
                            format={{ useGrouping: true }}
                            className="text-sm md:text-4xl font-bold ml-0.5 md:ml-1"
                          />
                        </span>
                        <span className="text-[8px] md:text-sm text-foreground-muted ml-0.5 md:ml-1">
                          /{isYearly ? "yr" : "mo"}
                        </span>
                      </div>
                      
                      <p className="text-[7px] leading-tight md:text-sm text-foreground-muted line-clamp-3 md:line-clamp-2 min-h-[26px] md:min-h-[40px]">
                        {plan.description}
                      </p>
                    </CardHeader>

                    <CardContent className="flex-grow pt-1 md:pt-2 px-1 md:px-3 pb-1.5 md:pb-3 flex flex-col">
                      <div className="space-y-1.5 md:space-y-3 pt-2 md:pt-4 border-t border-black/5 flex-grow">
                        <ul className="space-y-1 md:space-y-2.5">
                          {plan.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start gap-1 md:gap-2">
                              <div className="mt-0.5 bg-accent p-[1px] md:p-1 rounded-full flex-shrink-0 shadow-sm shadow-accent/50">
                                <Check className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 text-black stroke-[3]" />
                              </div>
                              <span className="text-[6.5px] leading-tight md:text-sm text-foreground/90">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div
                        className={cn(
                          "w-full py-1.5 md:py-3 mt-3 md:mt-6 text-[8px] md:text-sm rounded md:rounded-xl font-bold transition-all text-center",
                          isSelected
                            ? "bg-primary text-white shadow-lg shadow-primary/20"
                            : "bg-black/5 group-hover:bg-black/10 text-foreground"
                        )}
                      >
                        {isSelected ? "Selected" : "Select Plan"}
                      </div>
                    </CardContent>
                  </Card>
                </ShineBorder>
              </motion.div>
            </TimelineContent>
          );
        })}
      </div>

      <TimelineContent
        as="div"
        animationNum={5}
        timelineRef={pricingRef}
        customVariants={revealVariants}
        className="max-w-3xl w-full mx-auto relative z-10"
      >
        <motion.div
          onClick={handleSelectCustomPlan}
          whileTap={{ scale: 0.98 }}
          className="w-full cursor-pointer"
        >
          <ShineBorder
            className={cn(
              "w-full p-1 !rounded-2xl md:!rounded-3xl transition-all duration-300 bg-primary/5",
              selectedPlan === "CUSTOM"
                ? "shadow-xl shadow-primary/10"
                : "hover:shadow-md"
            )}
            color={["#E1F840", "#6312E5"]}
            borderRadius={24}
            borderWidth={2}
          >
            <Card className="bg-transparent border-none shadow-none flex flex-col sm:flex-row items-center justify-between p-3 md:p-4 gap-3 sm:gap-0">
              <div className="flex items-center gap-2 md:gap-4 text-left w-full sm:w-auto">
                <div className={cn(
                  "p-2 md:p-3 rounded-lg md:rounded-xl flex-shrink-0", 
                  selectedPlan === "CUSTOM" ? "bg-primary text-white" : "bg-primary/10 text-primary"
                )}>
                  <Settings2 className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-foreground mb-0.5">Customizable Plan</h3>
                  <p className="text-[11px] md:text-sm text-foreground-muted">Build a custom package tailored specifically to your goals.</p>
                </div>
              </div>
              <motion.div 
                animate={selectedPlan !== "CUSTOM" ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className={cn(
                  "text-xs md:text-sm font-bold px-4 md:px-6 py-2.5 md:py-3 rounded-lg md:rounded-xl text-black whitespace-nowrap w-full sm:w-auto text-center mt-2 sm:mt-0",
                  selectedPlan === "CUSTOM" ? "bg-accent shadow-inner" : "bg-accent shadow-md shadow-accent/20"
                )}
              >
                Customize Now
              </motion.div>
            </Card>
          </ShineBorder>
        </motion.div>
      </TimelineContent>
    </div>
  );
}
