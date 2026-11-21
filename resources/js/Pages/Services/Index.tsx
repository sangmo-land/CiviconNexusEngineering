import { Link } from '@inertiajs/react';
import SEOHead from '@/Components/SEOHead';
import { Arrow, CTA, PageHeader, Reveal, pad } from '@/Components/ui';
import Layout from '@/Layouts/Layout';
import type { Meta, Service } from '@/types';

interface ServicesIndexProps {
    meta: Meta;
    services: Service[];
}

export default function ServicesIndex({ meta, services }: ServicesIndexProps) {
    return (
        <Layout>
            <SEOHead meta={meta} />

            <PageHeader
                label="Capabilities"
                title="Engineering services"
                index="01"
                crumbs={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
                description="Structural design, civil works and construction management for projects across Cameroon — delivered by one accountable team."
            />

            <section className="sec" aria-label="All services">
                <div className="wrap">
                    {services.length > 0 ? (
                        <div className="rows">
                            {services.map((service, i) => (
                                <Link key={service.id} href={`/services/${service.slug}`} className="row">
                                    <span className="row-num">{pad(i + 1)}</span>
                                    <h2 className="text-[clamp(1.5rem,3.4vw,2.75rem)] font-[750] tracking-[-0.035em]">
                                        {service.icon && <span className="mr-3" aria-hidden="true">{service.icon}</span>}
                                        {service.title}
                                    </h2>
                                    <p>{service.short_description}</p>
                                    <span className="row-arrow" aria-hidden="true"><Arrow /></span>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="empty">
                            <p className="mono">No services published yet</p>
                            <Link href="/contact" className="link-u font-semibold">Ask us what we can do for you</Link>
                        </div>
                    )}
                </div>
            </section>

            <section className="sec-sm pt-0" aria-labelledby="promise-title">
                <div className="wrap">
                    <h2 id="promise-title" className="sr-only">How we deliver</h2>
                    <div className="grid-3">
                        {[
                            ['Calculated', 'Every element is sized by analysis, checked against code and documented in drawings you can build from.'],
                            ['Coordinated', 'Design and site supervision sit with the same engineers, so questions on site get answered fast.'],
                            ['Recorded', 'Daily site logs track crews, materials and progress — you always know where your project stands.'],
                        ].map(([title, text], i) => (
                            <Reveal key={title} delay={i * 0.08} className="card card-pad">
                                <span className="mono text-muted">{pad(i + 1)}</span>
                                <h3 className="mt-10 text-[1.75rem] font-[750] tracking-[-0.03em]">{title}</h3>
                                <p className="mt-2 text-muted">{text}</p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <CTA title={['Need a custom', 'solution?']} text="Our team is ready to discuss your requirements and prepare an engineering proposal." />
        </Layout>
    );
}
