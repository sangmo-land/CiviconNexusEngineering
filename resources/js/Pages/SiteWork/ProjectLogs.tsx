import { Link } from "@inertiajs/react";
import SEOHead from '@/Components/SEOHead';
import Layout from "@/Layouts/Layout";
import AnimatedSection from "@/Components/AnimatedSection";
import { Meta, PaginatedData } from "@/types";

interface Project {
    id: number;
    title: string;
    location: string;
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
    unit_cost: number | null;
}

interface SiteWorkLog {
    id: number;
    work_date: string;
    start_time: string | null;
    end_time: string | null;
    work_description: string;
    difficulties: string | null;
    weather_conditions: string | null;
    workers: Worker[];
    materials: Material[];
    creator: { name: string } | null;
}

interface ProjectLogsProps {
    meta: Meta;
    project: Project;
    logs: PaginatedData<SiteWorkLog>;
}

export default function ProjectLogs({ meta, project, logs }: ProjectLogsProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const formatTime = (timeString: string | null) => {
        if (!timeString) return null;
        const [hours, minutes] = timeString.split(":");
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? "PM" : "AM";
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${ampm}`;
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
                        <Link
                            href="/site-work"
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-accent transition-colors mb-6"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                            Back to Projects
                        </Link>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-0.5 bg-accent rounded-full" />
                            <span className="text-accent font-medium text-sm tracking-wide uppercase">
                                {project.location}
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6 text-white">
                            {project.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4">
                            <Link
                                href={`/site-work/project/${project.id}/create`}
                                className="btn-primary inline-flex items-center gap-2"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                                New Work Log
                            </Link>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Logs List */}
            <section className="py-16 md:py-24 bg-brand-950">
                <div className="container-custom">
                    {logs.data.length > 0 ? (
                        <div className="space-y-6">
                            {logs.data.map((log, index) => (
                                <AnimatedSection
                                    key={log.id}
                                    variant="fade-up"
                                    delay={index * 50}
                                >
                                    <Link
                                        href={`/site-work/log/${log.id}`}
                                        className="card-modern rounded-2xl p-6 block hover:border-white/20 transition-all duration-300"
                                    >
                                        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                                            {/* Date Column */}
                                            <div className="lg:w-48 flex-shrink-0">
                                                <div className="text-accent font-semibold text-lg">
                                                    {formatDate(log.work_date)}
                                                </div>
                                                {(log.start_time ||
                                                    log.end_time) && (
                                                    <div className="text-sm text-gray-400 mt-1">
                                                        {formatTime(
                                                            log.start_time,
                                                        )}{" "}
                                                        -{" "}
                                                        {formatTime(
                                                            log.end_time,
                                                        )}
                                                    </div>
                                                )}
                                                {log.weather_conditions && (
                                                    <span className="inline-block mt-2 text-xs text-gray-500 bg-brand-800 px-2 py-1 rounded-full">
                                                        {log.weather_conditions}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Content Column */}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-white mb-4 line-clamp-3">
                                                    {log.work_description}
                                                </p>

                                                {log.difficulties && (
                                                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                                                        <p className="text-sm text-red-400">
                                                            <span className="font-medium">
                                                                Difficulties:
                                                            </span>{" "}
                                                            {log.difficulties}
                                                        </p>
                                                    </div>
                                                )}

                                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
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
                                                                strokeWidth={
                                                                    1.5
                                                                }
                                                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
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
                                                                strokeWidth={
                                                                    1.5
                                                                }
                                                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                                            />
                                                        </svg>
                                                        <span>
                                                            {
                                                                log.materials
                                                                    .length
                                                            }{" "}
                                                            materials
                                                        </span>
                                                    </div>
                                                    {log.creator && (
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
                                                                    strokeWidth={
                                                                        1.5
                                                                    }
                                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                                />
                                                            </svg>
                                                            <span>
                                                                {
                                                                    log.creator
                                                                        .name
                                                                }
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Arrow */}
                                            <div className="hidden lg:flex items-center">
                                                <svg
                                                    className="w-5 h-5 text-gray-600"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 5l7 7-7 7"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </Link>
                                </AnimatedSection>
                            ))}
                        </div>
                    ) : (
                        <AnimatedSection variant="fade-up">
                            <div className="text-center py-16">
                                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-brand-800 flex items-center justify-center">
                                    <svg
                                        className="w-8 h-8 text-gray-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-display font-semibold text-white mb-2">
                                    No work logs yet
                                </h3>
                                <p className="text-gray-400 mb-6">
                                    Start tracking site work by creating your
                                    first log entry.
                                </p>
                                <Link
                                    href={`/site-work/project/${project.id}/create`}
                                    className="btn-primary inline-flex items-center gap-2"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                    Create First Log
                                </Link>
                            </div>
                        </AnimatedSection>
                    )}

                    {/* Pagination */}
                    {logs.last_page > 1 && (
                        <div className="mt-12 flex justify-center gap-2">
                            {logs.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || "#"}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        link.active
                                            ? "bg-accent text-brand-950"
                                            : link.url
                                              ? "bg-brand-800 text-white hover:bg-brand-700"
                                              : "bg-brand-900 text-gray-600 cursor-not-allowed"
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    );
}
