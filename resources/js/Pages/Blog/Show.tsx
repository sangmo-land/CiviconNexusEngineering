import { Head, Link } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import AnimatedSection from "@/Components/AnimatedSection";
import { Post, Meta } from "@/types";

interface BlogShowProps {
    meta: Meta;
    post: Post;
}

export default function BlogShow({ meta, post }: BlogShowProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const readingTime = (content: string) => {
        const words = content.replace(/<[^>]+>/g, "").split(/\s+/).length;
        return Math.max(1, Math.ceil(words / 200));
    };

    return (
        <Layout>
            <Head title={meta.title}>
                <meta name="description" content={meta.description} />
            </Head>

            {/* Hero Header */}
            <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
                {/* Background layers */}
                <div className="absolute inset-0 bg-brand-950" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(245,158,11,0.07),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.05),transparent_50%)]" />
                {/* Subtle grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />

                <div className="relative max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
                    {/* Breadcrumb */}
                    <AnimatedSection variant="fade-up">
                        <nav className="flex items-center text-[0.8125rem] mb-12 space-x-2.5 font-medium">
                            <Link
                                href="/"
                                className="text-gray-500 hover:text-white transition-colors duration-200"
                            >
                                Home
                            </Link>
                            <svg
                                className="w-3 h-3 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                            <Link
                                href="/blog"
                                className="text-gray-500 hover:text-white transition-colors duration-200"
                            >
                                Blog
                            </Link>
                            <svg
                                className="w-3 h-3 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                            <span className="text-gray-400 truncate max-w-[180px] sm:max-w-sm">
                                {post.title}
                            </span>
                        </nav>
                    </AnimatedSection>

                    {/* Date & Reading Time */}
                    <AnimatedSection variant="fade-up" delay={100}>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-[2px] bg-gradient-to-r from-accent to-accent/0 rounded-full" />
                                {post.published_at && (
                                    <time className="text-accent font-semibold text-xs tracking-[0.15em] uppercase">
                                        {formatDate(post.published_at)}
                                    </time>
                                )}
                            </div>
                            <span className="text-gray-600">•</span>
                            <span className="text-gray-500 text-xs tracking-[0.1em] uppercase font-medium">
                                {readingTime(post.content)} min read
                            </span>
                        </div>
                    </AnimatedSection>

                    {/* Title */}
                    <AnimatedSection variant="fade-up" delay={200}>
                        <h1 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] font-display font-extrabold text-white leading-[1.1] mb-8 max-w-4xl">
                            {post.title}
                        </h1>
                    </AnimatedSection>

                    {/* Excerpt */}
                    {post.excerpt && (
                        <AnimatedSection variant="fade-up" delay={300}>
                            <p className="text-[1.125rem] sm:text-[1.25rem] text-gray-400 leading-[1.8] max-w-3xl">
                                {post.excerpt}
                            </p>
                        </AnimatedSection>
                    )}
                </div>
            </section>

            {/* Decorative Divider */}
            <div className="relative">
                <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
                    <div className="flex items-center gap-4">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        <div className="w-1.5 h-1.5 rounded-full bg-accent/40" />
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    </div>
                </div>
            </div>

            {/* Article Body */}
            <article className="py-20 md:py-28 bg-brand-950">
                <div className="max-w-[52rem] mx-auto px-6 sm:px-10 lg:px-8">
                    {/* Featured Image */}
                    {post.featured_image && (
                        <AnimatedSection variant="fade-in" delay={100}>
                            <figure className="mb-16 -mx-4 sm:-mx-8 lg:-mx-16">
                                <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40 ring-1 ring-white/5">
                                    <img
                                        src={`/storage/${post.featured_image}`}
                                        alt={post.title}
                                        className="w-full h-auto"
                                    />
                                </div>
                            </figure>
                        </AnimatedSection>
                    )}

                    {/* Content */}
                    <AnimatedSection variant="fade-up" delay={200}>
                        <div
                            className="article-content"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </AnimatedSection>

                    {/* Author / Share Bar */}
                    <div className="mt-20 pt-10 border-t border-white/10">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-3 text-gray-400 hover:text-accent transition-all duration-300 group"
                            >
                                <div className="w-10 h-10 rounded-xl glass flex items-center justify-center group-hover:bg-accent/10 transition-colors duration-300">
                                    <svg
                                        className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 19l-7-7 7-7"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-500 uppercase tracking-wider block">
                                        Previous
                                    </span>
                                    <span className="font-semibold text-sm">
                                        All articles
                                    </span>
                                </div>
                            </Link>

                            <div className="flex items-center gap-4">
                                <span className="text-xs text-gray-600 uppercase tracking-wider">
                                    Share
                                </span>
                                <div className="flex gap-2">
                                    <a
                                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window?.location?.href || "")}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-9 h-9 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
                                    >
                                        <svg
                                            className="w-3.5 h-3.5"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                    </a>
                                    <a
                                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window?.location?.href || "")}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-9 h-9 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
                                    >
                                        <svg
                                            className="w-3.5 h-3.5"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    </a>
                                    <a
                                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window?.location?.href || "")}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-9 h-9 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
                                    >
                                        <svg
                                            className="w-3.5 h-3.5"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            {/* CTA Section */}
            <section className="relative py-28 md:py-36 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-brand-950 via-brand-900 to-brand-950" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.06),transparent_60%)]" />

                <div className="relative max-w-3xl mx-auto px-6 sm:px-10 lg:px-12 text-center">
                    <AnimatedSection variant="fade-up">
                        <div className="inline-flex items-center gap-3 text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-8">
                            <div className="w-8 h-[2px] bg-gradient-to-r from-transparent to-accent rounded-full" />
                            Let's Build Together
                            <div className="w-8 h-[2px] bg-gradient-to-l from-transparent to-accent rounded-full" />
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-display font-bold text-white mb-6 leading-tight">
                            Ready to Start Your{" "}
                            <span className="gradient-text-accent">
                                Project?
                            </span>
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-12 max-w-lg mx-auto">
                            Contact our team of experts to discuss your civil
                            engineering and construction needs.
                        </p>
                        <div className="flex flex-wrap justify-center gap-5">
                            <Link href="/quote-request" className="btn-accent">
                                Get a Free Quote
                            </Link>
                            <Link href="/blog" className="btn-secondary">
                                More Articles
                            </Link>
                        </div>
                    </AnimatedSection>
                </div>
            </section>
        </Layout>
    );
}
