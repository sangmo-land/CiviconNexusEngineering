<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SiteWorkMaterial extends Model
{
    use HasFactory;

    protected $fillable = [
        'site_work_log_id',
        'material_name',
        'quantity',
        'unit',
        'unit_cost',
        'supplier',
        'notes',
    ];

    protected $casts = [
        'quantity' => 'decimal:2',
        'unit_cost' => 'decimal:2',
    ];

    public function siteWorkLog(): BelongsTo
    {
        return $this->belongsTo(SiteWorkLog::class);
    }

    public function getTotalCostAttribute(): float
    {
        return ($this->quantity ?? 0) * ($this->unit_cost ?? 0);
    }
}
