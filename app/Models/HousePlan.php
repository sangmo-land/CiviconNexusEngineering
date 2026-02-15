<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class HousePlan extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'price',
        'bedrooms',
        'bathrooms',
        'floors',
        'area',
        'description',
        'preview_image',
        'pdf_file',
        'is_featured',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'bedrooms' => 'integer',
        'bathrooms' => 'integer',
        'floors' => 'integer',
        'area' => 'float',
        'is_featured' => 'boolean',
    ];

    protected static function booted(): void
    {
        static::creating(function (HousePlan $housePlan) {
            if (empty($housePlan->slug)) {
                $housePlan->slug = Str::slug($housePlan->title);
            }
        });
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }
}
