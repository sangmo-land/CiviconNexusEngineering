import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LightboxImage {
    src: string;
    alt: string;
    caption?: string | null;
}

interface ImageLightboxProps {
    images: LightboxImage[];
    selectedIndex: number | null;
    onClose: () => void;
    onNavigate: (index: number) => void;
}

const MIN_SCALE = 1;
const MAX_SCALE = 5;
const DOUBLE_TAP_DELAY = 300;
const SWIPE_THRESHOLD = 50;

export default function ImageLightbox({ images, selectedIndex, onClose, onNavigate }: ImageLightboxProps) {
    const [scale, setScale] = useState(1);
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const [isZoomed, setIsZoomed] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    // Touch tracking refs
    const lastTapRef = useRef(0);
    const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
    const pinchStartDistRef = useRef<number | null>(null);
    const pinchStartScaleRef = useRef(1);
    const isDraggingRef = useRef(false);
    const dragStartRef = useRef({ x: 0, y: 0 });
    const translateRef = useRef({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const isOpen = selectedIndex !== null;
    const totalImages = images.length;

    // Reset zoom when changing images or closing
    const resetZoom = useCallback(() => {
        setScale(1);
        setTranslate({ x: 0, y: 0 });
        translateRef.current = { x: 0, y: 0 };
        setIsZoomed(false);
    }, []);

    useEffect(() => {
        resetZoom();
    }, [selectedIndex, resetZoom]);

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            return () => { document.body.style.overflow = ''; };
        }
    }, [isOpen]);

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen || selectedIndex === null) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') { onClose(); return; }
            if (isZoomed) return; // disable nav when zoomed
            if (e.key === 'ArrowLeft') onNavigate(selectedIndex > 0 ? selectedIndex - 1 : totalImages - 1);
            if (e.key === 'ArrowRight') onNavigate(selectedIndex < totalImages - 1 ? selectedIndex + 1 : 0);
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [isOpen, selectedIndex, totalImages, isZoomed, onClose, onNavigate]);

    // Constrain translation so image doesn't go out of bounds
    const constrainTranslate = useCallback((tx: number, ty: number, s: number) => {
        if (s <= 1) return { x: 0, y: 0 };
        const container = containerRef.current;
        const img = imageRef.current;
        if (!container || !img) return { x: tx, y: ty };

        const cRect = container.getBoundingClientRect();
        const iRect = img.getBoundingClientRect();

        const scaledW = img.naturalWidth ? (iRect.width / (scale || 1)) * s : iRect.width;
        const scaledH = img.naturalHeight ? (iRect.height / (scale || 1)) * s : iRect.height;

        const maxX = Math.max(0, (scaledW - cRect.width) / 2);
        const maxY = Math.max(0, (scaledH - cRect.height) / 2);

        return {
            x: Math.max(-maxX, Math.min(maxX, tx)),
            y: Math.max(-maxY, Math.min(maxY, ty)),
        };
    }, [scale]);

    // Apply zoom centered on a point
    const zoomTo = useCallback((newScale: number, _centerX?: number, _centerY?: number) => {
        const clamped = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale));
        const constrained = constrainTranslate(translate.x, translate.y, clamped);
        setScale(clamped);
        setTranslate(constrained);
        translateRef.current = constrained;
        setIsZoomed(clamped > 1);
    }, [translate, constrainTranslate]);

    // Double-tap / double-click to zoom
    const handleDoubleTap = useCallback((clientX: number, clientY: number) => {
        if (isZoomed) {
            resetZoom();
        } else {
            zoomTo(2.5, clientX, clientY);
        }
    }, [isZoomed, resetZoom, zoomTo]);

    // Mouse wheel zoom
    const handleWheel = useCallback((e: React.WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.3 : 0.3;
        const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale + delta));
        const constrained = constrainTranslate(translate.x, translate.y, newScale);
        setScale(newScale);
        setTranslate(constrained);
        translateRef.current = constrained;
        setIsZoomed(newScale > 1);
    }, [scale, translate, constrainTranslate]);

    // Touch handlers
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        if (e.touches.length === 1) {
            const touch = e.touches[0];
            const now = Date.now();

            // Detect double-tap
            if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
                handleDoubleTap(touch.clientX, touch.clientY);
                lastTapRef.current = 0;
                return;
            }
            lastTapRef.current = now;

            touchStartRef.current = { x: touch.clientX, y: touch.clientY, time: now };
            if (isZoomed) {
                isDraggingRef.current = true;
                dragStartRef.current = { x: touch.clientX - translateRef.current.x, y: touch.clientY - translateRef.current.y };
            }
        } else if (e.touches.length === 2) {
            // Pinch start
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            pinchStartDistRef.current = Math.hypot(dx, dy);
            pinchStartScaleRef.current = scale;
            isDraggingRef.current = false;
        }
    }, [isZoomed, scale, handleDoubleTap]);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        if (e.touches.length === 2 && pinchStartDistRef.current !== null) {
            // Pinch zoom
            e.preventDefault();
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            const dist = Math.hypot(dx, dy);
            const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, pinchStartScaleRef.current * (dist / pinchStartDistRef.current)));
            const constrained = constrainTranslate(translate.x, translate.y, newScale);
            setScale(newScale);
            setTranslate(constrained);
            translateRef.current = constrained;
            setIsZoomed(newScale > 1);
        } else if (e.touches.length === 1 && isDraggingRef.current && isZoomed) {
            // Pan when zoomed
            e.preventDefault();
            const touch = e.touches[0];
            const newX = touch.clientX - dragStartRef.current.x;
            const newY = touch.clientY - dragStartRef.current.y;
            const constrained = constrainTranslate(newX, newY, scale);
            setTranslate(constrained);
            translateRef.current = constrained;
        }
    }, [isZoomed, scale, translate, constrainTranslate]);

    const handleTouchEnd = useCallback((e: React.TouchEvent) => {
        // If pinch just ended
        if (pinchStartDistRef.current !== null) {
            pinchStartDistRef.current = null;
            if (scale <= 1) resetZoom();
            return;
        }

        isDraggingRef.current = false;

        // Swipe detection (only when not zoomed)
        if (!isZoomed && touchStartRef.current && selectedIndex !== null) {
            const touch = e.changedTouches[0];
            const dx = touch.clientX - touchStartRef.current.x;
            const dy = touch.clientY - touchStartRef.current.y;
            const dt = Date.now() - touchStartRef.current.time;

            if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy) && dt < 500) {
                if (dx > 0) {
                    onNavigate(selectedIndex > 0 ? selectedIndex - 1 : totalImages - 1);
                } else {
                    onNavigate(selectedIndex < totalImages - 1 ? selectedIndex + 1 : 0);
                }
                setIsAnimating(true);
                setTimeout(() => setIsAnimating(false), 300);
            }
        }

        touchStartRef.current = null;
    }, [isZoomed, scale, selectedIndex, totalImages, onNavigate, resetZoom]);

    // Mouse drag when zoomed
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        if (!isZoomed) return;
        e.preventDefault();
        isDraggingRef.current = true;
        dragStartRef.current = { x: e.clientX - translateRef.current.x, y: e.clientY - translateRef.current.y };
    }, [isZoomed]);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!isDraggingRef.current || !isZoomed) return;
        const newX = e.clientX - dragStartRef.current.x;
        const newY = e.clientY - dragStartRef.current.y;
        const constrained = constrainTranslate(newX, newY, scale);
        setTranslate(constrained);
        translateRef.current = constrained;
    }, [isZoomed, scale, constrainTranslate]);

    const handleMouseUp = useCallback(() => {
        isDraggingRef.current = false;
    }, []);

    if (!isOpen || selectedIndex === null) return null;

    const currentImage = images[selectedIndex];

    return (
        <AnimatePresence>
            <motion.div
                key="lightbox-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 bg-brand-950/98 backdrop-blur-2xl z-50 flex flex-col"
                onClick={isZoomed ? undefined : onClose}
            >
                {/* Top bar */}
                <div className="flex items-center justify-between px-4 md:px-6 py-4 z-20 flex-shrink-0">
                    {/* Counter */}
                    <div className="glass px-4 py-2 rounded-full text-white/60 text-sm font-medium tabular-nums">
                        {selectedIndex + 1} / {totalImages}
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-2">
                        {/* Zoom indicator */}
                        {isZoomed && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="glass px-3 py-2 rounded-xl text-accent text-xs font-semibold"
                                onClick={(e) => { e.stopPropagation(); resetZoom(); }}
                            >
                                {Math.round(scale * 100)}% — Tap to reset
                            </motion.button>
                        )}

                        {/* Zoom in */}
                        <button
                            className="text-white/40 hover:text-white transition p-2.5 glass rounded-xl group"
                            onClick={(e) => { e.stopPropagation(); zoomTo(scale + 0.5); }}
                            title="Zoom in"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                        </button>

                        {/* Zoom out */}
                        <button
                            className="text-white/40 hover:text-white transition p-2.5 glass rounded-xl group"
                            onClick={(e) => { e.stopPropagation(); zoomTo(scale - 0.5); }}
                            title="Zoom out"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                            </svg>
                        </button>

                        {/* Close */}
                        <button
                            className="text-white/40 hover:text-white transition p-2.5 glass rounded-xl group"
                            onClick={(e) => { e.stopPropagation(); onClose(); }}
                            title="Close (Esc)"
                        >
                            <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Image area */}
                <div
                    ref={containerRef}
                    className="flex-1 relative flex items-center justify-center overflow-hidden select-none"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onWheel={handleWheel}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onDoubleClick={(e) => { e.stopPropagation(); handleDoubleTap(e.clientX, e.clientY); }}
                    style={{ cursor: isZoomed ? (isDraggingRef.current ? 'grabbing' : 'grab') : 'default', touchAction: 'none' }}
                >
                    {/* Left nav arrow (hidden when zoomed) */}
                    {!isZoomed && totalImages > 1 && (
                        <button
                            className="absolute left-3 md:left-6 text-white/40 hover:text-white transition p-3 glass rounded-xl z-10 hidden sm:block"
                            onClick={(e) => {
                                e.stopPropagation();
                                onNavigate(selectedIndex > 0 ? selectedIndex - 1 : totalImages - 1);
                            }}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}

                    {/* The image with zoom + pan */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedIndex}
                            initial={{ opacity: 0, x: isAnimating ? 80 : 0 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: isAnimating ? -80 : 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="flex items-center justify-center w-full h-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                ref={imageRef}
                                src={currentImage.src}
                                alt={currentImage.alt}
                                className="max-h-[78vh] max-w-[92vw] md:max-w-[82vw] object-contain rounded-2xl shadow-2xl transition-transform duration-150 ease-out"
                                style={{
                                    transform: `scale(${scale}) translate(${translate.x / scale}px, ${translate.y / scale}px)`,
                                }}
                                draggable={false}
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* Right nav arrow (hidden when zoomed) */}
                    {!isZoomed && totalImages > 1 && (
                        <button
                            className="absolute right-3 md:right-6 text-white/40 hover:text-white transition p-3 glass rounded-xl z-10 hidden sm:block"
                            onClick={(e) => {
                                e.stopPropagation();
                                onNavigate(selectedIndex < totalImages - 1 ? selectedIndex + 1 : 0);
                            }}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Bottom bar: caption + thumbnail strip */}
                <div className="flex-shrink-0 z-20">
                    {/* Caption */}
                    {currentImage.caption && (
                        <div className="text-center pb-3 px-4">
                            <p className="glass inline-block px-5 py-2.5 rounded-xl text-white text-sm max-w-md">
                                {currentImage.caption}
                            </p>
                        </div>
                    )}

                    {/* Thumbnail strip */}
                    {totalImages > 1 && (
                        <div className="flex items-center justify-center gap-2 px-4 pb-5 overflow-x-auto scrollbar-hide">
                            {images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={(e) => { e.stopPropagation(); onNavigate(i); }}
                                    className={`flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200 border-2 ${
                                        i === selectedIndex
                                            ? 'border-accent ring-2 ring-accent/30 scale-110'
                                            : 'border-transparent opacity-40 hover:opacity-80'
                                    }`}
                                >
                                    <img
                                        src={img.src}
                                        alt={img.alt}
                                        className="w-12 h-12 md:w-14 md:h-14 object-cover"
                                        loading="lazy"
                                    />
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Mobile swipe hint (only when >1 image and not zoomed) */}
                    {!isZoomed && totalImages > 1 && (
                        <div className="sm:hidden text-center pb-4">
                            <p className="text-white/30 text-xs">Swipe to navigate · Double-tap to zoom</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
