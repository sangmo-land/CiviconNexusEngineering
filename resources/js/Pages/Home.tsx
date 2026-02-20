import { Link } from '@inertiajs/react';
import SEOHead from '@/Components/SEOHead';
import Layout from '@/Layouts/Layout';
import AnimatedSection from "@/Components/AnimatedSection";
import { Service, Project, Meta } from "@/types";

interface HomeProps {
    meta: Meta;
    featuredServices: Service[];
    featuredProjects: Project[];
}

export default function Home({
    meta,
    featuredServices,
    featuredProjects,
}: HomeProps) {
    return (
        <Layout>
            <SEOHead meta={meta} />

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl animate-float" />
                    <div
                        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float"
                        style={{ animationDelay: "3s" }}
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-700/10 rounded-full blur-3xl" />
                    {/* Grid pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
                </div>

                <div className="container-custom relative z-10 pt-32 pb-20">
                    <div className="max-w-4xl">
                        <AnimatedSection variant="fade-up" delay={0}>
                            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8">
                                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                                <span className="text-sm text-gray-300 font-medium">
                                    Engineering Excellence Since 2010
                                </span>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection variant="fade-up" delay={100}>
                            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight mb-8">
                                <span className="text-white">Building</span>
                                <br />
                                <span className="gradient-text">
                                    Tomorrow's
                                </span>
                                <br />
                                <span className="text-white">
                                    Infrastructure
                                </span>
                            </h1>
                        </AnimatedSection>

                        <AnimatedSection variant="fade-up" delay={200}>
                            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed mb-12 font-light">
                                Civicon Nexus Engineering delivers exceptional
                                civil engineering and construction services.
                                From structural design to project completion.
                            </p>
                        </AnimatedSection>

                        <AnimatedSection variant="fade-up" delay={300}>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/quote-request"
                                    className="btn-accent text-lg"
                                >
                                    Get a Free Quote
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
                                <Link
                                    href="/projects"
                                    className="btn-secondary text-lg"
                                >
                                    View Our Projects
                                </Link>
                            </div>
                        </AnimatedSection>

                        {/* Stats */}
                        <AnimatedSection variant="fade-up" delay={500}>
                            <div className="grid grid-cols-3 gap-8 mt-20 pt-12 border-t border-white/5">
                                {[
                                    {
                                        value: "200+",
                                        label: "Projects Completed",
                                    },
                                    { value: "15+", label: "Years Experience" },
                                    {
                                        value: "98%",
                                        label: "Client Satisfaction",
                                    },
                                ].map((stat) => (
                                    <div key={stat.label}>
                                        <div className="font-display text-3xl md:text-5xl font-bold gradient-text-accent">
                                            {stat.value}
                                        </div>
                                        <div className="text-gray-500 text-sm md:text-base mt-1">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </AnimatedSection>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500">
                    <span className="text-xs tracking-widest uppercase">
                        Scroll
                    </span>
                    <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1.5">
                        <div className="w-1 h-2 bg-accent rounded-full animate-bounce" />
                    </div>
                </div>
            </section>

            {/* Featured Services */}
            <section className="section-padding relative">
                <div className="absolute inset-0 bg-gradient-to-b from-brand-950 via-brand-900/50 to-brand-950" />
                <div className="container-custom relative z-10">
                    <AnimatedSection variant="fade-up">
                        <div className="text-center mb-16">
                            <span className="text-accent font-display text-sm tracking-widest uppercase font-semibold">
                                What We Do
                            </span>
                            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
                                Our Services
                            </h2>
                            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                                Comprehensive civil engineering and construction
                                services tailored to meet your needs.
                            </p>
                        </div>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredServices.map((service, index) => (
                            <AnimatedSection
                                key={service.id}
                                variant="fade-up"
                                delay={index * 100}
                            >
                                <Link
                                    href={`/services/${service.slug}`}
                                    className="group card-modern block h-full"
                                >
                                    {service.icon && (
                                        <div className="text-4xl mb-5">
                                            {service.icon}
                                        </div>
                                    )}
                                    <h3 className="font-display text-xl font-semibold text-white mb-3 group-hover:text-accent transition-colors duration-300">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-400 mb-6 leading-relaxed">
                                        {service.short_description}
                                    </p>
                                    <span className="inline-flex items-center text-accent font-medium text-sm group-hover:gap-3 gap-2 transition-all duration-300">
                                        Learn More
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
                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                            />
                                        </svg>
                                    </span>
                                </Link>
                            </AnimatedSection>
                        ))}
                    </div>

                    <AnimatedSection variant="fade-up" delay={400}>
                        <div className="text-center mt-12">
                            <Link href="/services" className="btn-secondary">
                                View All Services
                                <svg
                                    className="w-4 h-4 ml-2"
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

            {/* Featured Projects */}
            <section className="section-padding">
                <div className="container-custom">
                    <AnimatedSection variant="fade-up">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                            <div>
                                <span className="text-accent font-display text-sm tracking-widest uppercase font-semibold">
                                    Portfolio
                                </span>
                                <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-4">
                                    Featured Projects
                                </h2>
                            </div>
                            <Link
                                href="/projects"
                                className="btn-secondary self-start md:self-auto"
                            >
                                View All
                                <svg
                                    className="w-4 h-4 ml-2"
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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredProjects.map((project, index) => (
                            <AnimatedSection
                                key={project.id}
                                variant="scale"
                                delay={index * 100}
                            >
                                <Link
                                    href={`/projects/${project.slug}`}
                                    className="group block rounded-3xl overflow-hidden glass hover:border-white/20 transition-all duration-500"
                                >
                                    <div className="aspect-[4/3] bg-brand-800 relative overflow-hidden">
                                        {project.images[0] ? (
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
                                        {/* Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-transparent to-transparent" />
                                        {/* Project type badge */}
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-accent/90 text-brand-950 text-xs font-bold rounded-full uppercase tracking-wider">
                                                {project.project_type}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-display text-lg font-semibold text-white group-hover:text-accent transition-colors duration-300">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm mt-2 flex items-center gap-1">
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
                                        </p>
                                    </div>
                                </Link>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="section-padding relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-brand-950 via-brand-900/30 to-brand-950" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <div className="container-custom relative z-10">
                    <AnimatedSection variant="fade-up">
                        <div className="text-center mb-16">
                            <span className="text-accent font-display text-sm tracking-widest uppercase font-semibold">
                                Why Us
                            </span>
                            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-4">
                                Why Choose Civicon Nexus
                            </h2>
                        </div>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: (
                                    <svg
                                        className="w-8 h-8"
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
                                ),
                                title: "Quality Assured",
                                desc: "Every project meets the highest standards of construction and engineering excellence.",
                            },
                            {
                                icon: (
                                    <svg
                                        className="w-8 h-8"
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
                                ),
                                title: "On-Time Delivery",
                                desc: "We respect deadlines and deliver projects on schedule, every single time.",
                            },
                            {
                                icon: (
                                    <svg
                                        className="w-8 h-8"
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
                                ),
                                title: "Expert Team",
                                desc: "Our team of certified engineers and builders bring decades of combined experience.",
                            },
                            {
                                icon: (
                                    <svg
                                        className="w-8 h-8"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                ),
                                title: "Fair Pricing",
                                desc: "Transparent pricing with no hidden costs. Get the best value for your investment.",
                            },
                        ].map((item, index) => (
                            <AnimatedSection
                                key={item.title}
                                variant="fade-up"
                                delay={index * 100}
                            >
                                <div className="group card-modern text-center h-full">
                                    <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mx-auto mb-6 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                                        {item.icon}
                                    </div>
                                    <h3 className="font-display text-lg font-semibold text-white mb-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-700 via-brand-600 to-brand-700" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

                <div className="container-custom relative z-10 text-center">
                    <AnimatedSection variant="scale">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
                                Ready to Start{" "}
                                <span className="gradient-text-accent">
                                    Your Project?
                                </span>
                            </h2>
                            <p className="text-blue-100/80 text-lg md:text-xl mb-10 leading-relaxed">
                                Get in touch with our team of experts and let's
                                discuss how we can bring your construction
                                project to life.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link
                                    href="/quote-request"
                                    className="btn-accent text-lg"
                                >
                                    Request a Quote
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
                                <Link
                                    href="/contact"
                                    className="btn-secondary text-lg border-white/20"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>
        </Layout>
    );
}
