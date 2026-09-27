import { prisma } from "@/lib/db/prisma";
import { ensureLocalProjects, ensureLocalResource, getLocalSettings } from "@/lib/local-store";
import { safeJson } from "@/lib/utils";

const demoMedia = {
  hero: {
    url: "/images/brochure-extracts/extract-02.jpg",
    altText: "Modern elevator entrance with marble wall finish and indoor plants",
    type: "IMAGE"
  },
  cabin: {
    url: "/images/brochure-extracts/extract-15.jpg",
    altText: "Wood finish elevator cabin with stainless steel wall panels",
    type: "IMAGE"
  },
  glassDoor: {
    url: "/images/brochure-extracts/extract-13.jpg",
    altText: "Glass door elevator cabin with contemporary interior finish",
    type: "IMAGE"
  },
  luxuryCabin: {
    url: "/images/brochure-extracts/extract-31.jpg",
    altText: "Premium golden elevator cabin with decorative ceiling and floor",
    type: "IMAGE"
  },
  installation: {
    url: "/images/brochure-extracts/extract-28.jpg",
    altText: "Elevator shaft installation work in progress",
    type: "IMAGE"
  }
};

export const demoProducts = [
  {
    id: "passenger-elevator",
    name: "Passenger Lift (Traction & MRL)",
    slug: "passenger-lift",
    shortDescription: "High-performance passenger elevators powered by Montanari, Torin, and Mona 5HP & 10HP drives for residential, commercial, and high-rise towers.",
    fullDescription: "VERTIX TECHNO ELEVATOR passenger lifts deliver the highest standards of safety, comfort, and reliability. Engineered with Italian Montanari, Torin, and Mona 5HP/10HP gearless and geared motor options. Available in both Lift with Machine Room (LMR, 4500mm overhead, 1350mm pit) and Machine Room Less (MRL, 4500mm overhead, 1500mm pit) configurations. Cabins feature SS Silver finish, MS Powder Coated, or 304 Grade Designer Gold etched finishes.",
    capacity: "4P (272 kg) to 17P (1150 kg)",
    speed: "1.0 m/s - 2.5 m/s",
    floors: "Up to 30 Stops (100m Travel)",
    doorType: "Automatic Center Opening / Side Opening SS",
    driveType: "Montanari / Torin / Mona 5HP & 10HP PMSM Gearless Drive",
    energyEfficiency: "Class A+++ Energy Saving Drive",
    safetyFeatures: ["Emergency Battery Drive Automatic (ARD)", "Full-Height Curtain of Light (SIC)", "Car Emergency Lighting (CEL)", "Fireman's Drive (FBD)", "Accurate Re-leveling (ACL-C)", "Lift Announcer (LAS)"],
    finishes: ["SS Silver Finish Designer", "MS Powder-Coated", "MS Pre-Coated", "Designer Gold 304 Grade (Mapple Gold, Splendor, Egyptian)"],
    applications: ["Residential Apartments", "Commercial Corporate Towers", "Hotels & Tech Parks"],
    category: { name: "Passenger Lift" },
    media: [{ role: "MAIN", media: demoMedia.hero }, { role: "GALLERY", media: demoMedia.luxuryCabin }]
  },
  {
    id: "home-villa-elevator",
    name: "Home Lift (Luxury Villa Lift)",
    slug: "home-lift",
    shortDescription: "Architectural villa lifts requiring minimal pit depth (250-300mm), whisper acoustics, single-phase power, and bespoke designer cabin finishes.",
    fullDescription: "Designed specifically for independent bungalows, duplex residences, and villas. Requires zero conventional rooftop machine room and operates seamlessly on single-phase or three-phase power. Features bespoke cabin choices including Italian marble, wooden flooring, panoramic glass walls, and designer Gold/Rose Gold 304 stainless steel.",
    capacity: "320 - 450 kg (4 to 6 Persons)",
    speed: "0.4 m/s - 0.65 m/s",
    floors: "Up to 6 Floors (G+5)",
    doorType: "Automatic Glass Doors / Telescopic Sliding",
    driveType: "Machine Room-Less (MRL) PMSM Eco-Drive",
    energyEfficiency: "Ultra-Low Power Standby (<50W)",
    safetyFeatures: ["Emergency Battery Drive Automatic (ARD)", "Manual Emergency Lowering", "Light Curtain in Car", "In-Cabin Intercom Telephone", "Child Safety Lock Station"],
    finishes: ["Gold Cabin", "Rose Gold Cabin", "Wooden Gold Cabin", "SS Silver Designer"],
    applications: ["Private Villas", "Duplex Bungalows", "Penthouses", "Row Houses"],
    category: { name: "Home Lift" },
    media: [{ role: "MAIN", media: demoMedia.cabin }, { role: "GALLERY", media: demoMedia.luxuryCabin }]
  },
  {
    id: "hospital-bed-elevator",
    name: "Hospital Lift (Bed Cum Passenger)",
    slug: "hospital-lift",
    shortDescription: "Extra-deep hospital bed and stretcher elevators engineered for gentle acceleration, jerk-free floor leveling, and medical emergency override.",
    fullDescription: "Engineered in strict accordance with healthcare standards. Accommodates standard ICU beds, stretchers, medical personnel, and diagnostic equipment. Features 32-bit closed-loop VVVF vector leveling for 1mm accurate floor stops without sudden jerks. Cabin is lined with antibacterial 304 stainless steel, anti-skid PVC flooring, and protective collision handrails.",
    capacity: "15P (1000 kg) to 26P (1800 kg) Bed Capacity",
    speed: "1.0 m/s - 1.75 m/s",
    floors: "Up to 25 Floors",
    doorType: "Extra-Wide Telescopic 2-Panel / Center Opening (900mm - 1000mm DO)",
    driveType: "Closed-Loop Vector PMSM Gearless Drive",
    energyEfficiency: "Continuous Hospital Duty Rating S1",
    safetyFeatures: ["Priority Code-Blue Medical Recall", "Emergency Battery Drive Automatic (ARD)", "Full-Height Light Curtain", "Antibacterial Touchpoints", "Extended Door Hold Time"],
    finishes: ["Medical 304 Stainless Steel", "Anti-Skid PVC Flooring", "S.S Hollow Round Handrails"],
    applications: ["Multi-Specialty Hospitals", "Trauma Centers", "Medical Clinics", "Nursing Homes"],
    category: { name: "Hospital Lift" },
    media: [{ role: "MAIN", media: demoMedia.hero }, { role: "GALLERY", media: demoMedia.cabin }]
  },
  {
    id: "hydraulic-elevator",
    name: "Hydraulic Lift (Low Overhead)",
    slug: "hydraulic-lift",
    shortDescription: "Heavy-duty, low-overhead hydraulic elevators requiring only 10 to 12 feet overhead height, ideal for low-rise structures and heavy loads.",
    fullDescription: "Vertix Hydraulic Lifts are the ideal vertical mobility solution where roof overhead space is restricted. Operating on compact 10-12 feet overhead clearance, the hydraulic power pack can be positioned remotely up to 10 meters away from the shaft. Perfect for villas, retail showrooms, factory mezzanine floors, and residential retrofits.",
    capacity: "300 kg to 3000 kg",
    speed: "0.35 m/s - 0.6 m/s",
    floors: "Up to 5 Stops (15m Travel)",
    doorType: "Manual Collapsible / Swing / Automatic Power Doors",
    driveType: "Precision Direct or Indirect Hydraulic Ram with Power Pack",
    energyEfficiency: "Zero Power Consumption on Gravity Descent",
    safetyFeatures: ["Rupture Valve Hydraulic Lock", "Emergency Manual Lowering Valve", "Emergency Battery Drive Automatic (ARD)", "Overload Pressure Relief Switch"],
    finishes: ["SS Silver Finish", "MS Powder-Coated", "Wooden Flooring or PVC Flooring"],
    applications: ["Low-Rise Residences", "Retail Showrooms", "Factory Mezzanines", "Warehouses"],
    category: { name: "Hydraulic Lift" },
    media: [{ role: "MAIN", media: demoMedia.glassDoor }, { role: "GALLERY", media: demoMedia.hero }]
  },
  {
    id: "goods-freight-elevator",
    name: "Goods Lift (Goods Cum Passenger)",
    slug: "goods-lift",
    shortDescription: "Rugged industrial freight workhorses capable of lifting 750 kg up to 5000 kg (11 to 74 persons equivalent) with reinforced steel construction.",
    fullDescription: "Engineered for factories, logistic hubs, automotive centers, and commercial distribution facilities. Features reinforced structural steel car bodies, non-slip chequered diamond plate steel or heavy-duty PVC flooring, heavy impact door buffers, and high-torque Montanari/Torin geared and gearless heavy drives.",
    capacity: "11P (750 kg) to 74P (5000 kg)",
    speed: "0.35 m/s - 1.0 m/s",
    floors: "Up to 15 Floors",
    doorType: "Heavy-Duty Bi-Parting / Multi-Slide Telescopic Steel Doors",
    driveType: "Heavy-Duty Geared / Gearless High-Torque Hoisting Machine",
    energyEfficiency: "Continuous Industrial S2 Duty Cycle",
    safetyFeatures: ["Mechanical Over-Speed Governor & Safety Clamps", "Overload Alarm with Buzzer", "Emergency Stop Buttons", "Heavy-Gauge Structural Bumpers"],
    finishes: ["Reinforced Galvanized Steel Panels", "Industrial Chequered Floor", "Painted Black Round Handrails"],
    applications: ["Manufacturing Plants", "Logistic Warehouses", "Commercial Distribution Hubs", "Automotive Service Centers"],
    category: { name: "Goods Lift" },
    media: [{ role: "MAIN", media: demoMedia.installation }, { role: "GALLERY", media: demoMedia.cabin }]
  },
  {
    id: "horizon-mrl-elevator",
    name: "MRL Lift (Machine Room Less)",
    slug: "mrl-lift",
    shortDescription: "Compact elevator architecture eliminating roof penthouses with 4500mm overhead, 1500mm pit, and 35% reduced power consumption.",
    fullDescription: "The Vertix MRL (Machine Room Less) system positions the permanent magnet gearless motor directly inside the shaft headroom, completely freeing developers from building an expensive rooftop machine room. Features 14+ feet minimum overhead, 1500mm pit depth, and full compatibility with Montanari and Torin PMSM motors.",
    capacity: "5P (540 kg) to 15P (1020 kg)",
    speed: "1.0 m/s - 2.0 m/s",
    floors: "Up to 24 Floors",
    doorType: "Automatic Center Opening / Side Opening SS",
    driveType: "Ultra-Compact Montanari / Torin PMSM In-Shaft Drive",
    energyEfficiency: "Class A Eco-Conserving Drive",
    safetyFeatures: ["Emergency Battery Drive Automatic (ARD)", "Accurate Re-leveling (ACL-C)", "Shaft Pit Service Platform Lock", "Digital Diagnostics Telemetry"],
    finishes: ["SS Silver Designer", "MS Pre-Coated Designer", "Designer Gold 304 Grade", "LCD / Dotmatrix / Touch Operating Panels"],
    applications: ["Commercial Offices", "Boutique Hotels", "Apartment Complexes", "Hospitality"],
    category: { name: "MRL Lift" },
    media: [{ role: "MAIN", media: demoMedia.luxuryCabin }, { role: "GALLERY", media: demoMedia.hero }]
  }
];

