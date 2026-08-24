import { NextResponse } from "next/server";

// ==========================================
// 🛠️ PERMANENT CONFIGURATION
// ==========================================
const PERMANENT_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyKLqKt1K1R8GI4WCgAP7RfZBBZ7KLy2YUtRvp0PU4B_BzW9alnu_DT25AeQqqZN-YAog/exec";
// ==========================================

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      name, 
      businessName, 
      email, 
      phone, 
      selectedPlan, 
      selectedServices, 
      timeline, 
      extraRequirements 
    } = body;

    const formattedServices = Array.isArray(selectedServices)
      ? selectedServices.map((s: any) => typeof s === "string" ? s : s.name).join(", ")
      : String(selectedServices || "None");

    // 1. Send data to Google Sheets (which will now ALSO send the email)
    if (PERMANENT_WEBHOOK_URL) {
      try {
        await fetch(PERMANENT_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            businessName,
            email,
            phone,
            selectedPlan,
            selectedServices: formattedServices,
            timeline,
            extraRequirements,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (err) {
        console.error("Google Sheets webhook error:", err);
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: "Proposal request submitted successfully!"
    });
  } catch (error: any) {
    console.error("Error processing quote request:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process proposal request" },
      { status: 500 }
    );
  }
}
