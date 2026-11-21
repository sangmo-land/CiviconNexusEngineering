import { Link } from '@inertiajs/react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import ImageLightbox from '@/Components/ImageLightbox';
import SEOHead from '@/Components/SEOHead';
import { Arrow, CTA, Crumbs, Reveal, SplitTitle, pad, storageUrl } from '@/Components/ui';
import Layout from '@/Layouts/Layout';
import type { Meta, Project } from '@/types';

interface ProjectShowProps {
    meta: Meta;
    project: Project;
}

export default function ProjectShow({ meta, project }: ProjectShowProps) {
    const [selected, setSelected] = useState<number | null>(null);
    const hero = useRef<HTMLElement>(null);
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: hero, offset: ['start start', 'end start'] });
    const imgY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%']);
    const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, reduce ? 1.05 : 1.15]);

    const images = project.images ?? [];
    const cover = images[0];
    const lightboxImages = images.map((img, i) => ({
        src: storageUrl(img.image_path),
        alt: img.caption || `${project.title} — image ${i + 1}`,
        caption: img.caption,
    }));

    const timeline = project.start_year && project.is_ongoing
        ? `${project.start_year} — present`
        : project.start_year && project.completion_year
            ? `${project.start_year} — ${project.completion_year}`
            : project.completion_year
                ? `Completed ${project.completion_year}`
                : project.start_year ? `Started ${project.start_year}` : null;

    const specs = [
        { label: 'Type', value: project.project_type },
        { label: 'Location', value: project.location },
        { label: 'Our role', value: project.role },
        ...(project.client ? [{ label: 'Client', value: project.client }] : []),
        ...(timeline ? [{ label: 'Timeline', value: timeline }] : []),
        { label: 'Status', value: project.is_ongoing ? 'In progress' : project.completion_year ? 'Completed' : '—' },
    ].filter((s) => s.value);

    const titleWords = project.title.split(' ');
    const titleLines = titleWords.length > 3
        ? [titleWords.slice(0, Math.ceil(titleWords.length / 2)).join(' '), titleWords.slice(Math.ceil(titleWords.length / 2)).join(' ')]
        : [project.title];

    return (
        <Layout>
            <SEOHead meta={meta} />

            <section ref={hero} className={`phero on-dark ${cover ? '' : 'phero-blank'}`} aria-labelledby="project-title">
                {cover && (
                    <motion.img
                        src={storageUrl(cover.image_path)}
                        alt=""
                        className="phero-img"
                        style={{ y: imgY, scale: imgScale }}
                    />
                )}
                <div className="wrap phero-inner">
                    <Crumbs items={[{ label: 'Home', href: '/' }, { label: 'Projects', href: '/projects' }, { label: project.title }]} />
                    <div className="mt-auto">
                        <div className="flex flex-wrap gap-2 mb-6">
                            <span className="tag tag-signal">{project.project_type}</span>
                            {project.is_ongoing && <span className="tag"><span className="live-dot" /> Ongoing</span>}
                        </div>
                        <SplitTitle as="h1" id="project-title" immediate className="display phero-title" lines={titleLines} />
                    </div>
                </div>
            </section>

            <section aria-label="Project specification" className="spec-strip">
                <dl className="wrap spec-grid">
                    {specs.map((s, i) => (
                        <div key={s.label}>
                            <dt className="mono">{pad(i + 1)} · {s.label}</dt>
                            <dd>{s.value}</dd>
                        </div>
                    ))}
                </dl>
            </section>

            <section className="sec">
                <div className="wrap detail-grid">
                    <aside className="detail-aside">
                        <span className="eyebrow">About the project</span>
                        <div className="card card-pad mt-6">
                            <p className="text-[1.3rem] font-semibold leading-snug tracking-[-0.02em]">Planning something similar?</p>
                            <p className="mt-2 text-muted">We’ll bring the same team and the same rigour to your site.</p>
                            <Link href="/quote-request" className="btn btn-signal btn-block mt-6">Start your project <Arrow /></Link>
                        </div>
                    </aside>
                    <Reveal>
                        <div className="prose-cn" dangerouslySetInnerHTML={{ __html: project.description }} />
                    </Reveal>
                </div>
            </section>

            {images.length > 0 && (
                <section className="sec pt-0" aria-labelledby="gallery-title">
                    <div className="wrap">
                        <div className="sec-head">
                            <div>
                                <span className="eyebrow">On site</span>
                                <h2 id="gallery-title" className="h-sec mt-5">Gallery</h2>
                            </div>
                            <span className="mono text-muted">{pad(images.length)} {images.length === 1 ? 'image' : 'images'}</span>
                        </div>
                        <div className="gallery">
                            {images.map((image, i) => (
                                <Reveal key={image.id} delay={(i % 3) * 0.06}>
                                    <button type="button" className="gallery-item" onClick={() => setSelected(i)} aria-label={`Open image ${i + 1}${image.caption ? `: ${image.caption}` : ''}`}>
                                        <img src={storageUrl(image.image_path)} alt={image.caption || `${project.title} — image ${i + 1}`} loading="lazy" />
                                        <span className="gallery-cap mono">{pad(i + 1)}{image.caption ? ` · ${image.caption}` : ''}</span>
                                    </button>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <CTA
                title={['Ready to build', 'something lasting?']}
                secondary={{ href: '/projects', label: 'More projects' }}
            />

            <ImageLightbox images={lightboxImages} selectedIndex={selected} onClose={() => setSelected(null)} onNavigate={setSelected} />
        </Layout>
    );
}
