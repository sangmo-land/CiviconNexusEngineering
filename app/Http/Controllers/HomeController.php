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
                'title' => 'Home',
                'description' => 'Civicon Nexus Engineering - Your trusted partner in civil engineering and construction. Quality builds, expert designs.',
            ],
            'featuredServices' => $featuredServices,
            'featuredProjects' => $featuredProjects,
        ]);
    }
}
