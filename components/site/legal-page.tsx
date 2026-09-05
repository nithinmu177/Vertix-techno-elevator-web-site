import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

export function LegalPage({ title }: { title: string }) {
  return (
    <>
      <Navbar />
      <main className="container max-w-3xl py-16">
        <h1 className="text-4xl font-black">{title}</h1>
        <p className="mt-6 leading-8 text-[#56635d]">
          Professional placeholder content for company review. This page is not legal advice and should be customized by qualified counsel before production launch.
        </p>
      </main>
      <Footer />
    </>
  );
}
