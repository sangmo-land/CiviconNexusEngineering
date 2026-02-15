<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\SiteWorkLog;
use App\Models\SiteWorkWorker;
use App\Models\SiteWorkMaterial;
use App\Models\SiteWorkImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SiteWorkController extends Controller
{
    public function index()
    {
        $projects = Project::withCount('siteWorkLogs')
            ->orderBy('created_at', 'desc')
            ->get();

        $recentLogs = SiteWorkLog::with(['project', 'workers', 'materials', 'images', 'creator'])
            ->orderBy('work_date', 'desc')
            ->take(10)
            ->get();

        return Inertia::render('SiteWork/Index', [
            'meta' => [
                'title' => 'Site Work',
                'description' => 'Track and manage on-site work activities',
            ],
            'projects' => $projects,
            'recentLogs' => $recentLogs,
        ]);
    }

    public function projectLogs(Project $project)
    {
        $logs = SiteWorkLog::with(['workers', 'materials', 'images', 'creator'])
            ->where('project_id', $project->id)
            ->orderBy('work_date', 'desc')
            ->paginate(20);

        return Inertia::render('SiteWork/ProjectLogs', [
            'meta' => [
                'title' => "Site Work - {$project->title}",
                'description' => "Site work logs for {$project->title}",
            ],
            'project' => $project,
            'logs' => $logs,
        ]);
    }

    public function create(Project $project)
    {
        return Inertia::render('SiteWork/Create', [
            'meta' => [
                'title' => 'New Work Log',
                'description' => 'Record a new site work entry',
            ],
            'project' => $project,
        ]);
    }

    public function store(Request $request, Project $project)
    {
        $validated = $request->validate([
            'work_date' => 'required|date',
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i|after:start_time',
            'work_description' => 'required|string',
            'difficulties' => 'nullable|string',
            'weather_conditions' => 'nullable|string',
            'safety_notes' => 'nullable|string',
            'additional_notes' => 'nullable|string',
            'workers' => 'nullable|array',
            'workers.*.worker_name' => 'required_with:workers|string',
            'workers.*.role' => 'nullable|string',
            'workers.*.hours_worked' => 'nullable|numeric|min:0',
            'workers.*.tasks_performed' => 'nullable|string',
            'materials' => 'nullable|array',
            'materials.*.material_name' => 'required_with:materials|string',
            'materials.*.quantity' => 'required_with:materials|numeric|min:0',
            'materials.*.unit' => 'required_with:materials|string',
            'materials.*.unit_cost' => 'nullable|numeric|min:0',
            'materials.*.supplier' => 'nullable|string',
            'materials.*.notes' => 'nullable|string',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'captions' => 'nullable|array',
            'captions.*' => 'nullable|string|max:255',
        ]);

        $log = SiteWorkLog::create([
            'project_id' => $project->id,
            'work_date' => $validated['work_date'],
            'start_time' => $validated['start_time'] ?? null,
            'end_time' => $validated['end_time'] ?? null,
            'work_description' => $validated['work_description'],
            'difficulties' => $validated['difficulties'] ?? null,
            'weather_conditions' => $validated['weather_conditions'] ?? null,
            'safety_notes' => $validated['safety_notes'] ?? null,
            'additional_notes' => $validated['additional_notes'] ?? null,
            'created_by' => Auth::id(),
        ]);

        // Add workers
        if (!empty($validated['workers'])) {
            foreach ($validated['workers'] as $worker) {
                if (!empty($worker['worker_name'])) {
                    $log->workers()->create($worker);
                }
            }
        }

        // Add materials
        if (!empty($validated['materials'])) {
            foreach ($validated['materials'] as $material) {
                if (!empty($material['material_name'])) {
                    $log->materials()->create($material);
                }
            }
        }

        // Handle image uploads
        if ($request->hasFile('images')) {
            $captions = $request->input('captions', []);
            foreach ($request->file('images') as $index => $image) {
                $path = $image->store('site-work-images', 'public');
                $log->images()->create([
                    'image_path' => $path,
                    'caption' => $captions[$index] ?? null,
                ]);
            }
        }

        return redirect()->route('site-work.project', $project)
            ->with('success', 'Work log created successfully.');
    }

    public function show(SiteWorkLog $log)
    {
        $log->load(['project', 'workers', 'materials', 'images', 'creator']);

        return Inertia::render('SiteWork/Show', [
            'meta' => [
                'title' => "Work Log - {$log->work_date->format('M d, Y')}",
                'description' => "Site work details for {$log->project->title}",
            ],
            'log' => $log,
        ]);
    }

    public function edit(SiteWorkLog $log)
    {
        $log->load(['project', 'workers', 'materials', 'images']);

        return Inertia::render('SiteWork/Edit', [
            'meta' => [
                'title' => 'Edit Work Log',
                'description' => 'Update site work entry',
            ],
            'log' => $log,
            'project' => $log->project,
        ]);
    }

    public function update(Request $request, SiteWorkLog $log)
    {
        $validated = $request->validate([
            'work_date' => 'required|date',
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i|after:start_time',
            'work_description' => 'required|string',
            'difficulties' => 'nullable|string',
            'weather_conditions' => 'nullable|string',
            'safety_notes' => 'nullable|string',
            'additional_notes' => 'nullable|string',
            'workers' => 'nullable|array',
            'workers.*.id' => 'nullable|exists:site_work_workers,id',
            'workers.*.worker_name' => 'required_with:workers|string',
            'workers.*.role' => 'nullable|string',
            'workers.*.hours_worked' => 'nullable|numeric|min:0',
            'workers.*.tasks_performed' => 'nullable|string',
            'materials' => 'nullable|array',
            'materials.*.id' => 'nullable|exists:site_work_materials,id',
            'materials.*.material_name' => 'required_with:materials|string',
            'materials.*.quantity' => 'required_with:materials|numeric|min:0',
            'materials.*.unit' => 'required_with:materials|string',
            'materials.*.unit_cost' => 'nullable|numeric|min:0',
            'materials.*.supplier' => 'nullable|string',
            'materials.*.notes' => 'nullable|string',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'captions' => 'nullable|array',
            'captions.*' => 'nullable|string|max:255',
            'delete_images' => 'nullable|array',
            'delete_images.*' => 'integer|exists:site_work_images,id',
        ]);

        $log->update([
            'work_date' => $validated['work_date'],
            'start_time' => $validated['start_time'] ?? null,
            'end_time' => $validated['end_time'] ?? null,
            'work_description' => $validated['work_description'],
            'difficulties' => $validated['difficulties'] ?? null,
            'weather_conditions' => $validated['weather_conditions'] ?? null,
            'safety_notes' => $validated['safety_notes'] ?? null,
            'additional_notes' => $validated['additional_notes'] ?? null,
        ]);

        // Sync workers
        $log->workers()->delete();
        if (!empty($validated['workers'])) {
            foreach ($validated['workers'] as $worker) {
                if (!empty($worker['worker_name'])) {
                    unset($worker['id']);
                    $log->workers()->create($worker);
                }
            }
        }

        // Sync materials
        $log->materials()->delete();
        if (!empty($validated['materials'])) {
            foreach ($validated['materials'] as $material) {
                if (!empty($material['material_name'])) {
                    unset($material['id']);
                    $log->materials()->create($material);
                }
            }
        }

        // Delete selected images
        if (!empty($validated['delete_images'])) {
            $imagesToDelete = $log->images()->whereIn('id', $validated['delete_images'])->get();
            foreach ($imagesToDelete as $image) {
                Storage::disk('public')->delete($image->image_path);
                $image->delete();
            }
        }

        // Handle new image uploads
        if ($request->hasFile('images')) {
            $captions = $request->input('captions', []);
            foreach ($request->file('images') as $index => $image) {
                $path = $image->store('site-work-images', 'public');
                $log->images()->create([
                    'image_path' => $path,
                    'caption' => $captions[$index] ?? null,
                ]);
            }
        }

        return redirect()->route('site-work.show', $log)
            ->with('success', 'Work log updated successfully.');
    }

    public function destroy(SiteWorkLog $log)
    {
        $project = $log->project;
        
        // Delete associated images from storage
        foreach ($log->images as $image) {
            Storage::disk('public')->delete($image->image_path);
        }
        
        $log->delete();

        return redirect()->route('site-work.project', $project)
            ->with('success', 'Work log deleted successfully.');
    }
}
