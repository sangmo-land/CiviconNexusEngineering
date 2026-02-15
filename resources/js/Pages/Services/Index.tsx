import { Head, Link } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import { Service, Meta } from '@/types';

interface ServicesIndexProps {
    meta: Meta;
    services: Service[];
}

export default function ServicesIndex({ meta, services }: ServicesIndexProps) {
    return (
        <Layout>
            <Head title={meta.title}>
                <meta name="description" content={meta.description} />
            </Head>

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold mb-4">Our Services</h1>
                    <p className="text-xl text-blue-100 max-w-2xl">
                        Comprehensive civil engineering and construction services tailored to meet your project needs.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition p-6 border border-gray-100"
                            >
                                {service.icon && (
                                    <div className="text-4xl mb-4">{service.icon}</div>
                                )}
                                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                                    {service.title}
                                </h2>
                                <p className="text-gray-600 mb-4">{service.short_description}</p>
                                <Link
                                    href={`/services/${service.slug}`}
                                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Learn More
                                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        ))}
                    </div>

                    {services.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-600">No services available at the moment. Check back soon!</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Need a Custom Solution?
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Our team is ready to discuss your specific requirements and provide tailored engineering solutions.
                    </p>
                    <Link
                        href="/quote-request"
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Request a Quote
                    </Link>
                </div>
            </section>
        </Layout>
    );
}
