import { Link } from '@inertiajs/react';
import { lazy, Suspense, useState } from 'react';
import SEOHead from '@/Components/SEOHead';
import Layout from '@/Layouts/Layout';
import type { Meta, Project, Service } from '@/types';
import './home.css';

const StructureModel = lazy(() => import('@/Components/StructureModel'));

interface HomeProps {
    meta: Meta;
    featuredServices: Service[];
    featuredProjects: Project[];
}

const coreServices = [
    { title: 'Structural engineering', description: 'Structural analysis and design for buildings and infrastructure.' },
    { title: 'Civil infrastructure', description: 'Road construction, site planning and infrastructure development.' },
    { title: 'Construction management', description: 'Construction coordination, site supervision and progress tracking.' },
];

function ProjectCover({ project }: { project: Project }) {
    const [failed, setFailed] = useState(false);
    const cover = project.images[0];

    return (
        <div className="cn-project-image" data-has-image={Boolean(cover && !failed)}>
            {cover && !failed && (
                <img src={`/storage/${cover.image_path}`} alt={cover.caption ?? ''} loading="lazy" onError={() => setFailed(true)} />
            )}
        </div>
    );
}

export default function Home({ meta, featuredServices, featuredProjects }: HomeProps) {
    const [showModel, setShowModel] = useState(false);
    const services = featuredServices.length
        ? featuredServices.map((service) => ({
            title: service.title,
            description: service.short_description,
            href: `/services/${service.slug}`,
        }))
        : coreServices.map((service) => ({ ...service, href: '/services' }));

    return (
        <Layout>
            <SEOHead meta={meta} />
            <div className="cn-home">
                <section className="cn-shell cn-hero" aria-labelledby="hero-title">
                    <div className="cn-hero-copy">
                        <p className="cn-kicker">Civil engineering in Cameroon</p>
                        <h1 id="hero-title">Engineering<br />what’s <em>next.</em></h1>
                        <p className="cn-intro">
                            We design structures and infrastructure, and manage construction from the first drawing to the work on site.
                        </p>
                        <div className="cn-actions">
                            <Link className="btn-accent" href="/quote-request">Request a quote</Link>
                            <Link className="btn-secondary" href="/projects">Explore our work</Link>
                        </div>
                    </div>
                    <div className="cn-hero-visual">
                        <picture>
                            <source media="(max-width: 700px)" srcSet="/images/infrastructure-hero-small.webp" />
                            <img src="/images/infrastructure-hero.webp" alt="Cable-stayed bridge crossing a wide body of water" fetchPriority="high" />
                        </picture>
                        <div className="cn-hero-frame" aria-hidden="true" />
                    </div>
                </section>

                <nav className="cn-shell cn-quick" aria-label="Explore engineering services and resources">
                    <Link href="/services">Engineering services</Link>
                    <Link href="/plans">House plans</Link>
                    <Link href="/site-work">Site work</Link>
                </nav>

                <section className="cn-shell cn-section" aria-labelledby="services-title">
                    <div className="cn-section-heading">
                        <div>
                            <p className="cn-kicker">Capabilities</p>
                            <h2 id="services-title">From design to delivery.</h2>
                        </div>
                        <Link className="cn-text-link" href="/services">All services</Link>
                    </div>
                    <div className="cn-services">
                        {services.map((service) => (
                            <Link className="cn-service" href={service.href} key={service.title}>
                                <span className="cn-service-mark" aria-hidden="true" />
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="cn-shell cn-model-section" aria-labelledby="model-title">
                    <div className="cn-model-copy">
                        <p className="cn-kicker">Structural design</p>
                        <h2 id="model-title">Inside a structural frame.</h2>
                        <p>Explore how columns, beams and floor plates fit together in an illustrative three-storey building.</p>
                        <button
                            type="button"
                            className="btn-secondary"
                            aria-expanded={showModel}
                            aria-controls="structure-view"
                            onClick={() => setShowModel(!showModel)}
                        >
                            {showModel ? 'Close 3D model' : 'Explore the 3D model'}
                        </button>
                    </div>
                    <div className="cn-model-view" id="structure-view">
                        {showModel ? (
                            <Suspense fallback={<p role="status" className="cn-model-message">Loading 3D model…</p>}>
                                <StructureModel />
                            </Suspense>
                        ) : <div className="cn-model-diagram" aria-hidden="true"><i /><i /><i /></div>}
                    </div>
                </section>

                <section className="cn-work" aria-labelledby="work-title">
                    <div className="cn-shell cn-section">
                        <div className="cn-section-heading">
                            <div>
                                <p className="cn-kicker">Portfolio</p>
                                <h2 id="work-title">{featuredProjects.length ? 'Selected projects.' : 'Explore our work.'}</h2>
                            </div>
                            <Link className="cn-text-link" href="/projects">All projects</Link>
                        </div>
                        {featuredProjects.length ? (
                            <div className="cn-projects">
                                {featuredProjects.map((project) => (
                                    <Link key={project.id} href={`/projects/${project.slug}`} className="cn-project">
                                        <ProjectCover project={project} />
                                        <div className="cn-project-copy">
                                            <p>{[project.project_type, project.location].filter(Boolean).join(' / ')}</p>
                                            <h3>{project.title}</h3>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="cn-services">
                                <Link className="cn-service" href="/plans">
                                    <span className="cn-service-mark" aria-hidden="true" />
                                    <h3>House plans</h3>
                                    <p>Browse residential designs by floor area, bedrooms and layout.</p>
                                </Link>
                                <Link className="cn-service" href="/site-work">
                                    <span className="cn-service-mark" aria-hidden="true" />
                                    <h3>Site work</h3>
                                    <p>Follow construction progress through site work reports.</p>
                                </Link>
                            </div>
                        )}
                    </div>
                </section>

                <section className="cn-shell cn-section" aria-labelledby="contact-title">
                    <div className="cn-contact">
                        <div>
                            <p className="cn-kicker">Work with us</p>
                            <h2 id="contact-title">What are you building?</h2>
                            <p>Tell us where your project stands and what you need to move it forward.</p>
                        </div>
                        <Link className="btn-accent" href="/quote-request">Request a quote</Link>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
