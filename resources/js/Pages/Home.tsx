import { Head, Link } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import { Service, Project, Meta } from '@/types';

interface HomeProps {
    meta: Meta;
    featuredServices: Service[];
    featuredProjects: Project[];
}

export default function Home({ meta, featuredServices, featuredProjects }: HomeProps) {
    return (
        <Layout>
            <Head title={meta.title}>
                <meta name="description" content={meta.description} />
            </Head>

            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Building Tomorrow's Infrastructure Today
                        </h1>
                        <p className="text-xl text-blue-100 mb-8">
                            Civicon Nexus Engineering delivers exceptional civil engineering and construction 
                            services. From structural design to project completion, we bring your vision to life.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/quote-request"
                                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                            >
                                Get a Free Quote
                            </Link>
                            <Link
                                href="/projects"
                                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
                            >
                                View Our Projects
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Services */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            We offer comprehensive civil engineering and construction services tailored to meet your needs.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredServices.map((service) => (
                            <div
                                key={service.id}
                                className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition"
                            >
                                {service.icon && (
                                    <div className="text-4xl mb-4">{service.icon}</div>
                                )}
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 mb-4">{service.short_description}</p>
                                <Link
                                    href={`/services/${service.slug}`}
                                    className="text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Learn More →
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <Link
                            href="/services"
                            className="text-blue-600 hover:text-blue-700 font-semibold"
                        >
                            View All Services →
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Projects */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Projects</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Explore our portfolio of successfully completed projects across various sectors.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProjects.map((project) => (
                            <Link
                                key={project.id}
                                href={`/projects/${project.slug}`}
                                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition"
                            >
                                <div className="aspect-video bg-gray-200 relative overflow-hidden">
                                    {project.images[0] ? (
                                        <img
                                            src={`/storage/${project.images[0].image_path}`}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            No Image
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <span className="text-sm text-blue-600 font-medium">
                                        {project.project_type}
                                    </span>
                                    <h3 className="text-lg font-semibold text-gray-900 mt-1">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mt-2">
                                        {project.location}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <Link
                            href="/projects"
                            className="text-blue-600 hover:text-blue-700 font-semibold"
                        >
                            View All Projects →
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-blue-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Ready to Start Your Project?
                    </h2>
                    <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                        Get in touch with our team of experts and let's discuss how we can bring your 
                        construction project to life.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/quote-request"
                            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                        >
                            Request a Quote
                        </Link>
                        <Link
                            href="/contact"
                            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
