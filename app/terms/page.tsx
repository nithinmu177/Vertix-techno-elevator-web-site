import { LegalPage } from "@/components/site/legal-page";

export const metadata = {
  title: "Terms & Conditions",
  description: "Read the terms and conditions governing use of the Vertix Techno Elevator website and services.",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true }
};

export default function TermsPage(){return <LegalPage title="Terms & Conditions" />}
