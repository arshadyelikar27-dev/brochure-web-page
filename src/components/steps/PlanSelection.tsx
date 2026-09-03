"use client";

import { useState, useRef, useEffect } from "react";
import { useStore, PlanType, BillingCycle } from "@/store/useStore";
import { Check, Star, X, ChevronRight, Megaphone, Search, MessageCircle, BarChart3, Globe, Eye, Settings2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sparkles as SparklesComp } from "@/components/ui/sparkles";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { ShineBorder } from "@/components/ui/shine-border";

type StandardPlanType = Exclude<PlanType, null | 'CUSTOM'>;

interface ServiceItem {
  name: string;
  icon: string;
  subServices: string[];
}

interface Plan {
  id: StandardPlanType;
  name: string;
  label: string;
  description: string;
  price: number;
  yearlyPrice: number;
  services: ServiceItem[];
  isPopular?: boolean;
}

const plans: Plan[] = [
  {
    id: "GOOD",
    name: "Starter",
    label: "GOOD",
    description: "Perfect for small businesses starting their digital journey.",
    price: 31000,
    yearlyPrice: 250000,
    services: [
      {
        name: "Content & Social Media",
        icon: "Megaphone",
        subServices: [
          "3 Professional Camera Reels / Month",
          "3 Content-Based Reels / Month",
          "10\u201312 Creative Posts / Month",
          "Instagram & Facebook Management",
          "Monthly Content Planning",
        ],
      },
      {
        name: "Paid Advertising",
        icon: "Megaphone",
        subServices: [
          "Meta Ads \u2013 Setup & Management",
          "Lead Generation Campaigns",
          "Ad Budget provided separately by client",
        ],
      },
      {
        name: "Reporting",
        icon: "BarChart3",
        subServices: [
          "Monthly Performance Report",
          "Basic Marketing Strategy & Optimization",
        ],
      },
      {
        name: "Reach & Visibility",
        icon: "Eye",
        subServices: [
          "Guaranteed Monthly Reach: 300,000+",
          "3 Lakh+ Audience Reach",
        ],
      },
    ],
  },
  {
    id: "BETTER",
    name: "Growth",
    label: "BETTER",
    isPopular: true,
    description: "Comprehensive package for growing businesses seeking visibility.",
    price: 41000,
    yearlyPrice: 370000,
    services: [
      {
        name: "Content & Social Media",
        icon: "Megaphone",
        subServices: [
          "5 Professional Camera Reels / Month",
          "4 Content-Based Reels / Month",
          "12\u201315 Creative Posts / Month",
          "Instagram & Facebook Content Management",
          "Monthly Content Planning & Strategy",
          "Designed for 500K+ Monthly Reach Potential",
        ],
      },
      {
        name: "WhatsApp Marketing",
        icon: "MessageCircle",
        subServices: [
          "WhatsApp Marketing Strategy",
          "Promotional & Offer Campaigns",
          "Customer Follow-ups & Re-engagement",
        ],
      },
      {
        name: "Paid Advertising",
        icon: "Megaphone",
        subServices: [
          "Meta Ads \u2013 Campaign Setup, Management & Optimization",
          "Google Ads \u2013 Campaign Setup, Management & Optimization",
          "Lead Generation & Conversion-Focused Campaigns",
          "Ad Budget provided separately by client",
        ],
      },
      {
        name: "SEO",
        icon: "Search",
        subServices: [
          "Basic SEO Strategy & Optimization",
          "Google Search Visibility Improvement",
          "Keyword & Local SEO Optimization",
        ],
      },
      {
        name: "Reporting & Strategy",
        icon: "BarChart3",
        subServices: [
          "Monthly Performance Report",
          "Campaign Analysis & Optimization",
          "Monthly Marketing Strategy",
        ],
      },
    ],
  },
  {
    id: "BEST",
    name: "Scale",
    label: "BEST",
    description: "All-in-one dominant digital presence for industry leaders.",
    price: 51000,
    yearlyPrice: 490000,
    services: [
      {
        name: "Content & Social Media",
        icon: "Megaphone",
        subServices: [
          "8 Professional Camera Reels / Month",
          "6 Content-Based Reels / Month",
          "15\u201320 Creative Posts / Month",
          "Instagram & Facebook Management",
          "Complete Monthly Content Calendar",
          "Creative Campaigns & Festival Marketing",
          "Professional Content Strategy",
          "Designed for 800K+ Monthly Reach Potential",
        ],
      },
      {
        name: "WhatsApp Marketing",
        icon: "MessageCircle",
        subServices: [
          "WhatsApp Marketing & Promotional Campaigns",
          "Customer Follow-ups & Re-engagement",
          "Lead Nurturing Campaigns",
        ],
      },
      {
        name: "Paid Advertising",
        icon: "Megaphone",
        subServices: [
          "Meta Ads \u2013 Setup, Management & Optimization",
          "Google Ads \u2013 Setup, Management & Optimization",
          "Lead Generation & Retargeting Campaigns",
          "Conversion-Focused Ad Strategy",
          "Ad Budget provided separately by client",
        ],
      },
      {
        name: "Website",
        icon: "Globe",
        subServices: [
          "Professional Business Website",
          "Mobile-Responsive Design",
          "Product/Service Showcase",
          "WhatsApp & Enquiry Integration",
          "Basic On-Page SEO",
          "Website Setup & Deployment",
        ],
      },
      {
        name: "SEO & Google Presence",
        icon: "Search",
        subServices: [
          "Local SEO",
          "Google Business Profile Optimization",
          "Keyword Research",
          "On-Page SEO",
          "Google Search Visibility Strategy",
        ],
      },
      {
        name: "Analytics & Growth",
        icon: "BarChart3",
        subServices: [
          "Monthly Performance Report",
          "Lead & Campaign Tracking",
          "Conversion Analysis",
          "Monthly Strategy & Growth Planning",
          "Continuous Campaign Optimization",
        ],
      },
    ],
  },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Megaphone,
  Search,
  MessageCircle,
  BarChart3,
  Globe,
  Eye,
};

