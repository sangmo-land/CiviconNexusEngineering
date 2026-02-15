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
                'title' => 'Our Construction & Engineering Projects in Cameroon',
                'description' => 'View our portfolio of completed civil engineering and construction projects across Cameroon. Residential, commercial & infrastructure builds by Civicon Nexus Engineering.',
                'keywords' => 'construction projects Cameroon, engineering portfolio, completed buildings Douala, civil engineering projects Yaoundé, building projects Cameroon',
                'canonical' => '/projects',
            ],
            'projects' => $projects,
        ]);
    }

    public function show(string $slug): Response
    {
        $project = Project::with('images')->where('slug', $slug)->firstOrFail();
        $firstImage = $project->images->first();

        return Inertia::render('Projects/Show', [
            'meta' => [
                'title' => $project->title . ' | Project Portfolio',
                'description' => substr(strip_tags($project->description), 0, 160) ?: 'View the ' . $project->title . ' project by Civicon Nexus Engineering in ' . ($project->location ?? 'Cameroon') . '.',
                'keywords' => $project->title . ', ' . ($project->project_type ?? 'construction') . ', ' . ($project->location ?? 'Cameroon') . ', civil engineering project',
                'canonical' => '/projects/' . $project->slug,
                'ogImage' => $firstImage ? $firstImage->image_path : null,
                'jsonLd' => [
                    '@context' => 'https://schema.org',
                    '@type' => 'ConstructionProject',
                    'name' => $project->title,
                    'description' => substr(strip_tags($project->description), 0, 300),
                    'location' => [
                        '@type' => 'Place',
                        'name' => $project->location ?? 'Cameroon',
                        'address' => [
                            '@type' => 'PostalAddress',
                            'addressCountry' => 'CM',
                            'addressLocality' => $project->location,
                        ],
                    ],
                    'contractor' => [
                        '@type' => 'ProfessionalService',
                        'name' => 'Civicon Nexus Engineering',
                        'url' => config('app.url'),
                    ],
                    'image' => $firstImage ? asset('storage/' . $firstImage->image_path) : null,
                ],
            ],
            'project' => $project,
        ]);
    }
}
