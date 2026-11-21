import { Link } from '@inertiajs/react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import SEOHead from '@/Components/SEOHead';
import { Arrow, CTA, Crumbs, Media, Reveal, SplitTitle, formatDate, storageUrl } from '@/Components/ui';
import Layout from '@/Layouts/Layout';
import type { Meta, Post } from '@/types';

interface BlogShowProps {
    meta: Meta;
    post: Post;
}

const readingTime = (html: string) => Math.max(1, Math.ceil(html.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length / 200));

export default function BlogShow({ meta, post }: BlogShowProps) {
    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
    const [url, setUrl] = useState('');
    useEffect(() => setUrl(window.location.href), []);

    const share = [
        { label: 'X', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(url)}` },
        { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
        { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
        { label: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(`${post.title} ${url}`)}` },
    ];

    return (
        <Layout>
            <SEOHead meta={meta} />
            <motion.div className="read-progress" style={{ scaleX: progress }} aria-hidden="true" />

            <header className="ph" aria-labelledby="post-title">
                <div className="wrap">
                    <div className="ph-top">
                        <span className="eyebrow">Journal</span>
                        <Crumbs items={[{ label: 'Home', href: '/' }, { label: 'Journal', href: '/blog' }, { label: 'Article' }]} />
                    </div>
                    <SplitTitle as="h1" id="post-title" immediate className="post-title" lines={[post.title]} />
                    <Reveal delay={0.2} className="post-meta mono">
                        {post.published_at && <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>}
                        <span>{readingTime(post.content)} min read</span>
                    </Reveal>
                    {post.excerpt && <Reveal delay={0.3}><p className="lede mt-6 max-w-3xl">{post.excerpt}</p></Reveal>}
                </div>
            </header>

            {post.featured_image && (
                <div className="wrap mt-[clamp(2rem,5vw,4rem)]">
                    <Reveal>
                        <Media src={storageUrl(post.featured_image)} alt={post.title} ratio="21 / 9" className="rounded-lg" eager />
                    </Reveal>
                </div>
            )}

            <article className="sec">
                <div className="wrap detail-grid">
                    <aside className="detail-aside">
                        <span className="eyebrow">Share</span>
                        <ul className="mt-5 grid gap-2">
                            {share.map((s) => (
                                <li key={s.label}>
                                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-u">{s.label}</a>
                                </li>
                            ))}
                        </ul>
                        <Link href="/blog" className="mono mt-10 inline-flex items-center gap-2 text-muted hover:text-ink">
                            <Arrow className="rotate-180" size={14} /> All articles
                        </Link>
                    </aside>
                    <Reveal>
                        <div className="prose-cn max-w-[46rem]" dangerouslySetInnerHTML={{ __html: post.content }} />
                    </Reveal>
                </div>
            </article>

            <CTA
                title={['Ready to start', 'your project?']}
                secondary={{ href: '/blog', label: 'More articles' }}
            />
        </Layout>
    );
}
