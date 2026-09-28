import { LegalPage } from "@/components/site/legal-page";

export const metadata = {
  title: "Terms & Conditions | VERTIX TECHNO ELEVATOR",
  description: "Read the terms and conditions governing use of the VERTIX TECHNO ELEVATOR website and elevator engineering services.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true }
};

export default function TermsPage(){return <LegalPage title="Terms & Conditions" />}
