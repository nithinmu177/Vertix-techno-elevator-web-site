import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://www.vertix-techno-elevator.com";
const LOGO_URL = `${SITE_URL}/images/vertix-logo.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Vertix Techno Elevator | Engineering the Way Up",
    template: "%s | Vertix Techno Elevator"
  },
  description: "Vertix Techno Elevator designs, installs, and maintains safe, energy-efficient elevator systems for homes, commercial buildings, hospitals, and industrial facilities across Bengaluru and Karnataka.",
  keywords: ["elevator company Bangalore", "elevator installation Bengaluru", "elevator maintenance", "passenger elevator", "home lift", "hospital elevator", "goods elevator", "hydraulic lift", "MRL elevator", "Vertix Techno Elevator"],
  authors: [{ name: "Vertix Techno Elevator" }],
  creator: "Vertix Techno Elevator",
  publisher: "Vertix Techno Elevator",
  openGraph: {
    title: "Vertix Techno Elevator — Elevating Nature. Enriching Life.",
    description: "Premium elevator engineering, installation, maintenance, and modernization across Bengaluru and Karnataka. Safe, energy-efficient vertical mobility solutions.",
    type: "website",
    locale: "en_IN",
    siteName: "Vertix Techno Elevator",
    url: SITE_URL,
    images: [
      {
        url: LOGO_URL,
        width: 400,
        height: 120,
        alt: "Vertix Techno Elevator Logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Vertix Techno Elevator — Elevating Nature. Enriching Life.",
    description: "Premium elevator engineering, installation, maintenance, and modernization.",
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
    icon: "/images/vertix-logo.png",
    apple: "/images/vertix-logo.png"
  },
  alternates: {
    canonical: SITE_URL
  }
};

// JSON-LD Organization + LocalBusiness structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Vertix Techno Elevator",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
        width: 400,
        height: 120
      },
      sameAs: [],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-6360598915",
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English", "Kannada"]
      }
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#localbusiness`,
      name: "Vertix Techno Elevator",
      description: "Elevator design, installation, maintenance, and modernization services across Bengaluru and Karnataka.",
      url: SITE_URL,
      logo: LOGO_URL,
      image: LOGO_URL,
      telephone: "+91-6360598915",
      email: "info@vertix-techno-elevator.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        addressCountry: "IN"
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 12.9716,
        longitude: 77.5946
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00"
      },
      priceRange: "₹₹",
      areaServed: [
        { "@type": "City", name: "Bengaluru" },
        { "@type": "State", name: "Karnataka" }
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Elevator Products & Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Elevator Installation" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Elevator Maintenance & AMC" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Elevator Modernization" } }
        ]
      }
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

