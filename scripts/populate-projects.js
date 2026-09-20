const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const storePath = path.join(__dirname, "..", "data", "local-store.json");
const store = JSON.parse(fs.readFileSync(storePath, "utf8"));

store.media = store.media || [];
store.projects = store.projects || [];

// Identify uploaded media
const uploadedMedia = store.media.filter(
  (m) => m.url && m.url.startsWith("/uploads/") && !m.url.includes("extract-")
);

const videos = uploadedMedia.filter((m) => m.type === "VIDEO");
const images = uploadedMedia.filter((m) => m.type === "IMAGE");

console.log(`Available uploads: ${videos.length} videos, ${images.length} images`);

const now = new Date().toISOString();

// Create the Showcase Project
const showcaseProject = {
  id: "ns-elevators-live-installations",
  name: "NS Elevators & Vertix Live Installations Showcase",
  slug: "ns-elevators-live-installations",
  location: "Peenya Industrial Hub & Greater Bangalore",
  categoryId: null,
  category: { name: "Live Site Engineering" },
  description:
    "Comprehensive on-site gallery and video telemetry from our active elevator installation projects, testing runs, custom car interiors, glass shafts, and passenger handovers.",
  challenge:
    "Executing high-precision mechanical fitment, shaft alignment, and custom interior finishing across fast-track industrial and luxury commercial project sites.",
  solution:
    "Integrated precision laser leveling, certified safety gear assembly, and custom architectural door & cabin fabrication.",
  elevatorType: "Custom Passenger, MRL & Panoramic Elevators",
  specifications: {
    location: "Peenya, Bengaluru",
    timeline: "Ongoing & Active Handover",
    results: "100% Safety Compliance Passed"
  },
  timeline: "2026 Active Sites",
  results: "Full Telemetry & Safety Certification Achieved",
  status: "PUBLISHED",
  createdAt: now,
  updatedAt: now,
  media: uploadedMedia.slice(0, 40).map((m, idx) => ({
    id: crypto.randomUUID(),
    projectId: "ns-elevators-live-installations",
    mediaId: m.id,
    role: idx === 0 ? "COVER" : m.type === "VIDEO" ? "VIDEO" : "GALLERY",
    sortOrder: idx,
    media: m
  }))
};

// Also create or preserve default projects
const defaultProjects = [
  {
    id: "skyline-prestige-tower",
    name: "Skyline Prestige Corporate Tower",
    slug: "skyline-prestige-tower",
    location: "Central Business District, Bangalore",
    categoryId: null,
    category: { name: "Commercial High-Rise" },
    description: "Turnkey installation of 6 high-speed gearless passenger elevators with intelligent destination dispatch and regenerative drives.",
    challenge: "High passenger traffic density during peak morning hours causing queue buildup.",
    solution: "Integrated ETA destination dispatch algorithms reducing average wait times by 42%.",
    elevatorType: "Apex High-Speed Passenger Lifts (2.5 m/s)",
    specifications: {},
    timeline: "Completed in 16 Weeks",
    results: "99.98% operational uptime recorded across first 12 months.",
    status: "PUBLISHED",
    createdAt: now,
    updatedAt: now,
    media: [
      {
        id: crypto.randomUUID(),
        projectId: "skyline-prestige-tower",
        mediaId: "demo-1",
        role: "COVER",
        sortOrder: 0,
        media: videos[0] || { url: "/images/brochure-extracts/extract-02.jpg", type: "IMAGE", altText: "Skyline Tower Lift" }
      },
      ...(images.slice(0, 3).map((img, i) => ({
        id: crypto.randomUUID(),
        projectId: "skyline-prestige-tower",
        mediaId: img.id,
        role: "GALLERY",
        sortOrder: i + 1,
        media: img
      })))
    ]
  },
  {
    id: "elysium-residence-villa",
    name: "The Elysium Luxury Villa Estate",
    slug: "elysium-residence-villa",
    location: "Whitefield, Bangalore",
    categoryId: null,
    category: { name: "Private Residential" },
    description: "Bespoke glass cabin residential lift designed with custom titanium champagne gold framework and whisper-quiet hydraulics.",
    challenge: "Strict noise constraints and minimal civil modification allowance in existing luxury duplex villa.",
    solution: "Engineered self-supporting steel structure with acoustic vibration dampers operating below 45 dBA.",
    elevatorType: "Imperium Bespoke Villa Lift (0.5 m/s)",
    specifications: {},
    timeline: "Completed in 6 Weeks",
    results: "Seamless architectural integration with zero structural damage to existing marble flooring.",
    status: "PUBLISHED",
    createdAt: now,
    updatedAt: now,
    media: [
      {
        id: crypto.randomUUID(),
        projectId: "elysium-residence-villa",
        mediaId: "demo-2",
        role: "COVER",
        sortOrder: 0,
        media: videos[1] || { url: "/images/brochure-extracts/extract-15.jpg", type: "IMAGE", altText: "Villa Lift" }
      },
      ...(images.slice(3, 6).map((img, i) => ({
        id: crypto.randomUUID(),
        projectId: "elysium-residence-villa",
        mediaId: img.id,
        role: "GALLERY",
        sortOrder: i + 1,
        media: img
      })))
    ]
  }
];

store.projects = [showcaseProject, ...defaultProjects];

fs.writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`, "utf8");
console.log(`PROJECTS POPULATED: ${store.projects.length} projects configured with ${uploadedMedia.length} media items.`);
