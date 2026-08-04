"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useStore, Service, ServiceCategory } from "@/store/useStore";
import { 
  Megaphone, 
  Share2, 
  Search, 
  Target, 
  MapPin, 
  TrendingUp,
  Palette,
  PenTool,
  Video,
  MonitorPlay,
  Layout,
  Smartphone,
  Mail,
  Check,
  Code,
  Plus,
  Minus
} from "lucide-react";

const availableServices: Service[] = [
  // MARKETING
  { id: "m1", category: "MARKETING", name: "Performance Marketing", description: "Lead Generation", icon: "TrendingUp", config: { type: "TIER", tiers: ["Basic", "Advanced", "Aggressive"] } },
  { id: "m2", category: "MARKETING", name: "Social Media", description: "Brand awareness", icon: "Share2", config: { type: "QUANTITY", unit: "Posts/Reels", min: 4, max: 60, step: 1 } },
  { id: "m3", category: "MARKETING", name: "SEO", description: "Organic visibility", icon: "Search", config: { type: "TIER", tiers: ["Local", "National", "Enterprise"] } },
  { id: "m6", category: "MARKETING", name: "Digital Marketing", description: "Full 360 approach", icon: "Megaphone", config: { type: "TIER", tiers: ["Starter", "Growth", "Dominance"] } },
  
  // CREATIVE
  { id: "c1", category: "CREATIVE", name: "Branding", description: "Identity & positioning", icon: "Palette", config: { type: "TIER", tiers: ["Logo Only", "Full Identity", "Brand Book"] } },
  { id: "c2", category: "CREATIVE", name: "Graphic Design", description: "Design retainers", icon: "PenTool", config: { type: "QUANTITY", unit: "Assets", min: 1, max: 100, step: 1 } },
  { id: "c3", category: "CREATIVE", name: "Animation", description: "Motion graphics", icon: "Video", config: { type: "QUANTITY", unit: "Videos", min: 1, max: 10, step: 1 } },
  { id: "c4", category: "CREATIVE", name: "Ai Ads", description: "AI-generated commercials", icon: "MonitorPlay", config: { type: "QUANTITY", unit: "Creatives", min: 1, max: 20, step: 1 } },
  
  // DEVELOPMENT
  { id: "d1", category: "DEVELOPMENT", name: "Web Development", description: "Modern, responsive", icon: "Layout", config: { type: "TIER", tiers: ["Landing Page", "Corporate Site", "E-Commerce"] } },
  { id: "d2", category: "DEVELOPMENT", name: "App Development", description: "iOS & Android", icon: "Smartphone", config: { type: "TIER", tiers: ["MVP", "Standard Native", "Enterprise"] } },
  
  // COMMUNICATION
  { id: "cm1", category: "COMMUNICATION", name: "Email Marketing", description: "Newsletters & automation", icon: "Mail", config: { type: "QUANTITY", unit: "Newsletters", min: 1, max: 10, step: 1 } },
];

const categories = [
  { id: "MARKETING", label: "Digital Marketing", icon: Megaphone },
  { id: "CREATIVE", label: "Creative & Design", icon: PenTool },
  { id: "DEVELOPMENT", label: "Web & App Development", icon: Code },
  { id: "COMMUNICATION", label: "Communication & Email", icon: Mail },
];

const iconMap: Record<string, React.ElementType> = {
  Megaphone, Share2, Search, Target, MapPin, TrendingUp,
  Palette, PenTool, Video, MonitorPlay, Layout, Smartphone, Mail
};

