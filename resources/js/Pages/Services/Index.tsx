import PageHeader from '@/Components/PageHeader';
import { Link } from '@inertiajs/react';
import SEOHead from '@/Components/SEOHead';
import Layout from '@/Layouts/Layout';
import AnimatedSection from "@/Components/AnimatedSection";
import { Service, Meta } from "@/types";

interface ServicesIndexProps {
    meta: Meta;
    services: Service[];
}

export default function ServicesIndex({ meta, services }: ServicesIndexProps) {
    return (
        <Layout>
            <SEOHead meta={meta} />

            <PageHeader
                label="Capabilities"
                title="Engineering services"
                description="Structural design, civil works and construction management for projects across Cameroon."
            />

            {/* Services Grid */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, index) => (
                            <AnimatedSection
                                key={service.id}
                                variant="fade-up"
                                delay={index * 80}
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
                                    <h2 className="font-display text-xl font-semibold text-ink mb-3 group-hover:text-signal transition-colors duration-300">
                                        {service.title}
                                    </h2>
                                    <p className="text-muted mb-6 leading-relaxed">
                                        {service.short_description}
                                    </p>
                                    <span className="inline-flex items-center text-signal font-medium text-sm group-hover:gap-3 gap-2 transition-all duration-300">
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

                    {services.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-muted text-lg">
                                No services available at the moment. Check back
                                soon!
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-700 via-brand-600 to-brand-700" />
                <div className="container-custom relative z-10 text-center">
                    <AnimatedSection variant="scale">
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-ink mb-6">
                            Need a Custom Solution?
                        </h2>
                        <p className="text-muted text-lg mb-10 max-w-2xl mx-auto">
                            Our team is ready to discuss your specific
                            requirements and provide tailored engineering
                            solutions.
                        </p>
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
                    </AnimatedSection>
                </div>
            </section>
        </Layout>
    );
}
