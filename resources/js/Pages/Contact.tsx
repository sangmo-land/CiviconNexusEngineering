import { useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import SEOHead from '@/Components/SEOHead';
import { Arrow, PageHeader, Reveal, WHATSAPP_URL } from '@/Components/ui';
import Layout from '@/Layouts/Layout';
import type { Meta, PageProps } from '@/types';

interface ContactProps extends PageProps {
    meta: Meta;
}

const channels = [
    { label: 'Call', value: '+237 678 626 645', href: 'tel:+237678626645' },
    { label: 'Email', value: <>support@<wbr />civiconnexusengineering.com</>, href: 'mailto:support@civiconnexusengineering.com' },
    { label: 'WhatsApp', value: 'Message us', href: WHATSAPP_URL, external: true },
];

export default function Contact({ meta, flash }: ContactProps) {
    const { data, setData, post, processing, errors, reset } = useForm({ name: '', email: '', message: '' });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/contact', { onSuccess: () => reset() });
    };

    return (
        <Layout>
            <SEOHead meta={meta} />

            <PageHeader
                label="Contact"
                title="Talk to our team"
                index="06"
                crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
                description="Ask about a service, discuss your project or visit our office in Yaoundé."
            />

            <section className="sec">
                <div className="wrap contact-grid">
                    <div>
                        <ul className="channels">
                            {channels.map((c, i) => (
                                <Reveal as="li" key={c.label} delay={i * 0.06}>
                                    <a href={c.href} className="channel" {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                                        <span className="mono text-muted">{c.label}</span>
                                        <span className="channel-value">{c.value}</span>
                                        <span className="row-arrow" aria-hidden="true"><Arrow /></span>
                                    </a>
                                </Reveal>
                            ))}
                        </ul>

                        <div className="mt-12 grid gap-8 sm:grid-cols-2">
                            <div>
                                <span className="eyebrow">Office</span>
                                <address className="mt-4 not-italic text-lg leading-relaxed">Rond Point Express<br />Yaoundé, Cameroon</address>
                            </div>
                            <div>
                                <span className="eyebrow">Hours</span>
                                <dl className="hours mt-4">
                                    <dt>Mon – Fri</dt><dd>08:00 – 18:00</dd>
                                    <dt>Saturday</dt><dd>09:00 – 14:00</dd>
                                    <dt>Sunday</dt><dd>Closed</dd>
                                </dl>
                            </div>
                        </div>
                    </div>

                    <Reveal delay={0.1}>
                        <div className="card card-pad form-card">
                            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-[750] tracking-[-0.035em]">Send a message</h2>
                            <p className="mt-2 text-muted">Tell us a little about your project and how to reach you.</p>

                            {flash?.success && <p role="status" className="notice mt-6">{flash.success}</p>}

                            <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
                                <div className="field">
                                    <label htmlFor="name" className="field-label">Full name *</label>
                                    <input id="name" className="input" value={data.name} onChange={(e) => setData('name', e.target.value)} autoComplete="name" required />
                                    {errors.name && <p className="field-error">{errors.name}</p>}
                                </div>
                                <div className="field">
                                    <label htmlFor="email" className="field-label">Email *</label>
                                    <input id="email" type="email" className="input" value={data.email} onChange={(e) => setData('email', e.target.value)} autoComplete="email" required />
                                    {errors.email && <p className="field-error">{errors.email}</p>}
                                </div>
                                <div className="field">
                                    <label htmlFor="message" className="field-label">Message *</label>
                                    <textarea id="message" rows={6} className="input" value={data.message} onChange={(e) => setData('message', e.target.value)} placeholder="Tell us about your enquiry…" required />
                                    {errors.message && <p className="field-error">{errors.message}</p>}
                                </div>
                                <button type="submit" disabled={processing} className="btn btn-signal btn-block">
                                    {processing ? 'Sending…' : <>Send message <Arrow /></>}
                                </button>
                            </form>
                        </div>
                    </Reveal>
                </div>
            </section>
        </Layout>
    );
}
