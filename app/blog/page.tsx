import Link from "next/link";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SectionHeading } from "@/components/site/section-heading";
import { getPosts } from "@/lib/data";

export default async function BlogPage() {
  const posts = await getPosts();
  return <><Navbar /><main className="container py-16"><SectionHeading eyebrow="Blog" title="Insights and updates published from admin." /><div className="grid gap-5 md:grid-cols-3">{posts.map((post:any) => <Link href={`/blog/${post.slug}`} className="rounded-lg bg-white p-6" key={post.id}><p className="text-xs font-black uppercase text-[#c6a15b]">{post.category?.name}</p><h2 className="mt-2 text-xl font-black">{post.title}</h2><p className="mt-3 text-[#56635d]">{post.excerpt}</p></Link>)}</div></main><Footer /></>;
}
