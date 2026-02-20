import { Link } from '@inertiajs/react';
import React, { ReactNode, useState, useEffect } from "react";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
        <div className="min-h-screen bg-brand-950 text-gray-100">
            {/* Navigation */}
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                    isScrolled
                        ? "bg-brand-950/80 backdrop-blur-2xl border-b border-white/5 shadow-2xl shadow-black/20"
                        : "bg-transparent"
                }`}
            >
                <div className="container-custom">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="flex items-center gap-3 group"
                        >
                            <img
                                src="/images/logo.jpeg"
                                alt="Civicon Nexus Engineering"
                                className="h-10 w-auto rounded-lg group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="hidden sm:block">
                                <span className="font-display font-bold text-white text-lg tracking-tight">
                                    Civicon Nexus
                                </span>
                                <span className="text-gray-400 text-sm block -mt-1 tracking-widest uppercase">
                                    Engineering
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-xl hover:bg-white/5 transition-all duration-300"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Link
                                href="/quote-request"
                                className="ml-4 px-6 py-2.5 bg-gradient-to-r from-accent to-accent-dark text-brand-950 font-bold text-sm rounded-xl hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 hover:-translate-y-0.5"
                            >
                                Get a Quote
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 transition"
                            aria-label="Toggle menu"
                        >
                            <div className="flex flex-col gap-1.5">
                                <span
                                    className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                                        mobileMenuOpen
                                            ? "rotate-45 translate-y-2"
                                            : ""
                                    }`}
                                />
                                <span
                                    className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                                        mobileMenuOpen ? "opacity-0" : ""
                                    }`}
                                />
                                <span
                                    className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
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
                    className={`lg:hidden transition-all duration-500 overflow-hidden ${
                        mobileMenuOpen
                            ? "max-h-[500px] opacity-100"
                            : "max-h-0 opacity-0"
                    }`}
                >
                    <div className="container-custom pb-6 pt-2 space-y-1 bg-brand-950/95 backdrop-blur-2xl border-t border-white/5">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/quote-request"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block mx-4 mt-4 px-6 py-3 bg-gradient-to-r from-accent to-accent-dark text-brand-950 font-bold text-center rounded-xl"
                        >
                            Get a Quote
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="relative border-t border-white/5">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

                <div className="container-custom py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                        {/* Brand */}
                        <div className="lg:col-span-1">
                            <Link
                                href="/"
                                className="flex items-center gap-3 mb-6"
                            >
                                <img
                                    src="/images/logo.jpeg"
                                    alt="Civicon Nexus Engineering"
                                    className="h-10 w-auto rounded-lg"
                                />
                                <div>
                                    <span className="font-display font-bold text-white text-lg tracking-tight">
                                        Civicon Nexus
                                    </span>
                                    <span className="text-gray-500 text-xs block -mt-0.5 tracking-widest uppercase">
                                        Engineering
                                    </span>
                                </div>
                            </Link>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                                Your trusted partner in civil engineering and
                                construction. We deliver excellence from
                                blueprint to build.
                            </p>
                            <div className="flex gap-3 mt-6">
                                {[
                                    "facebook",
                                    "twitter",
                                    "linkedin",
                                    "instagram",
                                ].map((social) => (
                                    <a
                                        key={social}
                                        href="#"
                                        className="w-10 h-10 glass rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                                        aria-label={social}
                                    >
                                        <SocialIcon name={social} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Services */}
                        <div>
                            <h4 className="font-display font-semibold text-white mb-6 text-sm tracking-widest uppercase">
                                Services
                            </h4>
                            <ul className="space-y-3">
                                {[
                                    "Structural Design",
                                    "Construction",
                                    "Project Management",
                                    "Renovations",
                                ].map((item) => (
                                    <li key={item}>
                                        <Link
                                            href="/services"
                                            className="text-gray-400 hover:text-accent text-sm transition-colors duration-300"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="font-display font-semibold text-white mb-6 text-sm tracking-widest uppercase">
                                Quick Links
                            </h4>
                            <ul className="space-y-3">
                                {[
                                    { label: "Projects", href: "/projects" },
                                    { label: "House Plans", href: "/plans" },
                                    { label: "Blog", href: "/blog" },
                                    { label: "Contact", href: "/contact" },
                                ].map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-400 hover:text-accent text-sm transition-colors duration-300"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="font-display font-semibold text-white mb-6 text-sm tracking-widest uppercase">
                                Contact
                            </h4>
                            <ul className="space-y-4 text-sm text-gray-400">
                                <li className="flex items-start gap-3">
                                    <svg
                                        className="w-5 h-5 text-accent mt-0.5 flex-shrink-0"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    <span>Rond Point Express, Yaoundé</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg
                                        className="w-5 h-5 text-accent flex-shrink-0"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                    </svg>
                                    <a
                                        href="tel:+237678626645"
                                        className="hover:text-accent transition-colors"
                                    >
                                        +237 678 626 645
                                    </a>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg
                                        className="w-5 h-5 text-accent flex-shrink-0"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <a
                                        href="mailto:support@civiconnexusengineering.com"
                                        className="hover:text-accent transition-colors"
                                    >
                                        support@civiconnexusengineering.com
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-sm">
                            &copy; {new Date().getFullYear()} Civicon Nexus
                            Engineering. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm text-gray-500">
                            <a
                                href="#"
                                className="hover:text-accent transition-colors"
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="#"
                                className="hover:text-accent transition-colors"
                            >
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* WhatsApp Floating Button */}
            <a
                href="https://wa.me/237678626645"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 hover:bg-green-400 text-white rounded-2xl shadow-2xl shadow-green-500/30 transition-all duration-300 hover:scale-110 hover:-translate-y-1 z-50 flex items-center justify-center group"
                aria-label="Contact us on WhatsApp"
            >
                <svg
                    className="w-7 h-7 group-hover:scale-110 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span className="absolute inset-0 rounded-2xl bg-green-500 animate-ping opacity-20" />
            </a>
        </div>
    );
}

function SocialIcon({ name }: { name: string }) {
    const icons: Record<string, React.ReactNode> = {
        facebook: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
        ),
        twitter: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
        linkedin: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
        instagram: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
            </svg>
        ),
    };
    return icons[name] || null;
}
