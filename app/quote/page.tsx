import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SectionHeading } from "@/components/site/section-heading";
import { QuoteForm } from "@/components/forms/quote-form";

export default function QuotePage() {
  return <><Navbar /><main className="container py-16"><SectionHeading eyebrow="Request A Quote" title="Share your elevator requirement." text="The request is validated, saved and made available in the admin dashboard." /><QuoteForm /></main><Footer /></>;
}
