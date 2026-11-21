import type { ReactNode } from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, Easing } from 'remotion';

/**
 * Remotion composition — "From survey to site".
 * Four 105-frame chapters at 30fps (14s loop), drawn entirely in SVG.
 */

export const REEL_FPS = 30;
export const PHASE_FRAMES = 105;
export const REEL_SIZE = 1000;
export const PHASES = [
    { key: 'survey', title: 'Survey', caption: 'Topography, soils and site constraints' },
    { key: 'design', title: 'Design', caption: 'Plans, structural analysis and drawings' },
    { key: 'structure', title: 'Structure', caption: 'Frame, foundations and reinforcement' },
    { key: 'site', title: 'Site', caption: 'Supervision and daily progress records' },
] as const;
export const REEL_DURATION = PHASE_FRAMES * PHASES.length;

// Drawing-office palette: blue linework on paper, orange for highlights (logo colours).
const C = {
    bg: '#fbfaf7',
    line: '#1f6fd1',
    dim: '#1f6fd133',
    faint: '#1f6fd114',
    muted: '#566170',
    signal: '#e8890c',
};
const MONO = "Barlow, ui-sans-serif, system-ui, sans-serif";
const DISPLAY = "'Barlow Semi Condensed', Barlow, ui-sans-serif, system-ui, sans-serif";

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const ease = Easing.bezier(0.16, 1, 0.3, 1);

/** Progress 0..1 between two frames, eased. */
const prog = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { ...clamp, easing: ease });

/* ------------------------------------------------------------------ chapter frame */

function Chapter({ index, children }: { index: number; children: (f: number) => ReactNode }) {
    const frame = useCurrentFrame();
    const start = index * PHASE_FRAMES;
    const local = frame - start;
    if (local < -2 || local > PHASE_FRAMES + 2) return null;
    const opacity = interpolate(local, [0, 10, PHASE_FRAMES - 12, PHASE_FRAMES], [0, 1, 1, 0], clamp);
    const scale = interpolate(local, [0, PHASE_FRAMES], [1.03, 1], clamp);
    return (
        <AbsoluteFill style={{ opacity, transform: `scale(${scale})` }}>
            <svg viewBox={`0 0 ${REEL_SIZE} ${REEL_SIZE}`} width="100%" height="100%">{children(local)}</svg>
        </AbsoluteFill>
    );
}

/* ------------------------------------------------------------------ 01 survey */

function contour(cx: number, cy: number, r: number, seed: number) {
    const pts: string[] = [];
    for (let i = 0; i <= 96; i++) {
        const a = (i / 96) * Math.PI * 2;
        const k = r
            + Math.sin(a * 3 + seed) * r * 0.09
            + Math.sin(a * 5 + seed * 1.7) * r * 0.05
            + Math.cos(a * 2 - seed) * r * 0.07;
        pts.push(`${(cx + Math.cos(a) * k * 1.25).toFixed(1)},${(cy + Math.sin(a) * k * 0.82).toFixed(1)}`);
    }
    return `M${pts.join('L')}Z`;
}

const SURVEY_POINTS = [
    { x: 270, y: 330, z: '+712.40' },
    { x: 690, y: 300, z: '+718.05' },
    { x: 520, y: 470, z: '+726.80' },
    { x: 380, y: 610, z: '+715.10' },
    { x: 760, y: 590, z: '+709.65' },
];

