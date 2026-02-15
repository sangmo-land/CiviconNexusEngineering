<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function index(): Response
    {
        $services = Service::all();

        return Inertia::render('Services/Index', [
            'meta' => [
                'title' => 'Our Services',
                'description' => 'Explore our comprehensive civil engineering and construction services including structural design, project management, and more.',
            ],
            'services' => $services,
        ]);
    }

    public function show(string $slug): Response
    {
        $service = Service::where('slug', $slug)->firstOrFail();

        return Inertia::render('Services/Show', [
            'meta' => [
                'title' => $service->title,
                'description' => $service->short_description,
            ],
            'service' => $service,
        ]);
    }
}
