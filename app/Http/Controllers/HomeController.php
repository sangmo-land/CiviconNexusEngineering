<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        $featuredServices = Service::featured()->take(6)->get();
        $featuredProjects = Project::featured()->with('images')->take(6)->get();

        return Inertia::render('Home', [
            'meta' => [
                'title' => 'Civil Engineering & Construction in Cameroon',
                'description' => 'Civicon Nexus Engineering — Cameroon\'s trusted civil engineering firm. Expert structural design, construction management, house plans & building projects in Douala, Yaoundé & across Cameroon.',
                'keywords' => 'civil engineering Cameroon, construction company Douala, structural design Yaoundé, house plans Cameroon, building construction Cameroon, génie civil Cameroun, construction Douala, projet de construction Cameroun',
                'canonical' => '/',
                'ogType' => 'website',
                'jsonLd' => [
                    [
                        '@context' => 'https://schema.org',
                        '@type' => 'WebSite',
                        'name' => 'Civicon Nexus Engineering',
                        'url' => config('app.url'),
                        'potentialAction' => [
                            '@type' => 'SearchAction',
                            'target' => config('app.url') . '/blog?q={search_term_string}',
                            'query-input' => 'required name=search_term_string',
                        ],
                    ],
                ],
            ],
            'featuredServices' => $featuredServices,
            'featuredProjects' => $featuredProjects,
        ]);
    }
}
