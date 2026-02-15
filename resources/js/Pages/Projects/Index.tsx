import { Head, Link } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import { Project, Meta, PaginatedData } from '@/types';

interface ProjectsIndexProps {
    meta: Meta;
    projects: PaginatedData<Project>;
}

export default function ProjectsIndex({ meta, projects }: ProjectsIndexProps) {
    return (
        <Layout>
            <Head title={meta.title}>
                <meta name="description" content={meta.description} />
            </Head>

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold mb-4">Our Projects</h1>
                    <p className="text-xl text-blue-100 max-w-2xl">
                        Explore our portfolio of successfully completed civil engineering and construction projects.
                    </p>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.data.map((project) => (
                            <Link
                                key={project.id}
                                href={`/projects/${project.slug}`}
                                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition border border-gray-100"
                            >
                                <div className="aspect-video bg-gray-200 relative overflow-hidden">
                                    {project.images && project.images[0] ? (
                                        <img
                                            src={`/storage/${project.images[0].image_path}`}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium mb-2">
                                        {project.project_type}
                                    </span>
                                    <h2 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                                        {project.title}
                                    </h2>
                                    <div className="flex items-center text-gray-500 text-sm">
                                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {project.location}
                                    </div>
                                    {project.completion_year && (
                                        <div className="flex items-center text-gray-500 text-sm mt-1">
                                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            Completed {project.completion_year}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>

                    {projects.data.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-600">No projects available at the moment. Check back soon!</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {projects.last_page > 1 && (
                        <div className="flex justify-center mt-12">
                            <nav className="flex space-x-2">
                                {projects.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                            link.active
                                                ? 'bg-blue-600 text-white'
                                                : link.url
                                                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </nav>
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    );
}
