import { Link } from '@inertiajs/react';
import SEOHead from '@/Components/SEOHead';
import Layout from '@/Layouts/Layout';
import { optimizedImageUrl } from '@/utils/image';
import type { Meta, Project, Service } from '@/types';
import './home.css';

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

export default function Home({ meta, featuredServices, featuredProjects }: HomeProps) {
    const services = featuredServices.length
        ? featuredServices.map((service) => ({
            title: service.title,
            description: service.short_description,
            href: `/services/${service.slug}`,
        }))
        : coreServices.map((service) => ({ ...service, href: '/services' }));

    return (
        <Layout home>
            <SEOHead meta={meta} />
            <div className="cn-home">
                <section className="cn-hero" aria-labelledby="hero-title">
                    <picture className="cn-hero-image">
                        <source media="(max-width: 700px)" srcSet="/images/infrastructure-hero-small.webp" />
                        <img src="/images/infrastructure-hero.webp" alt="" fetchPriority="high" />
                    </picture>
                    <div className="cn-hero-grid" aria-hidden="true" />
                    <div className="cn-shell cn-hero-inner">
                        <div className="cn-hero-copy">
                            <p className="cn-label"><span /> Civil engineering in Cameroon</p>
                            <h1 id="hero-title">Built on<br />engineering<span>.</span></h1>
                            <p className="cn-intro">
                                Civil infrastructure, structural design and construction management.
                                From the first drawing to the work on site.
                            </p>
                            <div className="cn-actions">
                                <Link className="cn-button cn-button-primary" href="/quote-request">Request a quote</Link>
                                <Link className="cn-button cn-button-outline" href="/projects">Explore our work</Link>
                            </div>
                        </div>
                        <div className="cn-hero-caption" aria-hidden="true">
                            <i /> Infrastructure study
                        </div>
                    </div>
                </section>

                <div className="cn-quick">
                    <div className="cn-shell cn-quick-inner">
                        <Link href="/services">Engineering services <span aria-hidden="true">+</span></Link>
                        <Link href="/plans">House plans <span aria-hidden="true">+</span></Link>
                        <Link href="/site-work">Site work <span aria-hidden="true">+</span></Link>
                    </div>
                </div>

                <section className="cn-shell cn-section" aria-labelledby="services-title">
                    <div className="cn-section-heading">
                        <div>
                            <p className="cn-label"><span /> Capabilities</p>
                            <h2 id="services-title">From design<br />to delivery.</h2>
                        </div>
                        <Link className="cn-text-link" href="/services">All services</Link>
                    </div>
                    <div className="cn-services">
                        {services.map((service) => (
                            <Link className="cn-service" href={service.href} key={service.title}>
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                                <span className="cn-service-icon" aria-hidden="true">+</span>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="cn-work" aria-labelledby="work-title">
                    <div className="cn-shell cn-section">
                        <div className="cn-section-heading">
                            <div>
                                <p className="cn-label"><span /> Portfolio</p>
                                <h2 id="work-title">{featuredProjects.length ? 'Selected projects.' : 'Explore our work.'}</h2>
                            </div>
                            <Link className="cn-text-link" href="/projects">All projects</Link>
                        </div>
                        {featuredProjects.length ? (
                            <div className="cn-projects">
                                {featuredProjects.map((project) => {
                                    const cover = project.images[0];
                                    return (
                                        <Link key={project.id} href={`/projects/${project.slug}`} className="cn-project">
                                            <div className="cn-project-image">
                                                {cover && <img src={optimizedImageUrl(cover.image_path, 'medium')} alt="" loading="lazy" />}
                                            </div>
                                            <div className="cn-project-copy">
                                                <p>{[project.project_type, project.location].filter(Boolean).join(' / ')}</p>
                                                <h3>{project.title}</h3>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="cn-services cn-project-links">
                                <Link className="cn-service" href="/plans">
                                    <h3>House plans</h3>
                                    <p>Browse residential designs by floor area, bedrooms and layout.</p>
                                    <span className="cn-service-icon" aria-hidden="true">+</span>
                                </Link>
                                <Link className="cn-service" href="/site-work">
                                    <h3>On site</h3>
                                    <p>Follow construction progress through site work reports.</p>
                                    <span className="cn-service-icon" aria-hidden="true">+</span>
                                </Link>
                            </div>
                        )}
                    </div>
                </section>

                <section className="cn-shell cn-section" aria-labelledby="contact-title">
                    <div className="cn-contact">
                        <div>
                            <p className="cn-label"><span /> Work with us</p>
                            <h2 id="contact-title">What are you building?</h2>
                            <p>Tell us where your project stands and what you need to move it forward.</p>
                        </div>
                        <Link className="cn-button cn-button-primary" href="/quote-request">Request a quote</Link>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
