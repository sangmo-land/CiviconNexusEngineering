import { Link, useForm } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { PlanSpecs, formatPrice } from '@/Components/PlanSpecs';
import SEOHead from '@/Components/SEOHead';
import { Arrow, CTA, Crumbs, Media, Reveal, SplitTitle, storageUrl } from '@/Components/ui';
import Layout from '@/Layouts/Layout';
import type { HousePlan, Meta } from '@/types';

interface HousePlanShowProps {
    meta: Meta;
    housePlan: HousePlan;
}

export default function HousePlanShow({ meta, housePlan }: HousePlanShowProps) {
    const [open, setOpen] = useState(false);
    const trigger = useRef<HTMLButtonElement>(null);
    const emailInput = useRef<HTMLInputElement>(null);
    const { data, setData, post, processing, errors, reset } = useForm({ email: '' });

    useEffect(() => {
        if (!open) return;
        emailInput.current?.focus();
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open]);

    const close = () => {
        setOpen(false);
        trigger.current?.focus();
    };

    const handleDownload = (e: FormEvent) => {
        e.preventDefault();
        const email = data.email;
        post(`/plans/${housePlan.slug}/download`, {
            onSuccess: () => {
                setOpen(false);
                reset();
                window.location.href = `/plans/${housePlan.slug}/download?email=${encodeURIComponent(email)}`;
            },
        });
    };

    return (
        <Layout>
            <SEOHead meta={meta} />

            <section className="plan-hero">
                <div className="wrap plan-hero-grid">
                    <Reveal className="plan-hero-media">
                        <Media src={storageUrl(housePlan.preview_image, 'large')} alt={housePlan.title} ratio="1 / 1" eager />
                    </Reveal>

                    <div className="plan-hero-info">
                        <Crumbs items={[{ label: 'Home', href: '/' }, { label: 'House plans', href: '/plans' }, { label: housePlan.title }]} />
                        <SplitTitle as="h1" immediate className="display mt-8 text-[clamp(2.1rem,4.2vw,4.1rem)]" lines={[housePlan.title]} />
                        <p className="plan-hero-price">{formatPrice(housePlan.price)}</p>
                        <PlanSpecs plan={housePlan} large />
                        <div className="mt-8 grid gap-3 sm:grid-cols-2">
                            <button ref={trigger} type="button" onClick={() => setOpen(true)} className="btn btn-signal">
                                Download PDF <Arrow className="rotate-90" />
                            </button>
                            <Link href="/quote-request" className="btn btn-ghost">Request a quote</Link>
                        </div>
                        <p className="mono mt-4 text-muted">PDF download · just enter your email</p>
                    </div>
                </div>
            </section>

            <section className="sec pt-0" aria-labelledby="plan-desc">
                <div className="wrap detail-grid">
                    <div className="detail-aside">
                        <span className="eyebrow" id="plan-desc">Plan description</span>
                    </div>
                    <Reveal>
                        <div className="prose-cn" dangerouslySetInnerHTML={{ __html: housePlan.description }} />
                    </Reveal>
                </div>
            </section>

            <CTA
                title={['Want it', 'adapted?']}
                text="We can adjust this plan to your plot, local soil conditions and budget — or design something new."
                primary={{ href: '/quote-request', label: 'Request a custom design' }}
            />

            <AnimatePresence>
                {open && (
                    <motion.div
                        className="modal-scrim"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={close}
                    >
                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="dl-title"
                            className="modal"
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <span className="eyebrow">Download</span>
                                    <h2 id="dl-title" className="mt-3 text-[1.75rem] font-[750] tracking-[-0.03em]">{housePlan.title}</h2>
                                </div>
                                <button type="button" onClick={close} className="modal-x" aria-label="Close">×</button>
                            </div>
                            <p className="mt-3 text-muted">Enter your email address and the PDF will start downloading.</p>
                            <form onSubmit={handleDownload} className="mt-6 grid gap-4">
                                <div className="field">
                                    <label htmlFor="email" className="field-label">Email address</label>
                                    <input ref={emailInput} type="email" id="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className="input" placeholder="you@example.com" required autoComplete="email" />
                                    {errors.email && <p className="field-error">{errors.email}</p>}
                                </div>
                                <button type="submit" disabled={processing} className="btn btn-signal btn-block">
                                    {processing ? 'Processing…' : 'Download PDF'}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Layout>
    );
}