function Survey(f: number) {
    const scan = interpolate(f, [0, PHASE_FRAMES], [140, 860], clamp);
    return (
        <g>
            {Array.from({ length: 8 }, (_, i) => (
                <path
                    key={i}
                    d={contour(520, 470, 40 + i * 42, i * 0.9)}
                    pathLength={1}
                    fill="none"
                    stroke={i === 4 ? C.signal : C.line}
                    strokeOpacity={i === 4 ? 0.9 : 0.35}
                    strokeWidth={i % 2 ? 1.2 : 2}
                    strokeDasharray={1}
                    strokeDashoffset={1 - prog(f, i * 4, 50 + i * 4)}
                />
            ))}
            <line x1={scan} y1={130} x2={scan} y2={810} stroke={C.signal} strokeWidth={1.5} strokeOpacity={0.7} />
            <rect x={scan} y={130} width={60} height={680} fill={`url(#scan)`} />
            <defs>
                <linearGradient id="scan" x1="0" x2="1">
                    <stop offset="0" stopColor={C.signal} stopOpacity={0.18} />
                    <stop offset="1" stopColor={C.signal} stopOpacity={0} />
                </linearGradient>
            </defs>
            {SURVEY_POINTS.map((p, i) => {
                const s = spring({ frame: f - 22 - i * 8, fps: REEL_FPS, config: { damping: 14 } });
                return (
                    <g key={i} transform={`translate(${p.x} ${p.y}) scale(${s})`}>
                        <circle r={14} fill="none" stroke={C.signal} strokeWidth={2} />
                        <path d="M-24 0H24M0 -24V24" stroke={C.signal} strokeWidth={1.5} />
                        <text x={22} y={-18} fill={C.line} fontFamily={MONO} fontSize={18}>{`SP-0${i + 1}`}</text>
                        <text x={22} y={4} fill={C.muted} fontFamily={MONO} fontSize={16}>{p.z}</text>
                    </g>
                );
            })}
        </g>
    );
}

/* ------------------------------------------------------------------ 02 design */

function Design(f: number) {
    const x0 = 190, y0 = 270, w = 620, h = 430;
    const walls = [
        `M${x0} ${y0}H${x0 + w}V${y0 + h}H${x0}Z`,
        `M${x0 + 260} ${y0}V${y0 + 250}`,
        `M${x0} ${y0 + 250}H${x0 + 180}`,
        `M${x0 + 240} ${y0 + 250}H${x0 + 420}`,
        `M${x0 + 420} ${y0 + 160}V${y0 + h}`,
        `M${x0 + 420} ${y0 + 160}H${x0 + w}`,
    ];
    const dimW = prog(f, 30, 70);
    const dimH = prog(f, 40, 80);
    const axes = ['A', 'B', 'C', 'D'];
    return (
        <g>
            {axes.map((a, i) => {
                const x = x0 + (w / 3) * i;
                const s = spring({ frame: f - i * 4, fps: REEL_FPS, config: { damping: 16 } });
                return (
                    <g key={a} opacity={s}>
                        <line x1={x} y1={y0 - 90} x2={x} y2={y0 + h + 30} stroke={C.line} strokeOpacity={0.18} strokeDasharray="10 8" />
                        <circle cx={x} cy={y0 - 112} r={20} fill="none" stroke={C.line} strokeOpacity={0.6} />
                        <text x={x} y={y0 - 106} textAnchor="middle" fill={C.line} fontFamily={MONO} fontSize={18}>{a}</text>
                    </g>
                );
            })}
            {walls.map((d, i) => (
                <path key={i} d={d} pathLength={1} fill="none" stroke={C.line} strokeWidth={i === 0 ? 10 : 6}
                    strokeDasharray={1} strokeDashoffset={1 - prog(f, 8 + i * 6, 48 + i * 6)} />
            ))}
            {/* door swings */}
            {[[x0 + 180, y0 + 250], [x0 + 420, y0 + 300]].map(([x, y], i) => (
                <path key={i} d={`M${x} ${y} a60 60 0 0 1 60 60`} pathLength={1} fill="none" stroke={C.signal} strokeWidth={2}
                    strokeDasharray={1} strokeDashoffset={1 - prog(f, 50 + i * 6, 75 + i * 6)} />
            ))}
            {/* dimensions */}
            <g stroke={C.signal} strokeWidth={1.5}>
                <line x1={x0} y1={y0 + h + 60} x2={x0 + w * dimW} y2={y0 + h + 60} />
                <line x1={x0} y1={y0 + h + 48} x2={x0} y2={y0 + h + 72} />
                <line x1={x0 + w * dimW} y1={y0 + h + 48} x2={x0 + w * dimW} y2={y0 + h + 72} />
                <line x1={x0 + w + 60} y1={y0} x2={x0 + w + 60} y2={y0 + h * dimH} />
                <line x1={x0 + w + 48} y1={y0} x2={x0 + w + 72} y2={y0} />
                <line x1={x0 + w + 48} y1={y0 + h * dimH} x2={x0 + w + 72} y2={y0 + h * dimH} />
            </g>
            <text x={x0 + (w * dimW) / 2} y={y0 + h + 95} textAnchor="middle" fill={C.line} fontFamily={MONO} fontSize={20}>
                {(12 * dimW).toFixed(2)} m
            </text>
            <text x={x0 + w + 80} y={y0 + (h * dimH) / 2} fill={C.line} fontFamily={MONO} fontSize={20}>
                {(8.4 * dimH).toFixed(2)} m
            </text>
            {[['LIVING', x0 + 110, y0 + 120], ['KITCHEN', x0 + 330, y0 + 90], ['BED 01', x0 + 90, y0 + 350], ['BED 02', x0 + 500, y0 + 310]].map(([t, x, y], i) => (
                <text key={t} x={x} y={y} fill={C.muted} fontFamily={MONO} fontSize={16} opacity={prog(f, 60 + i * 5, 80 + i * 5)}>{t}</text>
            ))}
        </g>
    );
}

