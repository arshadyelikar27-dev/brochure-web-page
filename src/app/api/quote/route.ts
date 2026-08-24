import { NextResponse } from "next/server";

// ==========================================
// 🛠️ PERMANENT CONFIGURATION
// Paste your actual details below to hardcode them permanently.
// ==========================================
const PERMANENT_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyKLqKt1K1R8GI4WCgAP7RfZBBZ7KLy2YUtRvp0PU4B_BzW9alnu_DT25AeQqqZN-YAog/exec";
const PERMANENT_ADMIN_EMAIL = "goodmarketingmatters@gmail.com";
const PERMANENT_RESEND_API_KEY = "re_KZi1v9D1_vSJ2u8Buqt7JFe2GiChwhX5F";
// ==========================================

function buildEmailHtmlCard(data: {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  selectedPlan: string;
  selectedServices: any[];
  timeline: string;
  extraRequirements?: string;
}) {
  const {
    name,
    businessName,
    email,
    phone,
    selectedPlan,
    selectedServices,
    timeline,
    extraRequirements,
  } = data;

  const planName = selectedPlan === 'CUSTOM' ? 'Customizable Plan' : `${selectedPlan} Plan`;

  let servicesListHtml = "";
  if (Array.isArray(selectedServices) && selectedServices.length > 0) {
    servicesListHtml = selectedServices
      .map((s: any) => {
        const nameStr = typeof s === "string" ? s : s.name;
        let detailsStr = "";
        if (typeof s === "object" && s.config) {
          if (s.config.type === "QUANTITY" && s.selectedValue) {
            detailsStr = Object.entries(s.selectedValue)
              .map(([k, v]) => `${v} ${k}`)
              .join(", ");
          } else if (typeof s.selectedValue === "string") {
            detailsStr = `${s.selectedValue} Tier`;
          }
        }
        return `
          <div style="background-color: #27272a; padding: 12px 16px; border-radius: 10px; margin-bottom: 8px; border-left: 4px solid #a855f7; display: flex; align-items: center; justify-content: space-between;">
            <span style="font-size: 14px; font-weight: 600; color: #f4f4f5;">✓ ${nameStr}</span>
            ${detailsStr ? `<span style="font-size: 11px; background-color: #3f3f46; color: #d4d4d8; padding: 3px 8px; border-radius: 6px; font-weight: 600; text-transform: uppercase;">${detailsStr}</span>` : ''}
          </div>
        `;
      })
      .join("");
  } else {
    servicesListHtml = `
      <div style="background-color: #27272a; padding: 12px 16px; border-radius: 10px; color: #a1a1aa; font-size: 13px;">
        Standard features included in base plan.
      </div>
    `;
  }

  const extraNotesHtml = extraRequirements ? `
    <div style="margin-top: 20px;">
      <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #a1a1aa; margin-bottom: 8px;">Extra Requirements</div>
      <div style="background-color: #27272a; padding: 14px 16px; border-radius: 12px; border: 1px solid #3f3f46; color: #e4e4e7; font-size: 13px; line-height: 1.5;">
        ${extraRequirements}
      </div>
    </div>
  ` : '';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Growth Proposal Request</title>
</head>
<body style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #09090b; color: #ffffff; margin: 0; padding: 20px;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <div style="max-width: 600px; width: 100%; background-color: #18181b; border: 1px solid #27272a; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5); text-align: left;">
          
          <!-- Header Banner -->
          <div style="background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%); padding: 32px 24px; text-align: center;">
            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">🚀 New Growth Proposal Request</h1>
            <p style="margin: 6px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px; font-weight: 500;">GMM Digital Agency Package Summary</p>
          </div>

          <div style="padding: 28px;">
            <!-- Client Details Grid -->
            <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #a1a1aa; margin-bottom: 12px;">Client Details</div>
            
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
              <tr>
                <td width="50%" style="padding-right: 6px; padding-bottom: 12px;">
                  <div style="background-color: #27272a; padding: 12px 14px; border-radius: 10px; border: 1px solid #3f3f46;">
                    <div style="font-size: 10px; color: #a1a1aa; text-transform: uppercase; font-weight: 700;">Full Name</div>
                    <div style="font-size: 14px; color: #ffffff; font-weight: 600; margin-top: 4px;">${name}</div>
                  </div>
                </td>
                <td width="50%" style="padding-left: 6px; padding-bottom: 12px;">
                  <div style="background-color: #27272a; padding: 12px 14px; border-radius: 10px; border: 1px solid #3f3f46;">
                    <div style="font-size: 10px; color: #a1a1aa; text-transform: uppercase; font-weight: 700;">Business Name</div>
                    <div style="font-size: 14px; color: #ffffff; font-weight: 600; margin-top: 4px;">${businessName}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td width="50%" style="padding-right: 6px;">
                  <div style="background-color: #27272a; padding: 12px 14px; border-radius: 10px; border: 1px solid #3f3f46;">
                    <div style="font-size: 10px; color: #a1a1aa; text-transform: uppercase; font-weight: 700;">Email</div>
                    <div style="font-size: 13px; color: #ffffff; font-weight: 600; margin-top: 4px; word-break: break-all;">${email}</div>
                  </div>
                </td>
                <td width="50%" style="padding-left: 6px;">
                  <div style="background-color: #27272a; padding: 12px 14px; border-radius: 10px; border: 1px solid #3f3f46;">
                    <div style="font-size: 10px; color: #a1a1aa; text-transform: uppercase; font-weight: 700;">Phone</div>
                    <div style="font-size: 14px; color: #ffffff; font-weight: 600; margin-top: 4px;">${phone}</div>
                  </div>
                </td>
              </tr>
            </table>

            <!-- Package Selection Card -->
            <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #a1a1aa; margin-bottom: 12px;">Package & Services</div>
            
            <div style="background-color: #27272a; padding: 14px 16px; border-radius: 12px; border: 1px solid #3f3f46; margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between;">
              <div style="font-size: 11px; color: #a1a1aa; text-transform: uppercase; font-weight: 700;">Selected Base Plan</div>
              <div style="display: inline-block; background: linear-gradient(135deg, #a855f7, #ec4899); color: #ffffff; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 800;">${planName}</div>
            </div>

            <div style="margin-bottom: 16px;">
              ${servicesListHtml}
            </div>

            <!-- Timeline Box -->
            <div style="background-color: rgba(168, 85, 247, 0.15); border: 1px solid rgba(168, 85, 247, 0.4); padding: 16px; border-radius: 12px; text-align: center;">
              <div style="font-size: 11px; color: #d8b4fe; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Estimated Timeline</div>
              <div style="font-size: 20px; color: #ffffff; font-weight: 800; margin-top: 4px;">${timeline}</div>
            </div>

            ${extraNotesHtml}
          </div>

          <!-- Footer -->
          <div style="text-align: center; padding: 18px; font-size: 12px; color: #71717a; border-top: 1px solid #27272a; background-color: #121215;">
            Sent automatically via GMM Digital Agency Proposal Portal
          </div>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

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

    const webhookUrl = PERMANENT_WEBHOOK_URL || process.env.GOOGLE_SHEET_WEBHOOK_URL;
    let sheetSuccess = false;

    // 1. Log record to Google Sheets Webhook
    if (webhookUrl) {
      try {
        const sheetRes = await fetch(webhookUrl, {
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
        sheetSuccess = sheetRes.ok;
      } catch (err) {
        console.error("Google Sheets webhook error:", err);
      }
    }

    // 2. Build Beautiful HTML Card for Email
    const emailHtmlCard = buildEmailHtmlCard({
      name,
      businessName,
      email,
      phone,
      selectedPlan,
      selectedServices,
      timeline,
      extraRequirements,
    });

    // 3. Dispatch Email (via Resend or custom provider)
    const resendApiKey = PERMANENT_RESEND_API_KEY || process.env.RESEND_API_KEY;
    const adminEmail = PERMANENT_ADMIN_EMAIL || process.env.NOTIFICATION_EMAIL || "info@gmmdigital.com";

    if (resendApiKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "GMM Digital Agency <onboarding@resend.dev>",
            to: [adminEmail, email],
            subject: `🚀 Growth Package Proposal - ${businessName || name}`,
            html: emailHtmlCard,
          }),
        });
      } catch (err) {
        console.error("Resend Email error:", err);
      }
    }

    console.log("Proposal Submitted Successfully:", {
      name,
      businessName,
      email,
      phone,
      selectedPlan,
      formattedServices,
      timeline,
    });

    return NextResponse.json({ 
      success: true, 
      message: "Proposal request submitted successfully!",
      sheetRecorded: sheetSuccess,
      htmlCard: emailHtmlCard
    });
  } catch (error: any) {
    console.error("Error processing quote request:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process proposal request" },
      { status: 500 }
    );
  }
}
