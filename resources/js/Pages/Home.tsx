import { Link } from '@inertiajs/react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import SEOHead from '@/Components/SEOHead';
import { Arrow, CTA, Marquee, Media, Reveal, SplitTitle, pad, storageUrl } from '@/Components/ui';
import Layout from '@/Layouts/Layout';
import type { Meta, Project, Service } from '@/types';

const HeroScene = lazy(() => import('@/Components/HeroScene'));
const ProcessReel = lazy(() => import('@/Components/reel/ProcessReel'));

interface HomeProps {
    meta: Meta;
    featuredServices: Service[];
    featuredProjects: Project[];
}

const coreServices = [
    { title: 'Structural engineering', description: 'Analysis and design of reinforced-concrete and steel structures for buildings and infrastructure.' },
    { title: 'Civil infrastructure', description: 'Roads, drainage, earthworks and site planning — from feasibility to construction drawings.' },
    { title: 'Construction management', description: 'Site supervision, coordination and progress tracking so work is built as designed.' },
    { title: 'House plans', description: 'Ready-to-build residential designs, or a custom plan drawn around your plot and brief.' },
];

const disciplines = ['Structural design', 'Civil works', 'Construction management', 'House plans', 'Site supervision', 'Roads & drainage', 'Génie civil', 'Bureau d’études'];

/* ------------------------------------------------------------------ hero */

function Hero() {
    const [progress, setProgress] = useState(0);
    const [storey, setStorey] = useState(1);

    return (
        <section className="hero on-dark" aria-labelledby="hero-title">
            <Suspense fallback={<div className="hero-canvas" />}>
                <HeroScene onProgress={(p, s) => { setProgress(p); setStorey(s); }} />
            </Suspense>

            <div className="wrap hero-inner">
                <div className="hero-top">
                    <span className="eyebrow">Civil &amp; structural engineering — Cameroon</span>
                    <span className="mono hero-coords">Yaoundé · 3.8480° N, 11.5021° E</span>
                </div>

                <SplitTitle
                    as="h1"
                    id="hero-title"
                    immediate
                    className="display hero-title"
                    lines={['Engineering', <>what’s next<span className="text-accent">.</span></>]}
                />

                <div className="hero-bottom">
                    <Reveal delay={0.35}>
                        <p className="hero-lede">
                            We design structures and infrastructure, and manage construction from the first drawing to the last day on site.
                        </p>
                        <div className="flex flex-wrap gap-3 mt-7">
                            <Link className="btn btn-signal" href="/quote-request">Request a quote <Arrow /></Link>
                            <Link className="btn btn-ghost" href="/projects">See our work</Link>
                        </div>
                    </Reveal>

                    <Reveal delay={0.5} className="hud" >
                        <div className="hud-row mono">
                            <span>Frame assembly</span>
                            <span>Level {pad(storey)} / 09</span>
                        </div>
                        <div className="hud-num" aria-hidden="true">{Math.round(progress * 100)}<small>%</small></div>
                        <div className="hud-bar"><i style={{ transform: `scaleX(${progress})` }} /></div>
                        <p className="mono hud-note">Illustrative RC frame · 4 × 3 bays</p>
                    </Reveal>
                </div>
            </div>

            <div className="hero-scroll mono" aria-hidden="true"><span />Scroll</div>
        </section>
    );
}

/* ------------------------------------------------------------------ statement */

