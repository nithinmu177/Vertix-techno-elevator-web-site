import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

// SITE_URL: use NEXT_PUBLIC_SITE_URL env var on Render so this is easy to update
// when a real domain is purchased — just change the env var, no code change needed.
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://vertix-techno-elevator-web-site.onrender.com").replace(/\/$/, "");
const LOGO_URL = `${SITE_URL}/images/vertix-logo.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "VERTIX TECHNO ELEVATOR | Elevator Company in Bengaluru",
    template: "%s | VERTIX TECHNO ELEVATOR"
  },
  description: "VERTIX TECHNO ELEVATOR provides elevator installation, maintenance, modernization and AMC services in Bengaluru, Karnataka for residential & commercial lifts.",
  keywords: [
    // Brand name — most important for "company name" searches
    "Vertix Techno Elevator",
    "Vertix Techno Elevator Bangalore",
    "Vertix Techno Elevator Bengaluru",
    "Vertix Techno Elevator Peenya",
    "Vertix elevator company",
    // Service keywords
    "elevator company in Bangalore",
    "elevator company in Bengaluru",
    "lift company in Bangalore",
    "lift company in Bengaluru",
    "elevator installation Bangalore",
    "elevator maintenance Bangalore",
    "elevator maintenance AMC Bengaluru",
    "elevator modernization Bangalore",
    "elevator repair Bengaluru",
    "elevator manufacturer Bangalore",
    "passenger elevator Bangalore",
    "goods elevator Bangalore",
    "residential elevator Bangalore",
    "home lift Bangalore",
    "commercial elevator Bangalore",
    "hospital elevator Bengaluru",
    "elevator AMC contract Bengaluru",
    "lift service Peenya Bengaluru",
    "Peenya elevator company Karnataka"
  ],
  authors: [{ name: "VERTIX TECHNO ELEVATOR" }],
  creator: "VERTIX TECHNO ELEVATOR",
  publisher: "VERTIX TECHNO ELEVATOR",
  openGraph: {
    title: "VERTIX TECHNO ELEVATOR | Elevator Company in Bengaluru",
    description: "VERTIX TECHNO ELEVATOR provides elevator installation, maintenance, modernization and AMC services in Bengaluru, Karnataka for residential & commercial lifts.",
    type: "website",
    locale: "en_IN",
    siteName: "VERTIX TECHNO ELEVATOR",
    url: SITE_URL,
    images: [
      {
        url: LOGO_URL,
        width: 400,
        height: 120,
        alt: "VERTIX TECHNO ELEVATOR Logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "VERTIX TECHNO ELEVATOR | Elevator Company in Bengaluru",
    description: "VERTIX TECHNO ELEVATOR provides elevator installation, maintenance, modernization and AMC services in Bengaluru, Karnataka.",
    images: [LOGO_URL]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/vertix-logo.png", type: "image/png" }
    ],
    shortcut: "/favicon.ico",
    apple: "/images/vertix-logo.png"
  },
  alternates: {
    canonical: SITE_URL
  },
  verification: {
    google: [
      "LnpYlkCqKekbLkZnGtB6RP-DjS1nomwZ3tmE-3VymGs",
      "5Rnnf-zWZhClBerebpCEnY_-TerNGUbkis-5zeESdag"
    ]
  }
};

// JSON-LD: Organization + LocalBusiness + WebSite (with SearchAction) structured data
// Uses only verified business information — no invented claims
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. WebSite entity — enables Google Sitelinks Search Box
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "VERTIX TECHNO ELEVATOR",
      description: "Elevator installation, maintenance and modernization company in Bengaluru, Karnataka.",
      publisher: { "@id": `${SITE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/?s={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      },
      inLanguage: "en-IN"
    },
    // 2. Organization entity
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "VERTIX TECHNO ELEVATOR",
      alternateName: ["Vertix Elevator", "Vertix Techno"],
      legalName: "VERTIX TECHNO ELEVATOR",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#logo`,
        url: LOGO_URL,
        contentUrl: LOGO_URL,
        width: 400,
        height: 120,
        caption: "VERTIX TECHNO ELEVATOR"
      },
      image: { "@id": `${SITE_URL}/#logo` },
      sameAs: [
        // Add your Google Business Profile URL here when registered:
        // "https://www.google.com/maps?cid=YOUR_PLACE_CID",
        // Add any social media pages here e.g.:
        // "https://www.facebook.com/vertix-techno-elevator",
        // "https://www.instagram.com/vertix_techno_elevator"
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91-6360598915",
          contactType: "customer service",
          areaServed: ["IN", "Karnataka", "Bengaluru"],
          availableLanguage: ["English", "Kannada", "Hindi"]
        },
        {
          "@type": "ContactPoint",
          telephone: "+91-6360598915",
          contactType: "technical support",
          areaServed: "Bengaluru",
          availableLanguage: ["English", "Kannada"]
        }
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Ground Floor, 3/3/2, Sarck Preci Tech, Rajagopal Nagar Main Road, 3rd Phase, 9th Cross Road, Peenya",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        postalCode: "560058",
        addressCountry: "IN"
      },
      email: "manthmint@gmail.com",
      telephone: "+91-6360598915"
    },
    // 3. LocalBusiness entity — critical for local Google Search & Maps ranking
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": `${SITE_URL}/#localbusiness`,
      name: "VERTIX TECHNO ELEVATOR",
      alternateName: "Vertix Elevator Bengaluru",
      description: "VERTIX TECHNO ELEVATOR provides elevator installation, annual maintenance contracts (AMC), modernization, and repair services for residential, commercial, and industrial buildings across Bengaluru, Karnataka.",
      image: [LOGO_URL],
      logo: LOGO_URL,
      url: SITE_URL,
      telephone: "+91-6360598915",
      email: "manthmint@gmail.com",
      priceRange: "₹₹",
      currenciesAccepted: "INR",
      paymentAccepted: "Cash, Cheque, Bank Transfer, UPI",
      taxID: "29EIDPM7520J1ZX",
      foundingDate: "2020",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Ground Floor, 3/3/2, Sarck Preci Tech, Rajagopal Nagar Main Road, 3rd Phase, 9th Cross Road, Peenya",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        postalCode: "560058",
        addressCountry: "IN"
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 13.0285,
        longitude: 77.5197
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "19:00"
        }
      ],
      areaServed: [
        { "@type": "City", name: "Bengaluru" },
        { "@type": "City", name: "Bangalore" },
        { "@type": "AdministrativeArea", name: "Karnataka" }
      ],
      serviceArea: {
        "@type": "AdministrativeArea",
        name: "Bengaluru Metropolitan Area, Karnataka, India"
      },
      knowsAbout: [
        "Elevator Installation", "Lift Installation", "Elevator Maintenance",
        "Annual Maintenance Contract", "Elevator Modernization", "Elevator Repair",
        "Passenger Elevators", "Residential Home Lifts", "Commercial Elevators",
        "Goods Lifts", "Hydraulic Elevators", "Traction Elevators"
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Elevator Products & Engineering Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Elevator Installation in Bengaluru",
              description: "Turnkey elevator installation for residential villas, commercial towers, and industrial buildings in Bengaluru."
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Elevator Maintenance & AMC in Bengaluru",
              description: "Preventive monthly elevator maintenance and 24/7 AMC support across Bengaluru, Karnataka."
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Elevator Modernization in Bengaluru",
              description: "Upgrade legacy traction and hydraulic elevators with modern energy-saving gearless drives."
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Elevator Repair in Bengaluru",
              description: "Fast-dispatch emergency elevator repair and breakdown resolution with genuine OEM spare parts."
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Passenger Elevators",
              description: "Smooth, high-speed passenger elevators for apartments, offices, and commercial buildings."
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Residential Home Lifts",
              description: "Compact, elegant home lifts for villas and independent houses with minimal civil work required."
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Goods & Freight Elevators",
              description: "Heavy-duty freight elevators for warehouses, factories, and industrial buildings."
            }
          }
        ]
      },
      parentOrganization: { "@id": `${SITE_URL}/#organization` }
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        {/* Preconnect to Google Fonts for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Web App Manifest — enables branded icon in Google search results */}
        <link rel="manifest" href="/manifest.json" />
        {/* Structured Data: Organization + LocalBusiness + WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