export const demoProjects = [
  {
    id: "skyline-prestige-tower",
    name: "Skyline Prestige Corporate Tower",
    slug: "skyline-prestige-corporate-tower",
    location: "Bangalore CBD, Tech Zone",
    description: "Turnkey installation of 6 high-speed 2.5 m/s passenger elevators equipped with smart destination dispatch, regenerative drives, and touchless call systems.",
    challenge: "High passenger peak traffic during morning rush hours in a 28-story corporate headquarters.",
    solution: "Implemented AI-powered destination dispatch routing which reduced average wait times by 38% and peak power usage by 24%.",
    elevatorType: "High-Speed Passenger Elevators (2.5 m/s)",
    timeline: "Completed in 4 Months",
    results: "99.98% operational uptime across 18 months with zero unplanned maintenance halts.",
    category: { name: "Commercial" },
    media: [{ role: "COVER", media: demoMedia.hero }, { role: "GALLERY", media: demoMedia.luxuryCabin }]
  },
  {
    id: "elysium-residence-villa",
    name: "The Elysium Luxury Villa Estate",
    slug: "the-elysium-luxury-villa-estate",
    location: "Jubilee Hills, Hyderabad",
    description: "Custom-crafted 4-stop panoramic glass and rose-gold villa lift integrating seamlessly into a triple-height spiral staircase atrium.",
    challenge: "Restricted pit depth of only 250mm and requirement for ultra-silent operation below 40dB.",
    solution: "Engineered an ultra-shallow pit PMSM traction elevator with bespoke brushed champagne gold cabin framing and laminated acoustic glass.",
    elevatorType: "Custom Villa Panoramic Lift",
    timeline: "Completed in 6 Weeks",
    results: "Whisper-quiet vertical movement praised by architectural design award panel.",
    category: { name: "Luxury Villa" },
    media: [{ role: "COVER", media: demoMedia.luxuryCabin }, { role: "GALLERY", media: demoMedia.glassDoor }]
  },
  {
    id: "apollo-healthcare-centre",
    name: "Apollo Multi-Specialty Healthcare Wing",
    slug: "apollo-multi-specialty-healthcare-wing",
    location: "Chennai Medical Corridor",
    description: "Installation of 4 heavy-duty hospital bed elevators with priority code-blue override and antibacterial interior touch-surfaces.",
    challenge: "Rapid emergency transit for critical ICU patients with zero jerk on starting or stopping.",
    solution: "Deployed 32-bit closed-loop VVVF vector leveling system achieving 1mm floor level accuracy and jerk-free travel.",
    elevatorType: "Hospital Bed Elevators (1600 kg)",
    timeline: "Completed in 10 Weeks",
    results: "Certified by clinical safety auditors for critical ICU and emergency operation.",
    category: { name: "Healthcare" },
    media: [{ role: "COVER", media: demoMedia.hero }, { role: "GALLERY", media: demoMedia.cabin }]
  },
  {
    id: "zenith-commercial-centre",
    name: "Zenith Business Bay Atrium",
    slug: "zenith-business-bay-atrium",
    location: "BKC, Mumbai",
    description: "Dual panoramic glass observation lifts operating in a 60-meter high exposed atrium with integrated external LED illumination.",
    challenge: "Wind load resistance and aesthetic integration with structural glass facade.",
    solution: "Aerodynamic circular cabin profile with structural tension cable guides and high-efficiency regenerative drive.",
    elevatorType: "360° Scenic Glass Elevators",
    timeline: "Completed in 14 Weeks",
    results: "Iconic visual centerpiece attracting over 15,000 daily visitors.",
    category: { name: "Commercial" },
    media: [{ role: "COVER", media: demoMedia.glassDoor }, { role: "GALLERY", media: demoMedia.hero }]
  }
];

