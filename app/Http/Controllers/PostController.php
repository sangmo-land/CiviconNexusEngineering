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
                'title' => 'Blog | Civil Engineering Tips & Insights',
                'description' => 'Read expert articles on civil engineering, construction best practices, building tips, and industry insights from Cameroon\'s trusted engineering firm.',
                'keywords' => 'civil engineering blog, construction tips Cameroon, building advice, engineering articles, construction industry Cameroon',
                'canonical' => '/blog',
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
                'canonical' => '/blog/' . $post->slug,
                'ogType' => 'article',
                'ogImage' => $post->featured_image,
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
'url' => asset('images/logo.png'),
                        ],
                    ],
                    'mainEntityOfPage' => [
                        '@type' => 'WebPage',
                        '@id' => config('app.url') . '/blog/' . $post->slug,
                    ],
                ],
            ],
            'post' => $post,
        ]);
    }
}
