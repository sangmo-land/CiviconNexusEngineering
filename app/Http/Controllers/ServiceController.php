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
                'title' => 'Civil Engineering Services in Cameroon | Services de Génie Civil',
                'description' => 'Comprehensive civil engineering & construction services in Cameroon: structural design, construction management, renovations, project supervision, road construction, infrastructure, house plans & more. Expert BTP solutions from Civicon Nexus. Services complets de génie civil au Cameroun : conception structurelle, gestion de chantier, rénovations, supervision de projet, construction routière, infrastructure et plans de maison.',
                'keywords' => 'civil engineering services Cameroon, structural design Douala, construction management Yaoundé, renovation services Cameroon, building services Cameroon, construction services Douala, engineering solutions Cameroon, project supervision Cameroon, road construction Cameroon, infrastructure services Cameroon, foundation engineering Cameroon, concrete works Cameroon, steel structure design Cameroon, land surveying Cameroon, quantity surveying Cameroon, services génie civil Cameroun, conception structurelle Douala, gestion de chantier Yaoundé, rénovation Cameroun, services BTP Cameroun, construction bâtiment Cameroun, supervision de chantier Cameroun, construction routière Cameroun, infrastructure Cameroun, travaux de béton Cameroun, topographie Cameroun, métré Cameroun, bureau d\'études technique Cameroun, maître d\'oeuvre Douala, entreprise BTP Yaoundé, terrassement Cameroun, assainissement Cameroun, VRD Cameroun, étude de sol Cameroun',
                'canonical' => '/services',
                'breadcrumbs' => [
                    ['name' => 'Home', 'url' => '/'],
                    ['name' => 'Services', 'url' => '/services'],
                ],
            ],
            'services' => $services,
        ]);
    }

    public function show(string $slug): Response
    {
        $service = Service::where('slug', $slug)->firstOrFail();

        return Inertia::render('Services/Show', [
            'meta' => [
                'title' => $service->title . ' | Civil Engineering Service in Cameroon',
                'description' => $service->short_description ?: 'Professional ' . $service->title . ' services by Civicon Nexus Engineering in Cameroon. Quality workmanship and expert civil engineering solutions in Douala, Yaoundé and across Cameroon. Service professionnel de ' . $service->title . ' par Civicon Nexus Engineering au Cameroun.',
                'keywords' => $service->title . ', civil engineering, Cameroon, construction, ' . $service->slug . ', génie civil, Cameroun, construction Douala, service BTP, ' . $service->title . ' Douala, ' . $service->title . ' Yaoundé, ' . $service->title . ' Cameroun',
                'canonical' => '/services/' . $service->slug,
                'breadcrumbs' => [
                    ['name' => 'Home', 'url' => '/'],
                    ['name' => 'Services', 'url' => '/services'],
                    ['name' => $service->title, 'url' => '/services/' . $service->slug],
                ],
                'jsonLd' => [
                    '@context' => 'https://schema.org',
                    '@type' => 'Service',
                    'name' => $service->title,
                    'description' => $service->short_description,
                    'provider' => [
                        '@type' => 'ProfessionalService',
                        'name' => 'Civicon Nexus Engineering',
                        'url' => config('app.url'),
                        'address' => [
                            '@type' => 'PostalAddress',
                            'addressLocality' => 'Douala',
                            'addressRegion' => 'Littoral',
                            'addressCountry' => 'CM',
                        ],
                    ],
                    'areaServed' => [
                        ['@type' => 'Country', 'name' => 'Cameroon'],
                        ['@type' => 'City', 'name' => 'Douala'],
                        ['@type' => 'City', 'name' => 'Yaoundé'],
                        ['@type' => 'City', 'name' => 'Bamenda'],
                        ['@type' => 'City', 'name' => 'Bafoussam'],
                    ],
                    'serviceType' => $service->title,
                    'availableChannel' => [
                        '@type' => 'ServiceChannel',
                        'serviceUrl' => config('app.url') . '/quote-request',
                        'serviceSmsNumber' => '+237-XXX-XXX-XXX',
                    ],
                ],
            ],
            'service' => $service,
        ]);
    }
}
