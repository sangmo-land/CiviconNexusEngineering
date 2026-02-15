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
                'title' => 'House Plans',
                'description' => 'Browse our collection of professionally designed house plans available for download.',
            ],
            'housePlans' => $housePlans,
        ]);
    }

    public function show(string $slug): Response
    {
        $housePlan = HousePlan::where('slug', $slug)->firstOrFail();

        return Inertia::render('HousePlans/Show', [
            'meta' => [
                'title' => $housePlan->title,
                'description' => substr(strip_tags($housePlan->description), 0, 160),
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
