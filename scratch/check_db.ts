import { prisma } from "../lib/db/prisma";

async function main() {
  const media = await prisma.media.findMany({ select: { id: true, url: true, type: true } });
  console.log("Total media in DB:", media.length);
  const localUploads = media.filter((m) => m.url.startsWith("/uploads/"));
  console.log("Media with /uploads/:", localUploads.length);
  const cloudinaryMedia = media.filter((m) => m.url.includes("cloudinary"));
  console.log("Media on Cloudinary:", cloudinaryMedia.length);
  const projects = await prisma.project.findMany({ select: { id: true, name: true, slug: true } });
  console.log("Projects in DB:", JSON.stringify(projects, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
