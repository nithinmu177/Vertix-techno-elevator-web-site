import { LegalPage } from "@/components/site/legal-page";

export const metadata = {
  title: "Privacy Policy | VERTIX TECHNO ELEVATOR",
  description: "Read the VERTIX TECHNO ELEVATOR privacy policy — how we collect, use, and protect your personal information.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true }
};

export default function PrivacyPage(){return <LegalPage title="Privacy Policy" />}
