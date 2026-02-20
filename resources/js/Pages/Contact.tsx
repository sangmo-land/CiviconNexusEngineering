import { useForm } from '@inertiajs/react';
import SEOHead from '@/Components/SEOHead';
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
            <SEOHead meta={meta} />

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
                                                Rond Point Express
                                                <br />
                                                Yaoundé, Cameroon
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
                                                    href="tel:+237678626645"
                                                    className="hover:text-accent transition"
                                                >
                                                    +237 678 626 645
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
                                                    href="mailto:support@civiconnexusengineering.com"
                                                    className="hover:text-accent transition"
                                                >
                                                    support@civiconnexusengineering.com
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

                                {/* WhatsApp Button */}
                                <a
                                    href={`https://wa.me/237678626645?text=${encodeURIComponent("Hello Civicon Nexus Engineering! I'm interested in your services. Could you please provide more information?\n\nBonjour Civicon Nexus Engineering ! Je suis intéressé(e) par vos services. Pourriez-vous me fournir plus d'informations ?")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-8 flex items-center justify-center glass rounded-2xl px-6 py-4 font-semibold text-green-400 border border-green-500/20 hover:border-green-500/40 hover:bg-green-500/10 transition-all duration-300"
                                >
                                    <svg
                                        className="w-6 h-6 mr-2"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    Chat on WhatsApp
                                </a>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
