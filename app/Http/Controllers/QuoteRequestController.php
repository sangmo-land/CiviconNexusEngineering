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
                'title' => 'Request a Quote',
                'description' => 'Get a free quote for your civil engineering or construction project. Fill out our form and we\'ll get back to you promptly.',
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
