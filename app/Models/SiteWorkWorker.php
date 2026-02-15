<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SiteWorkWorker extends Model
{
    use HasFactory;

    protected $fillable = [
        'site_work_log_id',
        'worker_name',
        'role',
        'hours_worked',
        'tasks_performed',
    ];

    protected $casts = [
        'hours_worked' => 'decimal:2',
    ];

    public function siteWorkLog(): BelongsTo
    {
        return $this->belongsTo(SiteWorkLog::class);
    }
}
