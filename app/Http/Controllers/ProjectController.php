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
                'title' => 'Construction & Engineering Projects in Cameroon | Projets de Construction',
                'description' => 'View our portfolio of completed civil engineering and construction projects across Cameroon. Residential, commercial & infrastructure builds in Douala, Yaoundé, and all regions. Découvrez notre portefeuille de projets de génie civil et de construction réalisés au Cameroun. Bâtiments résidentiels, commerciaux et infrastructures.',
                'keywords' => 'construction projects Cameroon, engineering portfolio Cameroon, completed buildings Douala, civil engineering projects Yaoundé, building projects Cameroon, residential construction Cameroon, commercial construction Cameroon, infrastructure projects Cameroon, construction portfolio Cameroon, projets de construction Cameroun, réalisations génie civil Cameroun, bâtiments construits Douala, projets ingénierie Yaoundé, projets BTP Cameroun, construction résidentielle Cameroun, construction commerciale Cameroun, projets infrastructure Cameroun, portefeuille construction Cameroun, chantier Cameroun, ouvrage Cameroun',
                'canonical' => '/projects',
                'breadcrumbs' => [
                    ['name' => 'Home', 'url' => '/'],
                    ['name' => 'Projects', 'url' => '/projects'],
                ],
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
                'title' => $project->title . ' | Construction Project in ' . ($project->location ?? 'Cameroon'),
                'description' => substr(strip_tags($project->description), 0, 160) ?: 'View the ' . $project->title . ' construction project by Civicon Nexus Engineering in ' . ($project->location ?? 'Cameroon') . '. Expert civil engineering and building construction. Découvrez le projet ' . $project->title . ' réalisé par Civicon Nexus Engineering.',
                'keywords' => $project->title . ', ' . ($project->project_type ?? 'construction') . ', ' . ($project->location ?? 'Cameroon') . ', civil engineering project, construction project Cameroon, ' . ($project->project_type ?? 'construction') . ' Douala, projet de construction, projet génie civil, chantier ' . ($project->location ?? 'Cameroun') . ', BTP Cameroun',
                'canonical' => '/projects/' . $project->slug,
                'ogImage' => $firstImage ? $firstImage->image_path : null,
                'breadcrumbs' => [
                    ['name' => 'Home', 'url' => '/'],
                    ['name' => 'Projects', 'url' => '/projects'],
                    ['name' => $project->title, 'url' => '/projects/' . $project->slug],
                ],
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
                        'address' => [
                            '@type' => 'PostalAddress',
                            'addressLocality' => 'Douala',
                            'addressCountry' => 'CM',
                        ],
                    ],
                    'image' => $firstImage ? asset('storage/' . $firstImage->image_path) : null,
                ],
            ],
            'project' => $project,
        ]);
    }
}
