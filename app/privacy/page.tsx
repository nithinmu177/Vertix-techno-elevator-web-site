import { LegalPage } from "@/components/site/legal-page";

export const metadata = {
  title: "Privacy Policy",
  description: "Read the Vertix Techno Elevator privacy policy — how we collect, use, and protect your personal information.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true }
};

export default function PrivacyPage(){return <LegalPage title="Privacy Policy" />}
