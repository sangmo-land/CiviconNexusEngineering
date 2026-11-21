import { Link } from '@inertiajs/react';
import SEOHead from '@/Components/SEOHead';
import { Arrow, CTA, PageHeader, Reveal, WHATSAPP_URL } from '@/Components/ui';
import Layout from '@/Layouts/Layout';
import type { Meta, Service } from '@/types';

interface ServiceShowProps {
    meta: Meta;
    service: Service;
}

export default function ServiceShow({ meta, service }: ServiceShowProps) {
    return (
        <Layout>
            <SEOHead meta={meta} />

            <PageHeader
                label="Engineering service"
                title={service.title}
                crumbs={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: service.title }]}
                description={service.short_description}
            />

            <section className="sec">
                <div className="wrap detail-grid">
                    <aside className="detail-aside">
                        <div className="card card-pad">
                            <span className="eyebrow">Start here</span>
                            <p className="mt-4 text-[1.35rem] font-semibold leading-snug tracking-[-0.02em]">
                                Tell us about your site and scope — we’ll come back with a clear proposal.
                            </p>
                            <div className="mt-6 grid gap-2">
                                <Link href="/quote-request" className="btn btn-signal btn-block">Request a quote <Arrow /></Link>
                                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-block">Message on WhatsApp</a>
                            </div>
                        </div>
                        <Link href="/services" className="mono mt-6 inline-flex items-center gap-2 text-muted hover:text-ink">
                            <Arrow className="rotate-180" size={14} /> All services
                        </Link>
                    </aside>

                    <Reveal>
                        <div className="prose-cn" dangerouslySetInnerHTML={{ __html: service.description }} />
                    </Reveal>
                </div>
            </section>

            <CTA title={['Interested in', 'this service?']} text="Contact us to discuss your project requirements and receive a tailored quote." />
        </Layout>
    );
}
