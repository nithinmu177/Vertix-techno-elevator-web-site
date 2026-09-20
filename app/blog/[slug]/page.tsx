import { notFound } from "next/navigation";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { getPost } from "@/lib/data";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = await getPost((await params).slug);
  return post ? { title: post.title, description: post.excerpt, alternates: { canonical: `/blog/${post.slug}` } } : { title: "Elevator Engineering Insight" };
}

export default async function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  return <><Navbar /><article className="container max-w-3xl py-16"><p className="text-xs font-black uppercase text-[#c6a15b]">{post.category?.name}</p><h1 className="mt-3 text-5xl font-black">{post.title}</h1><p className="mt-5 text-[#56635d]">{post.excerpt}</p><div className="mt-10 whitespace-pre-wrap leading-8 text-[#29332f]">{post.content}</div></article><Footer /></>;
}
