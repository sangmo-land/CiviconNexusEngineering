import { Head } from '@inertiajs/react';
import { Meta } from '@/types';

interface SEOHeadProps {
    meta: Meta;
}

const SITE_NAME = 'Civicon Nexus Engineering';
const DEFAULT_OG_IMAGE = '/images/og-default.jpg';
const SITE_URL = 'https://civiconnexusengineering.com';

export default function SEOHead({ meta }: SEOHeadProps) {
    const fullTitle = `${meta.title} - ${SITE_NAME}`;
    const ogImage = meta.ogImage
        ? (meta.ogImage.startsWith('http') ? meta.ogImage : `${SITE_URL}/storage/${meta.ogImage}`)
        : `${SITE_URL}${DEFAULT_OG_IMAGE}`;
    const canonical = meta.canonical
        ? (meta.canonical.startsWith('http') ? meta.canonical : `${SITE_URL}${meta.canonical}`)
        : undefined;
    const ogType = meta.ogType ?? 'website';

    // Default Organization JSON-LD (always present)
    const organizationJsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/images/logo.png`,
        description:
            "Professional civil engineering and construction company in Cameroon. Structural design, project management, house plans, and building construction.",
        address: {
            "@type": "PostalAddress",
            addressLocality: "Douala",
            addressRegion: "Littoral",
            addressCountry: "CM",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: 4.0511,
            longitude: 9.7679,
        },
        contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer service",
            availableLanguage: ["French", "English"],
        },
        sameAs: [
            "https://www.facebook.com/civiconnexus",
            "https://www.linkedin.com/company/civiconnexus",
            "https://www.instagram.com/civiconnexus",
        ],
    };

    // Default LocalBusiness JSON-LD
    const localBusinessJsonLd = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#business`,
        name: SITE_NAME,
        image: `${SITE_URL}/images/logo.png`,
        url: SITE_URL,
        telephone: "+237-XXX-XXX-XXX",
        priceRange: "$$",
        description:
            "Expert civil engineering services in Cameroon — structural design, construction management, house plans, and building projects across Douala, Yaoundé, and beyond.",
        address: {
            "@type": "PostalAddress",
            addressLocality: "Douala",
            addressRegion: "Littoral",
            addressCountry: "CM",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: 4.0511,
            longitude: 9.7679,
        },
        openingHoursSpecification: [
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                ],
                opens: "08:00",
                closes: "17:00",
            },
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: "Saturday",
                opens: "08:00",
                closes: "13:00",
            },
        ],
        areaServed: [
            { "@type": "City", name: "Douala" },
            { "@type": "City", name: "Yaoundé" },
            { "@type": "City", name: "Bamenda" },
            { "@type": "City", name: "Bafoussam" },
            { "@type": "Country", name: "Cameroon" },
        ],
        serviceType: [
            "Civil Engineering",
            "Structural Design",
            "Construction Management",
            "House Plan Design",
            "Building Construction",
            "Project Management",
            "Renovation",
        ],
    };

    // Build JSON-LD array
    const jsonLdItems: Record<string, unknown>[] = [organizationJsonLd, localBusinessJsonLd];
    if (meta.jsonLd) {
        if (Array.isArray(meta.jsonLd)) {
            jsonLdItems.push(...meta.jsonLd);
        } else {
            jsonLdItems.push(meta.jsonLd);
        }
    }

    return (
        <Head title={meta.title}>
            {/* Primary Meta Tags */}
            <meta name="description" content={meta.description} />
            {meta.keywords && <meta name="keywords" content={meta.keywords} />}
            <meta name="author" content={SITE_NAME} />
            <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

            {/* Canonical URL */}
            {canonical && <link rel="canonical" href={canonical} />}

            {/* Language Alternates */}
            <meta httpEquiv="content-language" content="en, fr" />
            <link rel="alternate" hrefLang="en" href={canonical || SITE_URL} />
            <link rel="alternate" hrefLang="fr" href={canonical || SITE_URL} />
            <link rel="alternate" hrefLang="x-default" href={canonical || SITE_URL} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={canonical || SITE_URL} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={meta.description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:locale" content="en_CM" />
            <meta property="og:locale:alternate" content="fr_CM" />

            {/* Article specific OG tags */}
            {meta.article?.publishedTime && (
                <meta property="article:published_time" content={meta.article.publishedTime} />
            )}
            {meta.article?.modifiedTime && (
                <meta property="article:modified_time" content={meta.article.modifiedTime} />
            )}
            {meta.article?.author && (
                <meta property="article:author" content={meta.article.author} />
            )}

            {/* Twitter Cards */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={meta.description} />
            <meta name="twitter:image" content={ogImage} />

            {/* Geo Tags for Cameroon */}
            <meta name="geo.region" content="CM" />
            <meta name="geo.placename" content="Douala, Cameroon" />
            <meta name="geo.position" content="4.0511;9.7679" />
            <meta name="ICBM" content="4.0511, 9.7679" />

            {/* JSON-LD Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(jsonLdItems)}
            </script>
        </Head>
    );
}
