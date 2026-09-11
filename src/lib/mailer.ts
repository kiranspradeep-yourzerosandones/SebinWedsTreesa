
import nodemailer from "nodemailer";
import { weddingData } from "@/data/weddingData";

interface RSVPData {
  name: string;
  phone: string;
  guests: string;
  attending: string;
  message: string;
}

// Configure these environment variables later:
// SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, RSVP_TO_EMAIL

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
  },
});

export async function sendRSVPEmail(data: RSVPData) {
  const { name, phone, guests, attending, message } = data;

  const { couple, event, meta } = weddingData;

  const attendingText =
    attending === "yes" ? "✅ Will Attend" : "❌ Cannot Attend";

  const guestText = `${guests} ${
    Number(guests) === 1 ? "guest" : "guests"
  }`;

  const coupleName = `${couple.groomFirstName} & ${couple.brideFirstName}`;

  const htmlContent = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 500px; margin: 0 auto; background: #FAF7F2; border-radius: 12px; overflow: hidden; border: 1px solid #D8B26E33;">
      
      <!-- Header -->
      <div style="background: #6B2D44; padding: 24px; text-align: center;">
        <h1 style="color: white; font-size: 20px; margin: 0; letter-spacing: 2px;">
          NEW RSVP
        </h1>

        <p style="color: #D8B26E; font-size: 12px; margin: 8px 0 0 0; letter-spacing: 1px;">
          ${coupleName} — ${event.nameEnglish}
        </p>
      </div>

      <!-- Content -->
      <div style="padding: 24px;">
        <table style="width: 100%; border-collapse: collapse;">
          
          <tr>
            <td style="padding: 10px 0; color: #8C8C8C; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 100px; vertical-align: top;">
              Name
            </td>
            <td style="padding: 10px 0; color: #2A2A2A; font-size: 14px;">
              ${name}
            </td>
          </tr>

          <tr>
            <td style="padding: 10px 0; color: #8C8C8C; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">
              Phone
            </td>
            <td style="padding: 10px 0; color: #2A2A2A; font-size: 14px;">
              ${phone}
            </td>
          </tr>

          <tr>
            <td style="padding: 10px 0; color: #8C8C8C; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">
              Status
            </td>
            <td style="padding: 10px 0; color: #2A2A2A; font-size: 14px;">
              ${attendingText}
            </td>
          </tr>

          <tr>
            <td style="padding: 10px 0; color: #8C8C8C; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">
              Guests
            </td>
            <td style="padding: 10px 0; color: #2A2A2A; font-size: 14px;">
              ${guestText}
            </td>
          </tr>

          ${
            message
              ? `
          <tr>
            <td style="padding: 10px 0; color: #8C8C8C; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">
              Message
            </td>
            <td style="padding: 10px 0; color: #2A2A2A; font-size: 14px; font-style: italic;">
              "${message}"
            </td>
          </tr>
          `
              : ""
          }

        </table>
      </div>

      <!-- Footer -->
      <div style="background: #F6E8E6; padding: 16px; text-align: center;">
        <p style="color: #8C8C8C; font-size: 11px; margin: 0;">
          Received from ${meta.url.replace(/^https?:\/\//, "")}
        </p>
      </div>

    </div>
  `;

  await transporter.sendMail({
    from: `"${coupleName} Wedding" <${process.env.SMTP_USER}>`,
    to: process.env.RSVP_TO_EMAIL || "",
    subject: `${attendingText} — ${name} | ${event.nameEnglish} RSVP`,
    html: htmlContent,
  });
}

