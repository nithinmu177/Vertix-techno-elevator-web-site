import type { Metadata } from "next";
import "./globals.css";

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
    "Vertix Techno Elevator",
    "Vertix Techno Elevator Bangalore",
    "Vertix Techno Elevator Bengaluru",
    "elevator company in Bangalore",
    "elevator company in Bengaluru",
    "lift company in Bangalore",
    "elevator installation Bangalore",
    "elevator maintenance Bangalore",
    "elevator manufacturer Bangalore",
    "passenger elevator Bangalore",
    "goods elevator Bangalore",
    "residential elevator Bangalore",
    "commercial elevator Bangalore"
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

// JSON-LD Organization + LocalBusiness structured data using genuine business information
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "VERTIX TECHNO ELEVATOR",
      legalName: "VERTIX TECHNO ELEVATOR",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
        width: 400,
        height: 120
      },
      sameAs: [],
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
          contactType: "emergency",
          areaServed: "Bengaluru",
          availableLanguage: ["English", "Kannada"]
        }
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Ground Floor, 3/3/2, Sarck Preci Tech, Rajagopal Nagar Main Road, 3rd Phase, 9th Cross Road, Beadie Kamadhenu Auto CNC Private Limited, Peenya",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        postalCode: "560058",
        addressCountry: "IN"
      }
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#localbusiness`,
      name: "VERTIX TECHNO ELEVATOR",
      image: LOGO_URL,
      url: SITE_URL,
      telephone: "+91-6360598915",
      email: "manthmint@gmail.com",
      priceRange: "₹₹₹",
      taxID: "29EIDPM7520J1ZX",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Ground Floor, 3/3/2, Sarck Preci Tech, Rajagopal Nagar Main Road, 3rd Phase, 9th Cross Road, Beadie Kamadhenu Auto CNC Private Limited, Peenya",
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
        { "@type": "State", name: "Karnataka" }
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
              description: "Preventive monthly elevator maintenance and 24/7 breakdown assistance across Bengaluru, Karnataka."
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Elevator Modernization in Bengaluru",
              description: "Modernization of legacy traction and hydraulic elevators with energy-saving PMSM gearless drives."
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Passenger Elevators",
              description: "Smooth, high-speed passenger elevators conforming to EN 81-20/50 and IS 14665 standards."
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Residential Home Lifts",
              description: "Compact, luxury home villa elevators requiring minimal pit depth and headroom."
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Goods & Freight Elevators",
              description: "Heavy-duty freight and industrial elevators engineered for safe material handling."
            }
          }
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

