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
    id: "apex-passenger-elevator",
    name: "Apex High-Speed Passenger Elevator",
    slug: "apex-passenger-elevator",
    shortDescription: "Ultra-smooth, energy-efficient passenger lift engineered for modern commercial towers, premium residences, and corporate hubs.",
    fullDescription: "The Vertix Apex represents high-speed vertical transportation engineering. Utilizing synchronous permanent magnet (PMSM) gearless drives and 32-bit microprocessor VVVF vector closed-loop control, Apex delivers vibration-free rides, millimeter-accurate floor levelling, and up to 40% energy conservation with regenerative braking.",
    capacity: "680 - 1600 kg (8 to 21 Passengers)",
    speed: "1.0 m/s - 4.0 m/s",
    floors: "Up to 40 Stops (120m Travel)",
    doorType: "Center Opening / Side Opening Automatic SS",
    driveType: "Gearless Permanent Magnet Synchronous (PMSM)",
    energyEfficiency: "Class A+++ (VDI 4707 Standard)",
    safetyFeatures: ["Automatic Rescue Device (ARD)", "Full-Height Infrared Light Curtain", "Over-Speed Governor & Bi-directional Safety Gear", "Seismic & Fire Recall Systems"],
    finishes: ["Mirror Finish Champagne Gold", "Hairline Titanium Stainless Steel", "Acoustic Back-lit Glass"],
    applications: ["Commercial High-Rise", "Luxury Residential Towers", "Hotels & Corporate HQs"],
    category: { name: "Passenger Elevators" },
    media: [{ role: "MAIN", media: demoMedia.hero }, { role: "GALLERY", media: demoMedia.luxuryCabin }]
  },
  {
    id: "imperium-villa-home-elevator",
    name: "Imperium Bespoke Home Villa Lift",
    slug: "imperium-villa-home-elevator",
    shortDescription: "Architectural luxury villa lifts designed with ultra-low pit requirements, whisper-quiet operation, and bespoke cabin styling.",
    fullDescription: "Designed specifically for bungalows, duplex residences, and private estates, the Imperium series requires zero conventional machine room and operates seamlessly on single-phase or three-phase power. Tailor-made cabin finishes range from Italian marble inlays to warm acoustic timber and panoramic structural glass.",
    capacity: "320 - 450 kg (4 to 6 Persons)",
    speed: "0.4 m/s - 0.65 m/s",
    floors: "Up to 6 Floors (G+5)",
    doorType: "Automatic Glass Doors / Telescopic Sliding",
    driveType: "Machine Room-Less (MRL) PMSM Eco-Drive",
    energyEfficiency: "Ultra-Low Power Standby (<50W)",
    safetyFeatures: ["Emergency Automatic Evacuation to Nearest Floor", "Manual Emergency Lowering System", "Child Safety Lock Station", "Intercom & In-Cabin Emergency Phone"],
    finishes: ["Brushed Rose Gold", "Italian Walnut & Bronze", "Clear Tempered Glass Enclosure"],
    applications: ["Private Villas", "Penthouses", "Duplex Residencies", "Heritage Bungalows"],
    category: { name: "Home Elevators" },
    media: [{ role: "MAIN", media: demoMedia.cabin }, { role: "GALLERY", media: demoMedia.luxuryCabin }]
  },
  {
    id: "solis-panoramic-glass-elevator",
    name: "Solis 360° Panoramic Glass Elevator",
    slug: "solis-panoramic-glass-elevator",
    shortDescription: "Iconic scenic lifts offering breathtaking 360° architectural views with frameless laminated safety glass and luminous ambient illumination.",
    fullDescription: "Transform building lobbies and atriums into visual masterpieces. The Solis series combines curved structural laminated glass, polished circular stainless steel cars, and whisper-quiet traction drives that provide passengers with panoramic vistas during vertical transit.",
    capacity: "630 - 1350 kg (8 to 18 Persons)",
    speed: "1.0 m/s - 2.5 m/s",
    floors: "Up to 30 Floors",
    doorType: "Full Glass Center-Opening Automated Doors",
    driveType: "Silent Gearless Traction Drive",
    energyEfficiency: "High Efficiency Regenerative Eco-System",
    safetyFeatures: ["Multi-layer Laminated Shatter-proof Glass", "Automatic Rescue Device", "Electronic Safety Clamp", "High-Torque Door Sensor Detection"],
    finishes: ["Curved Crystal Glass", "Mirror Gold Accents", "Starry Sky Fiber Optic Ceiling"],
    applications: ["Shopping Atriums", "Luxury Resorts", "Airport Terminals", "Observation Decks"],
    category: { name: "Panoramic Elevators" },
    media: [{ role: "MAIN", media: demoMedia.glassDoor }, { role: "GALLERY", media: demoMedia.hero }]
  },
  {
    id: "cura-hospital-bed-elevator",
    name: "Cura Precision Hospital Bed Elevator",
    slug: "cura-hospital-bed-elevator",
    shortDescription: "Spacious, germ-resistant healthcare lifts designed for critical patient transit, stretchers, medical staff, and sensitive equipment.",
    fullDescription: "Engineered specifically for medical centers and hospitals. Features deep cabin dimensions for full ICU beds and stretchers, gentle acceleration curves to prevent patient discomfort, antibacterial stainless steel touch points, and priority emergency code dispatch overrides.",
    capacity: "1020 - 2040 kg (15 to 26 Persons / Stretcher)",
    speed: "1.0 m/s - 1.75 m/s",
    floors: "Up to 25 Floors",
    doorType: "Extra-Wide Telescopic 2-Panel / 3-Panel Doors",
    driveType: "Micro-Leveling VVVF Closed Loop Drive",
    energyEfficiency: "Continuous Hospital Duty Rating S1",
    safetyFeatures: ["Emergency Medical Code Blue Priority Override", "Antibacterial Ion Air Purification", "Extended Door Hold Time for Stretchers", "Uninterruptible Power Supply (UPS) Backup"],
    finishes: ["Medical-Grade 304/316 Stainless Steel", "Seamless PVC Flooring", "Anti-Collision Guard Rails"],
    applications: ["Multi-Specialty Hospitals", "Trauma Centers", "Diagnostics Facilities", "Nursing Homes"],
    category: { name: "Hospital Elevators" },
    media: [{ role: "MAIN", media: demoMedia.hero }, { role: "GALLERY", media: demoMedia.cabin }]
  },
  {
    id: "titan-freight-goods-elevator",
    name: "Titan Heavy-Duty Goods & Freight Elevator",
    slug: "titan-freight-goods-elevator",
    shortDescription: "Rugged industrial workhorses built to transport heavy cargo, pallet jacks, and industrial equipment with zero downtime.",
    fullDescription: "Engineered for factories, logistic hubs, retail fulfillment centers, and manufacturing plants. Features reinforced heavy-gauge structural car frames, non-slip chequered diamond plate steel floors, heavy-duty vertical bi-parting or sliding doors, and maximum structural endurance.",
    capacity: "1000 - 5000 kg Heavy Freight",
    speed: "0.5 m/s - 1.0 m/s",
    floors: "Up to 12 Floors",
    doorType: "Heavy-Duty Bi-parting / Multi-slide Steel Shutter",
    driveType: "High-Torque Heavy Geared / Gearless Machine",
    energyEfficiency: "Heavy Industrial Continuous Cycle",
    safetyFeatures: ["Overload Alarm & Anti-Bounce Levelling", "Structural Bumpers & Wall Armor", "Heavy Impact Door Buffers", "Industrial Emergency Stop Circuitry"],
    finishes: ["Industrial Chequered Steel", "Reinforced Galvanized Steel Panels", "High-Impact Corner Bumpers"],
    applications: ["Warehouses", "Industrial Manufacturing", "Automotive Hubs", "Department Stores"],
    category: { name: "Goods Elevators" },
    media: [{ role: "MAIN", media: demoMedia.installation }, { role: "GALLERY", media: demoMedia.cabin }]
  },
  {
    id: "horizon-mrl-elevator",
    name: "Horizon Machine-Room-Less (MRL) Lift",
    slug: "horizon-mrl-elevator",
    shortDescription: "Next-generation compact elevator architecture eliminating roof penthouses and freeing up architectural building space.",
    fullDescription: "The Vertix Horizon integrates the entire hoisting drive inside the elevator shaft headroom, completely freeing developers from constructing rooftop machine room structures. Maximizes architectural freedom, lowers building civil construction costs, and reduces electricity consumption by 35%.",
    capacity: "450 - 1150 kg (6 to 15 Persons)",
    speed: "1.0 m/s - 2.0 m/s",
    floors: "Up to 24 Floors",
    doorType: "Automatic Center Opening Stainless Steel",
    driveType: "Ultra-Compact Gearless PMSM In-Shaft Drive",
    energyEfficiency: "Class A Eco-Conserving",
    safetyFeatures: ["Shaft Pit Service Platform Lock", "Electronic Door Interlocks", "Automatic Levelling Rescue System", "Digital Diagnostics Telemetry"],
    finishes: ["Hairline Stainless Steel", "Champagne Mirror Gold", "Architectural LED Lighting"],
    applications: ["Commercial Offices", "Boutique Hotels", "Apartment Complexes", "Mixed-Use Buildings"],
    category: { name: "MRL Elevators" },
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
    id: "custom-elevator-installation",
    name: "New Elevator Engineering & Installation",
    slug: "custom-elevator-installation",
    description: "End-to-end turnkey elevator design, structural 3D CAD shaft surveys, precision manufacturing, and safe on-site erection.",
    benefits: ["Complete shaft structural survey", "EN 81-20/50 and IS 14665 compliance", "Full factory warranty with 1st year complimentary AMC"],
    process: ["Site Survey & Blueprint Analysis", "3D CAD Fitment & Engineering Design", "Precision Fabrication & Quality Inspection", "Safe On-Site Erection & Rigging", "Full Testing, Commissioning & Certification"],
    media: [{ role: "IMAGE", media: demoMedia.installation }]
  },
  {
    id: "preventive-maintenance-amc",
    name: "24/7 Preventive Maintenance & AMC",
    slug: "preventive-maintenance-amc",
    description: "Proactive maintenance agreements, monthly comprehensive 48-point safety audits, and guaranteed 30-minute emergency dispatch.",
    benefits: ["Guaranteed 99.9% operational uptime SLA", "Genuine OEM factory replacement parts", "Dedicated 24/7 emergency rescue hotline"],
    process: ["Comprehensive Initial Diagnostic Scan", "Scheduled Lubrication, Tension & Brake Audits", "Microprocessor Telemetry Calibration", "Quarterly Safety Load & Governor Testing", "Detailed Digital Service Log Reports"],
    media: [{ role: "IMAGE", media: demoMedia.cabin }]
  },
  {
    id: "modernization-repowering",
    name: "Elevator Modernization & Re-Powering",
    slug: "modernization-repowering",
    description: "Upgrade aging, high-energy elevators with modern gearless PMSM drives, micro-leveling controllers, and luxury cabin interiors.",
    benefits: ["Up to 45% electricity conservation", "Elimination of abrupt jerks and leveling errors", "Complete modern luxury cabin aesthetic revamp"],
    process: ["Mechanical & Electrical Health Audit", "Custom Modernization Engineering Blueprint", "Step-by-Step Component Retrofit with Minimal Building Downtime", "New Controller & Safety Gear Integration", "Final Certification & Handover"],
    media: [{ role: "IMAGE", media: demoMedia.luxuryCabin }]
  },
  {
    id: "emergency-repair-rescue",
    name: "Rapid Response Emergency Breakdown Service",
    slug: "emergency-repair-rescue",
    description: "Round-the-clock emergency breakdown assistance, passenger entrapment rescue, and rapid-dispatch field engineering teams.",
    benefits: ["Under 30-minute average metro dispatch", "Certified rescue technicians equipped with diagnostic tools", "Comprehensive post-incident analysis report"],
    process: ["Immediate SOS Call Routing", "Technician Dispatch with Real-Time Telemetry", "Safe Passenger Release Protocol", "Fault Diagnosis & Component Rectification", "Full Cycle Verification & Return to Service"],
    media: [{ role: "IMAGE", media: demoMedia.installation }]
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
      companyName: "Vertix Techno Elevators",
      tagline: "Engineering the way up.",
      description: "Advanced elevator solutions engineered for safer, smarter, and prestigious vertical mobility."
    },
    homepage: {
      heroTitle: "THE PINNACLE OF VERTICAL MOBILITY.",
      heroSubtitle: "Precision German & Japanese drive engineering paired with bespoke architectural cabin aesthetics. Built for the moments between floors.",
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
      address: "Ground Floor, 36/2, Sarck Preci Tech, Rajgopal Nagar Main Road, 3rd Phase, 9th Cross Road, Peenya, Bengaluru, Karnataka 560058",
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
