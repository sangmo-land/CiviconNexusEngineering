import { Link } from '@inertiajs/react';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import SEOHead from '@/Components/SEOHead';
import { Arrow, CTA, Media, PHONE, PHONE_HREF, PhoneIcon, Reveal, WHATSAPP_URL, WhatsAppIcon, storageUrl } from '@/Components/ui';
import Layout from '@/Layouts/Layout';
import type { Meta, Project, ProjectImage, Service } from '@/types';

const ProcessReel = lazy(() => import('@/Components/reel/ProcessReel'));

interface HomeProps {
    meta: Meta;
    featuredServices: Service[];
    featuredProjects: Project[];
}

const fallbackServices = [
    { title: 'Structural engineering', description: 'Analysis and design of reinforced-concrete structures for homes, apartment buildings and commercial projects.' },
    { title: 'Construction management', description: 'Planning, site supervision and coordination so the building is built as designed.' },
    { title: 'Site planning', description: 'Site analysis and layout before anything is built.' },
    { title: 'House plans', description: 'Ready-made residential plans, or a plan drawn for your plot.' },
];

type Shot = { image: ProjectImage; project: Project };

function statusText(p: Project) {
    if (p.is_ongoing) return p.start_year ? `Ongoing · since ${p.start_year}` : 'Ongoing';
    if (p.start_year && p.completion_year) return `Completed · ${p.start_year}–${p.completion_year}`;
    return p.completion_year ? `Completed · ${p.completion_year}` : '';
}

/** Spread picks across projects: each project's 2nd photo, then each project's 3rd, … */
function interleave(projects: Project[], from: number, limit: number): Shot[] {
    const out: Shot[] = [];
    const longest = Math.max(0, ...projects.map((p) => p.images?.length ?? 0));
    for (let i = from; i < longest && out.length < limit; i++) {
        for (const p of projects) {
            if (p.images?.[i] && out.length < limit) out.push({ image: p.images[i], project: p });
        }
    }
    return out;
}

/* ------------------------------------------------------------------ hero */

