import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Project, Meta } from '@/types';

interface ProjectShowProps {
    meta: Meta;
    project: Project;
}

export default function ProjectShow({ meta, project }: ProjectShowProps) {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    return (
        <Layout>
            <Head title={meta.title}>
                <meta name="description" content={meta.description} />
            </Head>

            {/* Breadcrumb */}
            <div className="bg-gray-50 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <nav className="flex text-sm">
                        <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
                        <span className="mx-2 text-gray-400">/</span>
                        <Link href="/projects" className="text-gray-500 hover:text-gray-700">Projects</Link>
                        <span className="mx-2 text-gray-400">/</span>
                        <span className="text-gray-900">{project.title}</span>
                    </nav>
                </div>
            </div>

            {/* Project Header */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium mb-4">
                                {project.project_type}
                            </span>
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">{project.title}</h1>
                            <div className="flex flex-wrap gap-6 text-gray-600">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {project.location}
                                </div>
                                {project.completion_year && (
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Completed {project.completion_year}
                                    </div>
                                )}
                                {project.client && (
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        Client: {project.client}
                                    </div>
                                )}
                            </div>
                        </div>
                        <Link
                            href="/quote-request"
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                        >
                            Start Your Project
                        </Link>
                    </div>
                </div>
            </section>

            {/* Project Gallery */}
            {project.images && project.images.length > 0 && (
                <section className="pb-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Gallery</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {project.images.map((image, index) => (
                                <button
                                    key={image.id}
                                    onClick={() => setSelectedImage(index)}
                                    className="aspect-square bg-gray-200 rounded-lg overflow-hidden hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    <img
                                        src={`/storage/${image.image_path}`}
                                        alt={image.caption || `Project image ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Project Description + Details */}
            <section className="pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Description</h2>
                            <div 
                                className="prose prose-lg max-w-none text-gray-600"
                                dangerouslySetInnerHTML={{ __html: project.description }}
                            />
                        </div>
                        <div>
                            <div className="bg-gray-50 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
                                <dl className="space-y-4">
                                    <div>
                                        <dt className="text-sm text-gray-500">Project Type</dt>
                                        <dd className="text-gray-900 font-medium">{project.project_type}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm text-gray-500">Location</dt>
                                        <dd className="text-gray-900 font-medium">{project.location}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm text-gray-500">Our Role</dt>
                                        <dd className="text-gray-900 font-medium">{project.role}</dd>
                                    </div>
                                    {project.client && (
                                        <div>
                                            <dt className="text-sm text-gray-500">Client</dt>
                                            <dd className="text-gray-900 font-medium">{project.client}</dd>
                                        </div>
                                    )}
                                    {project.completion_year && (
                                        <div>
                                            <dt className="text-sm text-gray-500">Completion Year</dt>
                                            <dd className="text-gray-900 font-medium">{project.completion_year}</dd>
                                        </div>
                                    )}
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Image Lightbox */}
            {selectedImage !== null && project.images && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-4 right-4 text-white hover:text-gray-300 transition"
                        onClick={() => setSelectedImage(null)}
                    >
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <button
                        className="absolute left-4 text-white hover:text-gray-300 transition p-2"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(selectedImage > 0 ? selectedImage - 1 : project.images!.length - 1);
                        }}
                    >
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <img
                        src={`/storage/${project.images[selectedImage].image_path}`}
                        alt={project.images[selectedImage].caption || `Project image ${selectedImage + 1}`}
                        className="max-h-[90vh] max-w-[90vw] object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <button
                        className="absolute right-4 text-white hover:text-gray-300 transition p-2"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(selectedImage < project.images!.length - 1 ? selectedImage + 1 : 0);
                        }}
                    >
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                    {project.images[selectedImage].caption && (
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center">
                            {project.images[selectedImage].caption}
                        </div>
                    )}
                </div>
            )}
        </Layout>
    );
}
