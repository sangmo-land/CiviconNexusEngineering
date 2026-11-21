import { useForm } from '@inertiajs/react';
import type { FormEvent, ReactNode } from 'react';
import SEOHead from '@/Components/SEOHead';
import { Arrow, PageHeader, Reveal, pad } from '@/Components/ui';
import Layout from '@/Layouts/Layout';
import type { Meta, PageProps } from '@/types';

interface QuoteRequestProps extends PageProps {
    meta: Meta;
}

const projectTypes = [
    'Residential Construction',
    'Commercial Construction',
    'Industrial Construction',
    'Road & Bridge Construction',
    'Structural Engineering',
    'Renovation & Remodeling',
    'Custom House Plan',
    'Site Planning',
    'Other',
];

const budgetRanges = [
    'Under $50,000',
    '$50,000 - $100,000',
    '$100,000 - $250,000',
    '$250,000 - $500,000',
    '$500,000 - $1,000,000',
    'Over $1,000,000',
    'Not Sure',
];

const nextSteps = [
    ['We review', 'An engineer reads your brief and any drawings you attach.'],
    ['We call', 'We clarify scope, site conditions and timing with you.'],
    ['You get a quote', 'A clear, itemised proposal you can compare and plan with.'],
];

function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
    return (
        <fieldset className="q-step">
            <legend className="q-legend">
                <span className="mono">{pad(n)}</span>
                {title}
            </legend>
            {children}
        </fieldset>
    );
}

export default function QuoteRequest({ meta, flash }: QuoteRequestProps) {
    const { data, setData, post, processing, errors, reset, progress } = useForm({
        name: '',
        phone: '',
        email: '',
        city: '',
        project_type: '',
        budget: '',
        message: '',
        attachment: null as File | null,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/quote-request', { forceFormData: true, onSuccess: () => reset() });
    };

    return (
        <Layout>
            <SEOHead meta={meta} />

            <PageHeader
                label="Project enquiry"
                title="Request a quote"
                index="07"
                crumbs={[{ label: 'Home', href: '/' }, { label: 'Request a quote' }]}
                description="Share your location, scope and timeline. The more we know, the more precise the quote."
            />

            <section className="sec">
                <div className="wrap quote-grid">
                    <form onSubmit={handleSubmit} className="card card-pad quote-form" noValidate={false}>
                        {flash?.success && <p role="status" className="notice mb-8">{flash.success}</p>}

                        <Step n={1} title="About you">
                            <div className="grid gap-5 md:grid-cols-2">
                                <div className="field">
                                    <label htmlFor="name" className="field-label">Full name *</label>
                                    <input id="name" className="input" value={data.name} onChange={(e) => setData('name', e.target.value)} autoComplete="name" required />
                                    {errors.name && <p className="field-error">{errors.name}</p>}
                                </div>
                                <div className="field">
                                    <label htmlFor="phone" className="field-label">Phone *</label>
                                    <input id="phone" type="tel" className="input" value={data.phone} onChange={(e) => setData('phone', e.target.value)} placeholder="+237 6XX XXX XXX" autoComplete="tel" required />
                                    {errors.phone && <p className="field-error">{errors.phone}</p>}
                                </div>
                                <div className="field">
                                    <label htmlFor="email" className="field-label">Email</label>
                                    <input id="email" type="email" className="input" value={data.email} onChange={(e) => setData('email', e.target.value)} autoComplete="email" />
                                    {errors.email && <p className="field-error">{errors.email}</p>}
                                </div>
                                <div className="field">
                                    <label htmlFor="city" className="field-label">City</label>
                                    <input id="city" className="input" value={data.city} onChange={(e) => setData('city', e.target.value)} placeholder="Douala, Yaoundé…" autoComplete="address-level2" />
                                    {errors.city && <p className="field-error">{errors.city}</p>}
                                </div>
                            </div>
                        </Step>

                        <Step n={2} title="Project type *">
                            <div className="chips chips-choice" role="radiogroup" aria-label="Project type">
                                {projectTypes.map((t) => (
                                    <label key={t} className="chip">
                                        <input type="radio" name="project_type" value={t} checked={data.project_type === t} onChange={() => setData('project_type', t)} required />
                                        {t}
                                    </label>
                                ))}
                            </div>
                            {errors.project_type && <p className="field-error mt-2">{errors.project_type}</p>}
                        </Step>

                        <Step n={3} title="Estimated budget">
                            <div className="chips chips-choice" role="radiogroup" aria-label="Estimated budget">
                                {budgetRanges.map((b) => (
                                    <label key={b} className="chip">
                                        <input type="radio" name="budget" value={b} checked={data.budget === b} onChange={() => setData('budget', b)} />
                                        {b}
                                    </label>
                                ))}
                            </div>
                            {errors.budget && <p className="field-error mt-2">{errors.budget}</p>}
                        </Step>

                        <Step n={4} title="Details">
                            <div className="grid gap-5">
                                <div className="field">
                                    <label htmlFor="message" className="field-label">Project description</label>
                                    <textarea id="message" rows={5} className="input" value={data.message} onChange={(e) => setData('message', e.target.value)} placeholder="Plot size, number of floors, timeline, anything we should know…" />
                                    {errors.message && <p className="field-error">{errors.message}</p>}
                                </div>
                                <div className="field">
                                    <span className="field-label" id="attachment-label">Attachment (optional)</span>
                                    <label className="file-drop">
                                        <input
                                            type="file"
                                            id="attachment"
                                            aria-labelledby="attachment-label"
                                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
                                            onChange={(e) => setData('attachment', e.target.files?.[0] || null)}
                                        />
                                        <span className="font-semibold">{data.attachment ? data.attachment.name : 'Drop a file or click to browse'}</span>
                                        <span className="mono text-muted">PDF, DOC, JPG, PNG, ZIP · max 10 MB</span>
                                    </label>
                                    {errors.attachment && <p className="field-error">{errors.attachment}</p>}
                                    {progress && (
                                        <div className="h-1 bg-[var(--line)]" role="progressbar" aria-valuenow={progress.percentage} aria-valuemin={0} aria-valuemax={100} aria-label="Upload progress">
                                            <div className="h-full bg-accent transition-all" style={{ width: `${progress.percentage}%` }} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Step>

                        <button type="submit" disabled={processing} className="btn btn-signal btn-block mt-2">
                            {processing ? 'Submitting…' : <>Submit quote request <Arrow /></>}
                        </button>
                    </form>

                    <aside className="detail-aside">
                        <span className="eyebrow">What happens next</span>
                        <ol className="next-steps">
                            {nextSteps.map(([t, d], i) => (
                                <Reveal as="li" key={t} delay={i * 0.08}>
                                    <span className="mono">{pad(i + 1)}</span>
                                    <div>
                                        <h3>{t}</h3>
                                        <p>{d}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </ol>
                        <div className="card card-pad card-ink mt-8">
                            <p className="mono text-[#a8a79f]">Prefer to talk?</p>
                            <a href="tel:+237678626645" className="mt-2 block text-[1.6rem] font-[750] tracking-[-0.03em] hover:text-accent">+237 678 626 645</a>
                        </div>
                    </aside>
                </div>
            </section>
        </Layout>
    );
}
