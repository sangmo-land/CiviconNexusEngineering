import { Link } from '@inertiajs/react';
import SEOHead from '@/Components/SEOHead';
import { Arrow, Media, PageHeader, Pagination, Reveal, formatDate, pad, storageUrl } from '@/Components/ui';
import Layout from '@/Layouts/Layout';
import type { Meta, PaginatedData, Post } from '@/types';

interface BlogIndexProps {
    meta: Meta;
    posts: PaginatedData<Post>;
}

export default function BlogIndex({ meta, posts }: BlogIndexProps) {
    const showFeature = posts.current_page === 1 && posts.data.length > 0;
    const [feature, ...rest] = showFeature ? posts.data : [undefined, ...posts.data];
    const offset = (posts.current_page - 1) * posts.per_page;

    return (
        <Layout>
            <SEOHead meta={meta} />

            <PageHeader
                label="Journal"
                title="Engineering insights"
                index="05"
                crumbs={[{ label: 'Home', href: '/' }, { label: 'Journal' }]}
                description="Articles on structural design, construction practice and the built environment in Cameroon."
            />

            <section className="sec" aria-label="Articles">
                <div className="wrap">
                    {feature && (
                        <Reveal>
                            <Link href={`/blog/${feature.slug}`} className="feature">
                                <Media src={storageUrl(feature.featured_image, 'large')} alt="" ratio="16 / 10" eager />
                                <div className="feature-body">
                                    <span className="tag tag-signal">Latest</span>
                                    {feature.published_at && <time className="mono text-muted mt-6 block" dateTime={feature.published_at}>{formatDate(feature.published_at)}</time>}
                                    <h2 className="mt-3 text-[clamp(1.9rem,3.6vw,3.25rem)] font-[750] leading-[1.02] tracking-[-0.04em]">{feature.title}</h2>
                                    {feature.excerpt && <p className="mt-4 text-muted text-lg line-clamp-4">{feature.excerpt}</p>}
                                    <span className="btn btn-ink mt-8 self-start">Read article <Arrow /></span>
                                </div>
                            </Link>
                        </Reveal>
                    )}

                    {rest.length > 0 && (
                        <ol className="post-list" start={offset + (feature ? 2 : 1)}>
                            {rest.map((post, i) => post && (
                                <li key={post.id}>
                                    <Link href={`/blog/${post.slug}`} className="post-row">
                                        <span className="mono text-muted">{pad(offset + i + (feature ? 2 : 1))}</span>
                                        <div className="min-w-0">
                                            {post.published_at && <time className="mono text-muted" dateTime={post.published_at}>{formatDate(post.published_at, 'short')}</time>}
                                            <h2>{post.title}</h2>
                                            {post.excerpt && <p className="line-clamp-2">{post.excerpt}</p>}
                                        </div>
                                        <Media src={storageUrl(post.featured_image, 'thumb')} alt="" ratio="4 / 3" className="post-thumb" />
                                    </Link>
                                </li>
                            ))}
                        </ol>
                    )}

                    {posts.data.length === 0 && (
                        <div className="empty">
                            <p className="mono">No articles yet</p>
                            <p>We’re writing — check back soon.</p>
                        </div>
                    )}

                    <Pagination data={posts} label="Articles" />
                </div>
            </section>
        </Layout>
    );
}
