<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Contact', [
            'meta' => [
                'title' => 'Contact Us | Civicon Nexus Engineering Cameroon',
                'description' => 'Contact Civicon Nexus Engineering in Cameroon. Get in touch for civil engineering consultations, construction inquiries & project discussions. Based in Douala, serving all of Cameroon.',
                'keywords' => 'contact civil engineer Cameroon, engineering consultation Douala, construction inquiry Yaoundé, contactez ingénieur civil Cameroun',
                'canonical' => '/contact',
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string',
        ]);

        ContactMessage::create($validated);

        return redirect()->back()->with('success', 'Your message has been sent successfully. We will respond shortly!');
    }
}
