import { Link, router, usePage } from '@inertiajs/react';
import { type ReactNode, useEffect, useRef, useState } from 'react';
import { Arrow, WHATSAPP_URL, WhatsAppIcon, pad } from '@/Components/ui';

const navLinks = [
    { href: '/services', label: 'Services' },
    { href: '/projects', label: 'Projects' },
    { href: '/plans', label: 'House plans' },
    { href: '/site-work', label: 'Site work' },
    { href: '/blog', label: 'Journal' },
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

    // Hide the bar while scrolling down, reveal on scroll up.
    // Decisions use distance travelled since the scroll direction last changed, not the
    // delta between two events — momentum/trackpad scrolling emits many 1–3px events,
    // which used to make the bar flicker between hidden and shown.
    useEffect(() => {
        const HIDE_AFTER = 80; // px of continuous downward travel before hiding
        const SHOW_AFTER = 40; // px of continuous upward travel before showing
        const TOP_ZONE = 120; // always visible near the top of the page
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
                <nav className="nav-bar" aria-label="Main navigation">
                    <Link href="/" className="brand" aria-label="Civicon Nexus Engineering — home">
                        <img src="/images/logo.jpeg" alt="" width={40} height={40} />
                        <span>
                            <span className="brand-name">Civicon Nexus</span>
                            <span className="brand-sub">Engineering · Cameroon</span>
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
                        <Link href="/quote-request" className="btn btn-signal">Get a quote</Link>
                        <button
                            ref={menuButton}
                            type="button"
                            className="menu-btn"
                            aria-expanded={open}
                            aria-controls="site-menu"
                            onClick={() => setOpen((v) => !v)}
                        >
                            {open ? 'Close' : 'Menu'} <i aria-hidden="true" />
                        </button>
                    </div>
                </nav>

                <div id="site-menu" className="menu" data-open={open} inert={!open}>
                    <div className="menu-list">
                        {[{ href: '/', label: 'Home' }, ...navLinks, { href: '/quote-request', label: 'Get a quote' }].map((link, i) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                aria-current={link.href === '/' ? (path === '/' ? 'page' : undefined) : currentFor(path, link.href)}
                                style={{ transitionDelay: open ? `${0.12 + i * 0.045}s` : '0s' }}
                            >
                                <small>{pad(i + 1)}</small>
                                {link.label}
                            </Link>
                        ))}
                    </div>
                    <div className="menu-foot mono">
                        <span>Rond Point Express, Yaoundé</span>
                        <a href="tel:+237678626645">+237 678 626 645</a>
                        <a href="mailto:support@civiconnexusengineering.com">support@civiconnexusengineering.com</a>
                    </div>
                </div>
            </header>

            <main id="main-content" tabIndex={-1} className="outline-none">{children}</main>

            <footer className="footer">
                <div className="wrap">
                    <div className="footer-grid">
                        <div>
                            <p className="footer-lead">Structures and infrastructure, from first drawing to finished site.</p>
                            <Link href="/quote-request" className="btn btn-signal mt-8">Start a project <Arrow /></Link>
                        </div>

                        <div>
                            <h2 className="eyebrow on-dark">Explore</h2>
                            <ul>
                                {navLinks.slice(0, 4).map((link) => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}
                            </ul>
                        </div>

                        <div>
                            <h2 className="eyebrow on-dark">Company</h2>
                            <ul>
                                <li><Link href="/blog">Journal</Link></li>
                                <li><Link href="/contact">Contact</Link></li>
                                <li><Link href="/quote-request">Request a quote</Link></li>
                                <li><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="eyebrow on-dark">Office</h2>
                            <address>
                                <span>Rond Point Express<br />Yaoundé, Cameroon</span>
                                <a href="tel:+237678626645">+237 678 626 645</a>
                                <a href="mailto:support@civiconnexusengineering.com">support@civiconnexusengineering.com</a>
                            </address>
                        </div>
                    </div>

                    <span className="footer-mark" aria-hidden="true">Civicon</span>
                </div>
                <div className="relative bg-night">
                    <div className="wrap footer-base mono">
                        <span>&copy; {new Date().getFullYear()} Civicon Nexus Engineering</span>
                        <span>3.8480° N, 11.5021° E</span>
                    </div>
                </div>
            </footer>

            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="wa-fab" aria-label="Contact us on WhatsApp">
                <WhatsAppIcon />
            </a>
        </div>
    );
}
