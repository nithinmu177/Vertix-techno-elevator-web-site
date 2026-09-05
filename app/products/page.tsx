import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SectionHeading } from "@/components/site/section-heading";
import { ProductCard } from "@/components/site/cards";
import { getProducts } from "@/lib/data";

export const metadata = { title: "Products", description: "Database-managed elevator product catalog." };

export default async function ProductsPage() {
  const products = await getProducts();
  return <><Navbar /><main className="container py-16"><SectionHeading eyebrow="Products" title="Elevator solutions managed from PostgreSQL." text="Add, publish and connect product media from the admin dashboard." /><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{products.map((p: any) => <ProductCard product={p} key={p.id} />)}</div></main><Footer /></>;
}
