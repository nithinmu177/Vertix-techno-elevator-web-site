import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SectionHeading } from "@/components/site/section-heading";
import { ProjectCard } from "@/components/site/cards";
import { getProjects } from "@/lib/data";

export const metadata = { title: "Projects", description: "Vertix elevator project portfolio." };

export default async function ProjectsPage() {
  const projects = await getProjects();
  return <><Navbar /><main className="container py-16"><SectionHeading eyebrow="Projects" title="Portfolio powered by project media." text="Upload cover images, galleries and videos from admin without changing code." /><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{projects.map((p: any) => <ProjectCard project={p} key={p.id} />)}</div></main><Footer /></>;
}
