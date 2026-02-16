<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        $featuredServices = Service::featured()->take(6)->get();
        $featuredProjects = Project::featured()->with('images')->take(6)->get();

        return Inertia::render('Home', [
            'meta' => [
                'title' => 'Civil Engineering & Construction Company in Cameroon | Génie Civil Cameroun',
                'description' => 'Civicon Nexus Engineering — Cameroon\'s premier civil engineering and construction firm. Expert structural design, construction management, house plans, building projects, road construction & infrastructure in Douala, Yaoundé & across Cameroon. Entreprise de génie civil et BTP au Cameroun. Conception structurelle, gestion de chantier, plans de maison, construction de bâtiments à Douala, Yaoundé.',
                'keywords' => 'civil engineering Cameroon, construction company Cameroon, structural design Douala, house plans Cameroon, building construction Cameroon, construction company Douala, civil engineer Yaoundé, building contractor Cameroon, construction firm Cameroon, engineering company Cameroon, génie civil Cameroun, entreprise de construction Cameroun, construction Douala, BTP Cameroun, entreprise BTP Douala, construction bâtiment Cameroun, ingénieur civil Cameroun, bureau d\'études Cameroun, plan de maison Cameroun, maître d\'oeuvre Cameroun, travaux publics Cameroun, entrepreneur bâtiment Douala, conception structurelle Yaoundé, gestion de chantier Cameroun, devis construction Cameroun, constructeur maison Douala, société de construction Yaoundé, projet de construction Cameroun, VRD Cameroun, terrassement Douala, fondation bâtiment Cameroun, béton armé Cameroun, construction route Cameroun, infrastructure Cameroun, topographie Cameroun, étude de sol Cameroun, assainissement Cameroun',
                'canonical' => '/',
                'ogType' => 'website',
                'breadcrumbs' => [
                    ['name' => 'Home', 'url' => '/'],
                ],
                'faq' => [
                    [
                        'question' => 'What civil engineering services do you offer in Cameroon?',
                        'answer' => 'Civicon Nexus Engineering offers comprehensive civil engineering services in Cameroon including structural design, construction management, house plan design, building construction, renovation, road construction, infrastructure development, site supervision, quantity surveying, and land surveying across Douala, Yaoundé, and all regions of Cameroon.',
                    ],
                    [
                        'question' => 'Quels services de génie civil proposez-vous au Cameroun ?',
                        'answer' => 'Civicon Nexus Engineering propose des services complets de génie civil au Cameroun : conception structurelle, gestion de chantier, plans de maison, construction de bâtiments, rénovation, construction routière, développement d\'infrastructures, supervision de chantier, métré et estimation, et topographie à Douala, Yaoundé et dans toutes les régions du Cameroun.',
                    ],
                    [
                        'question' => 'How much does it cost to build a house in Cameroon?',
                        'answer' => 'The cost of building a house in Cameroon varies depending on location, size, materials, and design complexity. Contact Civicon Nexus Engineering for a free, detailed quote tailored to your project in Douala, Yaoundé, or anywhere in Cameroon.',
                    ],
                    [
                        'question' => 'Combien coûte la construction d\'une maison au Cameroun ?',
                        'answer' => 'Le coût de construction d\'une maison au Cameroun varie selon l\'emplacement, la taille, les matériaux et la complexité du design. Contactez Civicon Nexus Engineering pour un devis gratuit et détaillé adapté à votre projet à Douala, Yaoundé ou partout au Cameroun.',
                    ],
                    [
                        'question' => 'Do you provide house plans in Cameroon?',
                        'answer' => 'Yes, Civicon Nexus Engineering provides professionally designed house plans for homes in Cameroon. We offer modern, affordable residential designs with various bedroom, bathroom, and floor options suitable for the Cameroonian climate and building standards.',
                    ],
                    [
                        'question' => 'Proposez-vous des plans de maison au Cameroun ?',
                        'answer' => 'Oui, Civicon Nexus Engineering propose des plans de maison professionnels au Cameroun. Nous offrons des conceptions résidentielles modernes et abordables avec différentes options de chambres, salles de bain et étages adaptées au climat et aux normes de construction camerounaises.',
                    ],
                    [
                        'question' => 'Where does Civicon Nexus Engineering operate in Cameroon?',
                        'answer' => 'Civicon Nexus Engineering operates across all regions of Cameroon, with primary operations in Douala, Yaoundé, Bamenda, Bafoussam, Garoua, Maroua, Kribi, Limbe, Buea, Bertoua, Ebolowa, Ngaoundéré, Kumba, Nkongsamba, and Edéa.',
                    ],
                    [
                        'question' => 'Où Civicon Nexus Engineering opère-t-il au Cameroun ?',
                        'answer' => 'Civicon Nexus Engineering opère dans toutes les régions du Cameroun, avec des opérations principales à Douala, Yaoundé, Bamenda, Bafoussam, Garoua, Maroua, Kribi, Limbé, Buea, Bertoua, Ebolowa, Ngaoundéré, Kumba, Nkongsamba et Edéa.',
                    ],
                ],
                'jsonLd' => [
                    [
                        '@context' => 'https://schema.org',
                        '@type' => 'WebSite',
                        'name' => 'Civicon Nexus Engineering',
                        'alternateName' => 'Civicon Nexus Ingénierie',
                        'url' => config('app.url'),
                        'inLanguage' => ['en', 'fr'],
                        'potentialAction' => [
                            '@type' => 'SearchAction',
                            'target' => config('app.url') . '/blog?q={search_term_string}',
                            'query-input' => 'required name=search_term_string',
                        ],
                    ],
                ],
            ],
            'featuredServices' => $featuredServices,
            'featuredProjects' => $featuredProjects,
        ]);
    }
}
