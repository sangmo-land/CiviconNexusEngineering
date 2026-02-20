import { Link } from '@inertiajs/react';
import SEOHead from '@/Components/SEOHead';
import { useState } from 'react';
import Layout from '@/Layouts/Layout';
import AnimatedSection from "@/Components/AnimatedSection";
import ImageLightbox from "@/Components/ImageLightbox";
import { optimizedImageUrl } from "@/utils/image";
import { Project, Meta } from "@/types";

interface ProjectShowProps {
    meta: Meta;
    project: Project;
}

export default function ProjectShow({ meta, project }: ProjectShowProps) {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [heroLoaded, setHeroLoaded] = useState(false);

    const heroImage = project.images?.[0];

    // Prepare images for lightbox (use large preset for full view)
    const lightboxImages = (project.images || []).map((img, i) => ({
        src: optimizedImageUrl(img.image_path, 'large'),
        alt: img.caption || `${project.title} - Image ${i + 1}`,
        caption: img.caption,
    }));

    const statusLabel = project.is_ongoing ? 'Ongoing' : (project.completion_year ? 'Completed' : null);
    const timelineLabel = (() => {
        if (project.start_year && project.is_ongoing) return `${project.start_year} – Present`;
        if (project.start_year && project.completion_year) return `${project.start_year} – ${project.completion_year}`;
        if (project.completion_year) return `Completed ${project.completion_year}`;
        if (project.start_year) return `Started ${project.start_year}`;
        return null;
    })();

    return (
        <Layout>
            <SEOHead meta={meta} />

            {/* ─── Cinematic Hero ─── */}
            <section className="relative h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden">
                {heroImage ? (
                    <img
                        src={optimizedImageUrl(heroImage.image_path, 'hero')}
                        alt={project.title}
                        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ${heroLoaded ? 'scale-100' : 'scale-110'}`}
                        onLoad={() => setHeroLoaded(true)}
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-800 to-brand-950" />
                )}
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/60 to-brand-950/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-950/80 via-transparent to-transparent" />

                {/* Breadcrumb - top */}
                <div className="absolute top-0 left-0 right-0 pt-28 z-10">
                    <div className="container-custom">
                        <nav className="flex items-center text-sm gap-2">
                            <Link href="/" className="text-white/50 hover:text-accent transition-colors">Home</Link>
                            <svg className="w-3 h-3 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            <Link href="/projects" className="text-white/50 hover:text-accent transition-colors">Projects</Link>
                            <svg className="w-3 h-3 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            <span className="text-white/80 truncate max-w-[200px]">{project.title}</span>
                        </nav>
                    </div>
                </div>

                {/* Hero Content - bottom */}
                <div className="absolute bottom-0 left-0 right-0 pb-12 z-10">
                    <div className="container-custom">
                        <AnimatedSection variant="fade-up">
                            <div className="flex flex-wrap items-center gap-3 mb-5">
                                <span className="inline-flex items-center px-4 py-1.5 bg-accent text-brand-950 text-xs font-bold rounded-full uppercase tracking-wider">
                                    {project.project_type}
                                </span>
                                {statusLabel && (
                                    <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-full uppercase tracking-wider ${
                                        project.is_ongoing
                                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                            : 'bg-white/10 text-white/80 border border-white/20'
                                    }`}>
                                        {project.is_ongoing && (
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                            </span>
                                        )}
                                        {statusLabel}
                                    </span>
                                )}
                            </div>
                            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 max-w-4xl leading-[1.1]">
                                {project.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-gray-300 text-sm">
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>{project.location}</span>
                                </div>
                                {timelineLabel && (
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span>{timelineLabel}</span>
                                    </div>
                                )}
                                {project.client && (
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        <span>{project.client}</span>
                                    </div>
                                )}
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* ─── Quick Stats Bar ─── */}
            <section className="relative z-10 -mt-1 border-t border-white/5 bg-brand-950/90 backdrop-blur-md">
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
                        {[
                            { label: 'Project Type', value: project.project_type },
                            { label: 'Location', value: project.location },
                            { label: 'Our Role', value: project.role },
                            { label: 'Status', value: project.is_ongoing ? 'In Progress' : (project.completion_year ? `Completed ${project.completion_year}` : 'N/A') },
                        ].map((stat, i) => (
                            <AnimatedSection key={stat.label} variant="fade-up" delay={i * 100}>
                                <div className="py-6 px-4 md:px-6 text-center">
                                    <dt className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-[0.2em] font-medium">{stat.label}</dt>
                                    <dd className="text-white font-semibold mt-1 text-sm sm:text-base truncate">{stat.value}</dd>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Main Content ─── */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Description — wider column */}
                        <AnimatedSection variant="slide-left" className="lg:col-span-8">
                            <div className="mb-8">
                                <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">About This Project</h2>
                                <div className="w-16 h-1 bg-gradient-to-r from-accent to-accent-dark rounded-full" />
                            </div>
                            <div
                                className="prose prose-lg prose-invert max-w-none text-gray-300 leading-relaxed
                                    prose-headings:font-display prose-headings:text-white
                                    prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                                    prose-strong:text-white prose-p:leading-[1.9]"
                                dangerouslySetInnerHTML={{ __html: project.description }}
                            />
                        </AnimatedSection>

                        {/* Sidebar */}
                        <AnimatedSection variant="slide-right" className="lg:col-span-4">
                            <div className="glass-dark rounded-3xl overflow-hidden sticky top-28">
                                {/* Sidebar Header */}
                                <div className="bg-gradient-to-r from-accent/10 to-transparent px-8 py-6 border-b border-white/5">
                                    <h3 className="font-display text-lg font-semibold text-white flex items-center gap-2">
                                        <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                        Project Details
                                    </h3>
                                </div>

                                {/* Details List */}
                                <dl className="p-8 space-y-0">
                                    {[
                                        { icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', label: 'Project Type', value: project.project_type },
                                        { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z', label: 'Location', value: project.location },
                                        { icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', label: 'Our Role', value: project.role },
                                        ...(project.client ? [{ icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', label: 'Client', value: project.client }] : []),
                                        ...(project.start_year ? [{ icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', label: 'Start Year', value: String(project.start_year) }] : []),
                                        ...(project.completion_year && !project.is_ongoing ? [{ icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Completion Year', value: String(project.completion_year) }] : []),
                                    ].map((item, i) => (
                                        <div key={item.label} className={`flex items-start gap-4 ${i > 0 ? 'border-t border-white/5 pt-5 mt-5' : ''}`}>
                                            <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
                                                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                                                </svg>
                                            </div>
                                            <div>
                                                <dt className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">{item.label}</dt>
                                                <dd className="text-white font-medium mt-0.5 text-sm">{item.value}</dd>
                                            </div>
                                        </div>
                                    ))}
                                </dl>

                                {/* Status Badge */}
                                {project.is_ongoing && (
                                    <div className="px-8 pb-6">
                                        <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-5 py-4">
                                            <span className="relative flex h-3 w-3">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                            </span>
                                            <div>
                                                <p className="text-emerald-400 font-semibold text-sm">Currently In Progress</p>
                                                <p className="text-emerald-400/60 text-xs mt-0.5">This project is actively under construction</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* CTA */}
                                <div className="px-8 pb-8">
                                    <Link
                                        href="/quote-request"
                                        className="w-full btn-accent text-center text-sm"
                                    >
                                        Start Your Project
                                        <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* ─── Project Gallery ─── */}
            {project.images && project.images.length > 0 && (
                <section className="pb-24">
                    <div className="container-custom">
                        <AnimatedSection variant="fade-up">
                            <div className="flex items-end justify-between mb-10">
                                <div>
                                    <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                                        Project Gallery
                                    </h2>
                                    <div className="w-16 h-1 bg-gradient-to-r from-accent to-accent-dark rounded-full" />
                                </div>
                                <span className="text-gray-500 text-sm font-medium">
                                    {project.images.length} {project.images.length === 1 ? 'image' : 'images'}
                                </span>
                            </div>
                        </AnimatedSection>

                        {/* Masonry-style grid */}
                        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                            {project.images.map((image, index) => (
                                <AnimatedSection key={image.id} variant="scale" delay={index * 60}>
                                    <button
                                        onClick={() => setSelectedImage(index)}
                                        className="w-full break-inside-avoid rounded-2xl overflow-hidden group relative focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-brand-950"
                                    >
                                        <img
                                            src={optimizedImageUrl(image.image_path, 'thumb')}
                                            alt={image.caption || `${project.title} - Image ${index + 1}`}
                                            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                                            loading="lazy"
                                        />
                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                                            <div className="flex items-center justify-between w-full">
                                                {image.caption && (
                                                    <span className="text-white text-sm font-medium">{image.caption}</span>
                                                )}
                                                <span className="ml-auto flex-shrink-0 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </button>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ─── CTA Section ─── */}
            <section className="pb-24">
                <div className="container-custom">
                    <AnimatedSection variant="fade-up">
                        <div className="relative rounded-3xl overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-brand-700/20 to-accent/10" />
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
                            <div className="relative glass-dark border-white/10 px-8 md:px-16 py-16 md:py-20 text-center">
                                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                                    Ready to Build Something Remarkable?
                                </h2>
                                <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                                    Let's discuss how Civicon Nexus Engineering can bring your vision to life with the same quality and dedication shown in our projects.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Link href="/quote-request" className="btn-accent">
                                        Get a Free Quote
                                        <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                    <Link href="/projects" className="btn-secondary">
                                        View More Projects
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* ─── Lightbox ─── */}
            <ImageLightbox
                images={lightboxImages}
                selectedIndex={selectedImage}
                onClose={() => setSelectedImage(null)}
                onNavigate={(i) => setSelectedImage(i)}
            />
        </Layout>
    );
}
