import { Head, Link } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import { HousePlan, Meta, PaginatedData } from '@/types';

interface HousePlansIndexProps {
    meta: Meta;
    housePlans: PaginatedData<HousePlan>;
}

export default function HousePlansIndex({ meta, housePlans }: HousePlansIndexProps) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <Layout>
            <Head title={meta.title}>
                <meta name="description" content={meta.description} />
            </Head>

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold mb-4">House Plans</h1>
                    <p className="text-xl text-blue-100 max-w-2xl">
                        Browse our collection of professionally designed house plans. Download and start building your dream home.
                    </p>
                </div>
            </section>

            {/* House Plans Grid */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {housePlans.data.map((plan) => (
                            <Link
                                key={plan.id}
                                href={`/plans/${plan.slug}`}
                                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition border border-gray-100"
                            >
                                <div className="aspect-video bg-gray-200 relative overflow-hidden">
                                    {plan.preview_image ? (
                                        <img
                                            src={`/storage/${plan.preview_image}`}
                                            alt={plan.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gradient-to-br from-gray-100 to-gray-200">
                                            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                            </svg>
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                        {formatPrice(plan.price)}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition">
                                        {plan.title}
                                    </h2>
                                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                            </svg>
                                            {plan.bedrooms} Beds
                                        </div>
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                                            </svg>
                                            {plan.bathrooms} Baths
                                        </div>
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            {plan.floors} Floor{plan.floors > 1 ? 's' : ''}
                                        </div>
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                            </svg>
                                            {plan.area} sq ft
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {housePlans.data.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-600">No house plans available at the moment. Check back soon!</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {housePlans.last_page > 1 && (
                        <div className="flex justify-center mt-12">
                            <nav className="flex space-x-2">
                                {housePlans.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                            link.active
                                                ? 'bg-blue-600 text-white'
                                                : link.url
                                                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </nav>
                        </div>
                    )}
                </div>
            </section>

            {/* Custom Design CTA */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Need a Custom Design?
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Can't find what you're looking for? Our team can create a custom house plan tailored to your specific needs and preferences.
                    </p>
                    <Link
                        href="/quote-request"
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Request Custom Design
                    </Link>
                </div>
            </section>
        </Layout>
    );
}
