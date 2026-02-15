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
                'title' => 'House Plans in Cameroon | Download Professional Designs',
                'description' => 'Browse and download professionally designed house plans for Cameroon. Modern, affordable home designs with multiple bedrooms, bathrooms & floor options by Civicon Nexus Engineering.',
                'keywords' => 'house plans Cameroon, plan de maison Cameroun, home design Douala, residential plans Yaoundé, affordable house plans, building plans download Cameroon',
                'canonical' => '/plans',
            ],
            'housePlans' => $housePlans,
        ]);
    }

    public function show(string $slug): Response
    {
        $housePlan = HousePlan::where('slug', $slug)->firstOrFail();

        $description = substr(strip_tags($housePlan->description), 0, 160) ?: $housePlan->title . ' — ' . $housePlan->bedrooms . ' bedroom house plan in Cameroon.';

        return Inertia::render('HousePlans/Show', [
            'meta' => [
                'title' => $housePlan->title . ' | House Plan',
                'description' => $description,
                'keywords' => $housePlan->title . ', house plan, ' . $housePlan->bedrooms . ' bedrooms, Cameroon, plan de maison',
                'canonical' => '/plans/' . $housePlan->slug,
                'ogImage' => $housePlan->preview_image,
                'ogType' => 'product',
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
                    ],
                    'brand' => [
                        '@type' => 'Organization',
                        'name' => 'Civicon Nexus Engineering',
                    ],
                    'additionalProperty' => [
                        ['@type' => 'PropertyValue', 'name' => 'Bedrooms', 'value' => $housePlan->bedrooms],
                        ['@type' => 'PropertyValue', 'name' => 'Bathrooms', 'value' => $housePlan->bathrooms],
                        ['@type' => 'PropertyValue', 'name' => 'Floors', 'value' => $housePlan->floors],
                        ['@type' => 'PropertyValue', 'name' => 'Area (m²)', 'value' => $housePlan->area],
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
