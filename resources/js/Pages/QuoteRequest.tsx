import { Head, useForm } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import { Meta, PageProps } from '@/types';

interface QuoteRequestProps extends PageProps {
    meta: Meta;
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/quote-request', {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <Layout>
            <Head title={meta.title}>
                <meta name="description" content={meta.description} />
            </Head>

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold mb-4">Request a Quote</h1>
                    <p className="text-xl text-blue-100 max-w-2xl">
                        Fill out the form below and our team will get back to you with a customized quote for your project.
                    </p>
                </div>
            </section>

            {/* Quote Form */}
            <section className="py-16">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    {flash?.success && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                            {flash.success}
                        </div>
                    )}

                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Personal Info */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="John Doe"
                                            required
                                        />
                                        {errors.name && (
                                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="+1 (234) 567-890"
                                            required
                                        />
                                        {errors.phone && (
                                            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="john@example.com"
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            id="city"
                                            value={data.city}
                                            onChange={(e) => setData('city', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Your city"
                                        />
                                        {errors.city && (
                                            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Project Info */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Details</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="project_type" className="block text-sm font-medium text-gray-700 mb-1">
                                            Project Type *
                                        </label>
                                        <select
                                            id="project_type"
                                            value={data.project_type}
                                            onChange={(e) => setData('project_type', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        >
                                            <option value="">Select project type</option>
                                            {projectTypes.map((type) => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
                                        </select>
                                        {errors.project_type && (
                                            <p className="text-red-500 text-sm mt-1">{errors.project_type}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                                            Estimated Budget
                                        </label>
                                        <select
                                            id="budget"
                                            value={data.budget}
                                            onChange={(e) => setData('budget', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">Select budget range</option>
                                            {budgetRanges.map((range) => (
                                                <option key={range} value={range}>{range}</option>
                                            ))}
                                        </select>
                                        {errors.budget && (
                                            <p className="text-red-500 text-sm mt-1">{errors.budget}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                        Project Description
                                    </label>
                                    <textarea
                                        id="message"
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        rows={5}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                        placeholder="Tell us more about your project, requirements, timeline, etc."
                                    />
                                    {errors.message && (
                                        <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                                    )}
                                </div>

                                <div className="mt-6">
                                    <label htmlFor="attachment" className="block text-sm font-medium text-gray-700 mb-1">
                                        Attachment (Optional)
                                    </label>
                                    <p className="text-sm text-gray-500 mb-2">
                                        Upload any relevant documents, drawings, or images (Max 10MB)
                                    </p>
                                    <input
                                        type="file"
                                        id="attachment"
                                        onChange={(e) => setData('attachment', e.target.files?.[0] || null)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
                                    />
                                    {errors.attachment && (
                                        <p className="text-red-500 text-sm mt-1">{errors.attachment}</p>
                                    )}
                                    {progress && (
                                        <div className="mt-2">
                                            <div className="bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-blue-600 h-2 rounded-full transition-all"
                                                    style={{ width: `${progress.percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 text-lg"
                            >
                                {processing ? 'Submitting...' : 'Submit Quote Request'}
                            </button>
                        </form>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-8 text-center text-gray-600">
                        <p>
                            Or call us directly at{' '}
                            <a href="tel:+1234567890" className="text-blue-600 font-semibold hover:underline">
                                +1 (234) 567-890
                            </a>
                        </p>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
