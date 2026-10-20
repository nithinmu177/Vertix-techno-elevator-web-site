import { notFound } from "next/navigation";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { getPost } from "@/lib/data";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = await getPost((await params).slug);
  return post ? {
    title: `${post.title} | VERTIX TECHNO ELEVATOR`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | VERTIX TECHNO ELEVATOR`,
      description: post.excerpt,
      url: `https://vertix-techno-elevator-web-site.onrender.com/blog/${post.slug}`,
      images: [{ url: "https://vertix-techno-elevator-web-site.onrender.com/images/vertix-logo.png", alt: post.title }]
    }
  } : { title: "Elevator Engineering Insight" };
}

export function generateStaticParams() {
  return [
    { slug: "importance-of-preventive-elevator-maintenance" },
    { slug: "mrl-vs-traction-elevators" },
    { slug: "elevator-safety-codes-is-14665" }
  ];
}

export default async function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white py-16 text-[#475569]">
        <article className="container max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">{post.category?.name}</p>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#172B4D] tracking-tight">{post.title}</h1>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#475569] font-medium border-l-4 border-[#2563EB] pl-4">{post.excerpt}</p>
          <div className="mt-10 whitespace-pre-wrap leading-relaxed text-[#475569] space-y-4 text-base">{post.content}</div>
        </article>
      </main>
      <Footer />
    </>
  );
}
