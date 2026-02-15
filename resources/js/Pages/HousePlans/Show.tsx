import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import Layout from '@/Layouts/Layout';
import AnimatedSection from "@/Components/AnimatedSection";
import { HousePlan, Meta } from "@/types";

interface HousePlanShowProps {
    meta: Meta;
    housePlan: HousePlan;
}

export default function HousePlanShow({ meta, housePlan }: HousePlanShowProps) {
    const [showDownloadModal, setShowDownloadModal] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
    });

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
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
            <div className="pt-24 border-b border-white/5 bg-brand-950">
                <div className="container-custom py-4">
                    <nav className="flex text-sm">
                        <Link
                            href="/"
                            className="text-gray-500 hover:text-accent transition"
                        >
                            Home
                        </Link>
                        <span className="mx-2 text-gray-600">/</span>
                        <Link
                            href="/plans"
                            className="text-gray-500 hover:text-accent transition"
                        >
                            House Plans
                        </Link>
                        <span className="mx-2 text-gray-600">/</span>
                        <span className="text-white">{housePlan.title}</span>
                    </nav>
                </div>
            </div>

            {/* Plan Details */}
            <section className="section-padding bg-brand-950">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Preview Image */}
                        <AnimatedSection variant="slide-left">
                            <div className="aspect-square bg-brand-900 rounded-2xl overflow-hidden border border-white/10">
                                {housePlan.preview_image ? (
                                    <img
                                        src={`/storage/${housePlan.preview_image}`}
                                        alt={housePlan.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                                        <svg
                                            className="w-24 h-24"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1}
                                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </AnimatedSection>

                        {/* Plan Info */}
                        <AnimatedSection variant="slide-right" delay={200}>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                                    {housePlan.title}
                                </h1>
                                <p className="text-4xl font-bold gradient-text mb-8">
                                    {formatPrice(housePlan.price)}
                                </p>

                                {/* Specifications */}
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="glass rounded-2xl p-4">
                                        <div className="text-sm text-gray-500">
                                            Bedrooms
                                        </div>
                                        <div className="text-2xl font-display font-bold text-white">
                                            {housePlan.bedrooms}
                                        </div>
                                    </div>
                                    <div className="glass rounded-2xl p-4">
                                        <div className="text-sm text-gray-500">
                                            Bathrooms
                                        </div>
                                        <div className="text-2xl font-display font-bold text-white">
                                            {housePlan.bathrooms}
                                        </div>
                                    </div>
                                    <div className="glass rounded-2xl p-4">
                                        <div className="text-sm text-gray-500">
                                            Floors
                                        </div>
                                        <div className="text-2xl font-display font-bold text-white">
                                            {housePlan.floors}
                                        </div>
                                    </div>
                                    <div className="glass rounded-2xl p-4">
                                        <div className="text-sm text-gray-500">
                                            Area
                                        </div>
                                        <div className="text-2xl font-display font-bold text-white">
                                            {housePlan.area} sq ft
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-wrap gap-4">
                                    <button
                                        onClick={() =>
                                            setShowDownloadModal(true)
                                        }
                                        className="flex-1 btn-accent text-center"
                                    >
                                        Download PDF
                                    </button>
                                    <Link
                                        href="/quote-request"
                                        className="flex-1 btn-secondary text-center"
                                    >
                                        Request Quote
                                    </Link>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Description */}
            <section className="pb-20 bg-brand-950">
                <div className="container-custom">
                    <AnimatedSection variant="fade-up">
                        <h2 className="text-2xl font-display font-bold text-white mb-6">
                            Plan Description
                        </h2>
                        <div
                            className="prose prose-lg prose-invert max-w-none prose-headings:font-display prose-p:text-gray-400 prose-a:text-accent prose-strong:text-white"
                            dangerouslySetInnerHTML={{
                                __html: housePlan.description,
                            }}
                        />
                    </AnimatedSection>
                </div>
            </section>

            {/* Download Modal */}
            {showDownloadModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div
                        className="glass-dark rounded-2xl max-w-md w-full p-8 border border-white/10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-display font-bold text-white">
                                Download House Plan
                            </h3>
                            <button
                                onClick={() => setShowDownloadModal(false)}
                                className="text-gray-500 hover:text-white transition"
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
                        </div>
                        <p className="text-gray-400 mb-6">
                            Enter your email address to download the PDF for "
                            {housePlan.title}".
                        </p>
                        <form onSubmit={handleDownload}>
                            <div className="mb-6">
                                <label htmlFor="email" className="label-modern">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className="input-modern"
                                    placeholder="your@email.com"
                                    required
                                />
                                {errors.email && (
                                    <p className="text-red-400 text-sm mt-1">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full btn-accent disabled:opacity-50"
                            >
                                {processing ? "Processing..." : "Download PDF"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
}