const ServiceIcon = ({ iconName, className }: { iconName: string; className?: string }) => {
  const Icon = iconMap[iconName] || BarChart3;
  return <Icon className={className} />;
};

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

/* Detail Modal */
function PlanDetailModal({
  plan,
  isYearly,
  onClose,
  onSelect,
}: {
  plan: Plan;
  isYearly: boolean;
  onClose: () => void;
  onSelect: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal Content */}
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 30 }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-2xl md:rounded-3xl bg-white shadow-2xl shadow-primary/10 flex flex-col"
      >
        {/* Header */}
        <div className="relative p-4 md:p-6 pb-3 md:pb-4 border-b border-black/5 bg-gradient-to-br from-primary/5 to-accent/5 flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 md:top-4 md:right-4 p-1.5 md:p-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors"
          >
            <X className="w-4 h-4 md:w-5 md:h-5 text-foreground" />
          </button>

          <div className="text-[9px] md:text-xs font-semibold tracking-widest text-foreground-muted mb-0.5 uppercase">
            {plan.name}
          </div>
          <h3 className="text-xl md:text-3xl font-bold text-foreground mb-1 md:mb-2">{plan.label}</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl md:text-4xl font-bold text-foreground">
              ₹<NumberFlow
                value={isYearly ? plan.yearlyPrice : plan.price}
                format={{ useGrouping: true }}
                className="text-2xl md:text-4xl font-bold"
              />
            </span>
            <span className="text-xs md:text-sm text-foreground-muted">
              /{isYearly ? "yr" : "mo"}
            </span>
          </div>
          <p className="text-xs md:text-sm text-foreground-muted mt-1">{plan.description}</p>
        </div>

        {/* Services List */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-5">
          {plan.services.map((service, sIdx) => (
            <motion.div
              key={sIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sIdx * 0.06, duration: 0.35 }}
              className="rounded-xl md:rounded-2xl bg-gradient-to-br from-primary/[0.03] to-accent/[0.03] border border-black/5 p-3 md:p-4"
            >
              {/* Main Service Header */}
              <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                <div className="p-1.5 md:p-2 rounded-lg bg-primary/10 flex-shrink-0">
                  <ServiceIcon iconName={service.icon} className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
                </div>
                <h4 className="text-xs md:text-base font-bold text-foreground">{service.name}</h4>
              </div>

              {/* Sub-Services */}
              <ul className="space-y-1.5 md:space-y-2 ml-1">
                {service.subServices.map((sub, subIdx) => (
                  <li key={subIdx} className="flex items-start gap-1.5 md:gap-2">
                    <div className="mt-0.5 bg-accent p-[2px] md:p-1 rounded-full flex-shrink-0 shadow-sm shadow-accent/50">
                      <Check className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 text-black stroke-[3]" />
                    </div>
                    <span className="text-[10px] md:text-sm text-foreground/80 leading-tight">{sub}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="p-4 md:p-6 pt-3 md:pt-4 border-t border-black/5 flex-shrink-0 bg-white">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onSelect}
            className="w-full py-3 md:py-4 rounded-xl md:rounded-2xl bg-primary text-white font-bold text-sm md:text-base shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
          >
            Select {plan.label} Plan
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function PlanSelection() {
  const { selectedPlan, setSelectedPlan, setStep, setBillingCycle } = useStore();
  const [isYearly, setIsYearly] = useState(false);
  const [expandedPlan, setExpandedPlan] = useState<Plan | null>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (plan: Plan) => {
    setExpandedPlan(plan);
  };

  const handleSelectFromModal = () => {
    if (!expandedPlan) return;
    setSelectedPlan(expandedPlan.id);
    setBillingCycle(isYearly ? 'YEARLY' : 'MONTHLY');
    setExpandedPlan(null);
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
                onClick={() => handleCardClick(plan)}
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
                        {plan.name}
                      </div>
                      <h3 className="text-sm md:text-2xl font-bold text-foreground mb-0.5 md:mb-1">{plan.label}</h3>
                      
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
                          {plan.services.map((service, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-1 md:gap-2">
                              <div className="mt-0.5 bg-accent p-[1px] md:p-1 rounded-full flex-shrink-0 shadow-sm shadow-accent/50">
                                <Check className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 text-black stroke-[3]" />
                              </div>
                              <span className="text-[6.5px] leading-tight md:text-sm text-foreground/90">{service.name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div
                        className={cn(
                          "w-full py-1.5 md:py-3 mt-3 md:mt-6 text-[8px] md:text-sm rounded md:rounded-xl font-bold transition-all text-center flex items-center justify-center gap-1",
                          isSelected
                            ? "bg-primary text-white shadow-lg shadow-primary/20"
                            : "bg-accent text-black shadow-sm shadow-accent/20"
                        )}
                      >
                        {isSelected ? "Selected" : <>View Details <ChevronRight className="w-2 h-2 md:w-3.5 md:h-3.5" /></>}
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

      {/* Detail Modal */}
      <AnimatePresence>
        {expandedPlan && (
          <PlanDetailModal
            plan={expandedPlan}
            isYearly={isYearly}
            onClose={() => setExpandedPlan(null)}
            onSelect={handleSelectFromModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
