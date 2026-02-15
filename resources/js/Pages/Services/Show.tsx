import { Head, Link } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import { Service, Meta } from '@/types';

interface ServiceShowProps {
    meta: Meta;
    service: Service;
}

export default function ServiceShow({ meta, service }: ServiceShowProps) {
    return (
        <Layout>
            <Head title={meta.title}>
                <meta name="description" content={meta.description} />
            </Head>

            {/* Breadcrumb */}
            <div className="bg-gray-50 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <nav className="flex text-sm">
                        <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
                        <span className="mx-2 text-gray-400">/</span>
                        <Link href="/services" className="text-gray-500 hover:text-gray-700">Services</Link>
                        <span className="mx-2 text-gray-400">/</span>
                        <span className="text-gray-900">{service.title}</span>
                    </nav>
                </div>
            </div>

            {/* Service Content */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {service.icon && (
                        <div className="text-6xl mb-6">{service.icon}</div>
                    )}
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">{service.title}</h1>
                    <div 
                        className="prose prose-lg max-w-none text-gray-600"
                        dangerouslySetInnerHTML={{ __html: service.description }}
                    />
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-blue-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Interested in this service?
                    </h2>
                    <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                        Contact us today to discuss your project requirements and get a customized quote.
                    </p>
                    <Link
                        href="/quote-request"
                        className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                    >
                        Request a Quote
                    </Link>
                </div>
            </section>
        </Layout>
    );
}
