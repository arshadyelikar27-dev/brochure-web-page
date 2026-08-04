"use client";

import { motion } from "framer-motion";
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
  Code
} from "lucide-react";

// Mock data with adjusted prices
const availableServices: Service[] = [
  // MARKETING
  { id: "m1", category: "MARKETING", name: "Performance Marketing", description: "Lead Generation", price: 2500, icon: "TrendingUp" },
  { id: "m2", category: "MARKETING", name: "Social Media", description: "Brand awareness", price: 1500, icon: "Share2" },
  { id: "m3", category: "MARKETING", name: "SEO", description: "Organic visibility", price: 2000, icon: "Search" },
  { id: "m6", category: "MARKETING", name: "Digital Marketing", description: "Full 360 approach", price: 4000, icon: "Megaphone" },
  
  // CREATIVE
  { id: "c1", category: "CREATIVE", name: "Branding", description: "Identity & positioning", price: 3500, icon: "Palette" },
  { id: "c2", category: "CREATIVE", name: "Graphic Design", description: "Design retainers", price: 1500, icon: "PenTool" },
  { id: "c3", category: "CREATIVE", name: "Animation", description: "Motion graphics", price: 4500, icon: "Video" },
  { id: "c4", category: "CREATIVE", name: "Ai Ads", description: "AI-generated commercials", price: 8000, icon: "MonitorPlay" },
  
  // DEVELOPMENT
  { id: "d1", category: "DEVELOPMENT", name: "Web Development", description: "Modern, responsive", price: 6000, icon: "Layout" },
  { id: "d2", category: "DEVELOPMENT", name: "App Development", description: "iOS & Android", price: 12000, icon: "Smartphone" },
  
  // COMMUNICATION
  { id: "cm1", category: "COMMUNICATION", name: "Email Marketing", description: "Newsletters & automation", price: 1200, icon: "Mail" },
];

const categories = [
  { id: "MARKETING", label: "Digital Marketing", icon: Megaphone },
  { id: "CREATIVE", label: "Creative & Design", icon: PenTool },
  { id: "DEVELOPMENT", label: "Web & App Development", icon: Code },
];

const iconMap: Record<string, React.ElementType> = {
  Megaphone, Share2, Search, Target, MapPin, TrendingUp,
  Palette, PenTool, Video, MonitorPlay, Layout, Smartphone, Mail
};

export function PackageBuilder() {
  const { selectedServices, toggleService, setStep } = useStore();

  return (
    <div className="flex flex-col items-center justify-start min-h-[85vh] w-full px-4 pt-16 md:py-12 pb-32 md:pb-36">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 md:mb-12"
      >
        <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 text-foreground">Build Your <span className="text-gradient">Custom Package</span></h2>
        <p className="text-foreground-muted text-xs md:text-base max-w-2xl mx-auto">
          Select the specific services you need to achieve your goals.
        </p>
      </motion.div>

      <div className="w-full max-w-5xl space-y-8 md:space-y-12">
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
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {categoryServices.map((service, index) => {
                  const isSelected = selectedServices.some(s => s.id === service.id);
                  const Icon = iconMap[service.icon];

                  return (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (catIndex * 0.1) + (index * 0.05) }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleService(service as Service)}
                      className={`relative cursor-pointer flex flex-col p-3 md:p-4 rounded-xl border transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md ${
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

                      <div className="flex justify-between items-start mb-2 md:mb-3">
                        <div className={`p-1.5 md:p-2 rounded-lg ${isSelected ? 'bg-primary/10 text-primary' : 'bg-black/5 text-foreground'}`}>
                          {Icon && <Icon className="w-3 h-3 md:w-4 md:h-4" />}
                        </div>
                      </div>

                      <h4 className="text-xs md:text-sm font-bold mb-1 leading-tight text-foreground">{service.name}</h4>
                      <p className="text-[10px] md:text-xs text-foreground-muted mb-3 md:mb-4 line-clamp-2">{service.description}</p>

                      <div className="mt-auto flex items-center justify-between">
                        <span className={`text-[9px] md:text-[10px] font-medium uppercase tracking-wide ${isSelected ? 'text-primary font-bold' : 'text-foreground-muted'}`}>
                          {isSelected ? 'Selected' : 'Add'}
                        </span>
                        
                        <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full border flex items-center justify-center transition-colors ${
                          isSelected ? 'border-primary bg-primary text-white' : 'border-black/10 text-foreground-muted'
                        }`}>
                          {isSelected ? <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><Check className="w-2.5 h-2.5 md:w-3 md:h-3" /></motion.div> : <span className="text-xs md:text-sm leading-none">+</span>}
                        </div>
                      </div>
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
