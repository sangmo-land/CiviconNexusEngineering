<?php

namespace App\Http\Controllers;

use App\Models\QuoteRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class QuoteRequestController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('QuoteRequest', [
            'meta' => [
                'title' => 'Get a Free Construction Quote Cameroon | Devis Gratuit Construction',
                'description' => 'Request a free quote for your construction or civil engineering project in Cameroon. Residential, commercial or infrastructure — Civicon Nexus Engineering delivers quality results on budget. Demandez un devis gratuit pour votre projet de construction ou de génie civil au Cameroun. Résidentiel, commercial ou infrastructure.',
                'keywords' => 'free construction quote Cameroon, engineering quote Douala, building estimate Yaoundé, project cost Cameroon, construction cost estimate, building quote Cameroon, free estimate construction, house building cost Cameroon, construction price Cameroon, building project quote, devis construction Cameroun, devis gratuit construction, estimation coût bâtiment Cameroun, prix construction maison Cameroun, devis génie civil Douala, estimation travaux Yaoundé, coût projet construction Cameroun, devis BTP Cameroun, tarif construction maison, budget construction Cameroun',
                'canonical' => '/quote-request',
                'breadcrumbs' => [
                    ['name' => 'Home', 'url' => '/'],
                    ['name' => 'Get a Quote', 'url' => '/quote-request'],
                ],
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:255',
            'city' => 'nullable|string|max:255',
            'project_type' => 'required|string|max:255',
            'budget' => 'nullable|string|max:255',
            'message' => 'nullable|string',
            'attachment' => 'nullable|file|max:10240', // 10MB max
        ]);

        if ($request->hasFile('attachment')) {
            $validated['attachment'] = $request->file('attachment')->store('quote-attachments', 'public');
        }

        QuoteRequest::create($validated);

        return redirect()->back()->with('success', 'Your quote request has been submitted successfully. We will contact you soon!');
    }
}
