import { Head, Link } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import { Post, Meta, PaginatedData } from '@/types';

interface BlogIndexProps {
    meta: Meta;
    posts: PaginatedData<Post>;
}

export default function BlogIndex({ meta, posts }: BlogIndexProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <Layout>
            <Head title={meta.title}>
                <meta name="description" content={meta.description} />
            </Head>

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold mb-4">Blog</h1>
                    <p className="text-xl text-blue-100 max-w-2xl">
                        Insights, tips, and updates from the world of civil engineering and construction.
                    </p>
                </div>
            </section>

            {/* Blog Posts */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.data.map((post) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.slug}`}
                                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition border border-gray-100"
                            >
                                <div className="aspect-video bg-gray-200 relative overflow-hidden">
                                    {post.featured_image ? (
                                        <img
                                            src={`/storage/${post.featured_image}`}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gradient-to-br from-blue-100 to-blue-200">
                                            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    {post.published_at && (
                                        <span className="text-sm text-gray-500">
                                            {formatDate(post.published_at)}
                                        </span>
                                    )}
                                    <h2 className="text-lg font-semibold text-gray-900 mt-2 mb-3 group-hover:text-blue-600 transition">
                                        {post.title}
                                    </h2>
                                    {post.excerpt && (
                                        <p className="text-gray-600 text-sm line-clamp-3">{post.excerpt}</p>
                                    )}
                                    <span className="inline-flex items-center text-blue-600 text-sm font-medium mt-4">
                                        Read More
                                        <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {posts.data.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-600">No blog posts available at the moment. Check back soon!</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {posts.last_page > 1 && (
                        <div className="flex justify-center mt-12">
                            <nav className="flex space-x-2">
                                {posts.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                            link.active
                                                ? 'bg-blue-600 text-white'
                                                : link.url
                                                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
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
