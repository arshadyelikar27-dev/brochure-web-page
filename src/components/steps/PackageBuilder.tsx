"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useStore, Service, ServiceCategory } from "@/store/useStore";
import { 
  Megaphone, 
  Share2, 
  Search, 
  MessageCircle,
  Globe,
  BarChart3,
  Eye,
  Check,
  Plus,
  Minus
} from "lucide-react";

const availableServices: Service[] = [
  // CONTENT & SOCIAL MEDIA
  { 
    id: "csm1", 
    category: "MARKETING", 
    name: "Content & Social Media", 
    description: "Reels, posts & social media management", 
    icon: "Share2", 
    config: { 
      type: "QUANTITY", 
      fields: [
        { id: "camera_reels", label: "Camera Reels", min: 1, max: 15, step: 1 }, 
        { id: "content_reels", label: "Content Reels", min: 1, max: 15, step: 1 },
        { id: "creative_posts", label: "Creative Posts", min: 5, max: 30, step: 1 },
      ] 
    } 
  },
  
  // WHATSAPP MARKETING
  { 
    id: "wm1", 
    category: "MARKETING", 
    name: "WhatsApp Marketing", 
    description: "Promotional campaigns & customer engagement", 
    icon: "MessageCircle", 
    config: { 
      type: "TIER", 
      tiers: ["Basic", "Advanced", "Premium"] 
    } 
  },

  // PAID ADVERTISING
  { 
    id: "pa1", 
    category: "MARKETING", 
    name: "Paid Advertising", 
    description: "Meta Ads & Google Ads campaigns", 
    icon: "Megaphone", 
    config: { 
      type: "TIER", 
      tiers: ["Basic", "Growth", "Aggressive"] 
    } 
  },

  // SEO
  { 
    id: "seo1", 
    category: "MARKETING", 
    name: "SEO & Google Presence", 
    description: "Search visibility & local SEO optimization", 
    icon: "Search", 
    config: { 
      type: "TIER", 
      tiers: ["Basic SEO", "Advanced SEO", "Enterprise SEO"] 
    } 
  },

  // WEBSITE
  { 
    id: "web1", 
    category: "DEVELOPMENT", 
    name: "Website", 
    description: "Professional business website development", 
    icon: "Globe", 
    config: { 
      type: "TIER", 
      tiers: ["Landing Page", "Business Website", "E-Commerce / Web App"] 
    } 
  },
];

// Common/default services that are always included
const commonServices = [
  {
    name: "Reporting & Strategy",
    icon: BarChart3,
    items: ["Monthly Performance Report", "Campaign Analysis & Optimization", "Marketing Strategy"],
  },
  {
    name: "Reach & Visibility",
    icon: Eye,
    items: ["Guaranteed Monthly Reach", "Audience Reach Tracking", "Content Virality Optimization"],
  },
];

const categories = [
  { id: "MARKETING", label: "Marketing & Growth" },
  { id: "DEVELOPMENT", label: "Development" },
];

const iconMap: Record<string, React.ElementType> = {
  Megaphone, Share2, Search, MessageCircle, Globe, BarChart3, Eye,
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
          Select the services you need and configure them for your goals. Reporting & Reach are always included.
        </p>
      </motion.div>

      <div className="w-full max-w-4xl space-y-8 md:space-y-12">
        {/* Selectable Services by Category */}
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

        {/* Common/Default Services - Always Included */}
        <div>
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-base md:text-lg font-bold mb-3 md:mb-4 flex items-center gap-3 text-foreground/80"
          >
            Always Included
            <div className="h-[1px] flex-grow bg-black/5"></div>
          </motion.h3>
          
          <div className="flex flex-col gap-3">
            {commonServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + (index * 0.05) }}
                  className="relative rounded-2xl md:rounded-3xl border border-accent/30 bg-accent/5 p-4 md:p-6"
                >
                  <div className="flex items-center gap-4 w-full">
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 shadow-md shadow-accent/30">
                      <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
                    </div>
                    
                    <div className="p-2.5 rounded-xl flex-shrink-0 bg-accent/15 text-foreground">
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex flex-col flex-1">
                      <h4 className="text-sm md:text-base font-bold leading-tight text-foreground">{service.name}</h4>
                      <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1">
                        {service.items.map((item, i) => (
                          <span key={i} className="text-[10px] md:text-xs text-foreground-muted flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-accent inline-block flex-shrink-0"></span>
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Included badge */}
                  <div className="absolute top-3 right-3 md:top-4 md:right-4 text-[8px] md:text-[10px] font-bold tracking-wider text-accent uppercase bg-accent/10 px-2 py-0.5 rounded-full">
                    Included
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
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