export const demoServices = [
  {
    id: "new-installation",
    name: "New Installation",
    slug: "new-installation",
    description: "Turnkey elevator engineering from structural shaft survey, 3D CAD fitment, precision manufacturing, on-site erection, to government safety licensing and commissioning.",
    benefits: ["Complete shaft structural survey & 3D CAD fitment", "EN 81-20/50 & IS 14665 standard compliance", "Full factory warranty with 1st year complimentary maintenance support"],
    process: ["Site Survey & Shaft Dimension Analysis", "Custom CAD Engineering & Technical Approval", "Precision Manufacturing & Quality Control", "Safe Erection & Mechanical Rigging", "Full Testing, Safety Licensing & Handover"],
    media: [{ role: "IMAGE", media: demoMedia.installation }]
  },
  {
    id: "maintenance",
    name: "Maintenance",
    slug: "maintenance",
    description: "Proactive preventive maintenance visits, 48-point safety checklists, and 24/7 emergency breakdown assistance ensuring smooth, silent, and reliable lift operation.",
    benefits: ["Guaranteed 99.9% operational uptime SLA", "Genuine OEM factory replacement parts", "Dedicated 24/7 emergency rescue hotline (+91 63605 98915)"],
    process: ["Scheduled Monthly Inspection & Lubrication", "Controller & Telemetry Calibration", "Door Interlock & Safety Brake Testing", "Vibration & Acoustic Analysis", "Digital Service Log & Customer Reporting"],
    media: [{ role: "IMAGE", media: demoMedia.cabin }]
  },
  {
    id: "amc-service",
    name: "AMC Service",
    slug: "amc-service",
    description: "Comprehensive and Non-Comprehensive Annual Maintenance Contracts (AMC) designed to extend equipment lifespan, minimize unexpected downtime, and manage costs.",
    benefits: ["Priority breakdown routing within 30 minutes", "Routine scheduled check-ups & safety adjustments", "Transparent pricing with no hidden charges"],
    process: ["Initial Comprehensive Equipment Health Audit", "Custom AMC Plan Recommendation", "Regular Scheduled Maintenance Calendar", "Quarterly Safety Load Testing", "Annual Government Compliance Inspection Support"],
    media: [{ role: "IMAGE", media: demoMedia.luxuryCabin }]
  },
  {
    id: "modification",
    name: "Modification (Modernization)",
    slug: "modification",
    description: "Transform older, noisy, or power-hungry elevators into high-efficiency, safe, and visually stunning modern systems with gearless PMSM drives and designer cabins.",
    benefits: ["Up to 40% electricity conservation with PMSM motors", "Elimination of abrupt jerks with millimeter floor leveling", "Cabin aesthetic overhaul with Gold, Rose Gold, or Wooden finishes"],
    process: ["Mechanical & Electrical Health Evaluation", "Custom Modernization Blueprint & Quotation", "Phased Component Retrofit to Minimize Downtime", "New Microprocessor Controller & ARD Integration", "Final Safety Testing & Handover"],
    media: [{ role: "IMAGE", media: demoMedia.hero }]
  }
];

