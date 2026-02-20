/**
 * Helper to build optimized image URLs via the /img/{preset}/{path} endpoint.
 *
 * Presets:
 *   'thumb'  – 400×300  q70  (gallery grid cards)
 *   'medium' – 800×600  q80  (medium previews)
 *   'large'  – 1400×1050 q85 (lightbox / detail)
 *   'hero'   – 1920×1080 q85 (hero banners)
 */

export type ImagePreset = 'thumb' | 'medium' | 'large' | 'hero';

/**
 * Returns an optimized image URL for the given storage path and preset.
 * Falls back to the raw storage URL if no preset is provided.
 */
export function optimizedImageUrl(storagePath: string, preset?: ImagePreset): string {
    if (!storagePath) return '';
    if (!preset) return `/storage/${storagePath}`;
    return `/img/${preset}/${storagePath}`;
}
