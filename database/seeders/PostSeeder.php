<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        $posts = [
            [
                'title' => 'Understanding Foundation Types for Your Construction Project',
                'excerpt' => 'Learn about different foundation types and how to choose the right one for your building project.',
                'content' => '<p>Choosing the right foundation is crucial for the long-term stability and durability of any structure. In this article, we explore the various foundation types available and help you understand which might be best suited for your project.</p>
                <h2>Types of Foundations</h2>
                <p>There are several main types of foundations used in construction:</p>
                <ul>
                    <li><strong>Strip Foundations</strong> – The most common type, ideal for load-bearing walls in low-rise residential buildings. They distribute weight along a continuous strip of concrete.</li>
                    <li><strong>Raft Foundations</strong> – Used when soil conditions are weak or variable. A raft foundation spreads the load across the entire building footprint.</li>
                    <li><strong>Pile Foundations</strong> – Essential for buildings on very soft soil or with heavy structural loads. Piles transfer weight deep into stable ground layers.</li>
                    <li><strong>Pad Foundations</strong> – Support individual columns or points of concentrated load, commonly used in framed structures.</li>
                </ul>
                <h2>How to Choose the Right Foundation</h2>
                <p>Several factors influence foundation selection:</p>
                <ul>
                    <li>Soil type and bearing capacity</li>
                    <li>Water table level</li>
                    <li>Building load and height</li>
                    <li>Environmental conditions</li>
                    <li>Budget constraints</li>
                </ul>
                <p>A thorough geotechnical investigation is always the first step. Our team at Civicon Nexus Engineering can conduct soil tests and recommend the optimal foundation solution for your project.</p>
                <p>Contact us today for a free consultation on your upcoming build.</p>',
                'is_published' => true,
                'published_at' => Carbon::now()->subDays(45),
            ],
            [
                'title' => '5 Common Mistakes to Avoid When Building Your Dream Home',
                'excerpt' => 'Building a home is a major investment. Here are the top mistakes homeowners make and how to avoid them.',
                'content' => '<p>Building your dream home is one of the most exciting—and expensive—decisions you\'ll ever make. Unfortunately, many homeowners learn costly lessons the hard way. Here are five common mistakes and how to sidestep them.</p>
                <h2>1. Skipping Professional Architectural Plans</h2>
                <p>Many people try to save money by using generic plans or skipping an architect entirely. This often leads to structural issues, wasted space, and regulatory headaches. Invest in professional plans tailored to your plot and needs.</p>
                <h2>2. Ignoring Soil Testing</h2>
                <p>The ground beneath your home matters more than you think. Without proper geotechnical analysis, you risk foundation failure, cracking walls, and drainage problems. Always test before you dig.</p>
                <h2>3. Underestimating the Budget</h2>
                <p>Construction costs almost always exceed initial estimates. A good rule of thumb is to add 15-20% contingency to your budget. Factor in finishes, landscaping, and connection fees that are often overlooked.</p>
                <h2>4. Choosing the Cheapest Contractor</h2>
                <p>Price matters, but the cheapest quote usually means cut corners. Vet contractors carefully—check references, visit past projects, and ensure they\'re properly licensed and insured.</p>
                <h2>5. Poor Project Management</h2>
                <p>Without proper oversight, timelines slip and quality suffers. Consider hiring a professional construction manager or working with a firm like Civicon Nexus that handles end-to-end project delivery.</p>
                <p>Building smart from the start saves time, money, and stress. Reach out to us for expert guidance on your home construction journey.</p>',
                'is_published' => true,
                'published_at' => Carbon::now()->subDays(38),
            ],
            [
                'title' => 'The Rise of Green Building in Africa: Trends and Opportunities',
                'excerpt' => 'Sustainable construction is gaining momentum across Africa. Discover the key trends shaping the future of green building.',
                'content' => '<p>Green building is no longer a niche concept—it\'s becoming a necessity. As Africa experiences rapid urbanization, the construction industry is embracing sustainable practices to reduce environmental impact while creating healthier living spaces.</p>
                <h2>What is Green Building?</h2>
                <p>Green building involves designing, constructing, and operating buildings to minimize resource consumption, reduce waste, and create healthier indoor environments. It encompasses energy efficiency, water conservation, sustainable materials, and reduced carbon emissions.</p>
                <h2>Key Trends in African Green Building</h2>
                <ul>
                    <li><strong>Solar Integration</strong> – With abundant sunshine, African buildings increasingly incorporate solar panels and passive solar design to reduce energy costs.</li>
                    <li><strong>Rainwater Harvesting</strong> – Water scarcity drives the adoption of rainwater collection systems in both residential and commercial buildings.</li>
                    <li><strong>Local & Recycled Materials</strong> – Using locally sourced materials like compressed earth blocks, bamboo, and recycled aggregates reduces both costs and carbon footprint.</li>
                    <li><strong>Natural Ventilation Design</strong> – Climate-responsive architecture that reduces or eliminates the need for air conditioning.</li>
                    <li><strong>Green Certifications</strong> – Standards like Green Star Africa and EDGE are gaining traction, providing frameworks for measuring building sustainability.</li>
                </ul>
                <h2>The Business Case</h2>
                <p>Green buildings typically reduce energy costs by 20-30% and water usage by 30-50%. They also command higher rental premiums and have lower vacancy rates. For developers and homeowners alike, sustainability is increasingly good business.</p>
                <p>At Civicon Nexus Engineering, we incorporate sustainable design principles into every project. Contact us to learn how green building can benefit your next development.</p>',
                'is_published' => true,
                'published_at' => Carbon::now()->subDays(30),
            ],
            [
                'title' => 'A Complete Guide to Building Permits and Approvals',
                'excerpt' => 'Navigating the building permit process can be confusing. This guide breaks down everything you need to know.',
                'content' => '<p>Before any construction project begins, obtaining the proper permits and approvals is essential. Failing to do so can result in fines, demolition orders, or legal complications. Here\'s what you need to know.</p>
                <h2>Why Building Permits Matter</h2>
                <p>Building permits exist to ensure that construction projects meet safety standards, zoning regulations, and environmental requirements. They protect both the builder and the community.</p>
                <h2>Common Documents Required</h2>
                <ul>
                    <li>Architectural drawings (floor plans, elevations, sections)</li>
                    <li>Structural engineering drawings and calculations</li>
                    <li>Site plan showing property boundaries and setbacks</li>
                    <li>Environmental impact assessment (for larger projects)</li>
                    <li>Proof of land ownership or consent from the owner</li>
                    <li>Soil investigation report</li>
                </ul>
                <h2>The Approval Process</h2>
                <p>The typical process involves:</p>
                <ol>
                    <li><strong>Pre-application consultation</strong> – Discuss your plans with the local authority.</li>
                    <li><strong>Submission</strong> – Submit all required documents and pay applicable fees.</li>
                    <li><strong>Review</strong> – Officials review plans for compliance with building codes and zoning laws.</li>
                    <li><strong>Approval or Revision</strong> – Plans are either approved, approved with conditions, or sent back for revision.</li>
                    <li><strong>Construction</strong> – Build according to approved plans with scheduled inspections.</li>
                    <li><strong>Occupancy Certificate</strong> – Final inspection and certification that the building is safe for use.</li>
                </ol>
                <h2>Tips for a Smooth Process</h2>
                <p>Work with qualified professionals from the start. An experienced engineering firm can prepare compliant drawings and manage the submission process on your behalf, saving you time and avoiding costly rejections.</p>
                <p>Need help with your building permits? Civicon Nexus Engineering handles the entire approval process for our clients.</p>',
                'is_published' => true,
                'published_at' => Carbon::now()->subDays(22),
            ],
            [
                'title' => 'Concrete vs. Steel: Choosing the Right Structural System',
                'excerpt' => 'Each material has its strengths. Here\'s how to decide between concrete and steel for your next project.',
                'content' => '<p>One of the most fundamental decisions in structural engineering is whether to use concrete, steel, or a combination of both. Each material offers distinct advantages depending on the project requirements.</p>
                <h2>Reinforced Concrete</h2>
                <p><strong>Advantages:</strong></p>
                <ul>
                    <li>Excellent fire resistance</li>
                    <li>Lower material cost in many regions</li>
                    <li>Good compressive strength</li>
                    <li>Minimal maintenance required</li>
                    <li>Versatile—can be molded into any shape</li>
                    <li>Locally available materials (cement, sand, aggregate)</li>
                </ul>
                <p><strong>Limitations:</strong></p>
                <ul>
                    <li>Heavy self-weight</li>
                    <li>Longer construction time due to curing</li>
                    <li>Difficult to modify after construction</li>
                </ul>
                <h2>Structural Steel</h2>
                <p><strong>Advantages:</strong></p>
                <ul>
                    <li>High strength-to-weight ratio</li>
                    <li>Faster construction with prefabricated elements</li>
                    <li>Ideal for long spans and tall buildings</li>
                    <li>Easier to modify or extend</li>
                    <li>Recyclable</li>
                </ul>
                <p><strong>Limitations:</strong></p>
                <ul>
                    <li>Requires fireproofing</li>
                    <li>Susceptible to corrosion without protection</li>
                    <li>Higher material cost</li>
                    <li>Requires specialized fabrication and welding</li>
                </ul>
                <h2>Making the Decision</h2>
                <p>The choice depends on factors like building type, span requirements, local material availability, budget, and construction timeline. Many modern buildings use hybrid systems—concrete cores with steel framing—to leverage the best of both materials.</p>
                <p>Our structural engineers at Civicon Nexus can analyze your project requirements and recommend the most efficient structural system. Get in touch for expert advice.</p>',
                'is_published' => true,
                'published_at' => Carbon::now()->subDays(15),
            ],
            [
                'title' => 'How to Read and Understand Architectural Drawings',
                'excerpt' => 'Architectural drawings can seem complex. This beginner-friendly guide helps you decode plans like a pro.',
                'content' => '<p>Whether you\'re a homeowner reviewing plans for your new house or a developer overseeing a commercial project, understanding architectural drawings is an invaluable skill. Let\'s break down the essentials.</p>
                <h2>Types of Drawings</h2>
                <ul>
                    <li><strong>Floor Plans</strong> – A bird\'s-eye view of each level showing room layouts, dimensions, doors, windows, and walls.</li>
                    <li><strong>Elevations</strong> – Views of the building\'s exterior from each side (front, rear, left, right), showing height, materials, and fenestration.</li>
                    <li><strong>Sections</strong> – Cut-through views revealing internal structure, floor-to-ceiling heights, and construction details.</li>
                    <li><strong>Site Plans</strong> – Show the building\'s position on the plot, including boundaries, access roads, parking, and landscaping.</li>
                    <li><strong>Detail Drawings</strong> – Close-up views of specific construction elements like window frames, roof connections, or staircase details.</li>
                </ul>
                <h2>Key Symbols to Know</h2>
                <p>Architectural drawings use standardized symbols:</p>
                <ul>
                    <li>Doors are shown as arcs indicating swing direction</li>
                    <li>Windows appear as thin parallel lines in walls</li>
                    <li>Dimension lines with arrows indicate measurements</li>
                    <li>North arrows show building orientation</li>
                    <li>Scale bars help you calculate real-world sizes</li>
                </ul>
                <h2>Understanding Scale</h2>
                <p>Most architectural drawings use standard scales like 1:100 (1cm on paper = 1m in reality) or 1:50 for detailed plans. Always check the scale before measuring anything on a drawing.</p>
                <p>Still confused by your building plans? Our team is happy to walk you through your project drawings and answer any questions.</p>',
                'is_published' => true,
                'published_at' => Carbon::now()->subDays(10),
            ],
            [
                'title' => 'The Importance of Waterproofing in Construction',
                'excerpt' => 'Water damage is one of the leading causes of structural deterioration. Learn why waterproofing is non-negotiable.',
                'content' => '<p>Water is one of the most destructive forces a building can face. From foundation seepage to roof leaks, moisture infiltration causes billions in damage annually worldwide. Proper waterproofing isn\'t a luxury—it\'s a necessity.</p>
                <h2>Common Areas Requiring Waterproofing</h2>
                <ul>
                    <li><strong>Foundations & Basements</strong> – Groundwater and soil moisture can penetrate concrete, leading to dampness, mold, and structural degradation.</li>
                    <li><strong>Flat Roofs & Terraces</strong> – Standing water on flat surfaces demands robust membrane waterproofing systems.</li>
                    <li><strong>Bathrooms & Wet Areas</strong> – Internal wet areas need waterproof membranes beneath tiles to prevent moisture migration.</li>
                    <li><strong>Retaining Walls</strong> – Earth-retaining structures face constant hydrostatic pressure and require both waterproofing and drainage.</li>
                    <li><strong>Expansion Joints</strong> – Building movement joints are vulnerable points that need flexible sealant systems.</li>
                </ul>
                <h2>Waterproofing Methods</h2>
                <p>Common techniques include:</p>
                <ul>
                    <li>Bituminous membrane systems (torch-on or self-adhesive)</li>
                    <li>Liquid-applied coatings</li>
                    <li>Cementitious waterproofing</li>
                    <li>Crystalline waterproofing admixtures</li>
                    <li>PVC and TPO sheet membranes for roofs</li>
                </ul>
                <h2>Prevention is Cheaper Than Repair</h2>
                <p>Retrofitting waterproofing is exponentially more expensive than doing it right during construction. Budget for proper waterproofing from the start—it will save you significant costs and headaches down the road.</p>
                <p>Civicon Nexus Engineering specifies and supervises waterproofing installation on all our projects. Contact us for waterproofing advise on your build.</p>',
                'is_published' => true,
                'published_at' => Carbon::now()->subDays(5),
            ],
            [
                'title' => 'Renovating vs. Rebuilding: Which Makes More Financial Sense?',
                'excerpt' => 'Deciding whether to renovate an existing structure or start fresh? Here\'s a practical cost-benefit analysis.',
                'content' => '<p>When faced with an aging or inadequate building, property owners often wrestle with a tough question: should we renovate or demolish and rebuild? The answer depends on several factors.</p>
                <h2>When Renovation Makes Sense</h2>
                <ul>
                    <li><strong>Sound Structure</strong> – If the foundation and structural frame are in good condition, renovation can be cost-effective.</li>
                    <li><strong>Heritage Value</strong> – Buildings with historical or architectural significance are often worth preserving.</li>
                    <li><strong>Budget Constraints</strong> – Renovations can often be phased, spreading costs over time.</li>
                    <li><strong>Zoning Restrictions</strong> – Some areas restrict new construction but allow renovations.</li>
                    <li><strong>Faster Turnaround</strong> – Renovations typically take less time than a full rebuild.</li>
                </ul>
                <h2>When Rebuilding is the Better Option</h2>
                <ul>
                    <li><strong>Severe Structural Damage</strong> – If the foundation is compromised or the structure is unsafe, renovating may cost more than starting over.</li>
                    <li><strong>Changing Needs</strong> – If the existing layout fundamentally doesn\'t work for your needs, rebuilding offers a clean slate.</li>
                    <li><strong>Energy Efficiency</strong> – New buildings can be designed for modern energy standards, which is difficult to achieve with older structures.</li>
                    <li><strong>Long-Term Value</strong> – A new building typically has a longer useful life and higher market value.</li>
                </ul>
                <h2>The Financial Comparison</h2>
                <p>As a rough guide, if renovation costs exceed 50-60% of new construction costs, rebuilding often makes more financial sense. However, every project is unique—a thorough structural assessment is essential before making this decision.</p>
                <p>Our engineers can evaluate your existing structure and provide honest recommendations. Book a site assessment with Civicon Nexus Engineering today.</p>',
                'is_published' => true,
                'published_at' => Carbon::now()->subDays(2),
            ],
            [
                'title' => 'Understanding Load-Bearing Walls: What Every Homeowner Should Know',
                'excerpt' => 'Before knocking down that wall, make sure it isn\'t holding up your roof. Here\'s how to identify load-bearing walls.',
                'content' => '<p>Open-plan living is hugely popular, and many homeowners dream of removing walls to create spacious, flowing interiors. But removing the wrong wall can have catastrophic consequences. Here\'s what you need to know about load-bearing walls.</p>
                <h2>What is a Load-Bearing Wall?</h2>
                <p>A load-bearing wall carries weight from above—roof trusses, upper floors, or other structural elements—down to the foundation. Removing one without proper support can cause sagging ceilings, cracked walls, or even collapse.</p>
                <h2>How to Identify Load-Bearing Walls</h2>
                <ul>
                    <li><strong>Check the plans</strong> – Architectural and structural drawings clearly indicate which walls are load-bearing.</li>
                    <li><strong>Wall direction</strong> – Walls running perpendicular to floor joists or roof trusses are often load-bearing.</li>
                    <li><strong>Wall thickness</strong> – Load-bearing walls are typically thicker than partition walls (230mm vs 115mm in brick construction).</li>
                    <li><strong>Location</strong> – External walls and walls directly above or below each other on multi-story buildings are usually load-bearing.</li>
                    <li><strong>Foundation</strong> – Load-bearing walls sit on their own foundation strip, while partition walls may sit on the floor slab.</li>
                </ul>
                <h2>Can You Remove a Load-Bearing Wall?</h2>
                <p>Yes—but only with proper engineering. A structural engineer can design a beam (typically steel or reinforced concrete) to replace the wall and carry the loads safely. This requires:</p>
                <ol>
                    <li>Structural assessment and beam design</li>
                    <li>Temporary propping during construction</li>
                    <li>Building permit approval</li>
                    <li>Professional installation</li>
                </ol>
                <p><strong>Never remove a wall without consulting a structural engineer first.</strong> The cost of a professional assessment is minimal compared to the risk of structural failure.</p>
                <p>Planning a renovation that involves wall removal? Contact Civicon Nexus Engineering for a structural assessment.</p>',
                'is_published' => true,
                'published_at' => Carbon::now()->subDays(1),
            ],
            [
                'title' => 'Top 8 Construction Trends to Watch in 2026',
                'excerpt' => 'The construction industry is evolving rapidly. Here are the trends shaping how we build in 2026 and beyond.',
                'content' => '<p>The construction industry is undergoing a technological revolution. From AI-powered design to modular building, here are the top trends defining construction in 2026.</p>
                <h2>1. AI-Powered Design & Planning</h2>
                <p>Artificial intelligence is transforming how buildings are designed. Generative design algorithms can explore thousands of design options, optimizing for cost, structural performance, and sustainability simultaneously.</p>
                <h2>2. Modular & Prefab Construction</h2>
                <p>Factory-built modules assembled on-site reduce construction time by up to 50% and waste by up to 90%. Modular construction is moving beyond basic structures to include luxury apartments and commercial buildings.</p>
                <h2>3. 3D-Printed Structures</h2>
                <p>Large-scale 3D printing is becoming commercially viable for walls, foundations, and even entire small buildings. The technology promises faster construction and reduced labor requirements.</p>
                <h2>4. Digital Twins</h2>
                <p>Creating virtual replicas of buildings allows real-time monitoring, predictive maintenance, and performance optimization throughout a building\'s lifecycle.</p>
                <h2>5. Mass Timber Construction</h2>
                <p>Cross-laminated timber (CLT) and glulam beams are enabling the construction of tall wooden buildings. Timber sequesters carbon and offers excellent structural performance.</p>
                <h2>6. Drone Technology</h2>
                <p>Drones are now standard tools for site surveys, progress monitoring, safety inspections, and volumetric measurements, improving accuracy and reducing risk.</p>
                <h2>7. Net-Zero Energy Buildings</h2>
                <p>Buildings that produce as much energy as they consume are becoming the standard for new development, driven by both regulation and economic benefits.</p>
                <h2>8. Building Information Modeling (BIM)</h2>
                <p>BIM has matured from a design tool into a full project lifecycle platform, integrating design, construction, and facility management into a single digital workflow.</p>
                <p>At Civicon Nexus Engineering, we stay at the forefront of industry innovation. Talk to us about incorporating these technologies into your next project.</p>',
                'is_published' => true,
                'published_at' => Carbon::now(),
            ],
        ];

        foreach ($posts as $post) {
            Post::create($post);
        }
    }
}
