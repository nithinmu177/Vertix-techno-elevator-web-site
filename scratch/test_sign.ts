import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "tt4rgc2n",
  api_key: process.env.CLOUDINARY_API_KEY || "952851658953269",
  api_secret: process.env.CLOUDINARY_API_SECRET || "4fCKFrUIUPPez9bVNQ45-p9KB-I"
});

const timestamp = Math.round(Date.now() / 1000);
const params = { folder: "vertix-elevators", timestamp };
const signature = cloudinary.utils.api_sign_request(params, process.env.CLOUDINARY_API_SECRET || "4fCKFrUIUPPez9bVNQ45-p9KB-I");

console.log("Generated signature:", {
  timestamp,
  signature,
  apiKey: process.env.CLOUDINARY_API_KEY || "952851658953269",
  cloudName: process.env.CLOUDINARY_CLOUD_NAME || "tt4rgc2n",
  folder: "vertix-elevators"
});
