<?php

namespace App\Http\Controllers;

use App\Models\HousePlan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class HousePlanController extends Controller
{
    public function index(): Response
    {
        $housePlans = HousePlan::latest()->paginate(12);

        return Inertia::render('HousePlans/Index', [
            'meta' => [
                'title' => 'House Plans in Cameroon | Plans de Maison Cameroun | Download Designs',
                'description' => 'Browse and download professionally designed house plans for Cameroon. Modern, affordable home designs with multiple bedrooms, bathrooms & floor options by Civicon Nexus Engineering. Parcourez et téléchargez des plans de maison professionnels au Cameroun. Conceptions résidentielles modernes et abordables.',
                'keywords' => 'house plans Cameroon, home design Cameroon, residential plans Douala, affordable house plans Cameroon, building plans download Cameroon, modern house plans Cameroon, 3 bedroom house plan Cameroon, 4 bedroom house plan, duplex plans Cameroon, villa plans Cameroon, bungalow plans, house design Yaoundé, house plans Bamenda, house plans Bafoussam, plan de maison Cameroun, plan maison moderne Cameroun, plan maison 3 chambres, plan maison 4 chambres, plan villa Cameroun, plan duplex Cameroun, plan bungalow Cameroun, conception maison Douala, plan maison Yaoundé, plan résidentiel Cameroun, télécharger plan maison, maison à construire Cameroun, architecte maison Cameroun, modèle de maison Cameroun',
                'canonical' => '/plans',
                'breadcrumbs' => [
                    ['name' => 'Home', 'url' => '/'],
                    ['name' => 'House Plans', 'url' => '/plans'],
                ],
                'faq' => [
                    [
                        'question' => 'Where can I find house plans in Cameroon?',
                        'answer' => 'Civicon Nexus Engineering offers a wide selection of professionally designed house plans for Cameroon. Browse our collection of modern, affordable residential designs with various bedroom, bathroom, and floor options, all designed for the Cameroonian climate and local building standards.',
                    ],
                    [
                        'question' => 'Où trouver des plans de maison au Cameroun ?',
                        'answer' => 'Civicon Nexus Engineering propose une large sélection de plans de maison professionnels pour le Cameroun. Parcourez notre collection de conceptions résidentielles modernes et abordables avec différentes options de chambres, salles de bain et étages, toutes conçues pour le climat camerounais et les normes de construction locales.',
                    ],
                    [
                        'question' => 'How much do house plans cost in Cameroon?',
                        'answer' => 'Our house plans are competitively priced in XAF (CFA Francs). Each plan includes detailed architectural drawings, floor plans, and specifications. Visit our house plans page to see specific pricing for each design.',
                    ],
                    [
                        'question' => 'Combien coûtent les plans de maison au Cameroun ?',
                        'answer' => 'Nos plans de maison sont proposés à des prix compétitifs en FCFA. Chaque plan comprend des dessins architecturaux détaillés, des plans d\'étage et des spécifications. Visitez notre page de plans de maison pour consulter les tarifs spécifiques de chaque conception.',
                    ],
                ],
            ],
            'housePlans' => $housePlans,
        ]);
    }

    public function show(string $slug): Response
    {
        $housePlan = HousePlan::where('slug', $slug)->firstOrFail();

        $description = substr(strip_tags($housePlan->description), 0, 160) ?: $housePlan->title . ' — ' . $housePlan->bedrooms . ' bedroom house plan in Cameroon. Plan de maison ' . $housePlan->bedrooms . ' chambres au Cameroun.';

        return Inertia::render('HousePlans/Show', [
            'meta' => [
                'title' => $housePlan->title . ' | House Plan Cameroon | Plan de Maison',
                'description' => $description,
                'keywords' => $housePlan->title . ', house plan, ' . $housePlan->bedrooms . ' bedrooms, Cameroon, ' . $housePlan->bedrooms . ' bedroom house plan Cameroon, affordable house plan, modern house design, plan de maison, ' . $housePlan->bedrooms . ' chambres, plan maison Cameroun, plan maison moderne, maison ' . $housePlan->bedrooms . ' chambres Cameroun',
                'canonical' => '/plans/' . $housePlan->slug,
                'ogImage' => $housePlan->preview_image,
                'ogType' => 'product',
                'breadcrumbs' => [
                    ['name' => 'Home', 'url' => '/'],
                    ['name' => 'House Plans', 'url' => '/plans'],
                    ['name' => $housePlan->title, 'url' => '/plans/' . $housePlan->slug],
                ],
                'jsonLd' => [
                    '@context' => 'https://schema.org',
                    '@type' => 'Product',
                    'name' => $housePlan->title,
                    'description' => $description,
                    'image' => $housePlan->preview_image ? asset('storage/' . $housePlan->preview_image) : null,
                    'offers' => [
                        '@type' => 'Offer',
                        'price' => $housePlan->price,
                        'priceCurrency' => 'XAF',
                        'availability' => 'https://schema.org/InStock',
                        'seller' => [
                            '@type' => 'Organization',
                            'name' => 'Civicon Nexus Engineering',
                        ],
                    ],
                    'brand' => [
                        '@type' => 'Organization',
                        'name' => 'Civicon Nexus Engineering',
                    ],
                    'category' => 'House Plans / Plans de Maison',
                    'additionalProperty' => [
                        ['@type' => 'PropertyValue', 'name' => 'Bedrooms / Chambres', 'value' => $housePlan->bedrooms],
                        ['@type' => 'PropertyValue', 'name' => 'Bathrooms / Salles de bain', 'value' => $housePlan->bathrooms],
                        ['@type' => 'PropertyValue', 'name' => 'Floors / Étages', 'value' => $housePlan->floors],
                        ['@type' => 'PropertyValue', 'name' => 'Area (m²) / Surface', 'value' => $housePlan->area],
                    ],
                ],
            ],
            'housePlan' => $housePlan,
        ]);
    }

    public function download(Request $request, string $slug): StreamedResponse
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $housePlan = HousePlan::where('slug', $slug)->firstOrFail();

        // You could store the email for marketing purposes here
        // Example: HousePlanDownload::create(['email' => $request->email, 'house_plan_id' => $housePlan->id]);

        return Storage::disk('public')->download($housePlan->pdf_file, "{$housePlan->slug}.pdf");
    }
}
