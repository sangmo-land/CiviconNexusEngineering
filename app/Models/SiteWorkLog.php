<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SiteWorkLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'work_date',
        'start_time',
        'end_time',
        'work_description',
        'difficulties',
        'weather_conditions',
        'safety_notes',
        'additional_notes',
        'created_by',
    ];

    protected $casts = [
        'work_date' => 'date',
        'start_time' => 'datetime:H:i',
        'end_time' => 'datetime:H:i',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function workers(): HasMany
    {
        return $this->hasMany(SiteWorkWorker::class);
    }

    public function materials(): HasMany
    {
        return $this->hasMany(SiteWorkMaterial::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(SiteWorkImage::class);
    }

    public function getTotalWorkerHoursAttribute(): float
    {
        return $this->workers->sum('hours_worked') ?? 0;
    }

    public function getTotalMaterialCostAttribute(): float
    {
        return $this->materials->sum(function ($material) {
            return ($material->quantity ?? 0) * ($material->unit_cost ?? 0);
        });
    }
}
