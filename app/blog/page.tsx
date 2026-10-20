import Link from "next/link";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
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
      <main className="min-h-screen bg-white py-16 text-[#475569]">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-[#F3F6FA] p-8 lg:p-14 shadow-sm mb-14">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-3 block">
                Elevator Company in Bengaluru • Engineering Knowledge
              </span>
              <h1 className="display-type text-3xl font-extrabold text-[#172B4D] md:text-5xl lg:text-6xl tracking-tight">
                Elevator Engineering Insights & Articles
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[#475569]">
                Practical guides, safety code overviews (IS 14665 & EN 81), and vertical mobility architectural considerations published by VERTIX TECHNO ELEVATOR.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any) => (
              <Link
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-[#2563EB] hover:-translate-y-1 hover:shadow-md"
                key={post.id}
              >
                <p className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                  {post.category?.name || "Engineering Insight"}
                </p>
                <h2 className="mt-3 text-xl font-bold text-[#172B4D] group-hover:text-[#2563EB] transition">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#475569]">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-block text-xs font-bold text-[#2563EB] group-hover:underline">
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