export const demoFaqs = [
  {
    id: "faq-pit-depth",
    question: "What minimum pit depth and headroom are required for a Vertix Home Villa elevator?",
    answer: "Our modern MRL home villa lifts are engineered for existing and new residences with minimal civil impact. We require a pit depth as shallow as 250mm to 300mm, and headroom of only 2800mm, completely eliminating the need for a rooftop machine room.",
    category: "Technical Specifications",
    sortOrder: 1
  },
  {
    id: "faq-safety-power-failure",
    question: "What happens during a sudden power outage? Can passengers get trapped?",
    answer: "Every Vertix elevator comes standard with an Automatic Rescue Device (ARD) powered by an industrial emergency battery bank. In the event of a power failure, the ARD instantly activates, softly drives the cabin to the nearest floor, unlocks the doors, and allows passengers to safely step out.",
    category: "Safety & Emergency",
    sortOrder: 2
  },
  {
    id: "faq-amc-cost",
    question: "What is included in the Vertix Annual Maintenance Contract (AMC)?",
    answer: "Our Comprehensive AMC includes monthly 48-point safety and mechanical inspections, regular lubrication, brake testing, 24/7 emergency breakdown support, all genuine replacement wear-and-tear parts, and digital service compliance logs.",
    category: "Maintenance & AMC",
    sortOrder: 3
  },
  {
    id: "faq-delivery-timeline",
    question: "What is the typical manufacturing and installation timeline for a new elevator?",
    answer: "Standard passenger and home lifts typically require 4 to 6 weeks for precision manufacturing and 2 to 3 weeks for on-site erection and testing. Bespoke architectural glass and custom finishes require approximately 8 to 10 weeks turnkey.",
    category: "Installation & Process",
    sortOrder: 4
  },
  {
    id: "faq-certifications",
    question: "Which safety standards and building codes do Vertix elevators comply with?",
    answer: "All Vertix elevators are manufactured and tested in strict compliance with Bureau of Indian Standards (IS 14665), European Norms (EN 81-20 / EN 81-50), and ISO 9001:2015 quality management procedures.",
    category: "Quality & Compliance",
    sortOrder: 5
  },
  {
    id: "faq-quote-process",
    question: "How do I obtain a formal architectural quotation and shaft drawing?",
    answer: "You can use our online Instant Quote Calculator or submit our Quote Request form with your project location and number of floors. Our application engineering team will send you preliminary GA drawings and a transparent cost estimate within 2 to 4 business hours.",
    category: "Quotes & Pricing",
    sortOrder: 6
  }
];

