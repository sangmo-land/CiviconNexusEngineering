import { Head, useForm } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import AnimatedSection from "@/Components/AnimatedSection";
import { Meta, PageProps } from "@/types";

interface ContactProps extends PageProps {
    meta: Meta;
}

export default function Contact({ meta, flash }: ContactProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/contact", {
            onSuccess: () => reset(),
        });
    };

    return (
        <Layout>
            <Head title={meta.title}>
                <meta name="description" content={meta.description} />
            </Head>

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-brand-950" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(245,158,11,0.08),transparent_60%)]" />
                <div className="relative container-custom">
                    <AnimatedSection variant="fade-up">
                        <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
                            <span className="gradient-text">Contact Us</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl">
                            Have questions or want to discuss your project? We'd
                            love to hear from you.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Contact Content */}
            <section className="section-padding bg-brand-950">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <AnimatedSection variant="slide-left">
                            <div>
                                <h2 className="text-2xl font-display font-bold text-white mb-6">
                                    Send us a Message
                                </h2>

                                {flash?.success && (
                                    <div className="mb-6 p-4 glass rounded-2xl border border-green-500/30 text-green-400">
                                        {flash.success}
                                    </div>
                                )}

                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
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
                                                setData("name", e.target.value)
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
                                            htmlFor="email"
                                            className="label-modern"
                                        >
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            className="input-modern"
                                            placeholder="john@example.com"
                                            required
                                        />
                                        {errors.email && (
                                            <p className="text-red-400 text-sm mt-1">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="message"
                                            className="label-modern"
                                        >
                                            Message *
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
                                            rows={6}
                                            className="input-modern resize-none"
                                            placeholder="Tell us about your inquiry..."
                                            required
                                        />
                                        {errors.message && (
                                            <p className="text-red-400 text-sm mt-1">
                                                {errors.message}
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full btn-accent disabled:opacity-50"
                                    >
                                        {processing
                                            ? "Sending..."
                                            : "Send Message"}
                                    </button>
                                </form>
                            </div>
                        </AnimatedSection>

                        {/* Contact Info */}
                        <AnimatedSection variant="slide-right" delay={200}>
                            <div>
                                <h2 className="text-2xl font-display font-bold text-white mb-6">
                                    Get in Touch
                                </h2>

                                <div className="space-y-6">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 w-12 h-12 glass rounded-2xl flex items-center justify-center">
                                            <svg
                                                className="w-6 h-6 text-accent"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-display font-semibold text-white">
                                                Office Address
                                            </h3>
                                            <p className="text-gray-400 mt-1">
                                                123 Engineering Street
                                                <br />
                                                Construction City, ST 12345
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 w-12 h-12 glass rounded-2xl flex items-center justify-center">
                                            <svg
                                                className="w-6 h-6 text-accent"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-display font-semibold text-white">
                                                Phone
                                            </h3>
                                            <p className="text-gray-400 mt-1">
                                                <a
                                                    href="tel:+1234567890"
                                                    className="hover:text-accent transition"
                                                >
                                                    +1 (234) 567-890
                                                </a>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 w-12 h-12 glass rounded-2xl flex items-center justify-center">
                                            <svg
                                                className="w-6 h-6 text-accent"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-display font-semibold text-white">
                                                Email
                                            </h3>
                                            <p className="text-gray-400 mt-1">
                                                <a
                                                    href="mailto:info@civiconnexus.com"
                                                    className="hover:text-accent transition"
                                                >
                                                    info@civiconnexus.com
                                                </a>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 w-12 h-12 glass rounded-2xl flex items-center justify-center">
                                            <svg
                                                className="w-6 h-6 text-accent"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-display font-semibold text-white">
                                                Business Hours
                                            </h3>
                                            <p className="text-gray-400 mt-1">
                                                Monday - Friday: 8:00 AM - 6:00
                                                PM
                                                <br />
                                                Saturday: 9:00 AM - 2:00 PM
                                                <br />
                                                Sunday: Closed
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
