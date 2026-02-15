import { Head, Link, router } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import AnimatedSection from "@/Components/AnimatedSection";
import { Meta } from "@/types";

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
    tasks_performed: string | null;
}

interface Material {
    id: number;
    material_name: string;
    quantity: number;
    unit: string;
    unit_cost: number | null;
    supplier: string | null;
    notes: string | null;
}

interface SiteWorkImage {
    id: number;
    image_path: string;
    caption: string | null;
}

interface SiteWorkLog {
    id: number;
    work_date: string;
    start_time: string | null;
    end_time: string | null;
    work_description: string;
    difficulties: string | null;
    weather_conditions: string | null;
    safety_notes: string | null;
    additional_notes: string | null;
    project: Project;
    workers: Worker[];
    materials: Material[];
    images: SiteWorkImage[];
    creator: { name: string } | null;
    created_at: string;
}

interface ShowProps {
    meta: Meta;
    log: SiteWorkLog;
}

export default function Show({ meta, log }: ShowProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
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

    const totalWorkerHours = log.workers.reduce(
        (sum, w) => sum + (w.hours_worked || 0),
        0,
    );

    const totalMaterialCost = log.materials.reduce(
        (sum, m) => sum + (m.quantity || 0) * (m.unit_cost || 0),
        0,
    );

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this work log?")) {
            router.delete(`/site-work/log/${log.id}`);
        }
    };

    return (
        <Layout>
            <Head title={meta.title}>
                <meta name="description" content={meta.description} />
            </Head>

            {/* Hero Section */}
            <section className="relative pt-36 pb-12 md:pt-44 md:pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-brand-950" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.08),transparent_60%)]" />
                <div className="relative container-custom">
                    <AnimatedSection variant="fade-up">
                        <Link
                            href={`/site-work/project/${log.project.id}`}
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
                            Back to {log.project.title}
                        </Link>
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-0.5 bg-accent rounded-full" />
                                    <span className="text-accent font-medium text-sm tracking-wide uppercase">
                                        Work Log
                                    </span>
                                </div>
                                <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mb-2">
                                    {formatDate(log.work_date)}
                                </h1>
                                <p className="text-gray-400">
                                    {log.project.title} • {log.project.location}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Link
                                    href={`/site-work/log/${log.id}/edit`}
                                    className="btn-secondary"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Content */}
            <section className="py-12 md:py-16 bg-brand-950">
                <div className="container-custom max-w-4xl">
                    {/* Quick Stats */}
                    <AnimatedSection variant="fade-up">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            <div className="card-modern rounded-xl p-4 text-center">
                                <div className="text-2xl font-display font-bold text-accent">
                                    {log.workers.length}
                                </div>
                                <div className="text-sm text-gray-400">
                                    Workers
                                </div>
                            </div>
                            <div className="card-modern rounded-xl p-4 text-center">
                                <div className="text-2xl font-display font-bold text-accent">
                                    {totalWorkerHours}
                                </div>
                                <div className="text-sm text-gray-400">
                                    Total Hours
                                </div>
                            </div>
                            <div className="card-modern rounded-xl p-4 text-center">
                                <div className="text-2xl font-display font-bold text-accent">
                                    {log.materials.length}
                                </div>
                                <div className="text-sm text-gray-400">
                                    Materials
                                </div>
                            </div>
                            <div className="card-modern rounded-xl p-4 text-center">
                                <div className="text-2xl font-display font-bold text-accent">
                                    {totalMaterialCost > 0
                                        ? `$${totalMaterialCost.toLocaleString()}`
                                        : "-"}
                                </div>
                                <div className="text-sm text-gray-400">
                                    Material Cost
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>

                    {/* Basic Info */}
                    <AnimatedSection variant="fade-up" delay={50}>
                        <div className="card-modern rounded-2xl p-6 md:p-8 mb-6">
                            <div className="flex flex-wrap items-center gap-4 mb-6">
                                {(log.start_time || log.end_time) && (
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <span>
                                            {formatTime(log.start_time)} -{" "}
                                            {formatTime(log.end_time)}
                                        </span>
                                    </div>
                                )}
                                {log.weather_conditions && (
                                    <span className="px-3 py-1 bg-brand-800 text-gray-300 rounded-full text-sm">
                                        {log.weather_conditions}
                                    </span>
                                )}
                                {log.creator && (
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                        <span>Logged by {log.creator.name}</span>
                                    </div>
                                )}
                            </div>

                            <h2 className="text-lg font-display font-semibold text-white mb-3">
                                Work Description
                            </h2>
                            <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                                {log.work_description}
                            </p>
                        </div>
                    </AnimatedSection>

                    {/* Difficulties */}
                    {log.difficulties && (
                        <AnimatedSection variant="fade-up" delay={100}>
                            <div className="card-modern rounded-2xl p-6 md:p-8 mb-6 border-red-500/20 bg-red-500/5">
                                <h2 className="text-lg font-display font-semibold text-red-400 mb-3 flex items-center gap-2">
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                        />
                                    </svg>
                                    Difficulties Encountered
                                </h2>
                                <p className="text-gray-300 whitespace-pre-wrap">
                                    {log.difficulties}
                                </p>
                            </div>
                        </AnimatedSection>
                    )}

                    {/* Workers */}
                    {log.workers.length > 0 && (
                        <AnimatedSection variant="fade-up" delay={150}>
                            <div className="card-modern rounded-2xl p-6 md:p-8 mb-6">
                                <h2 className="text-lg font-display font-semibold text-white mb-4">
                                    Workers ({log.workers.length})
                                </h2>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-white/10">
                                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                                                    Name
                                                </th>
                                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                                                    Role
                                                </th>
                                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                                                    Hours
                                                </th>
                                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                                                    Tasks
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {log.workers.map((worker) => (
                                                <tr
                                                    key={worker.id}
                                                    className="border-b border-white/5"
                                                >
                                                    <td className="py-3 px-4 text-white">
                                                        {worker.worker_name}
                                                    </td>
                                                    <td className="py-3 px-4 text-gray-400">
                                                        {worker.role || "-"}
                                                    </td>
                                                    <td className="py-3 px-4 text-gray-400">
                                                        {worker.hours_worked ||
                                                            "-"}
                                                    </td>
                                                    <td className="py-3 px-4 text-gray-400">
                                                        {worker.tasks_performed ||
                                                            "-"}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </AnimatedSection>
                    )}

                    {/* Materials */}
                    {log.materials.length > 0 && (
                        <AnimatedSection variant="fade-up" delay={200}>
                            <div className="card-modern rounded-2xl p-6 md:p-8 mb-6">
                                <h2 className="text-lg font-display font-semibold text-white mb-4">
                                    Materials Used ({log.materials.length})
                                </h2>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-white/10">
                                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                                                    Material
                                                </th>
                                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                                                    Quantity
                                                </th>
                                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                                                    Unit Cost
                                                </th>
                                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                                                    Total
                                                </th>
                                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                                                    Supplier
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {log.materials.map((material) => (
                                                <tr
                                                    key={material.id}
                                                    className="border-b border-white/5"
                                                >
                                                    <td className="py-3 px-4 text-white">
                                                        {material.material_name}
                                                    </td>
                                                    <td className="py-3 px-4 text-gray-400">
                                                        {material.quantity}{" "}
                                                        {material.unit}
                                                    </td>
                                                    <td className="py-3 px-4 text-gray-400">
                                                        {material.unit_cost
                                                            ? `$${material.unit_cost}`
                                                            : "-"}
                                                    </td>
                                                    <td className="py-3 px-4 text-accent">
                                                        {material.unit_cost
                                                            ? `$${(material.quantity * material.unit_cost).toLocaleString()}`
                                                            : "-"}
                                                    </td>
                                                    <td className="py-3 px-4 text-gray-400">
                                                        {material.supplier ||
                                                            "-"}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </AnimatedSection>
                    )}

                    {/* Work Images */}
                    {log.images && log.images.length > 0 && (
                        <AnimatedSection variant="fade-up" delay={225}>
                            <div className="card-modern rounded-2xl p-6 md:p-8 mb-6">
                                <h2 className="text-lg font-display font-semibold text-white mb-4 flex items-center gap-2">
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                    Work Images ({log.images.length})
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {log.images.map((image) => (
                                        <a
                                            key={image.id}
                                            href={`/storage/${image.image_path}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group block"
                                        >
                                            <div className="aspect-square rounded-lg overflow-hidden bg-brand-800 relative">
                                                <img
                                                    src={`/storage/${image.image_path}`}
                                                    alt={image.caption || "Work image"}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                                    <svg
                                                        className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                            {image.caption && (
                                                <p className="text-gray-400 text-sm mt-2 truncate">
                                                    {image.caption}
                                                </p>
                                            )}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </AnimatedSection>
                    )}

                    {/* Safety & Additional Notes */}
                    {(log.safety_notes || log.additional_notes) && (
                        <AnimatedSection variant="fade-up" delay={250}>
                            <div className="card-modern rounded-2xl p-6 md:p-8">
                                {log.safety_notes && (
                                    <div className="mb-6">
                                        <h2 className="text-lg font-display font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                                />
                                            </svg>
                                            Safety Notes
                                        </h2>
                                        <p className="text-gray-300 whitespace-pre-wrap">
                                            {log.safety_notes}
                                        </p>
                                    </div>
                                )}
                                {log.additional_notes && (
                                    <div>
                                        <h2 className="text-lg font-display font-semibold text-white mb-3">
                                            Additional Notes
                                        </h2>
                                        <p className="text-gray-300 whitespace-pre-wrap">
                                            {log.additional_notes}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </AnimatedSection>
                    )}
                </div>
            </section>
        </Layout>
    );
}
