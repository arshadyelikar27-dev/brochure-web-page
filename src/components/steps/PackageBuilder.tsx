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
  { id: "m2", category: "MARKETING", name: "Social Media", description: "Brand awareness", icon: "Share2", config: { type: "QUANTITY", fields: [{ id: "posts", label: "Posts", min: 1, max: 30, step: 1 }, { id: "reels", label: "Reels", min: 1, max: 30, step: 1 }] } },
  { id: "m3", category: "MARKETING", name: "SEO", description: "Organic visibility", icon: "Search", config: { type: "TIER", tiers: ["Local", "National", "Enterprise"] } },
  { id: "m6", category: "MARKETING", name: "Digital Marketing", description: "Full 360 approach", icon: "Megaphone", config: { type: "TIER", tiers: ["Starter", "Growth", "Dominance"] } },
  
  // CREATIVE
  { id: "c1", category: "CREATIVE", name: "Branding", description: "Identity & positioning", icon: "Palette", config: { type: "TIER", tiers: ["Logo Only", "Full Identity", "Brand Book"] } },
  { id: "c2", category: "CREATIVE", name: "Graphic Design", description: "Design retainers", icon: "PenTool", config: { type: "QUANTITY", fields: [{ id: "assets", label: "Assets", min: 1, max: 100, step: 1 }] } },
  { id: "c3", category: "CREATIVE", name: "Animation", description: "Motion graphics", icon: "Video", config: { type: "QUANTITY", fields: [{ id: "videos", label: "Videos", min: 1, max: 10, step: 1 }] } },
  { id: "c4", category: "CREATIVE", name: "Ai Ads", description: "AI-generated commercials", icon: "MonitorPlay", config: { type: "QUANTITY", fields: [{ id: "image", label: "Image Gen", min: 1, max: 20, step: 1 }, { id: "video", label: "Video Gen", min: 1, max: 20, step: 1 }] } },
  
  // DEVELOPMENT
  { id: "d1", category: "DEVELOPMENT", name: "Web Development", description: "Modern, responsive", icon: "Layout", config: { type: "TIER", tiers: ["Landing Page", "Corporate Site", "E-Commerce"] } },
  { id: "d2", category: "DEVELOPMENT", name: "App Development", description: "iOS & Android", icon: "Smartphone", config: { type: "TIER", tiers: ["MVP", "Standard Native", "Enterprise"] } },
  
  // COMMUNICATION
  { id: "cm1", category: "COMMUNICATION", name: "Email Marketing", description: "Newsletters & automation", icon: "Mail", config: { type: "QUANTITY", fields: [{ id: "newsletters", label: "Newsletters", min: 1, max: 10, step: 1 }] } },
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
    <div className="flex flex-col items-center justify-start w-full px-4 pt-0.5 md:pt-0.5 pb-0.5 md:pb-0.5">
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
                      className={`relative rounded-2xl md:rounded-3xl border p-4 md:p-6 transition-all duration-300 cursor-pointer ${
                        isSelected 
                          ? "border-primary bg-white shadow-primary/10" 
                          : "border-black/5 bg-white hover:border-black/10 hover:shadow-sm"
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
                          isSelected ? 'border-accent bg-accent text-black shadow-md shadow-accent/30' : 'border-black/20 bg-white'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 text-black stroke-[3]" />}
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
                              <div className="flex flex-wrap md:flex-nowrap gap-4 md:gap-6">
                                {service.config.fields.map(field => {
                                  const fieldVal = (selectedServiceData.selectedValue as Record<string, number>)[field.id] || field.min;
                                  return (
                                    <div key={field.id} className="flex flex-col items-start md:items-end gap-1">
                                      <span className="text-[10px] text-foreground-muted uppercase font-bold tracking-wide">{field.label}</span>
                                      <div className="flex items-center gap-3 bg-white border border-black/10 rounded-lg p-1 shadow-sm">
                                        <button 
                                          onClick={() => {
                                            if (fieldVal > field.min) {
                                              updateServiceValue(service.id, fieldVal - field.step, field.id);
                                            }
                                          }}
                                          className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-black/5 text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                          disabled={fieldVal <= field.min}
                                        >
                                          <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="w-8 text-center font-bold text-sm select-none text-foreground">{fieldVal}</span>
                                        <button 
                                          onClick={() => {
                                            if (fieldVal < field.max) {
                                              updateServiceValue(service.id, fieldVal + field.step, field.id);
                                            }
                                          }}
                                          className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-black/5 text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                          disabled={fieldVal >= field.max}
                                        >
                                          <Plus className="w-4 h-4" />
                                        </button>
                                      </div>
                                    </div>
                                  );
                                })}
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
          className="w-full flex items-center justify-center gap-2 bg-accent text-black py-4 rounded-xl font-bold text-lg hover:brightness-95 transition-all shadow-lg shadow-accent/20"
        >
          Review Package <Check className="w-5 h-5 stroke-[3]" />
        </button>
      </motion.div>
    </div>
  );
}
