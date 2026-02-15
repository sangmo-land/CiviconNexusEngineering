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
                'title' => 'Blog',
                'description' => 'Read our latest articles on civil engineering, construction tips, and industry insights.',
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
            ],
            'post' => $post,
        ]);
    }
}
