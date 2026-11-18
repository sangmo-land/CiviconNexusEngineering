import PageHeader from '@/Components/PageHeader';
import { Link } from '@inertiajs/react';
import SEOHead from '@/Components/SEOHead';
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
            <SEOHead meta={meta} />

            <PageHeader
                label="Journal"
                title="Engineering insights"
                description="Articles on structural design, construction practice and the built environment in Cameroon."
            />

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
                                    className="group cn-media-card block h-full hover:border-white/20 transition-all duration-300"
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
