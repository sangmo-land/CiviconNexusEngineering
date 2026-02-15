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
            <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
                <div className="absolute inset-0 bg-brand-950" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.08),transparent_60%)]" />
                <div className="relative container-custom">
                    <AnimatedSection variant="fade-up">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-0.5 bg-accent rounded-full" />
                            <span className="text-accent font-medium text-sm tracking-wide uppercase">
                                Our Blog
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6 text-white">
                            Insights &{" "}
                            <span className="gradient-text">Articles</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl leading-relaxed">
                            Expert tips, industry knowledge, and the latest
                            updates from the world of civil engineering and
                            construction.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Blog Posts */}
            <section className="py-16 md:py-24 bg-brand-950">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                        {posts.data.map((post, index) => (
                            <AnimatedSection
                                key={post.id}
                                variant="fade-up"
                                delay={index * 100}
                            >
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="group card-modern rounded-2xl overflow-hidden block h-full hover:border-white/20 transition-all duration-300"
                                >
                                    <div className="aspect-[16/10] bg-brand-900 relative overflow-hidden">
                                        {post.featured_image ? (
                                            <img
                                                src={
                                                    post.featured_image.startsWith(
                                                        "http",
                                                    )
                                                        ? post.featured_image
                                                        : `/storage/${post.featured_image}`
                                                }
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-700 bg-gradient-to-br from-brand-900 to-brand-800">
                                                <svg
                                                    className="w-14 h-14 opacity-50"
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
                                    <div className="p-7">
                                        {post.published_at && (
                                            <span className="text-xs text-accent font-medium tracking-wide uppercase">
                                                {formatDate(post.published_at)}
                                            </span>
                                        )}
                                        <h2 className="text-xl font-display font-semibold text-white mt-3 mb-4 leading-snug group-hover:text-accent transition-colors duration-200">
                                            {post.title}
                                        </h2>
                                        {post.excerpt && (
                                            <p className="text-gray-400 text-[0.9375rem] leading-relaxed line-clamp-3 mb-6">
                                                {post.excerpt}
                                            </p>
                                        )}
                                        <span className="inline-flex items-center text-accent text-sm font-semibold group-hover:gap-3 gap-1.5 transition-all duration-300">
                                            Read Article
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
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
