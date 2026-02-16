{!! '<?xml version="1.0" encoding="UTF-8"?>' !!}
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

    {{-- Static Pages --}}
    <url>
        <loc>{{ url('/') }}</loc>
        <xhtml:link rel="alternate" hreflang="en" href="{{ url('/') }}" />
        <xhtml:link rel="alternate" hreflang="fr" href="{{ url('/') }}" />
        <xhtml:link rel="alternate" hreflang="x-default" href="{{ url('/') }}" />
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>{{ url('/services') }}</loc>
        <xhtml:link rel="alternate" hreflang="en" href="{{ url('/services') }}" />
        <xhtml:link rel="alternate" hreflang="fr" href="{{ url('/services') }}" />
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>{{ url('/projects') }}</loc>
        <xhtml:link rel="alternate" hreflang="en" href="{{ url('/projects') }}" />
        <xhtml:link rel="alternate" hreflang="fr" href="{{ url('/projects') }}" />
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>{{ url('/plans') }}</loc>
        <xhtml:link rel="alternate" hreflang="en" href="{{ url('/plans') }}" />
        <xhtml:link rel="alternate" hreflang="fr" href="{{ url('/plans') }}" />
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>{{ url('/blog') }}</loc>
        <xhtml:link rel="alternate" hreflang="en" href="{{ url('/blog') }}" />
        <xhtml:link rel="alternate" hreflang="fr" href="{{ url('/blog') }}" />
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>{{ url('/contact') }}</loc>
        <xhtml:link rel="alternate" hreflang="en" href="{{ url('/contact') }}" />
        <xhtml:link rel="alternate" hreflang="fr" href="{{ url('/contact') }}" />
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
    <url>
        <loc>{{ url('/quote-request') }}</loc>
        <xhtml:link rel="alternate" hreflang="en" href="{{ url('/quote-request') }}" />
        <xhtml:link rel="alternate" hreflang="fr" href="{{ url('/quote-request') }}" />
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>

    {{-- Services --}}
    @foreach($services as $service)
    <url>
        <loc>{{ url('/services/' . $service->slug) }}</loc>
        <lastmod>{{ $service->updated_at->toAtomString() }}</lastmod>
        <xhtml:link rel="alternate" hreflang="en" href="{{ url('/services/' . $service->slug) }}" />
        <xhtml:link rel="alternate" hreflang="fr" href="{{ url('/services/' . $service->slug) }}" />
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    @endforeach

    {{-- Projects --}}
    @foreach($projects as $project)
    <url>
        <loc>{{ url('/projects/' . $project->slug) }}</loc>
        <lastmod>{{ $project->updated_at->toAtomString() }}</lastmod>
        <xhtml:link rel="alternate" hreflang="en" href="{{ url('/projects/' . $project->slug) }}" />
        <xhtml:link rel="alternate" hreflang="fr" href="{{ url('/projects/' . $project->slug) }}" />
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
        @if($project->images->count())
        @foreach($project->images as $image)
        <image:image>
            <image:loc>{{ asset('storage/' . $image->image_path) }}</image:loc>
            <image:caption>{{ $image->caption ?? $project->title . ' - Civil Engineering Project Cameroon - Projet de construction Cameroun' }}</image:caption>
            <image:title>{{ $project->title }} - {{ $project->location ?? 'Cameroon' }} Construction Project</image:title>
        </image:image>
        @endforeach
        @endif
    </url>
    @endforeach

    {{-- Blog Posts --}}
    @foreach($posts as $post)
    <url>
        <loc>{{ url('/blog/' . $post->slug) }}</loc>
        <lastmod>{{ $post->updated_at->toAtomString() }}</lastmod>
        <xhtml:link rel="alternate" hreflang="en" href="{{ url('/blog/' . $post->slug) }}" />
        <xhtml:link rel="alternate" hreflang="fr" href="{{ url('/blog/' . $post->slug) }}" />
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
        @if($post->featured_image)
        <image:image>
            <image:loc>{{ asset('storage/' . $post->featured_image) }}</image:loc>
            <image:caption>{{ $post->title }} - Civil Engineering Blog Cameroon</image:caption>
            <image:title>{{ $post->title }}</image:title>
        </image:image>
        @endif
    </url>
    @endforeach

    {{-- House Plans --}}
    @foreach($housePlans as $plan)
    <url>
        <loc>{{ url('/plans/' . $plan->slug) }}</loc>
        <lastmod>{{ $plan->updated_at->toAtomString() }}</lastmod>
        <xhtml:link rel="alternate" hreflang="en" href="{{ url('/plans/' . $plan->slug) }}" />
        <xhtml:link rel="alternate" hreflang="fr" href="{{ url('/plans/' . $plan->slug) }}" />
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
        @if($plan->preview_image)
        <image:image>
            <image:loc>{{ asset('storage/' . $plan->preview_image) }}</image:loc>
            <image:caption>{{ $plan->title }} - House Plan Cameroon - Plan de Maison Cameroun</image:caption>
            <image:title>{{ $plan->title }} - {{ $plan->bedrooms }} Bedroom House Plan</image:title>
        </image:image>
        @endif
    </url>
    @endforeach

</urlset>
