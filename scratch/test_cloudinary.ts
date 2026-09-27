import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "tt4rgc2n",
  api_key: process.env.CLOUDINARY_API_KEY || "952851658953269",
  api_secret: process.env.CLOUDINARY_API_SECRET || "4fCKFrUIUPPez9bVNQ45-p9KB-I",
  secure: true
});

async function main() {
  console.log("Testing Cloudinary upload with cloud:", cloudinary.config().cloud_name);
  const result = await cloudinary.uploader.upload(
    "public/images/brochure-extracts/extract-02.jpg",
    {
      folder: "vertix-elevators",
      public_id: `test-${Date.now()}`
    }
  );
  console.log("Success! Uploaded URL:", result.secure_url);
}

main().catch(console.error);
