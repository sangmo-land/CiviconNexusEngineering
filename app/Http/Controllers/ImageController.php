<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Laravel\Facades\Image;
use Intervention\Image\Encoders\WebpEncoder;
use Intervention\Image\Encoders\JpegEncoder;
use Symfony\Component\HttpFoundation\Response;

class ImageController extends Controller
{
    /**
     * Allowed resize presets to prevent abuse.
     * key => [width, height, quality]
     */
    private const PRESETS = [
        'thumb'  => ['width' => 400,  'height' => 300,  'quality' => 70],
        'medium' => ['width' => 800,  'height' => 600,  'quality' => 80],
        'large'  => ['width' => 1400, 'height' => 1050, 'quality' => 85],
        'hero'   => ['width' => 1920, 'height' => 1080, 'quality' => 85],
    ];

    /**
     * Serve a resized, cached image.
     *
     * URL: /img/{preset}/{path}
     * e.g. /img/thumb/projects/abc123.jpg
     */
    public function show(string $preset, string $path): Response
    {
        // Validate preset
        if (!isset(self::PRESETS[$preset])) {
            abort(404, 'Invalid image preset.');
        }

        $config = self::PRESETS[$preset];

        // Check source exists on public disk
        if (!Storage::disk('public')->exists($path)) {
            abort(404, 'Image not found.');
        }

        // Determine cache path
        $extension = strtolower(pathinfo($path, PATHINFO_EXTENSION));
        $supportsWebp = str_contains(request()->header('Accept', ''), 'image/webp');
        $outputExtension = $supportsWebp ? 'webp' : ($extension === 'png' ? 'png' : 'jpg');
        $cachePath = "cache/{$preset}/" . pathinfo($path, PATHINFO_DIRNAME) . '/' . pathinfo($path, PATHINFO_FILENAME) . ".{$outputExtension}";

        // Serve cached version if it exists and is newer than source
        if (Storage::disk('public')->exists($cachePath)) {
            $sourceTime = Storage::disk('public')->lastModified($path);
            $cacheTime = Storage::disk('public')->lastModified($cachePath);

            if ($cacheTime >= $sourceTime) {
                return $this->imageResponse($cachePath, $outputExtension);
            }
        }

        // Generate resized image
        $sourcePath = Storage::disk('public')->path($path);
        $image = Image::read($sourcePath);

        // Scale down, maintaining aspect ratio, only if larger
        $image->scaleDown($config['width'], $config['height']);

        // Encode
        if ($outputExtension === 'webp') {
            $encoded = $image->encode(new WebpEncoder($config['quality']));
        } else {
            $encoded = $image->encode(new JpegEncoder($config['quality']));
        }

        // Store cached version
        $cacheFullPath = Storage::disk('public')->path($cachePath);
        $cacheDir = dirname($cacheFullPath);
        if (!is_dir($cacheDir)) {
            mkdir($cacheDir, 0755, true);
        }
        file_put_contents($cacheFullPath, (string) $encoded);

        return $this->imageResponse($cachePath, $outputExtension);
    }

    /**
     * Return an image response with proper headers.
     */
    private function imageResponse(string $cachePath, string $extension): Response
    {
        $fullPath = Storage::disk('public')->path($cachePath);
        $mimeTypes = [
            'webp' => 'image/webp',
            'jpg'  => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'png'  => 'image/png',
        ];

        $mime = $mimeTypes[$extension] ?? 'image/jpeg';
        $lastModified = filemtime($fullPath);

        return response()->file($fullPath, [
            'Content-Type'  => $mime,
            'Cache-Control' => 'public, max-age=31536000, immutable',
            'Last-Modified' => gmdate('D, d M Y H:i:s', $lastModified) . ' GMT',
            'Etag'          => md5($cachePath . $lastModified),
        ]);
    }
}
