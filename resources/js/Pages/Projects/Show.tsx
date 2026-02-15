import { Link } from '@inertiajs/react';
import SEOHead from '@/Components/SEOHead';
import { useState } from 'react';
import Layout from '@/Layouts/Layout';
import AnimatedSection from "@/Components/AnimatedSection";
import { Project, Meta } from "@/types";

interface ProjectShowProps {
    meta: Meta;
    project: Project;
}

export default function ProjectShow({ meta, project }: ProjectShowProps) {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    return (
        <Layout>
            <SEOHead meta={meta} />

            {/* Breadcrumb */}
            <div className="pt-24 border-b border-white/5">
                <div className="container-custom py-4">
                    <nav className="flex text-sm gap-2">
                        <Link
                            href="/"
                            className="text-gray-500 hover:text-accent transition-colors"
                        >
                            Home
                        </Link>
                        <span className="text-gray-600">/</span>
                        <Link
                            href="/projects"
                            className="text-gray-500 hover:text-accent transition-colors"
                        >
                            Projects
                        </Link>
                        <span className="text-gray-600">/</span>
                        <span className="text-white">{project.title}</span>
                    </nav>
                </div>
            </div>

            {/* Project Header */}
            <section className="py-16">
                <div className="container-custom">
                    <AnimatedSection variant="fade-up">
                        <div className="flex flex-wrap items-start justify-between gap-6">
                            <div>
                                <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-sm font-bold rounded-full uppercase tracking-wider mb-6">
                                    {project.project_type}
                                </span>
                                <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
                                    {project.title}
                                </h1>
                                <div className="flex flex-wrap gap-6 text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <svg
                                            className="w-5 h-5 text-accent"
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
                                        <div className="flex items-center gap-2">
                                            <svg
                                                className="w-5 h-5 text-accent"
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
                                            Completed {project.completion_year}
                                        </div>
                                    )}
                                    {project.client && (
                                        <div className="flex items-center gap-2">
                                            <svg
                                                className="w-5 h-5 text-accent"
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
                                            Client: {project.client}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <Link href="/quote-request" className="btn-accent">
                                Start Your Project
                                <svg
                                    className="w-5 h-5 ml-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </Link>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Project Gallery */}
            {project.images && project.images.length > 0 && (
                <section className="pb-16">
                    <div className="container-custom">
                        <AnimatedSection variant="fade-up">
                            <h2 className="font-display text-2xl font-bold text-white mb-8">
                                Project Gallery
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {project.images.map((image, index) => (
                                    <button
                                        key={image.id}
                                        onClick={() => setSelectedImage(index)}
                                        className="aspect-square bg-brand-800 rounded-2xl overflow-hidden hover:opacity-80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-brand-950 group"
                                    >
                                        <img
                                            src={`/storage/${image.image_path}`}
                                            alt={
                                                image.caption ||
                                                `Project image ${index + 1}`
                                            }
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </button>
                                ))}
                            </div>
                        </AnimatedSection>
                    </div>
                </section>
            )}

            {/* Project Description + Details */}
            <section className="pb-24">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <AnimatedSection
                            variant="slide-left"
                            className="lg:col-span-2"
                        >
                            <h2 className="font-display text-2xl font-bold text-white mb-6">
                                Project Description
                            </h2>
                            <div
                                className="prose prose-lg prose-invert max-w-none text-gray-300 leading-relaxed
                                           prose-headings:font-display prose-headings:text-white
                                           prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                                           prose-strong:text-white"
                                dangerouslySetInnerHTML={{
                                    __html: project.description,
                                }}
                            />
                        </AnimatedSection>
                        <AnimatedSection variant="slide-right">
                            <div className="glass-dark rounded-3xl p-8 sticky top-28">
                                <h3 className="font-display text-lg font-semibold text-white mb-6">
                                    Project Details
                                </h3>
                                <dl className="space-y-5">
                                    <div>
                                        <dt className="text-xs text-gray-500 uppercase tracking-widest">
                                            Project Type
                                        </dt>
                                        <dd className="text-white font-medium mt-1">
                                            {project.project_type}
                                        </dd>
                                    </div>
                                    <div className="border-t border-white/5 pt-5">
                                        <dt className="text-xs text-gray-500 uppercase tracking-widest">
                                            Location
                                        </dt>
                                        <dd className="text-white font-medium mt-1">
                                            {project.location}
                                        </dd>
                                    </div>
                                    <div className="border-t border-white/5 pt-5">
                                        <dt className="text-xs text-gray-500 uppercase tracking-widest">
                                            Our Role
                                        </dt>
                                        <dd className="text-white font-medium mt-1">
                                            {project.role}
                                        </dd>
                                    </div>
                                    {project.client && (
                                        <div className="border-t border-white/5 pt-5">
                                            <dt className="text-xs text-gray-500 uppercase tracking-widest">
                                                Client
                                            </dt>
                                            <dd className="text-white font-medium mt-1">
                                                {project.client}
                                            </dd>
                                        </div>
                                    )}
                                    {project.completion_year && (
                                        <div className="border-t border-white/5 pt-5">
                                            <dt className="text-xs text-gray-500 uppercase tracking-widest">
                                                Completion Year
                                            </dt>
                                            <dd className="text-white font-medium mt-1">
                                                {project.completion_year}
                                            </dd>
                                        </div>
                                    )}
                                </dl>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Image Lightbox */}
            {selectedImage !== null && project.images && (
                <div
                    className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-6 right-6 text-white/60 hover:text-white transition p-2 glass rounded-xl"
                        onClick={() => setSelectedImage(null)}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                    <button
                        className="absolute left-6 text-white/60 hover:text-white transition p-3 glass rounded-xl"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(
                                selectedImage > 0
                                    ? selectedImage - 1
                                    : project.images!.length - 1,
                            );
                        }}
                    >
                        <svg
                            className="w-6 h-6"
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
                    </button>
                    <img
                        src={`/storage/${project.images[selectedImage].image_path}`}
                        alt={
                            project.images[selectedImage].caption ||
                            `Project image ${selectedImage + 1}`
                        }
                        className="max-h-[85vh] max-w-[85vw] object-contain rounded-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <button
                        className="absolute right-6 text-white/60 hover:text-white transition p-3 glass rounded-xl"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(
                                selectedImage < project.images!.length - 1
                                    ? selectedImage + 1
                                    : 0,
                            );
                        }}
                    >
                        <svg
                            className="w-6 h-6"
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
                    </button>
                    {project.images[selectedImage].caption && (
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 glass px-6 py-3 rounded-xl text-white text-center text-sm">
                            {project.images[selectedImage].caption}
                        </div>
                    )}
                </div>
            )}
        </Layout>
    );
}
