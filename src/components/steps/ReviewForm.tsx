"use client";

import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { Check, Edit2, Building, User, Mail, Phone, Target, Wallet, FileText } from "lucide-react";
import { useState } from "react";

export function ReviewForm() {
  const { 
    selectedPlan, 
    selectedServices, 
    getSubtotal, 
    getGrandTotal, 
    getTimeline,
    clientDetails,
    setClientDetails,
    setStep,
    nextStep
  } = useStore();
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call and PDF generation
    setTimeout(() => {
      setIsSubmitting(false);
      nextStep();
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setClientDetails({ [name]: value });
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-[80vh] w-full px-4 py-12 pb-24">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Review <span className="text-gradient">Package</span></h2>
        <p className="text-foreground-muted text-lg max-w-xl mx-auto">
          Confirm your selections and provide your details to receive the proposal.
        </p>
      </motion.div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Summary */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass p-8 rounded-3xl border border-white/10 h-fit"
        >
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
            <h3 className="text-2xl font-bold">Package Summary</h3>
            <button onClick={() => setStep(1)} className="text-primary text-sm flex items-center gap-1 hover:underline">
              <Edit2 className="w-3 h-3" /> Edit
            </button>
          </div>

          <div className="space-y-6 mb-8">
            <div>
              <p className="text-sm text-foreground-muted uppercase tracking-wider mb-2">Base Plan</p>
              <div className="flex justify-between items-center">
                <p className="font-bold text-xl">{selectedPlan}</p>
                <Check className="w-5 h-5 text-accent" />
              </div>
            </div>

            {selectedServices.length > 0 && (
              <div>
                <p className="text-sm text-foreground-muted uppercase tracking-wider mb-2">Add-on Services</p>
                <ul className="space-y-3">
                  {selectedServices.map(service => (
                    <li key={service.id} className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                      <span className="text-sm">{service.name}</span>
                      <span className="text-sm font-semibold">₹{service.price.toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="bg-black/50 p-6 rounded-2xl border border-white/5 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-foreground-muted">Timeline Estimation</span>
              <span>{getTimeline()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground-muted">Subtotal</span>
              <span>₹{getSubtotal().toLocaleString()}</span>
            </div>
            <div className="h-px w-full bg-white/10 my-2" />
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-accent">Total Investment</span>
              <span className="text-2xl font-bold">₹{getGrandTotal().toLocaleString()}</span>
            </div>
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">Business Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-foreground-muted flex items-center gap-2"><User className="w-4 h-4"/> Full Name</label>
                <input required type="text" name="name" value={clientDetails.name} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-foreground-muted flex items-center gap-2"><Building className="w-4 h-4"/> Business Name</label>
                <input required type="text" name="businessName" value={clientDetails.businessName} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="Acme Corp" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-foreground-muted flex items-center gap-2"><Mail className="w-4 h-4"/> Email</label>
                <input required type="email" name="email" value={clientDetails.email} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-foreground-muted flex items-center gap-2"><Phone className="w-4 h-4"/> Phone Number</label>
                <input required type="tel" name="phone" value={clientDetails.phone} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="+91 9876543210" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-foreground-muted flex items-center gap-2"><Target className="w-4 h-4"/> Project Goal</label>
              <select required name="projectGoal" value={clientDetails.projectGoal} onChange={handleChange} className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-white appearance-none">
                <option value="" disabled>Select Primary Goal</option>
                <option value="Lead Generation">Lead Generation</option>
                <option value="Brand Awareness">Brand Awareness</option>
                <option value="Sales/E-commerce">Sales / E-commerce</option>
                <option value="Rebranding">Rebranding</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-foreground-muted flex items-center gap-2"><FileText className="w-4 h-4"/> Extra Requirements</label>
              <textarea name="extraRequirements" value={clientDetails.extraRequirements} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors min-h-[100px]" placeholder="Any specific details you want us to know..." />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/20 relative overflow-hidden"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Preparing Proposal...
                </div>
              ) : (
                "Submit Request"
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
