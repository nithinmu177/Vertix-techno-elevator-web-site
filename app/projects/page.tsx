import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SectionHeading } from "@/components/site/section-heading";
import { ProjectCard } from "@/components/site/cards";
import { getProjects } from "@/lib/data";
import { Sparkles, Building2, MapPin, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Featured Elevator Projects & Installations",
  description: "Explore completed Vertix elevator installations across high-rise commercial headquarters, luxury villas, and specialized healthcare campuses."
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#06090e] py-16 text-slate-100">
        <div className="container">
          {/* Header Banner */}
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-r from-[#0c121e] via-[#111a2c] to-[#0c121e] p-8 lg:p-14 shadow-2xl mb-14">
            <div className="max-w-3xl">
              <span className="text-xs font-black uppercase tracking-[0.24em] text-[#00e5ff] mb-3 block">
                Engineering Case Studies
              </span>
              <h1 className="display-type text-3xl font-black text-white md:text-5xl lg:text-6xl tracking-tight">
                Architectural Elevator Installations
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate-300">
                Explore real project achievements where Vertix addressed complex architectural challenges: tight historical shafts, high-velocity wind loads, and zero-vibration ICU bed requirements.
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
