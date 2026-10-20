import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { ProjectCard } from "@/components/site/cards";
import { getProjects } from "@/lib/data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Elevator Installations & Landmark Projects in Bengaluru",
  description: "Inspect completed elevator installations across commercial towers, residential villas, and healthcare centers in Bengaluru by VERTIX TECHNO ELEVATOR.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Elevator Installations & Projects | VERTIX TECHNO ELEVATOR Bengaluru",
    description: "Explore landmark elevator installations and architectural case studies in Bengaluru and Karnataka by VERTIX TECHNO ELEVATOR.",
    url: "https://vertix-techno-elevator-web-site.onrender.com/projects"
  }
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white py-16 text-[#475569]">
        <div className="container">
          {/* Header Banner */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-[#F3F6FA] p-8 lg:p-14 shadow-sm mb-14">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-3 block">
                Elevator Company in Bengaluru • Case Studies
              </span>
              <h1 className="display-type text-3xl font-extrabold text-[#172B4D] md:text-5xl lg:text-6xl tracking-tight">
                Elevator Installations & Applications
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[#475569]">
                Explore how VERTIX TECHNO ELEVATOR solves complex structural constraints: bespoke villa shafts, high-rise wind loads, and zero-vibration hospital elevator requirements across Bengaluru and Karnataka.
              </p>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project: any) => (
              <ProjectCard project={project} key={project.id} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
