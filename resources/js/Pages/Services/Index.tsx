import { Link } from '@inertiajs/react';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import SEOHead from '@/Components/SEOHead';
import { Arrow, CTA, PageHeader, Reveal } from '@/Components/ui';
import Layout from '@/Layouts/Layout';
import type { Meta, Service } from '@/types';

const StructureScene = lazy(() => import('@/Components/StructureScene'));

interface ServicesIndexProps {
    meta: Meta;
    services: Service[];
}

/** Three.js frame model, loaded only when the panel nears the viewport. */
function FramePanel() {
    const ref = useRef<HTMLDivElement>(null);
    const [show, setShow] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShow(true); io.disconnect(); } }, { rootMargin: '300px' });
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <div ref={ref} className="frame-panel">
            {show && (
                <Suspense fallback={null}>
                    <StructureScene />
                </Suspense>
            )}
            <p className="frame-cap">Illustration: reinforced-concrete frame, 9 storeys, 4 × 3 bays</p>
        </div>
    );
}

export default function ServicesIndex({ meta, services }: ServicesIndexProps) {
    return (
        <Layout>
            <SEOHead meta={meta} />

            <PageHeader
                label="Services"
                title="Engineering and construction services"
                crumbs={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
                description="Structural design, construction management and site supervision for projects in Yaoundé and across Cameroon."
            />

            <section className="sec" aria-label="All services">
                <div className="wrap">
                    {services.length > 0 ? (
                        <div className="svc-grid">
                            {services.map((service, i) => (
                                <Reveal key={service.id} delay={(i % 2) * 0.05}>
                                    <Link href={`/services/${service.slug}`} className="svc">
                                        <h2>{service.title}</h2>
                                        <p>{service.short_description}</p>
                                        <span className="pcard-link">Learn more <Arrow size={16} /></span>
                                    </Link>
                                </Reveal>
                            ))}
                        </div>
                    ) : (
                        <div className="empty">
                            <p>No services published yet.</p>
                            <Link href="/contact" className="link-arrow">Ask us what we can do for you <Arrow size={16} /></Link>
                        </div>
                    )}
                </div>
            </section>

            <section className="sec sec-tint" aria-labelledby="frame-title">
                <div className="wrap frame-grid">
                    <div>
                        <p className="eyebrow">Structural design</p>
                        <h2 id="frame-title" className="h-sec">How a building’s frame comes together</h2>
                        <p className="lede mt-4">
                            Most of the buildings we design in Cameroon are reinforced-concrete frames: columns and beams carry the
                            loads down to the foundations, and the floor slabs tie each level together.
                        </p>
                        <ul className="checks mt-6">
                            <li>We size every column, beam and slab by calculation, not by habit.</li>
                            <li>Foundations are designed for the soil on your plot.</li>
                            <li>Our engineers check the reinforcement on site before each pour.</li>
                        </ul>
                        <Link href="/quote-request" className="btn btn-signal mt-8">Discuss your project <Arrow /></Link>
                    </div>
                    <FramePanel />
                </div>
            </section>

            <CTA />
        </Layout>
    );
}
