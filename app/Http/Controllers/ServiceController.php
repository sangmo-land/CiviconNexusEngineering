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
                'title' => 'Our Civil Engineering Services in Cameroon',
                'description' => 'Comprehensive civil engineering services in Cameroon: structural design, construction management, renovations, project supervision & more. Get expert engineering solutions from Civicon Nexus.',
                'keywords' => 'civil engineering services Cameroon, structural design Douala, construction management Yaoundé, renovation services Cameroon, building services, génie civil services Cameroun',
                'canonical' => '/services',
            ],
            'services' => $services,
        ]);
    }

    public function show(string $slug): Response
    {
        $service = Service::where('slug', $slug)->firstOrFail();

        return Inertia::render('Services/Show', [
            'meta' => [
                'title' => $service->title . ' | Civil Engineering Service',
                'description' => $service->short_description ?: 'Professional ' . $service->title . ' services by Civicon Nexus Engineering in Cameroon. Quality workmanship and expert civil engineering solutions.',
                'keywords' => $service->title . ', civil engineering, Cameroon, construction, ' . $service->slug,
                'canonical' => '/services/' . $service->slug,
                'jsonLd' => [
                    '@context' => 'https://schema.org',
                    '@type' => 'Service',
                    'name' => $service->title,
                    'description' => $service->short_description,
                    'provider' => [
                        '@type' => 'ProfessionalService',
                        'name' => 'Civicon Nexus Engineering',
                        'url' => config('app.url'),
                    ],
                    'areaServed' => [
                        '@type' => 'Country',
                        'name' => 'Cameroon',
                    ],
                ],
            ],
            'service' => $service,
        ]);
    }
}
