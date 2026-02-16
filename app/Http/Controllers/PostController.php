<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function index(): Response
    {
        $posts = Post::published()->latest('published_at')->paginate(10);

        return Inertia::render('Blog/Index', [
            'meta' => [
                'title' => 'Blog | Civil Engineering Tips & Construction Insights Cameroon',
                'description' => 'Read expert articles on civil engineering, construction best practices, building tips, house design ideas, and industry insights from Cameroon\'s trusted engineering firm. Articles et conseils d\'experts en génie civil, construction et bâtiment au Cameroun.',
                'keywords' => 'civil engineering blog, construction tips Cameroon, building advice Cameroon, engineering articles, construction industry Cameroon, building tips Douala, construction guide Cameroon, house building tips, structural engineering articles, blog génie civil, conseils construction Cameroun, articles BTP Cameroun, guide construction maison Cameroun, astuces bâtiment, conseils ingénierie Cameroun, blog construction Douala',
                'canonical' => '/blog',
                'breadcrumbs' => [
                    ['name' => 'Home', 'url' => '/'],
                    ['name' => 'Blog', 'url' => '/blog'],
                ],
            ],
            'posts' => $posts,
        ]);
    }

    public function show(string $slug): Response
    {
        $post = Post::published()->where('slug', $slug)->firstOrFail();

        return Inertia::render('Blog/Show', [
            'meta' => [
                'title' => $post->title,
                'description' => $post->excerpt ?? substr(strip_tags($post->content), 0, 160),
                'keywords' => 'civil engineering, construction Cameroon, building, génie civil, construction Cameroun, BTP, ' . str_replace('-', ', ', $post->slug),
                'canonical' => '/blog/' . $post->slug,
                'ogType' => 'article',
                'ogImage' => $post->featured_image,
                'breadcrumbs' => [
                    ['name' => 'Home', 'url' => '/'],
                    ['name' => 'Blog', 'url' => '/blog'],
                    ['name' => $post->title, 'url' => '/blog/' . $post->slug],
                ],
                'article' => [
                    'publishedTime' => $post->published_at?->toIso8601String(),
                    'modifiedTime' => $post->updated_at?->toIso8601String(),
                    'author' => 'Civicon Nexus Engineering',
                ],
                'jsonLd' => [
                    '@context' => 'https://schema.org',
                    '@type' => 'BlogPosting',
                    'headline' => $post->title,
                    'description' => $post->excerpt ?? substr(strip_tags($post->content), 0, 160),
                    'image' => $post->featured_image ? asset('storage/' . $post->featured_image) : null,
                    'datePublished' => $post->published_at?->toIso8601String(),
                    'dateModified' => $post->updated_at?->toIso8601String(),
                    'inLanguage' => ['en', 'fr'],
                    'author' => [
                        '@type' => 'Organization',
                        'name' => 'Civicon Nexus Engineering',
                        'url' => config('app.url'),
                    ],
                    'publisher' => [
                        '@type' => 'Organization',
                        'name' => 'Civicon Nexus Engineering',
                        'logo' => [
                            '@type' => 'ImageObject',
                            'url' => asset('images/logo.jpeg'),
                        ],
                    ],
                    'mainEntityOfPage' => [
                        '@type' => 'WebPage',
                        '@id' => config('app.url') . '/blog/' . $post->slug,
                    ],
                    'about' => [
                        '@type' => 'Thing',
                        'name' => 'Civil Engineering in Cameroon',
                    ],
                ],
            ],
            'post' => $post,
        ]);
    }
}
