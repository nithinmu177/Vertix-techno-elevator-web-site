import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

async function testUpload() {
  const timestamp = Math.round(Date.now() / 1000);
  const folder = "vertix-elevators";
  const apiKey = process.env.CLOUDINARY_API_KEY || "952851658953269";
  const apiSecret = process.env.CLOUDINARY_API_SECRET || "4fCKFrUIUPPez9bVNQ45-p9KB-I";
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "tt4rgc2n";

  const signature = cloudinary.utils.api_sign_request({ folder, timestamp }, apiSecret);

  const fileData = fs.readFileSync("public/images/vertix-logo.png");
  const blob = new Blob([fileData], { type: "image/png" });

  const formData = new FormData();
  formData.append("file", blob, "direct-test-logo.png");
  formData.append("api_key", apiKey);
  formData.append("timestamp", String(timestamp));
  formData.append("signature", signature);
  formData.append("folder", folder);

  console.log("Uploading directly to Cloudinary REST endpoint...");
  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
    method: "POST",
    body: formData
  });

  const json = await res.json();
  console.log("Upload status:", res.status);
  console.log("Upload result:", {
    secure_url: json.secure_url,
    public_id: json.public_id,
    bytes: json.bytes,
    resource_type: json.resource_type
  });
}

testUpload().catch(console.error);
