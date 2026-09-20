import { PrismaClient, MediaCategory, MediaType, PublishStatus } from "@prisma/client";
import bcrypt from "bcryptjs";
import { slugify } from "../lib/utils";

const adminEmail = process.env.ADMIN_EMAIL || "admin@vertix.local";
const adminPassword = process.env.ADMIN_PASSWORD || "";

if (!adminPassword) throw new Error("ADMIN_PASSWORD must be set before running the seed.");

const prisma = new PrismaClient();

async function main() {
  const adminRole = await prisma.role.upsert({ where: { name: "ADMIN" }, update: {}, create: { name: "ADMIN" } });
  await prisma.role.upsert({ where: { name: "CUSTOMER" }, update: {}, create: { name: "CUSTOMER" } });
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: "Vertix Admin",
      email: adminEmail,
      passwordHash: await bcrypt.hash(adminPassword, 12),
      roleId: adminRole.id
    }
  });

  const hero = await prisma.media.upsert({
    where: { id: "demo-hero-media" },
    update: {
      originalName: "vertix-elevator-entrance.jpg",
      url: "/images/brochure-extracts/extract-02.jpg",
      title: "Vertix elevator entrance",
      altText: "Modern elevator entrance with marble wall finish and indoor plants"
    },
    create: {
      id: "demo-hero-media",
      filename: "vertix-elevator-entrance",
      originalName: "vertix-elevator-entrance.jpg",
      url: "/images/brochure-extracts/extract-02.jpg",
      type: MediaType.IMAGE,
      category: MediaCategory.HERO,
      mimeType: "image/jpeg",
      size: 0,
      title: "Vertix elevator entrance",
      altText: "Modern elevator entrance with marble wall finish and indoor plants"
    }
  });
  const cabin = await prisma.media.upsert({
    where: { id: "demo-cabin-media" },
    update: {
      originalName: "vertix-wood-cabin.jpg",
      url: "/images/brochure-extracts/extract-15.jpg",
      title: "Vertix wood finish cabin",
      altText: "Wood finish elevator cabin with stainless steel wall panels"
    },
    create: {
      id: "demo-cabin-media",
      filename: "vertix-wood-cabin",
      originalName: "vertix-wood-cabin.jpg",
      url: "/images/brochure-extracts/extract-15.jpg",
      type: MediaType.IMAGE,
      category: MediaCategory.PRODUCT,
      mimeType: "image/jpeg",
      size: 0,
      title: "Vertix wood finish cabin",
      altText: "Wood finish elevator cabin with stainless steel wall panels"
    }
  });

  const productNames = ["Passenger Elevators", "Home Elevators", "Hospital Elevators", "Commercial Elevators", "Goods Elevators", "Freight Elevators", "MRL Elevators", "Hydraulic Elevators"];
  for (const name of productNames) {
    const category = await prisma.productCategory.upsert({ where: { slug: slugify(name) }, update: {}, create: { name, slug: slugify(name) } });
    const product = await prisma.product.upsert({
      where: { slug: slugify(name) },
      update: {},
      create: {
        name,
        slug: slugify(name),
        categoryId: category.id,
        shortDescription: "Demo product. Replace specifications and media from admin.",
        fullDescription: "A configurable elevator solution for modern buildings, managed from the database and media library.",
        applications: ["Residential", "Commercial"],
        safetyFeatures: ["Emergency systems", "Door safety"],
        finishes: ["Stainless steel", "Glass"],
        capacity: "Editable",
        speed: "Editable",
        floors: "Editable",
        doorType: "Editable",
        driveType: "Editable",
        energyEfficiency: "Editable",
        specifications: {},
        status: PublishStatus.PUBLISHED
      }
    });
    await prisma.productMedia.upsert({ where: { productId_mediaId_role: { productId: product.id, mediaId: cabin.id, role: "MAIN" } }, update: {}, create: { productId: product.id, mediaId: cabin.id, role: "MAIN" } });
  }

  for (const name of ["Installation", "Maintenance", "AMC", "Repair", "Modernization", "Inspection"]) {
    await prisma.service.upsert({
      where: { slug: slugify(name) },
      update: {},
      create: { name, slug: slugify(name), description: "Demo service. Replace with approved service content.", benefits: ["Clear process", "Safety focus"], process: ["Consult", "Survey", "Execute"], status: PublishStatus.PUBLISHED }
    });
  }

  for (const name of ["Residential Tower", "Commercial Lobby", "Healthcare Access", "Industrial Movement", "Luxury Residence", "Institutional Block"]) {
    const category = await prisma.projectCategory.upsert({ where: { slug: slugify(name.split(" ")[0]) }, update: {}, create: { name: name.split(" ")[0], slug: slugify(name.split(" ")[0]) } });
    const project = await prisma.project.upsert({
      where: { slug: `demo-${slugify(name)}` },
      update: {},
      create: { name: `Demo ${name}`, slug: `demo-${slugify(name)}`, location: "Editable location", categoryId: category.id, description: "Demo project. Replace with real project information.", challenge: "Editable challenge.", solution: "Editable solution.", elevatorType: "Editable elevator type", specifications: {}, status: PublishStatus.PUBLISHED }
    });
    await prisma.projectMedia.upsert({ where: { projectId_mediaId_role: { projectId: project.id, mediaId: hero.id, role: "COVER" } }, update: {}, create: { projectId: project.id, mediaId: hero.id, role: "COVER" } });
  }

  for (const category of ["General", "Products", "Installation", "Maintenance", "Safety", "Pricing", "Technology", "Media"]) {
    await prisma.fAQ.create({ data: { question: `Demo ${category} question`, answer: "Editable demo FAQ content.", category, status: PublishStatus.PUBLISHED } }).catch(() => undefined);
  }
  for (const title of ["Choosing the Right Elevator", "Maintenance Planning", "Modernization Signals", "Safety Conversations", "Designing Cabin Finishes"]) {
    await prisma.blogPost.upsert({ where: { slug: `demo-${slugify(title)}` }, update: {}, create: { title: `Demo: ${title}`, slug: `demo-${slugify(title)}`, excerpt: "Editable demo article excerpt.", content: "Editable demo article content.", author: "Vertix Admin", coverMediaId: hero.id, status: PublishStatus.PUBLISHED, publishedAt: new Date() } });
  }
  for (const number of [1, 2, 3, 4]) {
    await prisma.testimonial.create({ data: { customerName: `Demo Customer ${number}`, company: "Demo Company", designation: "Demo Designation", quote: "Clearly marked demo testimonial. Replace with approved real feedback.", rating: 5, isDemo: true, status: PublishStatus.PUBLISHED } }).catch(() => undefined);
  }

  await prisma.siteSetting.upsert({
    where: { key: "homepage" },
    update: { mediaId: hero.id },
    create: { key: "homepage", mediaId: hero.id, value: { heroTitle: "ENGINEERING THE WAY UP.", heroSubtitle: "Advanced elevator solutions designed for safer, smarter and more seamless vertical mobility.", heroButton: "EXPLORE SOLUTIONS", quoteButton: "REQUEST A QUOTE" } }
  });
  await prisma.siteSetting.upsert({ where: { key: "statistics" }, update: {}, create: { key: "statistics", value: [{ value: "Editable", label: "Years Experience" }, { value: "Editable", label: "Installations" }, { value: "Editable", label: "Support" }, { value: "100%", label: "Safety Focus" }] } });
}

main().finally(async () => prisma.$disconnect());
