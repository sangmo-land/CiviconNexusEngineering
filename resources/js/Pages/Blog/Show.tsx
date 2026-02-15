import { Head, Link } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import { Post, Meta } from '@/types';

interface BlogShowProps {
    meta: Meta;
    post: Post;
}

export default function BlogShow({ meta, post }: BlogShowProps) {
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

            {/* Breadcrumb */}
            <div className="bg-gray-50 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <nav className="flex text-sm">
                        <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
                        <span className="mx-2 text-gray-400">/</span>
                        <Link href="/blog" className="text-gray-500 hover:text-gray-700">Blog</Link>
                        <span className="mx-2 text-gray-400">/</span>
                        <span className="text-gray-900 truncate max-w-xs">{post.title}</span>
                    </nav>
                </div>
            </div>

            {/* Article */}
            <article className="py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <header className="mb-8">
                        {post.published_at && (
                            <p className="text-gray-500 text-sm mb-4">
                                Published on {formatDate(post.published_at)}
                            </p>
                        )}
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
                        {post.excerpt && (
                            <p className="text-xl text-gray-600">{post.excerpt}</p>
                        )}
                    </header>

                    {/* Featured Image */}
                    {post.featured_image && (
                        <div className="mb-8 rounded-lg overflow-hidden">
                            <img
                                src={`/storage/${post.featured_image}`}
                                alt={post.title}
                                className="w-full h-auto"
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div 
                        className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>
            </article>

            {/* CTA Section */}
            <section className="py-12 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Ready to Start Your Project?
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Contact our team of experts to discuss your civil engineering and construction needs.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/quote-request"
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                        >
                            Get a Quote
                        </Link>
                        <Link
                            href="/blog"
                            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                        >
                            More Articles
                        </Link>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
