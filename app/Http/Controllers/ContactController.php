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
                'title' => 'Contact Us | Civil Engineer Cameroon | Contactez-Nous',
                'description' => 'Contact Civicon Nexus Engineering in Cameroon. Get in touch for civil engineering consultations, construction inquiries, project discussions & free quotes. Based in Douala, serving all of Cameroon. Contactez Civicon Nexus Engineering au Cameroun pour des consultations en génie civil, demandes de construction et devis gratuits.',
                'keywords' => 'contact civil engineer Cameroon, engineering consultation Douala, construction inquiry Yaoundé, contact construction company Cameroon, civil engineer near me, construction consultation Cameroon, building contractor contact, contactez ingénieur civil Cameroun, consultation génie civil Douala, demande construction Yaoundé, contacter entreprise construction Cameroun, ingénieur civil près de moi, consultation construction Cameroun, contacter entrepreneur bâtiment, devis gratuit construction Cameroun',
                'canonical' => '/contact',
                'breadcrumbs' => [
                    ['name' => 'Home', 'url' => '/'],
                    ['name' => 'Contact', 'url' => '/contact'],
                ],
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
