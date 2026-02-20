import { useForm } from '@inertiajs/react';
import SEOHead from '@/Components/SEOHead';
import Layout from '@/Layouts/Layout';
import AnimatedSection from "@/Components/AnimatedSection";
import { Meta, PageProps } from "@/types";

interface QuoteRequestProps extends PageProps {
    meta: Meta;
}

export default function QuoteRequest({ meta, flash }: QuoteRequestProps) {
    const { data, setData, post, processing, errors, reset, progress } =
        useForm({
            name: "",
            phone: "",
            email: "",
            city: "",
            project_type: "",
            budget: "",
            message: "",
            attachment: null as File | null,
        });

    const projectTypes = [
        "Residential Construction",
        "Commercial Construction",
        "Industrial Construction",
        "Road & Bridge Construction",
        "Structural Engineering",
        "Renovation & Remodeling",
        "Custom House Plan",
        "Site Planning",
        "Other",
    ];

    const budgetRanges = [
        "Under $50,000",
        "$50,000 - $100,000",
        "$100,000 - $250,000",
        "$250,000 - $500,000",
        "$500,000 - $1,000,000",
        "Over $1,000,000",
        "Not Sure",
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/quote-request", {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <Layout>
            <SEOHead meta={meta} />

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-brand-950" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.08),transparent_60%)]" />
                <div className="relative container-custom">
                    <AnimatedSection variant="fade-up">
                        <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
                            <span className="gradient-text">
                                Request a Quote
                            </span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl">
                            Fill out the form below and our team will get back
                            to you with a customized quote for your project.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Quote Form */}
            <section className="section-padding bg-brand-950">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    {flash?.success && (
                        <AnimatedSection variant="fade-in">
                            <div className="mb-8 p-4 glass rounded-2xl border border-green-500/30 text-green-400">
                                {flash.success}
                            </div>
                        </AnimatedSection>
                    )}

                    <AnimatedSection variant="fade-up" delay={100}>
                        <div className="card-modern rounded-3xl p-8 md:p-10">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Personal Info */}
                                <div>
                                    <h2 className="text-xl font-display font-semibold text-white mb-6 flex items-center">
                                        <span className="w-8 h-8 rounded-lg bg-accent/20 text-accent text-sm flex items-center justify-center mr-3 font-bold">
                                            1
                                        </span>
                                        Personal Information
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label
                                                htmlFor="name"
                                                className="label-modern"
                                            >
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value,
                                                    )
                                                }
                                                className="input-modern"
                                                placeholder="John Doe"
                                                required
                                            />
                                            {errors.name && (
                                                <p className="text-red-400 text-sm mt-1">
                                                    {errors.name}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="phone"
                                                className="label-modern"
                                            >
                                                Phone Number *
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                value={data.phone}
                                                onChange={(e) =>
                                                    setData(
                                                        "phone",
                                                        e.target.value,
                                                    )
                                                }
                                                className="input-modern"
                                                placeholder="+1 (234) 567-890"
                                                required
                                            />
                                            {errors.phone && (
                                                <p className="text-red-400 text-sm mt-1">
                                                    {errors.phone}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="label-modern"
                                            >
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value,
                                                    )
                                                }
                                                className="input-modern"
                                                placeholder="john@example.com"
                                            />
                                            {errors.email && (
                                                <p className="text-red-400 text-sm mt-1">
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="city"
                                                className="label-modern"
                                            >
                                                City
                                            </label>
                                            <input
                                                type="text"
                                                id="city"
                                                value={data.city}
                                                onChange={(e) =>
                                                    setData(
                                                        "city",
                                                        e.target.value,
                                                    )
                                                }
                                                className="input-modern"
                                                placeholder="Your city"
                                            />
                                            {errors.city && (
                                                <p className="text-red-400 text-sm mt-1">
                                                    {errors.city}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="border-t border-white/5" />

                                {/* Project Info */}
                                <div>
                                    <h2 className="text-xl font-display font-semibold text-white mb-6 flex items-center">
                                        <span className="w-8 h-8 rounded-lg bg-accent/20 text-accent text-sm flex items-center justify-center mr-3 font-bold">
                                            2
                                        </span>
                                        Project Details
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label
                                                htmlFor="project_type"
                                                className="label-modern"
                                            >
                                                Project Type *
                                            </label>
                                            <select
                                                id="project_type"
                                                value={data.project_type}
                                                onChange={(e) =>
                                                    setData(
                                                        "project_type",
                                                        e.target.value,
                                                    )
                                                }
                                                className="input-modern"
                                                required
                                            >
                                                <option value="">
                                                    Select project type
                                                </option>
                                                {projectTypes.map((type) => (
                                                    <option
                                                        key={type}
                                                        value={type}
                                                    >
                                                        {type}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.project_type && (
                                                <p className="text-red-400 text-sm mt-1">
                                                    {errors.project_type}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="budget"
                                                className="label-modern"
                                            >
                                                Estimated Budget
                                            </label>
                                            <select
                                                id="budget"
                                                value={data.budget}
                                                onChange={(e) =>
                                                    setData(
                                                        "budget",
                                                        e.target.value,
                                                    )
                                                }
                                                className="input-modern"
                                            >
                                                <option value="">
                                                    Select budget range
                                                </option>
                                                {budgetRanges.map((range) => (
                                                    <option
                                                        key={range}
                                                        value={range}
                                                    >
                                                        {range}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.budget && (
                                                <p className="text-red-400 text-sm mt-1">
                                                    {errors.budget}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <label
                                            htmlFor="message"
                                            className="label-modern"
                                        >
                                            Project Description
                                        </label>
                                        <textarea
                                            id="message"
                                            value={data.message}
                                            onChange={(e) =>
                                                setData(
                                                    "message",
                                                    e.target.value,
                                                )
                                            }
                                            rows={5}
                                            className="input-modern resize-none"
                                            placeholder="Tell us more about your project, requirements, timeline, etc."
                                        />
                                        {errors.message && (
                                            <p className="text-red-400 text-sm mt-1">
                                                {errors.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="mt-6">
                                        <label
                                            htmlFor="attachment"
                                            className="label-modern"
                                        >
                                            Attachment (Optional)
                                        </label>
                                        <p className="text-sm text-gray-500 mb-2">
                                            Upload any relevant documents,
                                            drawings, or images (Max 10MB)
                                        </p>
                                        <input
                                            type="file"
                                            id="attachment"
                                            onChange={(e) =>
                                                setData(
                                                    "attachment",
                                                    e.target.files?.[0] || null,
                                                )
                                            }
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-gray-300 focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-accent/20 file:text-accent hover:file:bg-accent/30"
                                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
                                        />
                                        {errors.attachment && (
                                            <p className="text-red-400 text-sm mt-1">
                                                {errors.attachment}
                                            </p>
                                        )}
                                        {progress && (
                                            <div className="mt-2">
                                                <div className="bg-white/10 rounded-full h-2 overflow-hidden">
                                                    <div
                                                        className="bg-accent h-2 rounded-full transition-all"
                                                        style={{
                                                            width: `${progress.percentage}%`,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full btn-accent text-lg py-4 disabled:opacity-50"
                                >
                                    {processing
                                        ? "Submitting..."
                                        : "Submit Quote Request"}
                                </button>
                            </form>
                        </div>
                    </AnimatedSection>

                    {/* Additional Info */}
                    <AnimatedSection variant="fade-up" delay={300}>
                        <div className="mt-8 text-center text-gray-500">
                            <p>
                                Or call us directly at{" "}
                                <a
                                    href="tel:+237678626645"
                                    className="text-accent font-semibold hover:underline"
                                >
                                    +237 678 626 645
                                </a>
                            </p>
                        </div>
                    </AnimatedSection>
                </div>
            </section>
        </Layout>
    );
}
