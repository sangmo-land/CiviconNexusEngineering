import { Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import SEOHead from '@/Components/SEOHead';
import { CTA, Media, PageHeader, Pagination, storageUrl } from '@/Components/ui';
import Layout from '@/Layouts/Layout';
import type { Meta, PaginatedData, Project } from '@/types';

interface ProjectsIndexProps {
    meta: Meta;
    projects: PaginatedData<Project>;
}

function timeline(p: Project) {
    if (p.is_ongoing) return p.start_year ? `${p.start_year} — now` : 'Ongoing';
    if (p.start_year && p.completion_year) return `${p.start_year} — ${p.completion_year}`;
    return p.completion_year ? String(p.completion_year) : '';
}

export default function ProjectsIndex({ meta, projects }: ProjectsIndexProps) {
    const types = useMemo(() => Array.from(new Set(projects.data.map((p) => p.project_type).filter(Boolean))), [projects.data]);
    const [type, setType] = useState<string | null>(null);
    const visible = type ? projects.data.filter((p) => p.project_type === type) : projects.data;

    return (
        <Layout>
            <SEOHead meta={meta} />

            <PageHeader
                label="Portfolio"
                title="Our projects"
                index="02"
                crumbs={[{ label: 'Home', href: '/' }, { label: 'Projects' }]}
                description="Civil engineering and construction work across Cameroon — by type, location and our role on site."
            />

            <section className="sec" aria-label="Project list">
                <div className="wrap">
                    {types.length > 1 && (
                        <div className="chips" role="group" aria-label="Filter projects by type">
                            <button type="button" className="chip" aria-pressed={type === null} onClick={() => setType(null)}>
                                All <span>{projects.data.length}</span>
                            </button>
                            {types.map((t) => (
                                <button key={t} type="button" className="chip" aria-pressed={type === t} onClick={() => setType(t)}>
                                    {t} <span>{projects.data.filter((p) => p.project_type === t).length}</span>
                                </button>
                            ))}
                        </div>
                    )}

                    {projects.data.length > 0 ? (
                        <motion.div layout className="pgrid">
                            <AnimatePresence mode="popLayout">
                                {visible.map((project) => {
                                    const cover = project.images?.[0];
                                    return (
                                        <motion.div
                                            key={project.id}
                                            layout
                                            initial={{ opacity: 0, y: 24 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.96 }}
                                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                        >
                                            <Link href={`/projects/${project.slug}`} className="pcard">
                                                <Media src={storageUrl(cover?.image_path)} alt={cover?.caption ?? ''} ratio="4 / 5">
                                                    {project.is_ongoing && <span className="badge badge-live"><span className="live-dot" /> Ongoing</span>}
                                                </Media>
                                                <div className="pcard-body">
                                                    <p className="mono text-muted flex flex-wrap justify-between gap-2">
                                                        <span>{project.project_type}</span>
                                                        <span>{timeline(project)}</span>
                                                    </p>
                                                    <h2 className="mt-2 text-[clamp(1.3rem,2vw,1.65rem)] font-bold tracking-[-0.03em]">{project.title}</h2>
                                                    <p className="mt-1 text-muted">{project.location}</p>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <div className="empty">
                            <p className="mono">No projects published yet</p>
                            <p>Check back soon — or ask us about our current work.</p>
                        </div>
                    )}

                    <Pagination data={projects} label="Projects" />
                </div>
            </section>

            <CTA />
        </Layout>
    );
}
