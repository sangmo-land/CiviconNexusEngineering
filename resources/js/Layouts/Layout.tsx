import { Link, router, usePage } from '@inertiajs/react';
import { type ReactNode, useEffect, useRef, useState } from 'react';
import { EMAIL, PHONE, PHONE_HREF, WHATSAPP_URL, WhatsAppIcon } from '@/Components/ui';

const navLinks = [
    { href: '/services', label: 'Services' },
    { href: '/projects', label: 'Projects' },
    { href: '/plans', label: 'House plans' },
    { href: '/site-work', label: 'Site work' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
];

function currentFor(path: string, href: string) {
    if (path === href) return 'page' as const;
    if (path.startsWith(href + '/')) return 'location' as const;
    return undefined;
}

export default function Layout({ children }: { children: ReactNode }) {
    const { url } = usePage();
    const path = url.split('?')[0];
    const [open, setOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const menuButton = useRef<HTMLButtonElement>(null);

    // Hide the header while scrolling down, reveal on scroll up.
    // Decisions use distance travelled since the scroll direction last changed, not the
    // delta between two events — momentum/trackpad scrolling emits many 1–3px events,
    // which used to make the header flicker between hidden and shown.
    useEffect(() => {
        const HIDE_AFTER = 80; // px of continuous downward travel before hiding
        const SHOW_AFTER = 40; // px of continuous upward travel before showing
        const TOP_ZONE = 160; // always visible near the top of the page
        let last = Math.max(window.scrollY, 0);
        let anchor = last;
        let dir = 0;
        let frame = 0;

        const update = () => {
            frame = 0;
            const y = Math.max(window.scrollY, 0); // ignore iOS overscroll bounce
            const delta = y - last;
            if (delta !== 0) {
                const next = delta > 0 ? 1 : -1;
                if (next !== dir) {
                    dir = next;
                    anchor = last;
                }
                if (y < TOP_ZONE) setHidden(false);
                else if (dir > 0 && y - anchor > HIDE_AFTER) setHidden(true);
                else if (dir < 0 && anchor - y > SHOW_AFTER) setHidden(false);
            }
            last = y;
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, []);

    // Close the menu on navigation and lock scroll while it's open.
    useEffect(() => router.on('navigate', () => setOpen(false)), []);
    useEffect(() => {
        document.documentElement.style.overflow = open ? 'hidden' : '';
        return () => { document.documentElement.style.overflow = ''; };
    }, [open]);

    return (
        <div className="site min-h-screen">
            <a className="skip-link" href="#main-content">Skip to content</a>

            <div className="topbar">
                <div className="wrap topbar-inner">
                    <span className="topbar-place">Rond Point Express, Yaoundé</span>
                    <div className="topbar-links">
                        <a href={PHONE_HREF}>{PHONE}</a>
                        <a href={`mailto:${EMAIL}`} className="topbar-email">{EMAIL}</a>
                        <span className="topbar-hours">Mon–Fri 08:00–18:00 · Sat 09:00–14:00</span>
                    </div>
                </div>
            </div>

            <header
                className="nav"
                data-hidden={hidden && !open}
                onKeyDown={(e) => {
                    if (e.key === 'Escape' && open) {
                        setOpen(false);
                        menuButton.current?.focus();
                    }
                }}
            >
                <nav className="wrap nav-bar" aria-label="Main navigation">
                    <Link href="/" className="brand" aria-label="Civicon Nexus Engineering — home">
                        <img src="/images/logo.png" alt="" width={44} height={48} />
                        <span>
                            <span className="brand-name">Civicon Nexus</span>
                            <span className="brand-sub">Engineering</span>
                        </span>
                    </Link>

                    <div className="nav-links">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="nav-link" aria-current={currentFor(path, link.href)}>
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="nav-actions">
                        <Link href="/quote-request" className="btn btn-signal btn-sm">Get a quote</Link>
                        <button
                            ref={menuButton}
                            type="button"
                            className="menu-btn"
                            aria-expanded={open}
                            aria-controls="site-menu"
                            aria-label={open ? 'Close menu' : 'Open menu'}
                            onClick={() => setOpen((v) => !v)}
                        >
                            <i aria-hidden="true" />
                        </button>
                    </div>
                </nav>

                <div id="site-menu" className="menu" data-open={open} inert={!open}>
                    <div className="wrap">
                        <ul className="menu-list">
                            {[{ href: '/', label: 'Home' }, ...navLinks].map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} aria-current={link.href === '/' ? (path === '/' ? 'page' : undefined) : currentFor(path, link.href)}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <Link href="/quote-request" className="btn btn-signal btn-block mt-6">Request a quote</Link>
                        <div className="menu-foot">
                            <a href={PHONE_HREF}>{PHONE}</a>
                            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                        </div>
                    </div>
                </div>
            </header>

            <main id="main-content" tabIndex={-1} className="outline-none">{children}</main>

            <footer className="footer">
                <div className="wrap footer-grid">
                    <div>
                        <Link href="/" className="footer-brand">
                            <img src="/images/logo.png" alt="" width={52} height={56} />
                            <span>Civicon Nexus Engineering</span>
                        </Link>
                        <p className="mt-4 max-w-xs">
                            Civil engineering, structural design and construction in Yaoundé and across Cameroon.
                        </p>
                        <p className="mt-2 max-w-xs footer-fr">Génie civil, études structurelles et construction au Cameroun.</p>
                    </div>

                    <div>
                        <h2>Pages</h2>
                        <ul>
                            {navLinks.map((link) => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}
                            <li><Link href="/quote-request">Request a quote</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h2>Office</h2>
                        <address>
                            <span>Rond Point Express<br />Yaoundé, Cameroon</span>
                            <span>Mon–Fri 08:00–18:00<br />Sat 09:00–14:00</span>
                        </address>
                    </div>

                    <div>
                        <h2>Contact</h2>
                        <address>
                            <a href={PHONE_HREF}>{PHONE}</a>
                            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                            <a href={`mailto:${EMAIL}`}>{EMAIL.split('@')[0]}@<wbr />{EMAIL.split('@')[1]}</a>
                        </address>
                    </div>
                </div>
                <div className="wrap footer-base">
                    <span>&copy; {new Date().getFullYear()} Civicon Nexus Engineering</span>
                    <span>Yaoundé, Cameroon</span>
                </div>
            </footer>

            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="wa-fab" aria-label="Contact us on WhatsApp">
                <WhatsAppIcon />
            </a>
        </div>
    );
}
