<?php

namespace App\Http\Controllers;

use App\Models\HousePlan;
use App\Models\Post;
use App\Models\Project;
use App\Models\Service;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index(): Response
    {
        $services = Service::all();
        $projects = Project::with('images')->get();
        $posts = Post::published()->latest('published_at')->get();
        $housePlans = HousePlan::all();

        $content = view('sitemap', [
            'services' => $services,
            'projects' => $projects,
            'posts' => $posts,
            'housePlans' => $housePlans,
        ])->render();

        return response($content, 200)
            ->header('Content-Type', 'application/xml');
    }
}
