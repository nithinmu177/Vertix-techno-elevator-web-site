import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { auth } from "@/lib/auth/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await auth();
    if (session?.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized. Please log in as Admin." }, { status: 401 });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "tt4rgc2n";
    const apiKey = process.env.CLOUDINARY_API_KEY || "952851658953269";
    const apiSecret = process.env.CLOUDINARY_API_SECRET || "4fCKFrUIUPPez9bVNQ45-p9KB-I";
    const folder = "vertix-elevators";

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true
    });

    const timestamp = Math.round(Date.now() / 1000);
    const signature = cloudinary.utils.api_sign_request({ folder, timestamp }, apiSecret);

    return NextResponse.json({
      timestamp,
      signature,
      apiKey,
      cloudName,
      folder,
      uploadUrl: `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`
    });
  } catch (err: any) {
    console.error("[Media Sign API Error]:", err);
    return NextResponse.json({ error: err?.message || "Failed to generate upload signature." }, { status: 500 });
  }
}
