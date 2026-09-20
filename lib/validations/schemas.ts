import { z } from "zod";

export const quoteSchema = z.object({
  name: z.string().min(2),
  company: z.string().optional().default(""),
  email: z.string().email(),
  phone: z.string().min(7),
  projectType: z.string().min(2),
  location: z.string().min(2),
  buildingType: z.string().optional().default(""),
  numberOfFloors: z.coerce.number().int().positive().optional().or(z.literal("").transform(() => undefined)),
  elevatorType: z.string().optional().default(""),
  requiredCapacity: z.string().optional().default(""),
  message: z.string().optional().default("")
});

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().default(""),
  subject: z.string().min(2),
  message: z.string().min(5)
});

export const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  categoryId: z.string().optional().nullable(),
  shortDescription: z.string().min(10),
  fullDescription: z.string().min(10),
  capacity: z.string().optional().default(""),
  speed: z.string().optional().default(""),
  floors: z.string().optional().default(""),
  doorType: z.string().optional().default(""),
  driveType: z.string().optional().default(""),
  energyEfficiency: z.string().optional().default(""),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT")
});

export const projectSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  location: z.string().min(2),
  categoryId: z.string().optional().nullable(),
  description: z.string().min(2),
  challenge: z.string().optional().default(""),
  solution: z.string().optional().default(""),
  elevatorType: z.string().min(1).default("Passenger Elevator"),
  timeline: z.string().optional().default(""),
  results: z.string().optional().default(""),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("PUBLISHED")
});

export const serviceSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(10),
  benefits: z.array(z.string()).default([]),
  process: z.array(z.string()).default([]),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT")
});

export const mediaUpdateSchema = z.object({
  title: z.string().optional().nullable(),
  altText: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  category: z.enum(["PRODUCT", "PROJECT", "SERVICE", "HERO", "BLOG", "GENERAL", "TECHNOLOGY", "SAFETY", "QUALITY"]).optional()
});

export const authSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email(),
  password: z.string().min(8)
});
