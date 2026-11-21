import { Player, type PlayerRef } from '@remotion/player';
import { useEffect, useRef, useState } from 'react';
import BuildReel, { PHASES, PHASE_FRAMES, REEL_DURATION, REEL_FPS, REEL_SIZE } from './BuildReel';

/**
 * Remotion Player bound to a phase index: the list highlights the chapter that's
 * playing, and clicking a chapter seeks to it. Pauses when scrolled out of view.
 */
export default function ProcessReel() {
    const player = useRef<PlayerRef>(null);
    const box = useRef<HTMLDivElement>(null);
    const [phase, setPhase] = useState(0);
    const [reduce] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        const p = player.current;
        if (!p) return;
        const onFrame = (e: { detail: { frame: number } }) => setPhase(Math.min(Math.floor(e.detail.frame / PHASE_FRAMES), PHASES.length - 1));
        const onPlay = () => setPlaying(true);
        const onPause = () => setPlaying(false);
        p.addEventListener('frameupdate', onFrame);
        p.addEventListener('play', onPlay);
        p.addEventListener('pause', onPause);
        return () => {
            p.removeEventListener('frameupdate', onFrame);
            p.removeEventListener('play', onPlay);
            p.removeEventListener('pause', onPause);
        };
    }, []);

    useEffect(() => {
        const el = box.current;
        if (!el || reduce) return;
        const io = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) player.current?.play();
            else player.current?.pause();
        }, { threshold: 0.35 });
        io.observe(el);
        return () => io.disconnect();
    }, [reduce]);

    const go = (i: number) => {
        // Land a little into the chapter so the drawing is visible even when paused.
        player.current?.seekTo(i * PHASE_FRAMES + (reduce ? PHASE_FRAMES - 20 : 0));
        setPhase(i);
        if (!reduce) player.current?.play();
    };

    return (
        <div className="reel">
            <ol className="reel-phases">
                {PHASES.map((p, i) => (
                    <li key={p.key}>
                        <button type="button" onClick={() => go(i)} aria-pressed={phase === i} className="reel-phase">
                            <span className="mono">0{i + 1}</span>
                            <span className="reel-phase-title">{p.title}</span>
                            <span className="reel-phase-cap">{p.caption}</span>
                        </button>
                    </li>
                ))}
            </ol>

            <div className="reel-stage" ref={box}>
                <Player
                    ref={player}
                    component={BuildReel}
                    durationInFrames={REEL_DURATION}
                    fps={REEL_FPS}
                    compositionWidth={REEL_SIZE}
                    compositionHeight={REEL_SIZE}
                    initialFrame={reduce ? PHASE_FRAMES - 20 : 0}
                    loop
                    clickToPlay={false}
                    controls={false}
                    // Company has 2 employees — within Remotion's free license (≤3).
                    acknowledgeRemotionLicense
                    style={{ width: '100%', aspectRatio: '1 / 1' }}
                />
                <button
                    type="button"
                    className="reel-toggle mono"
                    onClick={() => (playing ? player.current?.pause() : player.current?.play())}
                >
                    {playing ? 'Pause' : 'Play'}
                </button>
            </div>
        </div>
    );
}