/* ------------------------------------------------------------------ 03 structure */

const S = 62;
const iso = (x: number, y: number, z: number): [number, number] => [
    500 + (x - z) * Math.cos(Math.PI / 6) * S,
    700 + (x + z) * Math.sin(Math.PI / 6) * S - y * S,
];

function Structure(f: number) {
    const BX = 3, BZ = 2, FL = 4, SP = 2, HT = 1.6;
    const ox = -(BX * SP) / 2, oz = -(BZ * SP) / 2;
    const out: ReactNode[] = [];
    for (let fl = 0; fl < FL; fl++) {
        const t0 = 6 + fl * 20;
        const y0 = fl * HT, y1 = y0 + HT;
        const sp = prog(f, t0 + 14, t0 + 30);
        const slab = [iso(ox, y1, oz), iso(ox + BX * SP, y1, oz), iso(ox + BX * SP, y1, oz + BZ * SP), iso(ox, y1, oz + BZ * SP)];
        out.push(<polygon key={`s${fl}`} points={slab.map((p) => p.join(',')).join(' ')} fill={C.line} fillOpacity={0.07 * sp} stroke={C.line} strokeOpacity={0.5 * sp} strokeWidth={1.5} />);
        for (let i = 0; i <= BX; i++) {
            for (let k = 0; k <= BZ; k++) {
                const g = prog(f, t0 + (i + k) * 1.2, t0 + 12 + (i + k) * 1.2);
                const [ax, ay] = iso(ox + i * SP, y0, oz + k * SP);
                const [bx, by] = iso(ox + i * SP, y0 + HT * g, oz + k * SP);
                const hl = fl === FL - 1 && i === BX && k === 0;
                out.push(<line key={`c${fl}${i}${k}`} x1={ax} y1={ay} x2={bx} y2={by} stroke={hl ? C.signal : C.line} strokeWidth={6} strokeLinecap="square" />);
            }
        }
        for (let k = 0; k <= BZ; k++) {
            const g = prog(f, t0 + 10, t0 + 24);
            const [ax, ay] = iso(ox, y1, oz + k * SP);
            const [bx, by] = iso(ox + BX * SP * g, y1, oz + k * SP);
            out.push(<line key={`bx${fl}${k}`} x1={ax} y1={ay} x2={bx} y2={by} stroke={k === 0 ? C.signal : C.line} strokeWidth={4} />);
        }
        for (let i = 0; i <= BX; i++) {
            const g = prog(f, t0 + 12, t0 + 26);
            const [ax, ay] = iso(ox + i * SP, y1, oz);
            const [bx, by] = iso(ox + i * SP, y1, oz + BZ * SP * g);
            out.push(<line key={`bz${fl}${i}`} x1={ax} y1={ay} x2={bx} y2={by} stroke={C.line} strokeWidth={4} />);
        }
    }
    const base = [iso(ox - 0.6, 0, oz - 0.6), iso(ox + BX * SP + 0.6, 0, oz - 0.6), iso(ox + BX * SP + 0.6, 0, oz + BZ * SP + 0.6), iso(ox - 0.6, 0, oz + BZ * SP + 0.6)];
    const lvl = Math.min(Math.floor(prog(f, 6, 92) * FL) + 1, FL);
    return (
        <g>
            <polygon points={base.map((p) => p.join(',')).join(' ')} fill="none" stroke={C.line} strokeOpacity={0.3} strokeDasharray="8 8" />
            {out}
            <text x={130} y={250} fill={C.line} fontFamily={MONO} fontSize={20}>{`LEVEL ${String(lvl).padStart(2, '0')} / 0${FL}`}</text>
            <text x={130} y={280} fill={C.muted} fontFamily={MONO} fontSize={16}>RC FRAME · 3 × 2 BAYS</text>
        </g>
    );
}