export function PackageBuilder() {
  const { selectedServices, toggleService, updateServiceValue, setStep } = useStore();

  return (
    <div className="flex flex-col items-center justify-start min-h-[85vh] w-full px-4 pt-16 md:py-12 pb-32 md:pb-36">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 md:mb-12"
      >
        <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 text-foreground">Build Your <span className="text-gradient">Custom Package</span></h2>
        <p className="text-foreground-muted text-xs md:text-base max-w-2xl mx-auto">
          Select the specific services you need and configure them for your goals.
        </p>
      </motion.div>

      <div className="w-full max-w-4xl space-y-8 md:space-y-12">
        {categories.map((category, catIndex) => {
          const categoryServices = availableServices.filter(s => s.category === category.id);
          if (categoryServices.length === 0) return null;

          return (
            <div key={category.id}>
              <motion.h3 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: catIndex * 0.1 }}
                className="text-base md:text-lg font-bold mb-3 md:mb-4 flex items-center gap-3 text-foreground/80"
              >
                {category.label}
                <div className="h-[1px] flex-grow bg-black/5"></div>
              </motion.h3>
              
              <div className="flex flex-col gap-3">
                {categoryServices.map((service, index) => {
                  const selectedServiceData = selectedServices.find(s => s.id === service.id);
                  const isSelected = !!selectedServiceData;
                  const Icon = iconMap[service.icon];

                  return (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (catIndex * 0.1) + (index * 0.05) }}
                      className={`relative flex flex-col md:flex-row items-start md:items-center p-4 md:p-5 rounded-2xl border transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md ${
                        isSelected 
                          ? "border-primary bg-white shadow-primary/10" 
                          : "border-black/5 bg-slate-50 hover:border-black/10 hover:bg-white"
                      }`}
                    >
                      {isSelected && (
                        <motion.div 
                          layoutId={`ripple-${service.id}`}
                          className="absolute inset-0 bg-primary/5 -z-10"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                      
                      {/* Left Side: Checkbox + Icon + Details */}
                      <div 
                        className="flex-1 flex items-center gap-4 cursor-pointer w-full"
                        onClick={() => toggleService(service as Service)}
                      >
                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                          isSelected ? 'border-primary bg-primary text-white' : 'border-black/20 bg-white'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                        </div>
                        
                        <div className={`p-2.5 rounded-xl flex-shrink-0 ${isSelected ? 'bg-primary/10 text-primary' : 'bg-black/5 text-foreground'}`}>
                          {Icon && <Icon className="w-5 h-5" />}
                        </div>

                        <div className="flex flex-col flex-1 pr-4">
                          <h4 className="text-sm md:text-base font-bold leading-tight text-foreground">{service.name}</h4>
                          <p className="text-xs text-foreground-muted line-clamp-1">{service.description}</p>
                        </div>
                      </div>

                      {/* Right Side: Configuration Options (Visible only when selected) */}
                      <AnimatePresence>
                        {isSelected && selectedServiceData && (
                          <motion.div
                            initial={{ width: 0, opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ width: "auto", opacity: 1, height: "auto", marginTop: 16 }}
                            exit={{ width: 0, opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="w-full md:w-auto md:!mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-black/5 flex items-center justify-start md:justify-end shrink-0 md:!h-auto md:!opacity-100 md:!w-auto md:!scale-100"
                          >
                            {service.config.type === "QUANTITY" ? (
                              <div className="flex flex-col items-start md:items-end gap-1">
                                <span className="text-[10px] text-foreground-muted uppercase font-bold tracking-wide">{service.config.unit}</span>
                                <div className="flex items-center gap-3 bg-white border border-black/10 rounded-lg p-1 shadow-sm">
                                  <button 
                                    onClick={() => {
                                      const currentVal = selectedServiceData.selectedValue as number;
                                      if (currentVal > service.config.min) {
                                        updateServiceValue(service.id, currentVal - service.config.step);
                                      }
                                    }}
                                    className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-black/5 text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                    disabled={(selectedServiceData.selectedValue as number) <= service.config.min}
                                  >
                                    <Minus className="w-4 h-4" />
                                  </button>
                                  <span className="w-8 text-center font-bold text-sm select-none text-foreground">{selectedServiceData.selectedValue}</span>
                                  <button 
                                    onClick={() => {
                                      const currentVal = selectedServiceData.selectedValue as number;
                                      if (currentVal < service.config.max) {
                                        updateServiceValue(service.id, currentVal + service.config.step);
                                      }
                                    }}
                                    className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-black/5 text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                    disabled={(selectedServiceData.selectedValue as number) >= service.config.max}
                                  >
                                    <Plus className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex flex-col items-start md:items-end gap-1 w-full">
                                <span className="text-[10px] text-foreground-muted uppercase font-bold tracking-wide">Select Tier</span>
                                <div className="flex items-center gap-1 bg-white border border-black/10 rounded-lg p-1 shadow-sm w-full md:w-auto overflow-x-auto">
                                  {service.config.tiers.map((tier) => (
                                    <button
                                      key={tier}
                                      onClick={() => updateServiceValue(service.id, tier)}
                                      className={`px-3 md:px-4 py-2 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
                                        selectedServiceData.selectedValue === tier
                                          ? 'bg-primary text-white shadow-sm'
                                          : 'text-foreground hover:bg-black/5'
                                      }`}
                                    >
                                      {tier}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-12 w-full max-w-sm"
      >
        <button
          onClick={() => setStep(3)}
          className="w-full flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
        >
          Review Package <Check className="w-5 h-5" />
        </button>
      </motion.div>
    </div>
  );
}
