"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Download, MessageCircle, ExternalLink } from "lucide-react";
import { useStore } from "@/store/useStore";
import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function SuccessScreen() {
  const { clientDetails, selectedPlan, selectedServices, getSubtotal, getGrandTotal, getTimeline } = useStore();
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
      pdf.text(selectedPlan || "None", 40, y);
      
      const planPrice = getSubtotal() - selectedServices.reduce((acc, s) => acc + s.price, 0);
      pdf.text(`Rs. ${planPrice.toLocaleString()}`, 550, y, { align: "right" });

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
          
          pdf.setFont("helvetica", "normal");
          pdf.text(`Rs. ${s.price.toLocaleString()}`, 550, y, { align: "right" });
          
          pdf.setFontSize(10);
          pdf.setTextColor(100, 100, 100);
          pdf.text(s.category, 40, y + 15);
          
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

      y += 30;
      pdf.line(40, y, 550, y);
      y += 30;

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(16);
      pdf.setTextColor(...primaryColor);
      pdf.text("Total Investment", 40, y);
      pdf.text(`Rs. ${getGrandTotal().toLocaleString()}`, 550, y, { align: "right" });

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
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full px-4 py-12 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mb-8 mx-auto"
      >
        <CheckCircle2 className="w-12 h-12 text-accent" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-2xl mx-auto space-y-6"
      >
        <h2 className="text-4xl md:text-5xl font-bold">Proposal Submitted <span className="text-gradient">Successfully</span></h2>
        <p className="text-xl text-foreground-muted">
          Thank you, {clientDetails.name || 'there'}! We've received your request for {clientDetails.businessName || 'your business'}.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <button 
            onClick={generatePDF}
            disabled={isGenerating}
            className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            {isGenerating ? "Generating PDF..." : "Download Proposal"} 
            <Download className="w-5 h-5" />
          </button>
          
          <button 
            onClick={openWhatsApp}
            className="w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
          >
            Connect on WhatsApp
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
