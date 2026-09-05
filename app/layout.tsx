import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
  title: {
    default: "Vertix Techno Elevator | Engineering the Way Up",
    template: "%s | Vertix Techno Elevator"
  },
  description: "Advanced elevator solutions designed for safer, smarter and more seamless vertical mobility.",
  openGraph: {
    title: "Vertix Techno Elevator",
    description: "Premium elevator engineering, installation, maintenance and modernization.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
