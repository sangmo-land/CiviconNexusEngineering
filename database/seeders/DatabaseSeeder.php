<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Service;
use App\Models\Project;
use App\Models\ProjectImage;
use App\Models\Post;
use App\Models\HousePlan;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Admin User
        User::create([
            'name' => 'Admin',
            'email' => 'admin@civiconnexusengineering.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // Create Sample Services
        $services = [
            [
                'title' => 'Structural Engineering',
                'short_description' => 'Expert structural analysis and design for all types of buildings and infrastructure.',
                'description' => '<p>Our structural engineering services include comprehensive analysis, design, and consultation for residential, commercial, and industrial projects.</p><p>We utilize the latest software and methodologies to ensure safe, efficient, and cost-effective structural solutions.</p>',
                'icon' => '🏗️',
                'is_featured' => true,
            ],
            [
                'title' => 'Construction Management',
                'short_description' => 'End-to-end project management ensuring on-time and on-budget delivery.',
                'description' => '<p>Our construction management services provide comprehensive oversight of your project from inception to completion.</p><p>We coordinate all aspects of construction including scheduling, budgeting, quality control, and safety management.</p>',
                'icon' => '📋',
                'is_featured' => true,
            ],
            [
                'title' => 'Site Planning',
                'short_description' => 'Comprehensive site analysis and planning for optimal land utilization.',
                'description' => '<p>We provide detailed site planning services including topographic surveys, land use analysis, and development planning.</p><p>Our team ensures your project meets all regulatory requirements while maximizing the potential of your site.</p>',
                'icon' => '📐',
                'is_featured' => true,
            ],
            [
                'title' => 'Foundation Design',
                'short_description' => 'Specialized foundation solutions for various soil conditions and structures.',
                'description' => '<p>Our foundation design services ensure your building rests on a solid base suited to your site conditions.</p><p>We handle everything from soil analysis to foundation specification and supervision.</p>',
                'icon' => '🏠',
                'is_featured' => false,
            ],
            [
                'title' => 'Road & Bridge Engineering',
                'short_description' => 'Design and supervision of transportation infrastructure projects.',
                'description' => '<p>We specialize in the design and construction supervision of roads, bridges, and other transportation infrastructure.</p><p>Our expertise ensures durable, safe, and efficient transportation solutions.</p>',
                'icon' => '🌉',
                'is_featured' => false,
            ],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }

        // Create Sample Projects
        $projects = [
            [
                'title' => 'Modern Office Complex',
                'location' => 'Downtown Business District',
                'project_type' => 'Commercial',
                'description' => '<p>A state-of-the-art 15-story office building featuring modern architecture and sustainable design principles.</p><p>The project included advanced structural systems, energy-efficient HVAC, and premium finishes throughout.</p>',
                'client' => 'ABC Corporation',
                'completion_year' => 2024,
                'role' => 'Structural Engineering & Construction Management',
                'is_featured' => true,
            ],
            [
                'title' => 'Riverside Residential Estate',
                'location' => 'Riverside Heights',
                'project_type' => 'Residential',
                'description' => '<p>A luxury residential development comprising 50 modern homes with premium amenities.</p><p>Each unit was designed with attention to comfort, aesthetics, and sustainability.</p>',
                'client' => 'Riverside Developers Ltd',
                'completion_year' => 2023,
                'role' => 'Full Engineering & Construction',
                'is_featured' => true,
            ],
            [
                'title' => 'Industrial Warehouse Complex',
                'location' => 'Industrial Park Zone A',
                'project_type' => 'Industrial',
                'description' => '<p>A 50,000 sq ft warehouse complex designed for modern logistics operations.</p><p>Features include high ceilings, reinforced flooring, and efficient loading dock configurations.</p>',
                'client' => 'Global Logistics Inc',
                'completion_year' => 2024,
                'role' => 'Design-Build Contractor',
                'is_featured' => true,
            ],
        ];

        foreach ($projects as $projectData) {
            Project::create($projectData);
        }

// Create Sample Blog Posts
        $this->call(PostSeeder::class);

        // Create Sample House Plan
        HousePlan::create([
            'title' => 'Modern 3-Bedroom Family Home',
            'price' => 499.99,
            'bedrooms' => 3,
            'bathrooms' => 2,
            'floors' => 2,
            'area' => 1800,
            'description' => '<p>A modern family home design featuring open-plan living areas, a spacious kitchen, and comfortable bedrooms on the upper floor.</p><p>This design is perfect for growing families who value both style and functionality.</p>',
            'pdf_file' => 'house-plans/pdfs/sample-plan.pdf',
            'is_featured' => true,
        ]);
    }
}
