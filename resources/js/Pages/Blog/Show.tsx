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
                            href="/blog"
                            className="text-gray-500 hover:text-accent transition"
                        >
                            Blog
                        </Link>
                        <span className="mx-2 text-gray-600">/</span>
                        <span className="text-white truncate max-w-xs">
                            {post.title}
                        </span>
                    </nav>
                </div>
            </div>

            {/* Article */}
            <article className="section-padding bg-brand-950">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <AnimatedSection variant="fade-up">
                        <header className="mb-8">
                            {post.published_at && (
                                <p className="text-accent text-sm mb-4">
                                    Published on {formatDate(post.published_at)}
                                </p>
                            )}
                            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                                {post.title}
                            </h1>
                            {post.excerpt && (
                                <p className="text-xl text-gray-400">
                                    {post.excerpt}
                                </p>
                            )}
                        </header>
                    </AnimatedSection>

                    {/* Featured Image */}
                    {post.featured_image && (
                        <AnimatedSection variant="fade-in" delay={200}>
                            <div className="mb-10 rounded-2xl overflow-hidden border border-white/10">
                                <img
                                    src={`/storage/${post.featured_image}`}
                                    alt={post.title}
                                    className="w-full h-auto"
                                />
                            </div>
                        </AnimatedSection>
                    )}

                    {/* Content */}
                    <AnimatedSection variant="fade-up" delay={300}>
                        <div
                            className="prose prose-lg prose-invert max-w-none prose-headings:font-display prose-headings:text-white prose-p:text-gray-400 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-blockquote:border-accent/50 prose-blockquote:text-gray-400"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </AnimatedSection>
                </div>
            </article>

            {/* CTA Section */}
            <section className="section-padding bg-brand-900">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <AnimatedSection variant="fade-up">
                        <h2 className="text-3xl font-display font-bold text-white mb-4">
                            Ready to Start Your{" "}
                            <span className="gradient-text">Project?</span>
                        </h2>
                        <p className="text-gray-400 mb-8">
                            Contact our team of experts to discuss your civil
                            engineering and construction needs.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/quote-request" className="btn-accent">
                                Get a Quote
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