/* ------------------------------------------------------------------ 04 site */

const TASKS = ['Excavation', 'Foundations', 'Frame', 'Masonry', 'Finishes'];

function Site(f: number) {
    const total = prog(f, 6, 92);
    const r = 150, cx = 300, cy = 520;
    const circ = 2 * Math.PI * r;
    return (
        <g>
            <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.faint} strokeWidth={22} />
            <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.signal} strokeWidth={22} strokeDasharray={circ}
                strokeDashoffset={circ * (1 - total)} transform={`rotate(-90 ${cx} ${cy})`} />
            <text x={cx} y={cy + 22} textAnchor="middle" fill={C.line} fontFamily={DISPLAY} fontWeight={700} fontSize={76}>
                {Math.round(total * 100)}%
            </text>
            <text x={cx} y={cy + 62} textAnchor="middle" fill={C.muted} fontFamily={MONO} fontSize={16}>OVERALL PROGRESS</text>
            {TASKS.map((t, i) => {
                const p = prog(f, 8 + i * 14, 30 + i * 14);
                const y = 340 + i * 82;
                const done = p >= 0.999;
                return (
                    <g key={t}>
                        <text x={540} y={y} fill={C.line} fontFamily={MONO} fontSize={18}>{t.toUpperCase()}</text>
                        <text x={880} y={y} textAnchor="end" fill={done ? C.signal : C.muted} fontFamily={MONO} fontSize={16}>{done ? 'DONE' : `${Math.round(p * 100)}%`}</text>
                        <rect x={540} y={y + 16} width={340} height={8} fill={C.faint} />
                        <rect x={540} y={y + 16} width={340 * p} height={8} fill={done ? C.signal : C.line} />
                    </g>
                );
            })}
        </g>
    );
}

/* ------------------------------------------------------------------ composition */

export default function BuildReel() {
    const frame = useCurrentFrame();
    const phase = Math.min(Math.floor(frame / PHASE_FRAMES), PHASES.length - 1);
    const local = frame - phase * PHASE_FRAMES;
    const labelY = interpolate(local, [0, 14], [40, 0], { ...clamp, easing: ease });
    const chapters = [Survey, Design, Structure, Site];

    return (
        <AbsoluteFill style={{ background: C.bg, fontFamily: MONO, color: C.line, overflow: 'hidden' }}>
            {/* blueprint grid */}
            <AbsoluteFill
                style={{
                    backgroundImage: `linear-gradient(${C.faint} 1px, transparent 1px), linear-gradient(90deg, ${C.faint} 1px, transparent 1px)`,
                    backgroundSize: '50px 50px',
                }}
            />

            {chapters.map((draw, i) => <Chapter key={i} index={i}>{draw}</Chapter>)}

            <div style={{ position: 'absolute', left: 48, top: 44, fontSize: 22, fontWeight: 600, color: C.muted }}>
                Step {phase + 1} of {PHASES.length}
            </div>

            <div style={{ position: 'absolute', left: 48, right: 48, bottom: 44 }}>
                <div style={{ overflow: 'hidden', height: 92 }}>
                    <div style={{ transform: `translateY(${labelY}px)`, display: 'flex', alignItems: 'baseline', gap: 22 }}>
                        <span style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 68, lineHeight: 1, letterSpacing: '-0.01em' }}>
                            {PHASES[phase].title}
                        </span>
                    </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${PHASES.length}, 1fr)`, gap: 8, marginTop: 20 }}>
                    {PHASES.map((p, i) => {
                        const fill = interpolate(frame, [i * PHASE_FRAMES, (i + 1) * PHASE_FRAMES], [0, 1], clamp);
                        return (
                            <div key={p.key} style={{ height: 4, background: C.faint }}>
                                <div style={{ height: '100%', width: `${fill * 100}%`, background: i === phase ? C.signal : C.line }} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </AbsoluteFill>
    );
}
