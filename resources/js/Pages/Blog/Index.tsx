import { Head, Link } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import AnimatedSection from "@/Components/AnimatedSection";
import { Post, Meta, PaginatedData } from "@/types";

interface BlogIndexProps {
    meta: Meta;
    posts: PaginatedData<Post>;
}

export default function BlogIndex({ meta, posts }: BlogIndexProps) {
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

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-brand-950" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.08),transparent_60%)]" />
                <div className="relative container-custom">
                    <AnimatedSection variant="fade-up">
                        <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
                            <span className="gradient-text">Blog</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl">
                            Insights, tips, and updates from the world of civil
                            engineering and construction.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Blog Posts */}
            <section className="section-padding bg-brand-950">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.data.map((post, index) => (
                            <AnimatedSection
                                key={post.id}
                                variant="fade-up"
                                delay={index * 100}
                            >
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="group card-modern rounded-2xl overflow-hidden block h-full"
                                >
                                    <div className="aspect-video bg-brand-900 relative overflow-hidden">
                                        {post.featured_image ? (
                                            <img
                                                src={`/storage/${post.featured_image}`}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-600 bg-gradient-to-br from-brand-900 to-brand-800">
                                                <svg
                                                    className="w-12 h-12"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1}
                                                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                                                    />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        {post.published_at && (
                                            <span className="text-sm text-accent">
                                                {formatDate(post.published_at)}
                                            </span>
                                        )}
                                        <h2 className="text-lg font-display font-semibold text-white mt-2 mb-3 group-hover:text-accent transition">
                                            {post.title}
                                        </h2>
                                        {post.excerpt && (
                                            <p className="text-gray-400 text-sm line-clamp-3">
                                                {post.excerpt}
                                            </p>
                                        )}
                                        <span className="inline-flex items-center text-accent text-sm font-medium mt-4 group-hover:gap-2 transition-all">
                                            Read More
                                            <svg
                                                className="w-4 h-4 ml-1"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </span>
                                    </div>
                                </Link>
                            </AnimatedSection>
                        ))}
                    </div>

                    {posts.data.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-400">
                                No blog posts available at the moment. Check
                                back soon!
                            </p>
                        </div>
                    )}

                    {/* Pagination */}
                    {posts.last_page > 1 && (
                        <div className="flex justify-center mt-12">
                            <nav className="flex space-x-2">
                                {posts.links.map((link, index) => (
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
        </Layout>
    );
}
