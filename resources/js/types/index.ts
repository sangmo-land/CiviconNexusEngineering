export interface Service {
    id: number;
    title: string;
    slug: string;
    short_description: string;
    description: string;
    icon: string | null;
    is_featured: boolean;
    created_at: string;
    updated_at: string;
}

export interface ProjectImage {
    id: number;
    project_id: number;
    image_path: string;
    caption: string | null;
    created_at: string;
    updated_at: string;
}

export interface Project {
    id: number;
    title: string;
    slug: string;
    location: string;
    project_type: string;
    description: string;
    client: string | null;
    completion_year: number | null;
    start_year: number | null;
    is_ongoing: boolean;
    role: string;
    is_featured: boolean;
    images: ProjectImage[];
    created_at: string;
    updated_at: string;
}

export interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    featured_image: string | null;
    published_at: string | null;
    is_published: boolean;
    created_at: string;
    updated_at: string;
}

export interface HousePlan {
    id: number;
    title: string;
    slug: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    floors: number;
    area: number;
    description: string;
    preview_image: string | null;
    pdf_file: string;
    is_featured: boolean;
    created_at: string;
    updated_at: string;
}

export interface Breadcrumb {
    name: string;
    url: string;
}

export interface Meta {
    title: string;
    description: string;
    keywords?: string;
    canonical?: string;
    ogImage?: string;
    ogType?: 'website' | 'article' | 'product';
    article?: {
        publishedTime?: string;
        modifiedTime?: string;
        author?: string;
    };
    jsonLd?: Record<string, unknown> | Record<string, unknown>[];
    breadcrumbs?: Breadcrumb[];
    faq?: { question: string; answer: string }[];
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

export interface PageProps {
    meta: Meta;
    flash?: {
        success?: string;
        error?: string;
    };
}
