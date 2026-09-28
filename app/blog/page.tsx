import Link from "next/link";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SectionHeading } from "@/components/site/section-heading";
import { getPosts } from "@/lib/data";

export const metadata = {
  title: "Elevator Engineering Blog & Insights | VERTIX TECHNO ELEVATOR",
  description: "Read technical articles on elevator safety codes (IS 14665), MRL vs traction systems, and preventive maintenance in Bengaluru by VERTIX TECHNO ELEVATOR.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Elevator Engineering Blog & Insights | VERTIX TECHNO ELEVATOR Bengaluru",
    description: "Expert engineering articles, elevator safety standards, and vertical mobility guidance from VERTIX TECHNO ELEVATOR in Bengaluru.",
    url: "https://vertix-techno-elevator-web-site.onrender.com/blog"
  }
};

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#06090e] py-16 text-slate-100">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-r from-[#0c121e] via-[#111a2c] to-[#0c121e] p-8 lg:p-14 shadow-2xl mb-14">
            <div className="max-w-3xl">
              <span className="text-xs font-black uppercase tracking-[0.24em] text-[#d4af37] mb-3 block">
                Elevator Company in Bengaluru • Engineering Knowledge
              </span>
              <h1 className="display-type text-3xl font-black text-white md:text-5xl lg:text-6xl tracking-tight">
                Elevator Engineering Insights & Articles
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate-300">
                Practical guides, safety code overviews (IS 14665 & EN 81), and vertical mobility architectural considerations published by VERTIX TECHNO ELEVATOR.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any) => (
              <Link
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-white/[0.08] bg-[#0c121e]/80 p-6 shadow-xl backdrop-blur-xl transition hover:border-[#d4af37]/40 hover:-translate-y-1"
                key={post.id}
              >
                <p className="text-xs font-black uppercase tracking-wider text-[#d4af37]">
                  {post.category?.name || "Engineering Insight"}
                </p>
                <h2 className="mt-3 text-xl font-black text-white group-hover:text-[#f5e2a3] transition">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-block text-xs font-bold text-[#00e5ff] group-hover:underline">
                  Read Technical Article →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
