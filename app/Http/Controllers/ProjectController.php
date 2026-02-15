<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        $projects = Project::with('images')->latest()->paginate(12);

        return Inertia::render('Projects/Index', [
            'meta' => [
                'title' => 'Our Projects',
                'description' => 'Browse our portfolio of completed civil engineering and construction projects across various locations.',
            ],
            'projects' => $projects,
        ]);
    }

    public function show(string $slug): Response
    {
        $project = Project::with('images')->where('slug', $slug)->firstOrFail();

        return Inertia::render('Projects/Show', [
            'meta' => [
                'title' => $project->title,
                'description' => substr(strip_tags($project->description), 0, 160),
            ],
            'project' => $project,
        ]);
    }
}
