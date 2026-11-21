import { Link } from '@inertiajs/react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { useState, type ElementType, type ReactNode } from 'react';
import type { PaginatedData } from '@/types';

const EASE = [0.16, 1, 0.3, 1] as const;

/* ---------------------------------------------------------------- icons */

export function Arrow({ className = '', size = 18 }: { className?: string; size?: number }) {
    return (
        <svg className={`arw ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
            <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="square" />
        </svg>
    );
}

export function WhatsAppIcon({ size = 26 }: { size?: number }) {
    return (
        <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    );
}

export const WHATSAPP_URL = `https://wa.me/237678626645?text=${encodeURIComponent(
    "Hello Civicon Nexus Engineering! I'm interested in your services. Could you please provide more information?\n\nBonjour Civicon Nexus Engineering ! Je suis intéressé(e) par vos services. Pourriez-vous me fournir plus d'informations ?",
)}`;

/* ---------------------------------------------------------------- motion */

interface RevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    y?: number;
    as?: 'div' | 'section' | 'li' | 'article' | 'header' | 'p';
}

/** Fade + rise into view once. Respects reduced motion. */
export function Reveal({ children, className, delay = 0, y = 28, as = 'div' }: RevealProps) {
    const reduce = useReducedMotion();
    const Tag = motion[as] as ElementType;
    return (
        <Tag
            className={className}
            initial={reduce ? false : { opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.9, delay, ease: EASE }}
        >
            {children}
        </Tag>
    );
}

const lineVariants: Variants = {
    hidden: { y: '105%' },
    show: (i: number) => ({ y: 0, transition: { duration: 1, delay: 0.08 * i, ease: EASE } }),
};

/** Title revealed line-by-line from behind a mask. Pass lines as an array. */
export function SplitTitle({
    lines,
    as: Tag = 'h2',
    className = '',
    id,
    immediate = false,
}: {
    lines: ReactNode[];
    as?: 'h1' | 'h2' | 'h3';
    className?: string;
    id?: string;
    immediate?: boolean;
}) {
    const reduce = useReducedMotion();
    const viewProps = immediate
        ? { animate: 'show' }
        : { whileInView: 'show', viewport: { once: true, margin: '0px 0px -8% 0px' } };

    return (
        <motion.div initial={reduce ? false : 'hidden'} {...viewProps}>
            <Tag id={id} className={className}>
                {lines.map((line, i) => (
                    <span className="split-line" key={i}>
                        <motion.span custom={i} variants={lineVariants}>{line}</motion.span>
                    </span>
                ))}
            </Tag>
        </motion.div>
    );
}

/* ---------------------------------------------------------------- layout pieces */

export function Crumbs({ items }: { items: { label: string; href?: string }[] }) {
    return (
        <nav aria-label="Breadcrumb" className="ph-crumbs mono">
            {items.map((item, i) => (
                <span key={item.label} className="contents">
                    {i > 0 && <span aria-hidden="true">/</span>}
                    {item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
                </span>
            ))}
        </nav>
    );
}

interface PageHeaderProps {
    label: string;
    title: string;
    description?: ReactNode;
    index?: string;
    crumbs?: { label: string; href?: string }[];
    aside?: ReactNode;
}

export function PageHeader({ label, title, description, index, crumbs, aside }: PageHeaderProps) {
    const words = title.split(' ');
    // Break long titles into two balanced lines for the masked reveal.
    const lines = words.length > 2
        ? [words.slice(0, Math.ceil(words.length / 2)).join(' '), words.slice(Math.ceil(words.length / 2)).join(' ')]
        : [title];

    return (
        <header className="ph" aria-labelledby="page-title">
            <div className="wrap">
                <div className="ph-top">
                    <span className="eyebrow">{label}</span>
                    {crumbs && <Crumbs items={crumbs} />}
                </div>
                <SplitTitle as="h1" id="page-title" className="display" lines={lines} immediate />
                <div className="ph-foot">
                    <Reveal delay={0.25}>
                        {description && <p className="lede">{description}</p>}
                        {aside}
                    </Reveal>
                    {index && <span className="ph-index" aria-hidden="true">{index}</span>}
                </div>
                <div className="ruler" aria-hidden="true" />
            </div>
        </header>
    );
}

export function Marquee({ items, className = '', duration = 38 }: { items: string[]; className?: string; duration?: number }) {
    const track = (hidden: boolean) => (
        <div className="marquee-track" aria-hidden={hidden || undefined} style={{ ['--dur' as string]: `${duration}s` }}>
            {items.map((item) => <span className="marquee-item" key={item}>{item}</span>)}
        </div>
    );
    return (
        <div className={`marquee ${className}`}>
            {track(false)}
            {track(true)}
        </div>
    );
}

export function CTA({
    title = ['What are you', 'building?'],
    text = 'Tell us where your project stands and what you need to move it forward.',
    primary = { href: '/quote-request', label: 'Request a quote' },
    secondary = { href: '/contact', label: 'Talk to an engineer' },
}: {
    title?: string[];
    text?: string;
    primary?: { href: string; label: string };
    secondary?: { href: string; label: string };
}) {
    return (
        <section className="sec-sm" aria-labelledby="cta-title">
            <div className="wrap">
                <div className="cta">
                    <span className="eyebrow on-dark">Work with us</span>
                    <SplitTitle id="cta-title" className="display mt-6" lines={title} />
                    <div className="cta-row">
                        <p className="max-w-md text-[#a8a79f] text-lg">{text}</p>
                        <div className="flex flex-wrap gap-3">
                            <Link href={primary.href} className="btn btn-signal">{primary.label} <Arrow /></Link>
                            <Link href={secondary.href} className="btn btn-ghost on-dark">{secondary.label}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function Pagination<T>({ data, label }: { data: PaginatedData<T>; label: string }) {
    if (data.last_page <= 1) return null;
    const clean = (s: string) => s.replace(/&laquo;|&raquo;/g, '').replace(/<[^>]+>/g, '').trim();
    return (
        <nav className="pager" aria-label={`${label} pages`}>
            {data.links.map((link, i) => {
                const text = clean(link.label);
                const display = text === 'Previous' ? '←' : text === 'Next' ? '→' : text;
                const aria = text === 'Previous' || text === 'Next' ? `${text} page` : `Page ${text}`;
                return link.url ? (
                    <Link key={i} href={link.url} preserveScroll={false} aria-label={aria} aria-current={link.active ? 'page' : undefined}>
                        {display}
                    </Link>
                ) : (
                    <span key={i} aria-hidden="true">{display}</span>
                );
            })}
        </nav>
    );
}

/* ---------------------------------------------------------------- media */

/**
 * Public URL for an uploaded file. Serves straight from /storage — the /img/{preset}
 * resizer is not usable in production (Intervention Image isn't installed there).
 */
export function storageUrl(path: string | null | undefined) {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('/')) return path;
    return `/storage/${path}`;
}

/** Image that falls back to a blueprint placeholder when missing or broken. */
export function Media({
    src,
    alt = '',
    className = '',
    ratio = '4 / 3',
    eager = false,
    children,
}: {
    src?: string;
    alt?: string;
    className?: string;
    ratio?: string;
    eager?: boolean;
    children?: ReactNode;
}) {
    const [failed, setFailed] = useState(false);
    return (
        <div className={`media ${className}`} style={{ aspectRatio: ratio }}>
            {src && !failed ? (
                <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setFailed(true)} />
            ) : (
                <div className="media-empty" aria-hidden="true">
                    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1">
                        <path d="M6 50V22L28 8l22 14v28H6Z" />
                        <path d="M6 22h44M20 50V32h16v18M28 8v14" strokeDasharray="3 3" />
                    </svg>
                </div>
            )}
            {children}
        </div>
    );
}

export function formatDate(value: string, month: 'short' | 'long' = 'long') {
    return new Date(value).toLocaleDateString('en-GB', { year: 'numeric', month, day: 'numeric' });
}

export function pad(n: number) {
    return String(n).padStart(2, '0');
}
