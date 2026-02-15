import { Head, Link } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import AnimatedSection from "@/Components/AnimatedSection";
import { HousePlan, Meta, PaginatedData } from "@/types";

interface HousePlansIndexProps {
    meta: Meta;
    housePlans: PaginatedData<HousePlan>;
}

export default function HousePlansIndex({
    meta,
    housePlans,
}: HousePlansIndexProps) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <Layout>
            <Head title={meta.title}>
                <meta name="description" content={meta.description} />
            </Head>

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-brand-950" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.08),transparent_60%)]" />
                <div className="relative container-custom">
                    <AnimatedSection variant="fade-up">
                        <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
                            <span className="gradient-text">House Plans</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl">
                            Browse our collection of professionally designed
                            house plans. Download and start building your dream
                            home.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* House Plans Grid */}
            <section className="section-padding bg-brand-950">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {housePlans.data.map((plan, index) => (
                            <AnimatedSection
                                key={plan.id}
                                variant="fade-up"
                                delay={index * 100}
                            >
                                <Link
                                    href={`/plans/${plan.slug}`}
                                    className="group card-modern rounded-2xl overflow-hidden block h-full"
                                >
                                    <div className="aspect-video bg-brand-900 relative overflow-hidden">
                                        {plan.preview_image ? (
                                            <img
                                                src={`/storage/${plan.preview_image}`}
                                                alt={plan.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-600 bg-gradient-to-br from-brand-900 to-brand-800">
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
                                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                                    />
                                                </svg>
                                            </div>
                                        )}
                                        <div className="absolute top-4 right-4 bg-accent text-brand-950 px-3 py-1 rounded-full text-sm font-bold">
                                            {formatPrice(plan.price)}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h2 className="text-lg font-display font-semibold text-white mb-3 group-hover:text-accent transition">
                                            {plan.title}
                                        </h2>
                                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                                            <div className="flex items-center">
                                                <svg
                                                    className="w-4 h-4 mr-2 text-accent/60"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                                    />
                                                </svg>
                                                {plan.bedrooms} Beds
                                            </div>
                                            <div className="flex items-center">
                                                <svg
                                                    className="w-4 h-4 mr-2 text-accent/60"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                                                    />
                                                </svg>
                                                {plan.bathrooms} Baths
                                            </div>
                                            <div className="flex items-center">
                                                <svg
                                                    className="w-4 h-4 mr-2 text-accent/60"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                                    />
                                                </svg>
                                                {plan.floors} Floor
                                                {plan.floors > 1 ? "s" : ""}
                                            </div>
                                            <div className="flex items-center">
                                                <svg
                                                    className="w-4 h-4 mr-2 text-accent/60"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                                                    />
                                                </svg>
                                                {plan.area} sq ft
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </AnimatedSection>
                        ))}
                    </div>

                    {housePlans.data.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-400">
                                No house plans available at the moment. Check
                                back soon!
                            </p>
                        </div>
                    )}

                    {/* Pagination */}
                    {housePlans.last_page > 1 && (
                        <div className="flex justify-center mt-12">
                            <nav className="flex space-x-2">
                                {housePlans.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || "#"}
                                        className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                                            link.active
                                                ? "bg-accent text-brand-950 font-semibold"
                                                : link.url
                                                  ? "glass text-gray-300 hover:text-white hover:border-white/20"
                                                  : "glass text-gray-600 cursor-not-allowed"
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                            </nav>
                        </div>
                    )}
                </div>
            </section>

            {/* Custom Design CTA */}
            <section className="section-padding bg-brand-900">
                <div className="container-custom text-center">
                    <AnimatedSection variant="fade-up">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                            Need a{" "}
                            <span className="gradient-text-accent">
                                Custom Design?
                            </span>
                        </h2>
                        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                            Can't find what you're looking for? Our team can
                            create a custom house plan tailored to your specific
                            needs and preferences.
                        </p>
                        <Link href="/quote-request" className="btn-accent">
                            Request Custom Design
                        </Link>
                    </AnimatedSection>
                </div>
            </section>
        </Layout>
    );
}
