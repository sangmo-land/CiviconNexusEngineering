import { Link } from '@inertiajs/react';
import SEOHead from '@/Components/SEOHead';
import Layout from '@/Layouts/Layout';
import AnimatedSection from "@/Components/AnimatedSection";
import { Project, Meta, PaginatedData } from "@/types";

interface ProjectsIndexProps {
    meta: Meta;
    projects: PaginatedData<Project>;
}

export default function ProjectsIndex({ meta, projects }: ProjectsIndexProps) {
    return (
        <Layout>
            <SEOHead meta={meta} />

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-brand-700/20 to-transparent" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear_gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
                <div className="container-custom relative z-10">
                    <AnimatedSection variant="fade-up">
                        <span className="text-accent font-display text-sm tracking-widest uppercase font-semibold">
                            Portfolio
                        </span>
                        <h1 className="font-display text-5xl md:text-7xl font-bold text-white mt-4 mb-6">
                            Our Projects
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                            Explore our portfolio of successfully completed
                            civil engineering and construction projects.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.data.map((project, index) => (
                            <AnimatedSection
                                key={project.id}
                                variant="scale"
                                delay={index * 80}
                            >
                                <Link
                                    href={`/projects/${project.slug}`}
                                    className="group block rounded-3xl overflow-hidden glass hover:border-white/20 transition-all duration-500"
                                >
                                    <div className="aspect-[4/3] bg-brand-800 relative overflow-hidden">
                                        {project.images && project.images[0] ? (
                                            <img
                                                src={`/img/thumb/${project.images[0].image_path}`}
                                                alt={project.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-600">
                                                <svg
                                                    className="w-16 h-16"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1}
                                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                    />
                                                </svg>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-transparent to-transparent" />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-accent/90 text-brand-950 text-xs font-bold rounded-full uppercase tracking-wider">
                                                {project.project_type}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h2 className="font-display text-lg font-semibold text-white group-hover:text-accent transition-colors duration-300 mb-2">
                                            {project.title}
                                        </h2>
                                        <div className="flex items-center text-gray-500 text-sm gap-1">
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                            {project.location}
                                        </div>
                                        {project.completion_year && (
                                            <div className="flex items-center text-gray-500 text-sm mt-1 gap-1">
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1.5}
                                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                    />
                                                </svg>
                                                Completed{" "}
                                                {project.completion_year}
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            </AnimatedSection>
                        ))}
                    </div>

                    {projects.data.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-gray-500 text-lg">
                                No projects available at the moment. Check back
                                soon!
                            </p>
                        </div>
                    )}

                    {/* Pagination */}
                    {projects.last_page > 1 && (
                        <div className="flex justify-center mt-16">
                            <nav className="flex gap-2">
                                {projects.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || "#"}
                                        className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                                            link.active
                                                ? "bg-accent text-brand-950 font-bold"
                                                : link.url
                                                  ? "glass text-gray-300 hover:text-white hover:bg-white/10"
                                                  : "text-gray-600 cursor-not-allowed"
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                            </nav>
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    );
}
