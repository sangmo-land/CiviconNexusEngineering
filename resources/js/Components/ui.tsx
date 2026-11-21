import { Link } from '@inertiajs/react';
import { motion, useReducedMotion } from 'framer-motion';
import { useState, type ElementType, type ReactNode } from 'react';
import type { PaginatedData } from '@/types';

/* ---------------------------------------------------------------- contact */

export const PHONE = '+237 678 626 645';
export const PHONE_HREF = 'tel:+237678626645';
export const EMAIL = 'support@civiconnexusengineering.com';

export const WHATSAPP_URL = `https://wa.me/237678626645?text=${encodeURIComponent(
    "Hello Civicon Nexus Engineering! I'm interested in your services. Could you please provide more information?\n\nBonjour Civicon Nexus Engineering ! Je suis intéressé(e) par vos services. Pourriez-vous me fournir plus d'informations ?",
)}`;

/* ---------------------------------------------------------------- icons */

export function Arrow({ className = '', size = 18 }: { className?: string; size?: number }) {
    return (
        <svg className={`arw ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
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

export function PhoneIcon({ size = 18 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" strokeLinejoin="round" />
        </svg>
    );
}

/* ---------------------------------------------------------------- motion */

interface RevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    y?: number;
    as?: 'div' | 'section' | 'li' | 'article' | 'header' | 'p';
}

/** A gentle fade-up when content first scrolls into view. Respects reduced motion. */
export function Reveal({ children, className, delay = 0, y = 14, as = 'div' }: RevealProps) {
    const reduce = useReducedMotion();
    const Tag = motion[as] as ElementType;
    return (
        <Tag
            className={className}
            initial={reduce ? false : { opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -8% 0px' }}
            transition={{ duration: 0.55, delay, ease: 'easeOut' }}
        >
            {children}
        </Tag>
    );
}

/**
 * Section/page heading. `lines` are joined with spaces so the text wraps naturally
 * (kept as an array so existing call sites don't change).
 */
export function SplitTitle({
    lines,
    as: Tag = 'h2',
    className = '',
    id,
}: {
    lines: ReactNode[];
    as?: 'h1' | 'h2' | 'h3';
    className?: string;
    id?: string;
    immediate?: boolean;
}) {
    return (
        <Tag id={id} className={className}>
            {lines.map((line, i) => (
                <span key={i}>{i > 0 && ' '}{line}</span>
            ))}
        </Tag>
    );
}

/* ---------------------------------------------------------------- layout pieces */

export function Crumbs({ items }: { items: { label: string; href?: string }[] }) {
    return (
        <nav aria-label="Breadcrumb" className="ph-crumbs">
            {items.map((item, i) => (
                <span key={item.label} className="contents">
                    {i > 0 && <span aria-hidden="true">›</span>}
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
    /** @deprecated no longer displayed */
    index?: string;
    crumbs?: { label: string; href?: string }[];
    aside?: ReactNode;
}

export function PageHeader({ label, title, description, crumbs, aside }: PageHeaderProps) {
    return (
        <header className="ph" aria-labelledby="page-title">
            <div className="wrap">
                {crumbs && <Crumbs items={crumbs} />}
                <p className="eyebrow mt-6">{label}</p>
                <h1 id="page-title" className="ph-title">{title}</h1>
                {description && <p className="lede mt-4">{description}</p>}
                {aside}
            </div>
        </header>
    );
}

export function CTA({
    title = ['Planning a build?'],
    text = 'Tell us about your plot, your plans and your budget. We’ll walk you through the next steps.',
    primary = { href: '/quote-request', label: 'Request a quote' },
}: {
    title?: string[];
    text?: string;
    primary?: { href: string; label: string };
    secondary?: { href: string; label: string };
}) {
    return (
        <section className="cta" aria-labelledby="cta-title">
            <div className="wrap cta-inner">
                <div>
                    <h2 id="cta-title" className="cta-title">{title.join(' ')}</h2>
                    <p className="cta-text">{text}</p>
                </div>
                <div className="cta-actions">
                    <a href={PHONE_HREF} className="cta-phone"><PhoneIcon size={22} /> {PHONE}</a>
                    <div className="flex flex-wrap gap-3">
                        <Link href={primary.href} className="btn btn-signal">{primary.label} <Arrow /></Link>
                        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost on-dark"><WhatsAppIcon size={18} /> WhatsApp</a>
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

/** Image with a plain fallback when missing or broken. */
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
                    <img src="/images/logo.png" alt="" width={56} height={60} />
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
