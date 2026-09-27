import { v2 as cloudinary } from "cloudinary";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "tt4rgc2n",
  api_key: process.env.CLOUDINARY_API_KEY || "952851658953269",
  api_secret: process.env.CLOUDINARY_API_SECRET || "4fCKFrUIUPPez9bVNQ45-p9KB-I",
  secure: true
});

async function main() {
  const filePath = path.join(process.cwd(), "public", "images", "vertix-logo.jpg");
  console.log("Uploading logo to Cloudinary from:", filePath);
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "vertix-elevators",
    public_id: "vertix-official-logo",
    overwrite: true,
    resource_type: "image"
  });
  console.log("Uploaded logo CDN URL:", result.secure_url);
}

main().catch(console.error);
