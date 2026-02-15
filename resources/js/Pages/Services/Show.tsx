import { Link } from '@inertiajs/react';
import SEOHead from '@/Components/SEOHead';
import Layout from '@/Layouts/Layout';
import AnimatedSection from "@/Components/AnimatedSection";
import { Service, Meta } from "@/types";

interface ServiceShowProps {
    meta: Meta;
    service: Service;
}

export default function ServiceShow({ meta, service }: ServiceShowProps) {
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
                            href="/services"
                            className="text-gray-500 hover:text-accent transition-colors"
                        >
                            Services
                        </Link>
                        <span className="text-gray-600">/</span>
                        <span className="text-white">{service.title}</span>
                    </nav>
                </div>
            </div>

            {/* Service Content */}
            <section className="section-padding">
                <div className="max-w-4xl mx-auto px-6 sm:px-8">
                    <AnimatedSection variant="fade-up">
                        {service.icon && (
                            <div className="text-6xl mb-6">{service.icon}</div>
                        )}
                        <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-8">
                            {service.title}
                        </h1>
                    </AnimatedSection>
                    <AnimatedSection variant="fade-up" delay={150}>
                        <div
                            className="prose prose-lg prose-invert max-w-none text-gray-300 leading-relaxed
                                       prose-headings:font-display prose-headings:text-white
                                       prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                                       prose-strong:text-white"
                            dangerouslySetInnerHTML={{
                                __html: service.description,
                            }}
                        />
                    </AnimatedSection>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-700 via-brand-600 to-brand-700" />
                <div className="container-custom relative z-10 text-center">
                    <AnimatedSection variant="scale">
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                            Interested in this service?
                        </h2>
                        <p className="text-blue-100/80 text-lg mb-10 max-w-2xl mx-auto">
                            Contact us today to discuss your project
                            requirements and get a customized quote.
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
