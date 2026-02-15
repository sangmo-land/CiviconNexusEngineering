import { Link } from "@inertiajs/react";
import SEOHead from '@/Components/SEOHead';
import Layout from "@/Layouts/Layout";
import AnimatedSection from "@/Components/AnimatedSection";
import { Meta } from "@/types";

interface Project {
    id: number;
    title: string;
    location: string;
    site_work_logs_count: number;
}

interface Worker {
    id: number;
    worker_name: string;
    role: string | null;
    hours_worked: number | null;
}

interface Material {
    id: number;
    material_name: string;
    quantity: number;
    unit: string;
}

interface SiteWorkLog {
    id: number;
    work_date: string;
    start_time: string | null;
    end_time: string | null;
    work_description: string;
    weather_conditions: string | null;
    project: Project;
    workers: Worker[];
    materials: Material[];
    creator: { name: string } | null;
}

interface SiteWorkIndexProps {
    meta: Meta;
    projects: Project[];
    recentLogs: SiteWorkLog[];
}

export default function SiteWorkIndex({
    meta,
    projects,
    recentLogs,
}: SiteWorkIndexProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <Layout>
            <SEOHead meta={meta} />

            {/* Hero Section */}
            <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
                <div className="absolute inset-0 bg-brand-950" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.08),transparent_60%)]" />
                <div className="relative container-custom">
                    <AnimatedSection variant="fade-up">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-0.5 bg-accent rounded-full" />
                            <span className="text-accent font-medium text-sm tracking-wide uppercase">
                                Site Work Tracking
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6 text-white">
                            Site Work{" "}
                            <span className="gradient-text">Logs</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl leading-relaxed">
                            Track daily work activities, materials used, and
                            worker hours across all your projects.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="py-16 md:py-24 bg-brand-950">
                <div className="container-custom">
                    <AnimatedSection variant="fade-up">
                        <h2 className="text-2xl font-display font-bold text-white mb-8">
                            Select a Project
                        </h2>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project, index) => (
                            <AnimatedSection
                                key={project.id}
                                variant="fade-up"
                                delay={index * 50}
                            >
                                <Link
                                    href={`/site-work/project/${project.id}`}
                                    className="card-modern rounded-2xl p-6 block hover:border-white/20 transition-all duration-300 group"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                                            <svg
                                                className="w-6 h-6 text-accent"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                                />
                                            </svg>
                                        </div>
                                        <span className="text-xs font-medium text-gray-500 bg-brand-800 px-2 py-1 rounded-full">
                                            {project.site_work_logs_count} logs
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-display font-semibold text-white mb-2 group-hover:text-accent transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm text-gray-400">
                                        {project.location}
                                    </p>
                                </Link>
                            </AnimatedSection>
                        ))}
                    </div>

                    {projects.length === 0 && (
                        <AnimatedSection variant="fade-up">
                            <div className="text-center py-12">
                                <p className="text-gray-400">
                                    No projects found. Create a project first to
                                    start logging site work.
                                </p>
                            </div>
                        </AnimatedSection>
                    )}
                </div>
            </section>

            {/* Recent Logs */}
            {recentLogs.length > 0 && (
                <section className="py-16 md:py-24 bg-brand-900/50">
                    <div className="container-custom">
                        <AnimatedSection variant="fade-up">
                            <h2 className="text-2xl font-display font-bold text-white mb-8">
                                Recent Activity
                            </h2>
                        </AnimatedSection>

                        <div className="space-y-4">
                            {recentLogs.map((log, index) => (
                                <AnimatedSection
                                    key={log.id}
                                    variant="fade-up"
                                    delay={index * 50}
                                >
                                    <Link
                                        href={`/site-work/log/${log.id}`}
                                        className="card-modern rounded-xl p-5 block hover:border-white/20 transition-all duration-300"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className="text-accent font-medium text-sm">
                                                        {formatDate(
                                                            log.work_date,
                                                        )}
                                                    </span>
                                                    {log.weather_conditions && (
                                                        <span className="text-xs text-gray-500 bg-brand-800 px-2 py-0.5 rounded-full">
                                                            {
                                                                log.weather_conditions
                                                            }
                                                        </span>
                                                    )}
                                                </div>
                                                <h3 className="text-white font-medium mb-1">
                                                    {log.project.title}
                                                </h3>
                                                <p className="text-sm text-gray-400 line-clamp-2">
                                                    {log.work_description}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-6 text-sm text-gray-400">
                                                <div className="flex items-center gap-2">
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
                                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                                        />
                                                    </svg>
                                                    <span>
                                                        {log.workers.length}{" "}
                                                        workers
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
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
                                                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                                        />
                                                    </svg>
                                                    <span>
                                                        {log.materials.length}{" "}
                                                        materials
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </Layout>
    );
}
