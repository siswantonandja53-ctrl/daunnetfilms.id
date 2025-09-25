/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
// Import your Drizzle DB and user session/auth logic here
import { getOrCreateUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    // Get user from session (replace with your actual logic)
    const user = await getOrCreateUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Map user fields for frontend autofill
    return NextResponse.json({
      name: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.firstName || user.lastName || "",
      email: user.email,
      whatsapp: user.phoneNumber || "", // Assuming you have a phoneNumber field for WhatsApp
    });
  } catch (err) {
    console.error("[user-info] Error:", err);
    return NextResponse.json({ error: (err as Error).message || "Server error" }, { status: 500 });
  }
}
