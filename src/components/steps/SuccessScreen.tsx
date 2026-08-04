"use client";

import { motion } from "framer-motion";
import { CheckCircle, Download, MessageCircle, ExternalLink } from "lucide-react";
import { useStore } from "@/store/useStore";
import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function SuccessScreen() {
  const { clientDetails, selectedPlan, selectedServices, getTimeline } = useStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

  const generatePDF = () => {
    setIsGenerating(true);
    
    try {
      const pdf = new jsPDF("p", "pt", "a4");
      const primaryColor = [139, 92, 246] as [number, number, number]; // Purple
      const accentColor = [150, 150, 150] as [number, number, number]; // Gray for text
      
      // Header
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(28);
      pdf.setTextColor(...primaryColor);
      pdf.text("GMM DIGITAL", 40, 60);
      
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(14);
      pdf.setTextColor(100, 100, 100);
      pdf.text("Growth Proposal", 40, 80);

      // Client Details
      pdf.setFontSize(10);
      pdf.setTextColor(50, 50, 50);
      pdf.text("Prepared For:", 400, 60);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text(clientDetails.businessName || "Client", 400, 75);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.text(clientDetails.name || "", 400, 90);
      pdf.text(clientDetails.email || "", 400, 105);

      // Divider
      pdf.setDrawColor(200, 200, 200);
      pdf.line(40, 130, 550, 130);

      // Base Plan
      let y = 170;
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(16);
      pdf.setTextColor(...primaryColor);
      pdf.text("Selected Base Plan", 40, y);
      
      y += 30;
      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 0);
      pdf.text(selectedPlan === 'CUSTOM' ? 'Customizable Plan' : (selectedPlan || "None"), 40, y);

      // Services
      if (selectedServices.length > 0) {
        y += 50;
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(16);
        pdf.setTextColor(...primaryColor);
        pdf.text("Selected Services", 40, y);
        
        y += 30;
        pdf.setFontSize(12);
        selectedServices.forEach(s => {
          pdf.setFont("helvetica", "bold");
          pdf.setTextColor(0, 0, 0);
          pdf.text(s.name, 40, y);
          
          pdf.setFontSize(10);
          pdf.setTextColor(100, 100, 100);
          
          let subText = s.category;
          if (s.config?.type === 'QUANTITY') {
            subText += ` | ${s.selectedValue} ${s.config.unit}`;
          } else {
            subText += ` | ${s.selectedValue} Tier`;
          }
          
          pdf.text(subText, 40, y + 15);
          
          y += 35;
          pdf.setFontSize(12);
        });
      }

      // Summary
      y += 30;
      pdf.line(40, y, 550, y);
      y += 30;
      
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(50, 50, 50);
      pdf.text("Estimated Timeline", 40, y);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(0, 0, 0);
      pdf.text(getTimeline(), 550, y, { align: "right" });

      y += 40;

      // Footer
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(150, 150, 150);
      pdf.text("This is a system-generated proposal and is valid for 15 days.", 295, 780, { align: "center" });
      
      const fileName = `GMM_Proposal_${(clientDetails.businessName || "Client").replace(/\s+/g, '_')}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error("Failed to generate PDF", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const openWhatsApp = () => {
    const text = `Hi GMM Team! I just built a custom package for ${clientDetails.businessName}. We selected the ${selectedPlan} plan. Please check the proposal I generated on your website.`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/919876543210?text=${encodedText}`, '_blank');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="bg-white border border-black/5 p-8 md:p-12 rounded-3xl max-w-2xl w-full text-center relative overflow-hidden shadow-xl shadow-black/5"
      >
        {/* Confetti / Glow effect in background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 md:w-24 md:h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 relative z-10"
        >
          <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-primary" />
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-5xl font-bold mb-4 text-foreground"
        >
          Proposal Generated!
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-foreground-muted text-base md:text-lg mb-8"
        >
          Thank you, <span className="text-foreground font-semibold">{clientDetails.name}</span>. We've crafted your custom package and sent a copy to <span className="text-foreground font-semibold">{clientDetails.email}</span>.
        </motion.p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button 
            onClick={generatePDF}
            disabled={isGenerating}
            className="w-full sm:w-auto px-8 py-4 bg-foreground text-background rounded-xl font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            {isGenerating ? "Generating PDF..." : "Download Proposal"} 
            <Download className="w-5 h-5" />
          </button>
          
          <button 
            onClick={openWhatsApp}
            className="w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#25D366]/20"
          >
            Connect on WhatsApp
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>

        <div className="flex justify-center mt-8 pt-6 border-t border-black/5">
          <button 
            onClick={() => useStore.getState().reset()}
            className="text-primary hover:underline font-semibold text-sm flex items-center gap-2 transition-all"
          >
            Start a new quote <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
