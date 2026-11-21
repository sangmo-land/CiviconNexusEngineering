import { Link } from '@inertiajs/react';
import { PlanSpecs, formatPrice } from '@/Components/PlanSpecs';
import SEOHead from '@/Components/SEOHead';
import { CTA, Media, PageHeader, Pagination, Reveal, storageUrl } from '@/Components/ui';
import Layout from '@/Layouts/Layout';
import type { HousePlan, Meta, PaginatedData } from '@/types';

interface HousePlansIndexProps {
    meta: Meta;
    housePlans: PaginatedData<HousePlan>;
}

export default function HousePlansIndex({ meta, housePlans }: HousePlansIndexProps) {
    return (
        <Layout>
            <SEOHead meta={meta} />

            <PageHeader
                label="Residential design"
                title="House plans"
                index="03"
                crumbs={[{ label: 'Home', href: '/' }, { label: 'House plans' }]}
                description="Compare layouts, floor areas and room counts to find a plan that fits your plot and brief. Every plan is drawn by our engineers."
            />

            <section className="sec" aria-label="Available house plans">
                <div className="wrap">
                    {housePlans.data.length > 0 ? (
                        <div className="grid-3">
                            {housePlans.data.map((plan, i) => (
                                <Reveal key={plan.id} delay={(i % 3) * 0.08}>
                                    <Link href={`/plans/${plan.slug}`} className="card plan-card">
                                        <Media src={storageUrl(plan.preview_image, 'medium')} alt={plan.title} ratio="4 / 3">
                                            <span className="tag tag-signal plan-price">{formatPrice(plan.price)}</span>
                                            {plan.is_featured && <span className="tag tag-dark pcard-num">Featured</span>}
                                        </Media>
                                        <div className="plan-body">
                                            <h2>{plan.title}</h2>
                                            <PlanSpecs plan={plan} />
                                        </div>
                                    </Link>
                                </Reveal>
                            ))}
                        </div>
                    ) : (
                        <div className="empty">
                            <p className="mono">No house plans published yet</p>
                            <Link href="/quote-request" className="link-u font-semibold">Request a custom design instead</Link>
                        </div>
                    )}

                    <Pagination data={housePlans} label="House plans" />
                </div>
            </section>

            <CTA
                title={['Need a custom', 'design?']}
                text="Can’t find the right layout? We’ll draw a plan around your plot, budget and the way you live."
                primary={{ href: '/quote-request', label: 'Request a custom design' }}
            />
        </Layout>
    );
}