export const demoPosts = [
  {
    id: "choosing-right-elevator",
    title: "How to Choose the Right Elevator for High-Rise vs Villa Residences",
    slug: "how-to-choose-the-right-elevator",
    excerpt: "Key considerations in drive selection, speed matching, pit dimensions, and energy efficiency when planning vertical mobility.",
    content: "When selecting an elevator for modern architectural buildings, developers and homeowners must evaluate passenger traffic patterns, structural shaft dimensions, and drive technology...",
    author: "Chief Applications Engineer",
    publishedAt: new Date(),
    category: { name: "Engineering Guide" },
    coverMedia: demoMedia.hero
  },
  {
    id: "energy-efficient-elevators",
    title: "The Physics of Regenerative Braking in Gearless PMSM Elevators",
    slug: "physics-of-regenerative-braking-in-elevators",
    excerpt: "Learn how modern elevator systems capture gravitational energy during descent and feed clean power back into the building grid.",
    content: "Regenerative drives convert kinetic and gravitational energy generated when a fully loaded elevator travels downward into usable AC power...",
    author: "Electrical Systems Lead",
    publishedAt: new Date(),
    category: { name: "Technology" },
    coverMedia: demoMedia.luxuryCabin
  },
  {
    id: "safety-standards-guide",
    title: "Understanding EN 81-20/50 and IS 14665 Elevator Safety Standards",
    slug: "understanding-elevator-safety-standards",
    excerpt: "A practical guide to international elevator safety benchmarks, door light curtains, and overspeed governing mechanisms.",
    content: "Passenger safety is the paramount requirement of vertical mobility engineering. This article outlines the critical criteria established by EN 81-20...",
    author: "Safety Director",
    publishedAt: new Date(),
    category: { name: "Safety Standards" },
    coverMedia: demoMedia.installation
  }
];

