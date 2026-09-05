import { prisma } from "@/lib/db/prisma";
import { safeJson } from "@/lib/utils";

const demoMedia = {
  hero: {
    url: "/images/demo-hero.svg",
    altText: "Premium modern building atrium with vertical architectural lines",
    type: "IMAGE"
  },
  cabin: {
    url: "/images/demo-cabin.svg",
    altText: "Architectural interior detail used as replaceable elevator demo imagery",
    type: "IMAGE"
  }
};

export const demoProducts = [
  "Passenger Elevators",
  "Home Elevators",
  "Hospital Elevators",
  "Commercial Elevators",
  "Goods Elevators",
  "Freight Elevators",
  "MRL Elevators",
  "Hydraulic Elevators"
].map((name) => ({
  id: name,
  name,
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  shortDescription: "Demo product entry. Replace with real specifications and media from the admin dashboard.",
  fullDescription: "A configurable elevator solution for modern buildings, with content, specifications, media, safety features and brochures managed from the database.",
  capacity: "Editable",
  speed: "Editable",
  floors: "Editable",
  doorType: "Editable",
  driveType: "Editable",
  energyEfficiency: "Editable",
  safetyFeatures: ["Emergency systems", "Door safety", "Inspection-ready design"],
  finishes: ["Stainless steel", "Glass", "Custom cabin finishes"],
  applications: ["Residential", "Commercial", "Institutional"],
  category: { name },
  media: [{ role: "MAIN", media: demoMedia.cabin }]
}));

export const demoProjects = ["Residential Tower", "Commercial Lobby", "Healthcare Access", "Industrial Movement", "Luxury Residence", "Institutional Block"].map((name, index) => ({
  id: name,
  name: `Demo ${name}`,
  slug: `demo-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
  location: "Editable location",
  description: "Demo project entry. Add real project photographs, videos, challenge, solution and result from the admin dashboard.",
  challenge: "Editable project challenge.",
  solution: "Editable Vertix solution.",
  elevatorType: index % 2 ? "Passenger Elevator" : "Custom Elevator Solution",
  timeline: "Editable timeline",
  results: "Editable results",
  category: { name: ["Residential", "Commercial", "Hospital", "Industrial", "Institutional", "Luxury"][index] },
  media: [{ role: "COVER", media: demoMedia.hero }]
}));

export const demoServices = ["Installation", "Maintenance", "AMC", "Repair", "Modernization", "Inspection", "Consultation", "Custom Engineering"].map((name) => ({
  id: name,
  name,
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  description: "Professional service workflow with editable benefits, process steps and media.",
  benefits: ["Structured planning", "Clear communication", "Safety-focused execution"],
  process: ["Consult", "Survey", "Engineer", "Execute", "Support"],
  media: [{ role: "IMAGE", media: demoMedia.cabin }]
}));

export const demoFaqs = ["General", "Products", "Installation", "Maintenance", "Safety", "Pricing", "Media", "Quotes"].map((category, index) => ({
  id: category,
  question: `Demo ${category} question`,
  answer: "This is editable demo FAQ content. Replace it from the admin dashboard before launch.",
  category,
  sortOrder: index
}));

export const demoPosts = ["Choosing the Right Elevator", "Maintenance Planning", "Modernization Signals", "Safety Conversations", "Designing Cabin Finishes"].map((title) => ({
  id: title,
  title: `Demo: ${title}`,
  slug: `demo-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
  excerpt: "Demo article excerpt. Publish real technical content from the admin blog manager.",
  content: "This demo blog article is included for layout and workflow testing. Replace it with reviewed company content before launch.",
  author: "Vertix Admin",
  publishedAt: new Date(),
  category: { name: "Demo" },
  coverMedia: demoMedia.hero
}));

export const demoTestimonials = [1, 2, 3, 4].map((number) => ({
  id: String(number),
  customerName: `Demo Customer ${number}`,
  company: "Demo company",
  designation: "Demo designation",
  quote: "This clearly marked demo testimonial should be replaced with real approved customer feedback.",
  rating: 5,
  isDemo: true
}));

async function fromDb<T>(query: Promise<T>, fallback: unknown): Promise<T | any> {
  if (!process.env.DATABASE_URL) return fallback as any;
  try {
    return await query;
  } catch {
    return fallback as any;
  }
}

export async function getProducts() {
  return fromDb(
    prisma.product.findMany({ where: { status: "PUBLISHED" }, include: { category: true, media: { include: { media: true }, orderBy: { sortOrder: "asc" } } }, orderBy: { updatedAt: "desc" } }),
    demoProducts as any
  );
}

export async function getProduct(slug: string) {
  const products = await getProducts();
  return products.find((product: any) => product.slug === slug) ?? null;
}

export async function getProjects() {
  return fromDb(
    prisma.project.findMany({ where: { status: "PUBLISHED" }, include: { category: true, media: { include: { media: true }, orderBy: { sortOrder: "asc" } } }, orderBy: { updatedAt: "desc" } }),
    demoProjects as any
  );
}

export async function getProject(slug: string) {
  const projects = await getProjects();
  return projects.find((project: any) => project.slug === slug) ?? null;
}

export async function getServices() {
  return fromDb(prisma.service.findMany({ where: { status: "PUBLISHED" }, include: { media: { include: { media: true } } }, orderBy: { updatedAt: "desc" } }), demoServices as any);
}

export async function getFaqs() {
  return fromDb(prisma.fAQ.findMany({ where: { status: "PUBLISHED" }, orderBy: [{ category: "asc" }, { sortOrder: "asc" }] }), demoFaqs);
}

export async function getPosts() {
  return fromDb(prisma.blogPost.findMany({ where: { status: "PUBLISHED" }, include: { category: true, coverMedia: true }, orderBy: { publishedAt: "desc" } }), demoPosts as any);
}

export async function getPost(slug: string) {
  const posts = await getPosts();
  return posts.find((post: any) => post.slug === slug) ?? null;
}

export async function getTestimonials() {
  return fromDb(prisma.testimonial.findMany({ where: { status: "PUBLISHED" }, include: { photoMedia: true }, orderBy: { updatedAt: "desc" } }), demoTestimonials as any);
}

export async function getSettings() {
  const defaults = {
    general: { companyName: "Vertix Techno Elevator", tagline: "Engineering the way up.", description: "Advanced elevator solutions designed for safer, smarter vertical mobility." },
    homepage: {
      heroTitle: "ENGINEERING THE WAY UP.",
      heroSubtitle: "Advanced elevator solutions designed for safer, smarter and more seamless vertical mobility.",
      heroButton: "EXPLORE SOLUTIONS",
      quoteButton: "REQUEST A QUOTE"
    },
    statistics: [
      { value: "Editable", label: "Years Experience" },
      { value: "Editable", label: "Installations" },
      { value: "Editable", label: "Support" },
      { value: "100%", label: "Safety Focus" }
    ],
    contact: { phone: "", email: "", address: "", businessHours: "" }
  };
  try {
    if (!process.env.DATABASE_URL) return defaults;
    const rows = await prisma.siteSetting.findMany({ include: { media: true } });
    return rows.reduce((acc, row) => ({ ...acc, [row.key]: row.media ? { ...safeJson(row.value, {}), media: row.media } : row.value }), defaults as Record<string, unknown>) as typeof defaults & Record<string, unknown>;
  } catch {
    return defaults;
  }
}

export function firstMedia(item: { media?: Array<{ role: string; media: { url: string; altText?: string | null; type?: string } }> }, role?: string) {
  return (role ? item.media?.find((entry) => entry.role === role) : item.media?.[0])?.media ?? demoMedia.cabin;
}
