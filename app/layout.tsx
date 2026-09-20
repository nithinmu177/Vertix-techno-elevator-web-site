import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL || "https://vertix-techno-elevator.onrender.com"),
  title: {
    default: "Vertix Techno Elevator | Engineering the Way Up",
    template: "%s | Vertix Techno Elevator"
  },
  description: "Advanced elevator solutions engineered for safer, smarter, and prestigious vertical mobility. Commercial towers, luxury villas, and hospital elevators.",
  openGraph: {
    title: "Vertix Techno Elevator",
    description: "Premium elevator engineering, installation, maintenance and modernization.",
    type: "website",
    locale: "en_US",
    siteName: "Vertix Techno Elevator"
  },
  twitter: {
    card: "summary_large_image",
    title: "Vertix Techno Elevator",
    description: "Premium elevator engineering, installation, maintenance and modernization."
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
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
