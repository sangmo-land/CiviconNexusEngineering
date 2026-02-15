{!! '<?xml version="1.0" encoding="UTF-8"?>' !!}
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

    {{-- Static Pages --}}
    <url>
        <loc>{{ url('/') }}</loc>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>{{ url('/services') }}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>{{ url('/projects') }}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>{{ url('/plans') }}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>{{ url('/blog') }}</loc>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>{{ url('/contact') }}</loc>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
    <url>
        <loc>{{ url('/quote-request') }}</loc>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>

    {{-- Services --}}
    @foreach($services as $service)
    <url>
        <loc>{{ url('/services/' . $service->slug) }}</loc>
        <lastmod>{{ $service->updated_at->toAtomString() }}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    @endforeach

    {{-- Projects --}}
    @foreach($projects as $project)
    <url>
        <loc>{{ url('/projects/' . $project->slug) }}</loc>
        <lastmod>{{ $project->updated_at->toAtomString() }}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
        @if($project->images->count())
        @foreach($project->images as $image)
        <image:image>
            <image:loc>{{ asset('storage/' . $image->image_path) }}</image:loc>
            <image:caption>{{ $image->caption ?? $project->title }}</image:caption>
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
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
        @if($post->featured_image)
        <image:image>
            <image:loc>{{ asset('storage/' . $post->featured_image) }}</image:loc>
            <image:caption>{{ $post->title }}</image:caption>
        </image:image>
        @endif
    </url>
    @endforeach

    {{-- House Plans --}}
    @foreach($housePlans as $plan)
    <url>
        <loc>{{ url('/plans/' . $plan->slug) }}</loc>
        <lastmod>{{ $plan->updated_at->toAtomString() }}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
        @if($plan->preview_image)
        <image:image>
            <image:loc>{{ asset('storage/' . $plan->preview_image) }}</image:loc>
            <image:caption>{{ $plan->title }}</image:caption>
        </image:image>
        @endif
    </url>
    @endforeach

</urlset>
