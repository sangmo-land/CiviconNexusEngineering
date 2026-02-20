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
        alternateName: [
            "Civicon Nexus",
            "Civicon Nexus Ingénierie",
            "Civicon Nexus Engineering Cameroun",
            "Civicon Nexus BTP",
        ],
        url: SITE_URL,
        logo: `${SITE_URL}/images/logo.jpeg`,
        description:
            "Professional civil engineering and construction company in Cameroon. Expert structural design, project management, house plans, building construction, renovations, and infrastructure development across Douala, Yaoundé, and all regions of Cameroon. | Entreprise professionnelle de génie civil et de construction au Cameroun. Conception structurelle, gestion de projets, plans de maison, construction de bâtiments, rénovations et développement d'infrastructures à Douala, Yaoundé et dans toutes les régions du Cameroun.",
        foundingLocation: {
            "@type": "Place",
            name: "Yaoundé, Cameroon",
        },
        address: {
            "@type": "PostalAddress",
            streetAddress: "Rond Point Express",
            addressLocality: "Yaoundé",
            addressRegion: "Centre",
            addressCountry: "CM",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: 3.8480,
            longitude: 11.5021,
        },
        contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer service",
            availableLanguage: ["French", "English"],
            areaServed: "CM",
        },
        knowsLanguage: ["fr", "en"],
        knowsAbout: [
            "Civil Engineering",
            "Génie Civil",
            "Structural Design",
            "Conception Structurelle",
            "Construction Management",
            "Gestion de Chantier",
            "Building Construction",
            "Construction de Bâtiments",
            "House Plans",
            "Plans de Maison",
            "Project Management",
            "Gestion de Projet",
            "Infrastructure Development",
            "Développement d'Infrastructures",
            "Road Construction",
            "Construction de Routes",
            "Renovation",
            "Rénovation",
            "Architectural Design",
            "Conception Architecturale",
            "Urban Planning",
            "Urbanisme",
            "BTP Cameroun",
            "Travaux Publics",
        ],
        sameAs: [
            "https://www.facebook.com/civiconnexus",
            "https://www.linkedin.com/company/civiconnexus",
            "https://www.instagram.com/civiconnexus",
        ],
    };

    // Default LocalBusiness / ProfessionalService JSON-LD
    const localBusinessJsonLd = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#business`,
        name: SITE_NAME,
        alternateName: "Civicon Nexus Ingénierie",
        image: `${SITE_URL}/images/logo.jpeg`,
        url: SITE_URL,
        telephone: "+237678626645",
        priceRange: "$$",
        description:
            "Expert civil engineering services in Cameroon — structural design, construction management, house plans, building projects, road construction, and infrastructure across Douala, Yaoundé, Bamenda, Bafoussam, Kribi, Limbe, and beyond. | Services experts de génie civil au Cameroun — conception structurelle, gestion de chantier, plans de maison, projets de construction, construction routière et infrastructures à Douala, Yaoundé, Bamenda, Bafoussam, Kribi, Limbé et au-delà.",
        address: {
            "@type": "PostalAddress",
            streetAddress: "Rond Point Express",
            addressLocality: "Yaoundé",
            addressRegion: "Centre",
            addressCountry: "CM",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: 3.8480,
            longitude: 11.5021,
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
            { "@type": "City", name: "Garoua" },
            { "@type": "City", name: "Maroua" },
            { "@type": "City", name: "Kribi" },
            { "@type": "City", name: "Limbe" },
            { "@type": "City", name: "Buea" },
            { "@type": "City", name: "Bertoua" },
            { "@type": "City", name: "Ebolowa" },
            { "@type": "City", name: "Ngaoundéré" },
            { "@type": "City", name: "Kumba" },
            { "@type": "City", name: "Nkongsamba" },
            { "@type": "City", name: "Edéa" },
            { "@type": "Country", name: "Cameroon" },
        ],
        serviceType: [
            // English services
            "Civil Engineering",
            "Structural Design",
            "Construction Management",
            "House Plan Design",
            "Building Construction",
            "Project Management",
            "Renovation",
            "Road Construction",
            "Infrastructure Development",
            "Foundation Engineering",
            "Concrete Works",
            "Steel Structure Design",
            "Site Supervision",
            "Building Inspection",
            "Quantity Surveying",
            "Land Surveying",
            "Architectural Design",
            "Interior Design",
            "Plumbing Installation",
            "Electrical Installation",
            // French services (génie civil, BTP)
            "Génie Civil",
            "Conception Structurelle",
            "Gestion de Chantier",
            "Plan de Maison",
            "Construction de Bâtiment",
            "Gestion de Projet",
            "Rénovation",
            "Construction Routière",
            "Développement d'Infrastructures",
            "Ingénierie des Fondations",
            "Travaux de Béton",
            "Conception de Structures Métalliques",
            "Supervision de Chantier",
            "Inspection de Bâtiment",
            "Métré et Estimation",
            "Topographie",
            "Conception Architecturale",
            "Aménagement Intérieur",
            "Installation Plomberie",
            "Installation Électrique",
            "BTP",
            "Travaux Publics",
            "Maître d'Oeuvre",
            "Bureau d'Études",
            "Étude de Sol",
            "Terrassement",
            "Assainissement",
            "VRD",
        ],
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Civil Engineering Services / Services de Génie Civil",
            itemListElement: [
                {
                    "@type": "OfferCatalog",
                    name: "Design Services / Services de Conception",
                    itemListElement: [
                        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Structural Design / Conception Structurelle" } },
                        { "@type": "Offer", itemOffered: { "@type": "Service", name: "House Plan Design / Conception de Plans de Maison" } },
                        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Architectural Design / Conception Architecturale" } },
                    ],
                },
                {
                    "@type": "OfferCatalog",
                    name: "Construction Services / Services de Construction",
                    itemListElement: [
                        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Building Construction / Construction de Bâtiment" } },
                        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Renovation / Rénovation" } },
                        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Road Construction / Construction Routière" } },
                    ],
                },
                {
                    "@type": "OfferCatalog",
                    name: "Management Services / Services de Gestion",
                    itemListElement: [
                        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Project Management / Gestion de Projet" } },
                        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Site Supervision / Supervision de Chantier" } },
                        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Quantity Surveying / Métré et Estimation" } },
                    ],
                },
            ],
        },
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

    // BreadcrumbList schema
    if (meta.breadcrumbs && meta.breadcrumbs.length > 0) {
        jsonLdItems.push({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: meta.breadcrumbs.map((bc, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: bc.name,
                item: bc.url.startsWith('http') ? bc.url : `${SITE_URL}${bc.url}`,
            })),
        });
    }

    // FAQPage schema
    if (meta.faq && meta.faq.length > 0) {
        jsonLdItems.push({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: meta.faq.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: item.answer,
                },
            })),
        });
    }

    return (
        <Head title={meta.title}>
            {/* Primary Meta Tags */}
            <meta name="description" content={meta.description} />
            {meta.keywords && <meta name="keywords" content={meta.keywords} />}
            <meta name="author" content={SITE_NAME} />
            <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
            <meta name="revisit-after" content="3 days" />
            <meta name="distribution" content="global" />
            <meta name="rating" content="general" />
            <meta name="language" content="English, French" />
            <meta name="target" content="all" />
            <meta name="audience" content="all" />
            <meta name="coverage" content="Worldwide" />

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
            <meta name="geo.region" content="CM-LT" />
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
