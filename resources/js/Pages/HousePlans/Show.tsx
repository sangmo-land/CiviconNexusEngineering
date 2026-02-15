import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { HousePlan, Meta } from '@/types';

interface HousePlanShowProps {
    meta: Meta;
    housePlan: HousePlan;
}

export default function HousePlanShow({ meta, housePlan }: HousePlanShowProps) {
    const [showDownloadModal, setShowDownloadModal] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
    });

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const handleDownload = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/plans/${housePlan.slug}/download`, {
            onSuccess: () => {
                setShowDownloadModal(false);
                reset();
                // Trigger actual download
                window.location.href = `/plans/${housePlan.slug}/download?email=${encodeURIComponent(data.email)}`;
            },
        });
    };

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
                        <Link href="/plans" className="text-gray-500 hover:text-gray-700">House Plans</Link>
                        <span className="mx-2 text-gray-400">/</span>
                        <span className="text-gray-900">{housePlan.title}</span>
                    </nav>
                </div>
            </div>

            {/* Plan Details */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Preview Image */}
                        <div>
                            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                                {housePlan.preview_image ? (
                                    <img
                                        src={`/storage/${housePlan.preview_image}`}
                                        alt={housePlan.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Plan Info */}
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">{housePlan.title}</h1>
                            <p className="text-4xl font-bold text-blue-600 mb-6">{formatPrice(housePlan.price)}</p>

                            {/* Specifications */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="text-sm text-gray-500">Bedrooms</div>
                                    <div className="text-2xl font-bold text-gray-900">{housePlan.bedrooms}</div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="text-sm text-gray-500">Bathrooms</div>
                                    <div className="text-2xl font-bold text-gray-900">{housePlan.bathrooms}</div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="text-sm text-gray-500">Floors</div>
                                    <div className="text-2xl font-bold text-gray-900">{housePlan.floors}</div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="text-sm text-gray-500">Area</div>
                                    <div className="text-2xl font-bold text-gray-900">{housePlan.area} sq ft</div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={() => setShowDownloadModal(true)}
                                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition text-center"
                                >
                                    Download PDF
                                </button>
                                <Link
                                    href="/quote-request"
                                    className="flex-1 border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition text-center"
                                >
                                    Request Quote
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Description */}
            <section className="pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Plan Description</h2>
                    <div 
                        className="prose prose-lg max-w-none text-gray-600"
                        dangerouslySetInnerHTML={{ __html: housePlan.description }}
                    />
                </div>
            </section>

            {/* Download Modal */}
            {showDownloadModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-900">Download House Plan</h3>
                            <button
                                onClick={() => setShowDownloadModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-gray-600 mb-4">
                            Enter your email address to download the PDF for "{housePlan.title}".
                        </p>
                        <form onSubmit={handleDownload}>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="your@email.com"
                                    required
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                            >
                                {processing ? 'Processing...' : 'Download PDF'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
}
