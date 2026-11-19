import { Link, usePage } from '@inertiajs/react';
import { type ReactNode, useRef, useState } from "react";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const { url } = usePage();
    const currentPath = url.split('?')[0];

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const menuButton = useRef<HTMLButtonElement>(null);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/services", label: "Services" },
        { href: "/projects", label: "Projects" },
        { href: "/plans", label: "House Plans" },
        { href: "/site-work", label: "Site Work" },
        { href: "/blog", label: "Blog" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <div className="cn-site min-h-screen">
            {/* Navigation */}
            <nav
                aria-label="Main navigation"
                className="cn-site-nav fixed inset-x-0 top-0 z-50"
                onKeyDown={(event) => {
                    if (event.key === 'Escape' && mobileMenuOpen) {
                        setMobileMenuOpen(false);
                        menuButton.current?.focus();
                    }
                }}
            >
                <div className="container-custom">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="cn-brand flex items-center gap-3"
                        >
                            <img
                                src="/images/logo.jpeg"
                                alt=""
                                className="cn-brand-logo"
                            />
                            <div className="block">
                                <span className="cn-brand-name">
                                    Civicon Nexus
                                </span>
                                <span className="cn-brand-subtitle">
                                    Engineering
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden xl:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    aria-current={currentPath === link.href ? "page" : currentPath.startsWith(link.href + "/") ? "location" : undefined}
                                    className="cn-nav-link px-3 py-2 text-sm font-medium"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Link
                                href="/quote-request"
                                className="btn-accent cn-nav-quote ml-4"
                            >
                                Get a Quote
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            type="button"
                            ref={menuButton}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="xl:hidden relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-brand-800 transition"
                            aria-label="Toggle menu"
                            aria-expanded={mobileMenuOpen}
                            aria-controls="mobile-navigation"
                        >
                            <div className="flex flex-col gap-1.5">
                                <span
                                    className={`block w-6 h-0.5 bg-ink transition-all duration-300 ${
                                        mobileMenuOpen
                                            ? "rotate-45 translate-y-2"
                                            : ""
                                    }`}
                                />
                                <span
                                    className={`block w-6 h-0.5 bg-ink transition-all duration-300 ${
                                        mobileMenuOpen ? "opacity-0" : ""
                                    }`}
                                />
                                <span
                                    className={`block w-6 h-0.5 bg-ink transition-all duration-300 ${
                                        mobileMenuOpen
                                            ? "-rotate-45 -translate-y-2"
                                            : ""
                                    }`}
                                />
                            </div>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    id="mobile-navigation"
                    inert={!mobileMenuOpen}
                    className={`xl:hidden transition-all duration-500 overflow-hidden ${
                        mobileMenuOpen
                            ? "max-h-[calc(100dvh-5rem)] overflow-y-auto opacity-100"
                            : "max-h-0 opacity-0"
                    }`}
                >
                    <div className="container-custom pb-6 pt-2 space-y-1 bg-white border-t border-ink/10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                aria-current={currentPath === link.href ? "page" : currentPath.startsWith(link.href + "/") ? "location" : undefined}
                                onClick={() => setMobileMenuOpen(false)}
                                className="cn-nav-link block px-4 py-3"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/quote-request"
                            onClick={() => setMobileMenuOpen(false)}
                            className="btn-accent cn-nav-quote mt-4 w-full"
                        >
                            Get a Quote
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <a className="cn-skip-link" href="#main-content">Skip to content</a>
            <main id="main-content" tabIndex={-1}>{children}</main>

            <footer className="cn-footer">
                <div className="container-custom">
                    <div className="cn-footer-grid">
                        <div>
                            <Link href="/" className="cn-footer-brand">Civicon Nexus Engineering</Link>
                            <p>Civil engineering, structural design and construction across Cameroon.</p>
                        </div>

                        <div>
                            <h2 className="cn-kicker">Explore</h2>
                            <ul className="cn-footer-links">
                                {navLinks.filter((link) => link.href !== "/").map((link) => (
                                    <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h2 className="cn-kicker">Contact</h2>
                            <address>
                                <p>Rond Point Express, Yaoundé</p>
                                <a href="tel:+237678626645">+237 678 626 645</a>
                                <a href="mailto:support@civiconnexusengineering.com">support@civiconnexusengineering.com</a>
                            </address>
                        </div>
                    </div>
                    <p className="cn-footer-copyright">
                        &copy; {new Date().getFullYear()} Civicon Nexus Engineering
                    </p>
                </div>
            </footer>

            {/* WhatsApp Floating Button */}
            <a
                href={`https://wa.me/237678626645?text=${encodeURIComponent("Hello Civicon Nexus Engineering! I'm interested in your services. Could you please provide more information?\n\nBonjour Civicon Nexus Engineering ! Je suis intéressé(e) par vos services. Pourriez-vous me fournir plus d'informations ?")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 w-14 h-14 bg-green-700 hover:bg-green-800 text-white rounded-full shadow-xl shadow-green-900/20 transition-transform duration-300 hover:-translate-y-1 z-50 flex items-center justify-center group"
                aria-label="Contact us on WhatsApp"
            >
                <svg
                    className="w-7 h-7 group-hover:scale-110 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            </a>
        </div>
    );
}
