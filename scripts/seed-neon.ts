import { PrismaClient, MediaType, MediaCategory, PublishStatus } from "@prisma/client";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Connecting to Neon PostgreSQL...");

  const adminEmail = process.env.ADMIN_EMAIL || "admin@vertix.local";
  const adminPassword = process.env.ADMIN_PASSWORD || "VertixAdmin@123";

  // 1. Roles
  const adminRole = await prisma.role.upsert({
    where: { name: "ADMIN" },
    update: {},
    create: { name: "ADMIN" }
  });
  await prisma.role.upsert({
    where: { name: "CUSTOMER" },
    update: {},
    create: { name: "CUSTOMER" }
  });

  // 2. Admin User
  const passwordHash = await bcrypt.hash(adminPassword, 12);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { passwordHash, roleId: adminRole.id },
    create: {
      name: "Vertix Admin",
      email: adminEmail,
      passwordHash,
      roleId: adminRole.id
    }
  });
  console.log(`Admin account verified: ${adminEmail}`);

  // 3. Check for local store to migrate existing data
  const storePath = path.join(process.cwd(), "data", "local-store.json");
  if (fs.existsSync(storePath)) {
    try {
      const store = JSON.parse(fs.readFileSync(storePath, "utf8"));
      console.log(`Found local-store.json with ${store.media?.length || 0} media and ${store.projects?.length || 0} projects.`);

      // Migrate media
      if (Array.isArray(store.media)) {
        for (const item of store.media) {
          await prisma.media.upsert({
            where: { id: item.id },
            update: {
              url: item.url,
              title: item.title,
              altText: item.altText
            },
            create: {
              id: item.id,
              filename: item.filename,
              originalName: item.originalName || item.filename,
              url: item.url,
              type: item.type === "VIDEO" ? MediaType.VIDEO : MediaType.IMAGE,
              category: MediaCategory.GENERAL,
              mimeType: item.mimeType || "image/jpeg",
              size: item.size || 0,
              title: item.title,
              altText: item.altText
            }
          }).catch(() => null);
        }
        console.log(`Migrated ${store.media.length} media items.`);
      }

      // Migrate projects
      if (Array.isArray(store.projects)) {
        for (const p of store.projects) {
          const project = await prisma.project.upsert({
            where: { slug: p.slug },
            update: {
              name: p.name,
              location: p.location || "Bengaluru",
              description: p.description || "",
              elevatorType: p.elevatorType || "Passenger Elevator",
              timeline: p.timeline,
              results: p.results,
              status: PublishStatus.PUBLISHED
            },
            create: {
              id: p.id,
              name: p.name,
              slug: p.slug,
              location: p.location || "Bengaluru",
              description: p.description || "",
              elevatorType: p.elevatorType || "Passenger Elevator",
              timeline: p.timeline,
              results: p.results,
              status: PublishStatus.PUBLISHED
            }
          });

          // Link media roles
          if (Array.isArray(p.media)) {
            for (const pm of p.media) {
              await prisma.projectMedia.upsert({
                where: {
                  projectId_mediaId_role: {
                    projectId: project.id,
                    mediaId: pm.mediaId,
                    role: pm.role
                  }
                },
                update: {},
                create: {
                  projectId: project.id,
                  mediaId: pm.mediaId,
                  role: pm.role,
                  sortOrder: pm.sortOrder || 0
                }
              }).catch(() => null);
            }
          }
        }
        console.log(`Migrated ${store.projects.length} projects.`);
      }
    } catch (err: any) {
      console.warn("Could not import local-store data:", err.message);
    }
  }

  console.log("Neon PostgreSQL database setup complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