export const demoTestimonials = [
  {
    id: "1",
    customerName: "Ar. Vikram Singhania",
    company: "Singhania & Associates Architects",
    designation: "Principal Architect",
    quote: "Vertix delivered a custom glass and champagne-gold elevator for our flagship penthouse project in Bangalore. The attention to detail, mirror-finish precision, and silent operation exceeded our client's expectations.",
    rating: 5,
    isDemo: false
  },
  {
    id: "2",
    customerName: "Rajeshwar Rao",
    company: "Prestige Heights Infrastructure",
    designation: "Director of Projects",
    quote: "We commissioned 8 high-speed passenger elevators with Vertix across our commercial towers. The destination dispatch system has drastically cut peak wait times, and their 24/7 service response is truly unmatched.",
    rating: 5,
    isDemo: false
  },
  {
    id: "3",
    customerName: "Dr. Meenakshi Sundaram",
    company: "Apex Healthcare & Specialty Hospital",
    designation: "Medical Superintendent",
    quote: "The hospital bed elevators engineered by Vertix provide the smoothest floor leveling we have ever experienced. Critical care patients transfer between floors with zero jerk, which is vital for post-surgery transit.",
    rating: 5,
    isDemo: false
  },
  {
    id: "4",
    customerName: "Kavita Krishnamurthy",
    company: "Elysium Private Residence",
    designation: "Homeowner",
    quote: "Installing the Vertix villa lift was completely painless. They managed the civil fitment within our existing duplex space without disturbing the interior decor. It runs whisper-quiet and looks like a piece of art.",
    rating: 5,
    isDemo: false
  }
];

async function fromDb<T>(query: () => Promise<T>, fallback: unknown): Promise<T | any> {
  if (!process.env.DATABASE_URL) return fallback as any;
  try {
    return await query();
  } catch {
    return fallback as any;
  }
}

export async function getProducts() {
  if (!process.env.DATABASE_URL) return ensureLocalResource("products", demoProducts);
  return fromDb(
    () => prisma.product.findMany({ where: { status: "PUBLISHED" }, include: { category: true, media: { include: { media: true }, orderBy: { sortOrder: "asc" } } }, orderBy: { updatedAt: "desc" } }),
    demoProducts as any
  );
}

export async function getProduct(slug: string) {
  const products = await getProducts();
  return products.find((product: any) => product.slug === slug) ?? null;
}

export async function getProjects() {
  if (!process.env.DATABASE_URL) return ensureLocalProjects(demoProjects);
  return fromDb(
    () => prisma.project.findMany({ where: { status: "PUBLISHED" }, include: { category: true, media: { include: { media: true }, orderBy: { sortOrder: "asc" } } }, orderBy: { updatedAt: "desc" } }),
    demoProjects as any
  );
}

