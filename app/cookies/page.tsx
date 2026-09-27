import { LegalPage } from "@/components/site/legal-page";

export const metadata = {
  title: "Cookie Policy",
  description: "Learn about the cookies used by the Vertix Techno Elevator website and how to manage your preferences.",
  alternates: { canonical: "/cookies" },
  robots: { index: false, follow: true }
};

export default function CookiesPage(){return <LegalPage title="Cookie Policy" />}
