import { Link } from '@inertiajs/react';
import SEOHead from '@/Components/SEOHead';
import { Arrow, PageHeader, Reveal, formatDate } from '@/Components/ui';
import Layout from '@/Layouts/Layout';
import type { Meta } from '@/types';

interface Project {
    id: number;
    title: string;
    location: string;
    site_work_logs_count: number;
}

interface SiteWorkLog {
    id: number;
    work_date: string;
    start_time: string | null;
    end_time: string | null;
    work_description: string;
    weather_conditions: string | null;
    project: Project;
    workers: { id: number }[];
    materials: { id: number }[];
    creator: { name: string } | null;
}

interface SiteWorkIndexProps {
    meta: Meta;
    projects: Project[];
    recentLogs: SiteWorkLog[];
}

export default function SiteWorkIndex({ meta, projects, recentLogs }: SiteWorkIndexProps) {
    return (
        <Layout>
            <SEOHead meta={meta} />

            <PageHeader
                label="Construction records"
                title="Site work logs"
                index="04"
                crumbs={[{ label: 'Home', href: '/' }, { label: 'Site work' }]}
                description="Daily reports of construction activity, crews and materials — organised by project."
            />

            <section className="sec" aria-labelledby="sw-projects">
                <div className="wrap">
                    <div className="sec-head">
                        <h2 id="sw-projects" className="h-sec">Select a project</h2>
                        <span className="text-muted">{projects.length} {projects.length === 1 ? 'project' : 'projects'}</span>
                    </div>

                    {projects.length > 0 ? (
                        <div className="grid-3">
                            {projects.map((project, i) => (
                                <Reveal key={project.id} delay={(i % 3) * 0.06}>
                                    <Link href={`/site-work/project/${project.id}`} className="card card-pad sw-card">
                                        <div className="flex items-start justify-between gap-4">
                                            <span className="badge">{project.site_work_logs_count} {project.site_work_logs_count === 1 ? 'log' : 'logs'}</span>
                                        </div>
                                        <h3 className="mt-12 text-[1.6rem] font-[750] leading-tight tracking-[-0.03em]">{project.title}</h3>
                                        <p className="mt-1 text-muted">{project.location}</p>
                                        <span className="row-arrow mt-6" aria-hidden="true"><Arrow /></span>
                                    </Link>
                                </Reveal>
                            ))}
                        </div>
                    ) : (
                        <div className="empty">
                            <p className="mono">No projects yet</p>
                            <p>Create a project first to start logging site work.</p>
                        </div>
                    )}
                </div>
            </section>

            {recentLogs.length > 0 && (
                <section className="sec on-dark" aria-labelledby="sw-recent">
                    <div className="wrap">
                        <div className="sec-head">
                            <div>
                                <span className="eyebrow">Live feed</span>
                                <h2 id="sw-recent" className="h-sec mt-5">Recent activity</h2>
                            </div>
                        </div>
                        <ol className="timeline">
                            {recentLogs.map((log, i) => (
                                <Reveal as="li" key={log.id} delay={Math.min(i, 5) * 0.05}>
                                    <Link href={`/site-work/log/${log.id}`} className="timeline-item">
                                        <time className="mono" dateTime={log.work_date}>{formatDate(log.work_date, 'short')}</time>
                                        <div className="min-w-0">
                                            <h3>{log.project.title}</h3>
                                            <p className="line-clamp-2">{log.work_description}</p>
                                        </div>
                                        <div className="timeline-meta mono">
                                            {log.weather_conditions && <span>{log.weather_conditions}</span>}
                                            <span>{log.workers.length} workers</span>
                                            <span>{log.materials.length} materials</span>
                                        </div>
                                    </Link>
                                </Reveal>
                            ))}
                        </ol>
                    </div>
                </section>
            )}
        </Layout>
    );
}