export async function getProject(slug: string) {
  const projects = await getProjects();
  return projects.find((project: any) => project.slug === slug) ?? null;
}

export async function getServices() {
  if (!process.env.DATABASE_URL) return ensureLocalResource("services", demoServices);
  return fromDb(() => prisma.service.findMany({ where: { status: "PUBLISHED" }, include: { media: { include: { media: true } } }, orderBy: { updatedAt: "desc" } }), demoServices as any);
}

export async function getFaqs() {
  if (!process.env.DATABASE_URL) return ensureLocalResource("faq", demoFaqs);
  return fromDb(() => prisma.fAQ.findMany({ where: { status: "PUBLISHED" }, orderBy: [{ category: "asc" }, { sortOrder: "asc" }] }), demoFaqs);
}

export async function getPosts() {
  if (!process.env.DATABASE_URL) return ensureLocalResource("blog", demoPosts);
  return fromDb(() => prisma.blogPost.findMany({ where: { status: "PUBLISHED" }, include: { category: true, coverMedia: true }, orderBy: { publishedAt: "desc" } }), demoPosts as any);
}

export async function getPost(slug: string) {
  const posts = await getPosts();
  return posts.find((post: any) => post.slug === slug) ?? null;
}

export async function getTestimonials() {
  if (!process.env.DATABASE_URL) return ensureLocalResource("testimonials", demoTestimonials);
  return fromDb(() => prisma.testimonial.findMany({ where: { status: "PUBLISHED" }, include: { photoMedia: true }, orderBy: { updatedAt: "desc" } }), demoTestimonials as any);
}

export async function getSettings() {
  const defaults = {
    general: {
      companyName: "VERTIX TECHNO ELEVATOR",
      tagline: "Elevating Nature. Enriching Life. — Elevating Safety, Comfort & Reliability",
      description: "VERTIX TECHNO ELEVATOR is committed to providing innovative, safe, and reliable solutions for vertical transportation in India. We offer high-quality elevator products and services designed for residential, commercial, industrial, and institutional buildings."
    },
    homepage: {
      heroTitle: "ELEVATING SAFETY, COMFORT & RELIABILITY.",
      heroSubtitle: "Innovative, safe, and dependable vertical transportation in India. High-performance passenger lifts, home villa lifts, hospital lifts, hydraulic lifts, and goods elevators.",
      heroButton: "EXPLORE ELEVATOR MODELS",
      quoteButton: "CALCULATE INSTANT ESTIMATE"
    },
    statistics: [
      { value: "15+", label: "Years of Engineering" },
      { value: "750+", label: "Lifts Commissioned" },
      { value: "99.9%", label: "Uptime Telemetry SLA" },
      { value: "100%", label: "EN 81-20/50 Certified" }
    ],
    contact: {
      phone: "+91 63605 98915",
      email: "manthmint@gmail.com",
      address: "Ground Floor, 3/3/2, Sarck Preci Tech, Rajagopal Nagar Main Road, 3rd Phase, 9th Cross Road, Beadie Kamadhenu Auto CNC Private Limited, Peenya, Bengaluru, Karnataka - 560058",
      businessHours: "24/7 Emergency Dispatch • Office: Mon-Sat 9AM - 7PM",
      gstin: "29EIDPM7520J1ZX"
    }
  };
  try {
    if (!process.env.DATABASE_URL) {
      const localSettings = await getLocalSettings();
      return { ...defaults, ...localSettings } as typeof defaults & Record<string, unknown>;
    }
    const rows = await prisma.siteSetting.findMany({ include: { media: true } });
    return rows.reduce((acc, row) => ({ ...acc, [row.key]: row.media ? { ...safeJson(row.value, {}), media: row.media } : row.value }), defaults as Record<string, unknown>) as typeof defaults & Record<string, unknown>;
  } catch {
    return defaults;
  }
}

export function firstMedia(item: { media?: Array<{ role: string; media: { url: string; altText?: string | null; type?: string } }> }, role?: string) {
  return (role ? item.media?.find((entry) => entry.role === role) : item.media?.[0])?.media ?? demoMedia.cabin;
}
