import { LegalPage } from "@/components/site/legal-page";

export const metadata = {
  title: "Cookie Policy | VERTIX TECHNO ELEVATOR",
  description: "Learn about the cookies used by the VERTIX TECHNO ELEVATOR website and how to manage your preferences.",
  alternates: { canonical: "/cookies" },
  robots: { index: true, follow: true }
};

export default function CookiesPage(){return <LegalPage title="Cookie Policy" />}
