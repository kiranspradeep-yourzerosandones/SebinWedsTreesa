import { NextRequest, NextResponse } from "next/server";
// import { sendRSVPEmail } from "@/lib/mailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, guests, attending, message } = body;

    // Validate required fields
    if (!name || !phone || !attending) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Log for now — email integration will come later
    console.log("═══════════════════════════════════════");
    console.log("📩  NEW RSVP RECEIVED");
    console.log("═══════════════════════════════════════");
    console.log(`   Name:      ${name}`);
    console.log(`   Phone:     ${phone}`);
    console.log(`   Guests:    ${guests}`);
    console.log(`   Attending: ${attending}`);
    console.log(`   Message:   ${message || "—"}`);
    console.log("═══════════════════════════════════════");

    // TODO: Uncomment when email is configured
    // await sendRSVPEmail({ name, phone, guests, attending, message });

    return NextResponse.json(
      { success: true, message: "RSVP received" },
      { status: 200 }
    );
  } catch (error) {
    console.error("RSVP Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}