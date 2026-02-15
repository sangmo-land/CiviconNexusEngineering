<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SiteWorkImage extends Model
{
    protected $fillable = [
        'site_work_log_id',
        'image_path',
        'caption',
    ];

    public function siteWorkLog(): BelongsTo
    {
        return $this->belongsTo(SiteWorkLog::class);
    }
}