function Hero({ projects }: { projects: Project[] }) {
    const withPhotos = projects.filter((p) => p.images?.length);
    const main = withPhotos[0] ? { image: withPhotos[0].images[0], project: withPhotos[0] } : null;
    const side = interleave(withPhotos, 1, 2);
    const sites = Array.from(new Set(projects.filter((p) => p.is_ongoing).map((p) => p.location.split(',')[0].trim()))).slice(0, 4);

    return (
        <section className="hero" aria-labelledby="hero-title">
            <div className="wrap hero-grid">
                <div className="hero-copy">
                    <p className="eyebrow">Civil engineering &amp; construction · Yaoundé</p>
                    <h1 id="hero-title" className="hero-title">
                        We design and build <span className="hl">solid buildings</span> in Cameroon.
                    </h1>
                    <p className="hero-lede">
                        Structural design, construction management and site supervision for homes, apartment buildings and
                        commercial projects — from the soil study to the roof.
                    </p>
                    <div className="hero-actions">
                        <Link className="btn btn-signal" href="/quote-request">Request a quote <Arrow /></Link>
                        <a className="btn btn-ghost" href={PHONE_HREF}><PhoneIcon /> {PHONE}</a>
                    </div>
                    <a className="hero-wa" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                        <WhatsAppIcon size={18} /> Or message us on WhatsApp — English or French
                    </a>
                    {sites.length > 0 && (
                        <p className="hero-sites">
                            <span className="live-dot" aria-hidden="true" /> On site now: {sites.join(' · ')}
                        </p>
                    )}
                </div>

                {main ? (
                    <div className={`hero-photos ${side.length ? '' : 'hero-photos-single'}`}>
                        <Link href={`/projects/${main.project.slug}`} className="hero-photo hero-photo-main">
                            <img src={storageUrl(main.image.image_path)} alt={main.image.caption ?? main.project.title} fetchPriority="high" />
                            <span className="photo-cap">{main.project.title} — {main.project.location}</span>
                        </Link>
                        {side.map((s) => (
                            <Link key={s.image.id} href={`/projects/${s.project.slug}`} className="hero-photo">
                                <img src={storageUrl(s.image.image_path)} alt={s.image.caption ?? `On site: ${s.project.title}`} loading="eager" />
                                <span className="photo-cap">On site · {s.project.location.split(',')[0]}</span>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="hero-photos hero-photos-single">
                        <div className="hero-photo hero-photo-main">
                            <img src="/images/infrastructure-hero.webp" alt="" fetchPriority="high" />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ projects */

function ProjectCard({ project, wide = false }: { project: Project; wide?: boolean }) {
    const cover = project.images?.[0];
    const status = statusText(project);
    return (
        <Link href={`/projects/${project.slug}`} className={`pcard ${wide ? 'pcard-wide' : ''}`}>
            <Media src={storageUrl(cover?.image_path)} alt={cover?.caption ?? project.title} ratio={wide ? '16 / 10' : '4 / 3'}>
                {status && <span className={`badge ${project.is_ongoing ? 'badge-live' : ''}`}>{project.is_ongoing && <span className="live-dot" />}{status}</span>}
            </Media>
            <div className="pcard-body">
                <p className="pcard-meta">{project.project_type} · {project.location}</p>
                <h3>{project.title}</h3>
                <dl className="pcard-facts">
                    {project.client && (<><dt>Client</dt><dd>{project.client}</dd></>)}
                    {project.role && (<><dt>Our role</dt><dd>{project.role}</dd></>)}
                </dl>
                <span className="pcard-link">
                    View project{project.images?.length ? ` · ${project.images.length} photos` : ''} <Arrow size={16} />
                </span>
            </div>
        </Link>
    );
}

function Projects({ projects }: { projects: Project[] }) {
    const [first, ...rest] = projects;
    return (
        <section className="sec" aria-labelledby="work-title">
            <div className="wrap">
                <div className="sec-head">
                    <div>
                        <p className="eyebrow">Our projects</p>
                        <h2 id="work-title" className="h-sec">Buildings we are designing and building</h2>
                    </div>
                    <Link href="/projects" className="link-arrow">All projects <Arrow size={16} /></Link>
                </div>
                <Reveal><ProjectCard project={first} wide /></Reveal>
                {rest.length > 0 && (
                    <div className="pgrid mt-6">
                        {rest.map((p, i) => <Reveal key={p.id} delay={i * 0.06}><ProjectCard project={p} /></Reveal>)}
                    </div>
                )}
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ site photos */

function SitePhotos({ projects }: { projects: Project[] }) {
    const shots = interleave(projects.filter((p) => p.images?.length), 1, 16);
    const strip = useRef<HTMLDivElement>(null);
    if (shots.length < 3) return null;

    const scroll = (dir: number) => {
        const el = strip.current;
        if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
    };

    return (
        <section className="sec sec-tint" aria-labelledby="photos-title">
            <div className="wrap">
                <div className="sec-head">
                    <div>
                        <p className="eyebrow">From our sites</p>
                        <h2 id="photos-title" className="h-sec">Work in progress, photographed by our team</h2>
                    </div>
                    <div className="strip-btns">
                        <button type="button" onClick={() => scroll(-1)} aria-label="Previous photos"><Arrow className="rotate-180" /></button>
                        <button type="button" onClick={() => scroll(1)} aria-label="Next photos"><Arrow /></button>
                    </div>
                </div>
            </div>
            <div className="strip" ref={strip}>
                {shots.map((s) => (
                    <Link key={s.image.id} href={`/projects/${s.project.slug}`} className="strip-item">
                        <img src={storageUrl(s.image.image_path)} alt={s.image.caption ?? `${s.project.title}, ${s.project.location}`} loading="lazy" decoding="async" />
                        <span>{s.image.caption ?? s.project.title}<small>{s.project.location}</small></span>
                    </Link>
                ))}
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ services */

function Services({ services }: { services: { title: string; description: string; href: string }[] }) {
    return (
        <section className="sec" aria-labelledby="services-title">
            <div className="wrap">
                <div className="sec-head">
                    <div>
                        <p className="eyebrow">Services</p>
                        <h2 id="services-title" className="h-sec">What we do</h2>
                    </div>
                    <Link href="/services" className="link-arrow">All services <Arrow size={16} /></Link>
                </div>
                <div className="svc-grid">
                    {services.map((s, i) => (
                        <Reveal key={s.title} delay={(i % 2) * 0.05}>
                            <Link href={s.href} className="svc">
                                <h3>{s.title}</h3>
                                <p>{s.description}</p>
                                <span className="pcard-link">Learn more <Arrow size={16} /></span>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ process (Remotion) */

function Process() {
    const ref = useRef<HTMLElement>(null);
    const [show, setShow] = useState(false);

    // Only fetch the Remotion bundle when the section approaches the viewport.
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShow(true); io.disconnect(); } }, { rootMargin: '400px' });
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <section ref={ref} className="sec sec-tint" aria-labelledby="process-title">
            <div className="wrap">
                <div className="sec-head">
                    <div>
                        <p className="eyebrow">How we work</p>
                        <h2 id="process-title" className="h-sec">One team from the survey to the finished building</h2>
                    </div>
                </div>
                {show ? (
                    <Suspense fallback={<div className="reel-skeleton" />}>
                        <ProcessReel />
                    </Suspense>
                ) : <div className="reel-skeleton" />}
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ page */

export default function Home({ meta, featuredServices, featuredProjects }: HomeProps) {
    const services = featuredServices.length
        ? featuredServices.map((s) => ({ title: s.title, description: s.short_description, href: `/services/${s.slug}` }))
        : fallbackServices.map((s) => ({ ...s, href: '/services' }));

    return (
        <Layout>
            <SEOHead meta={meta} />
            <Hero projects={featuredProjects} />
            {featuredProjects.length > 0 && <Projects projects={featuredProjects} />}
            <SitePhotos projects={featuredProjects} />
            <Services services={services} />
            <Process />
            <CTA />
        </Layout>
    );
}