function Word({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
    const opacity = useTransform(progress, range, [0.14, 1]);
    return <motion.span style={{ opacity }}>{word} </motion.span>;
}

function Statement() {
    const ref = useRef<HTMLParagraphElement>(null);
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
    const text = 'Every structure starts as a question about the ground, the load and the budget. We answer it with calculation, clear drawings and engineers on site — so what gets built is what was designed.';
    const words = text.split(' ');

    return (
        <section className="sec statement" aria-label="Our approach">
            <div className="wrap statement-grid">
                <span className="eyebrow">Our approach</span>
                <p ref={ref} className="statement-text">
                    {reduce
                        ? text
                        : words.map((w, i) => <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />)}
                </p>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ services */

function Services({ services }: { services: { title: string; description: string; href: string }[] }) {
    return (
        <section className="sec pt-0" aria-labelledby="services-title">
            <div className="wrap">
                <div className="sec-head">
                    <div>
                        <span className="eyebrow">Capabilities</span>
                        <SplitTitle id="services-title" className="h-sec mt-5" lines={['From design', 'to delivery.']} />
                    </div>
                    <Link href="/services" className="link-u font-semibold">All services</Link>
                </div>
                <div className="rows">
                    {services.map((s, i) => (
                        <Link key={s.title} href={s.href} className="row">
                            <span className="row-num">{pad(i + 1)}</span>
                            <h3>{s.title}</h3>
                            <p>{s.description}</p>
                            <span className="row-arrow" aria-hidden="true"><Arrow /></span>
                        </Link>
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
        <section ref={ref} className="sec on-dark process" aria-labelledby="process-title">
            <div className="wrap">
                <div className="sec-head">
                    <div>
                        <span className="eyebrow">How we work</span>
                        <SplitTitle id="process-title" className="h-sec mt-5" lines={['Survey. Design.', 'Structure. Site.']} />
                    </div>
                    <p className="lede max-w-sm">One team carries your project through every phase, so nothing is lost between the drawing board and the site.</p>
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

/* ------------------------------------------------------------------ projects */

function useMedia(query: string) {
    const [match, setMatch] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
    useEffect(() => {
        const mq = window.matchMedia(query);
        const on = () => setMatch(mq.matches);
        mq.addEventListener('change', on);
        return () => mq.removeEventListener('change', on);
    }, [query]);
    return match;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const cover = project.images[0];
    const meta = [project.project_type, project.location].filter(Boolean).join(' · ');
    return (
        <Link href={`/projects/${project.slug}`} className="pcard">
            <Media src={storageUrl(cover?.image_path, 'medium')} alt={cover?.caption ?? ''} ratio="4 / 5">
                <span className="pcard-num mono">{pad(index + 1)}</span>
                {project.is_ongoing && <span className="tag tag-dark pcard-live"><span className="live-dot" /> Ongoing</span>}
            </Media>
            <div className="pcard-body">
                <p className="mono text-muted">{meta}</p>
                <h3>{project.title}</h3>
            </div>
        </Link>
    );
}

function ProjectsHead() {
    return (
        <div className="sec-head">
            <div>
                <span className="eyebrow">Portfolio</span>
                <SplitTitle id="work-title" className="h-sec mt-5" lines={['Selected', 'projects.']} />
            </div>
            <Link href="/projects" className="link-u font-semibold">All projects</Link>
        </div>
    );
}

function Projects({ projects }: { projects: Project[] }) {
    const reduce = useReducedMotion();
    const wide = useMedia('(min-width: 64rem)');

    if (wide && !reduce && projects.length > 2) return <PinnedProjects projects={projects} />;

    return (
        <section className="sec" aria-labelledby="work-title">
            <div className="wrap">
                <ProjectsHead />
                <div className="pgrid">
                    {projects.map((p, i) => <Reveal key={p.id} delay={(i % 3) * 0.08}><ProjectCard project={p} index={i} /></Reveal>)}
                </div>
            </div>
        </section>
    );
}

/** Desktop: vertical scroll drives a horizontal track of project cards. */
function PinnedProjects({ projects }: { projects: Project[] }) {
    const section = useRef<HTMLElement>(null);
    const track = useRef<HTMLDivElement>(null);
    const [distance, setDistance] = useState(0);

    useEffect(() => {
        const el = track.current;
        if (!el) return;
        const measure = () => setDistance(Math.max(0, el.scrollWidth - el.clientWidth));
        const ro = new ResizeObserver(measure);
        ro.observe(el);
        measure();
        return () => ro.disconnect();
    }, [projects.length]);

    const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
    const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

    return (
        <section ref={section} className="hscroll" style={{ height: `calc(100vh + ${distance}px)` }} aria-labelledby="work-title">
            <div className="hscroll-sticky">
                <div className="wrap"><ProjectsHead /></div>
                <motion.div ref={track} className="hscroll-track" style={{ x }}>
                    {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
                    <Link href="/projects" className="pcard pcard-more">
                        <span className="display">All<br />projects</span>
                        <span className="row-arrow"><Arrow /></span>
                    </Link>
                </motion.div>
                <div className="wrap"><div className="hscroll-bar"><motion.i style={{ scaleX: scrollYProgress }} /></div></div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ resources */

function Resources() {
    const items = [
        { href: '/plans', n: '01', title: 'House plans', text: 'Browse ready-to-build residential designs by floor area, bedrooms and storeys.', cls: 'bento-a' },
        { href: '/site-work', n: '02', title: 'Site work logs', text: 'Daily records of activity, crews and materials on our active sites.', cls: 'bento-b' },
        { href: '/blog', n: '03', title: 'Journal', text: 'Notes on structural design, construction practice and building in Cameroon.', cls: 'bento-c' },
    ];
    return (
        <section className="sec pt-0" aria-labelledby="resources-title">
            <div className="wrap">
                <div className="sec-head">
                    <div>
                        <span className="eyebrow">Resources</span>
                        <SplitTitle id="resources-title" className="h-sec mt-5" lines={['Plans, logs', '& field notes.']} />
                    </div>
                </div>
                <div className="bento">
                    {items.map((it, i) => (
                        <Reveal key={it.href} delay={i * 0.08} className={it.cls}>
                            <Link href={it.href} className="card bento-card">
                                <span className="mono text-muted">{it.n}</span>
                                <div>
                                    <h3>{it.title}</h3>
                                    <p>{it.text}</p>
                                </div>
                                <span className="row-arrow" aria-hidden="true"><Arrow /></span>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ page */

export default function Home({ meta, featuredServices, featuredProjects }: HomeProps) {
    const services = featuredServices.length
        ? featuredServices.map((s) => ({ title: s.title, description: s.short_description, href: `/services/${s.slug}` }))
        : coreServices.map((s) => ({ ...s, href: '/services' }));

    return (
        <Layout>
            <SEOHead meta={meta} />
            <Hero />
            <div className="band-signal">
                <Marquee items={disciplines} className="band-marquee" />
            </div>
            <Statement />
            <Services services={services} />
            <Process />
            {featuredProjects.length > 0 && <Projects projects={featuredProjects} />}
            <Resources />
            <CTA />
        </Layout>
    );
}
