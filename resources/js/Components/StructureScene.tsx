import { useEffect, useRef } from 'react';
import {
    BoxGeometry, BufferGeometry, Color, DirectionalLight, EdgesGeometry, Float32BufferAttribute, Fog, Group,
    HemisphereLight, InstancedMesh, LineBasicMaterial, LineLoop, LineSegments, Matrix4, Mesh, MeshBasicMaterial,
    MeshStandardMaterial, PerspectiveCamera, PointLight, Points, PointsMaterial, Quaternion, Scene, SphereGeometry,
    SRGBColorSpace, Vector3, WebGLRenderer, type Material,
} from 'three';

/**
 * Illustrative model: a 9-storey reinforced-concrete frame assembles itself inside its
 * own blueprint "ghost", while a tower crane slews overhead. Pure Three.js, no assets.
 */

const NIGHT = 0x14202e; // brand navy
const PAPER = 0xf4f6fa;
const SIGNAL = 0xf59e1b; // logo orange
const BLUE = 0x1f6fd1; // logo blue

const FLOORS = 9;
const NX = 4; // bays along x
const NZ = 3; // bays along z
const BAY = 2;
const STOREY = 1.15;
const W = NX * BAY;
const D = NZ * BAY;
const H = FLOORS * STOREY;
const FLOOR_DUR = 0.55; // seconds per storey
const BUILD_END = FLOORS * FLOOR_DUR + 0.9;

type Element = { kind: 'col' | 'bx' | 'bz'; x: number; y: number; z: number; len: number; birth: number };

const easeOut = (t: number) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 3);

/** Line segments for a square lattice mast (crane tower). */
function latticeMast(height: number, size: number, step: number): number[] {
    const s = size / 2;
    const corners: [number, number][] = [[-s, -s], [s, -s], [s, s], [-s, s]];
    const p: number[] = [];
    for (const [x, z] of corners) p.push(x, 0, z, x, height, z);
    for (let y = 0; y <= height + 1e-6; y += step) {
        for (let i = 0; i < 4; i++) {
            const [ax, az] = corners[i];
            const [bx, bz] = corners[(i + 1) % 4];
            p.push(ax, y, az, bx, y, bz);
            if (y + step <= height + 1e-6) p.push(ax, y, az, bx, y + step, bz); // diagonal bracing
        }
    }
    return p;
}

/** Triangular truss running along +x from x0 to x1. */
function truss(x0: number, x1: number, depth: number, height: number, step: number): number[] {
    const p: number[] = [];
    const d = depth / 2;
    p.push(x0, 0, -d, x1, 0, -d, x0, 0, d, x1, 0, d, x0, height, 0, x1, height, 0);
    const dir = Math.sign(x1 - x0);
    for (let x = x0; dir * (x1 - x) > 1e-6; x += step * dir) {
        const nx = x + step * dir;
        p.push(x, 0, -d, x, 0, d, x, 0, -d, nx, height, 0, x, 0, d, nx, height, 0, nx, height, 0, nx, 0, -d, nx, height, 0, nx, 0, d);
    }
    return p;
}

function lines(points: number[], material: LineBasicMaterial) {
    const g = new BufferGeometry();
    g.setAttribute('position', new Float32BufferAttribute(points, 3));
    return new LineSegments(g, material);
}

export interface StructureSceneProps {
    /** Called with build progress 0..1 and the storey currently being built. */
    onProgress?: (progress: number, storey: number) => void;
}

export default function StructureScene({ onProgress }: StructureSceneProps) {
    const host = useRef<HTMLDivElement>(null);
    const progressRef = useRef(onProgress);
    progressRef.current = onProgress;

    useEffect(() => {
        const el = host.current;
        if (!el) return;

        let renderer: WebGLRenderer;
        try {
            renderer = new WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
        } catch {
            progressRef.current?.(1, FLOORS);
            return;
        }

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
        renderer.outputColorSpace = SRGBColorSpace;
        renderer.setClearColor(NIGHT, 1);
        renderer.domElement.setAttribute('aria-hidden', 'true');
        el.appendChild(renderer.domElement);

        const scene = new Scene();
        scene.fog = new Fog(NIGHT, 34, 85);
        const camera = new PerspectiveCamera(30, 1, 0.1, 200);

        const disposables: { dispose: () => void }[] = [];
        const track = <T extends { dispose: () => void }>(x: T) => { disposables.push(x); return x; };

        /* ---------- lights ---------- */
        scene.add(new HemisphereLight(0xffffff, NIGHT, 1.6));
        const key = new DirectionalLight(0xffffff, 1.9);
        key.position.set(12, 20, 10);
        scene.add(key);
        const warm = new PointLight(SIGNAL, 30, 26, 1.6);
        warm.position.set(W / 2 + 3, H + 2, 2);
        scene.add(warm);

        /* ---------- ground ---------- */
        const gridMat = track(new LineBasicMaterial({ color: 0x24364b }));
        const gridPts: number[] = [];
        const G = 40;
        for (let i = -G; i <= G; i += 1) {
            gridPts.push(i, 0, -G, i, 0, G, -G, 0, i, G, 0, i);
        }
        const grid = lines(gridPts, gridMat);
        track(grid.geometry);
        scene.add(grid);

        const ringMat = track(new LineBasicMaterial({ color: 0x2c4361 }));
        for (const r of [9, 15, 22]) {
            const pts: number[] = [];
            for (let i = 0; i < 128; i++) {
                const a = (i / 128) * Math.PI * 2;
                pts.push(Math.cos(a) * r, 0.01, Math.sin(a) * r);
            }
            const g = track(new BufferGeometry());
            g.setAttribute('position', new Float32BufferAttribute(pts, 3));
            scene.add(new LineLoop(g, ringMat));
        }

        // Survey markers scattered across the site.
        const markerPts: number[] = [];
        for (let i = 0; i < 70; i++) {
            const a = Math.random() * Math.PI * 2;
            const r = 7 + Math.random() * 22;
            markerPts.push(Math.cos(a) * r, 0.03, Math.sin(a) * r);
        }
        const markerGeo = track(new BufferGeometry());
        markerGeo.setAttribute('position', new Float32BufferAttribute(markerPts, 3));
        const markerMat = track(new PointsMaterial({ color: BLUE, size: 0.12, sizeAttenuation: true }));
        scene.add(new Points(markerGeo, markerMat));

        /* ---------- building ---------- */
        const building = new Group();
        building.position.set(-W / 2, 0, -D / 2);
        scene.add(building);

        const podium = new Mesh(
            track(new BoxGeometry(W + 1.4, 0.3, D + 1.4)),
            track(new MeshStandardMaterial({ color: 0x1b2a3c, roughness: 0.9 })),
        );
        podium.position.set(W / 2, 0.15, D / 2);
        building.add(podium);

        // Blueprint ghost: every column and beam centreline, visible before it's built.
        const ghostPts: number[] = [];
        const elements: Element[] = [];
        for (let f = 0; f < FLOORS; f++) {
            const y0 = 0.3 + f * STOREY;
            const y1 = y0 + STOREY;
            const t0 = f * FLOOR_DUR;
            for (let i = 0; i <= NX; i++) {
                for (let k = 0; k <= NZ; k++) {
                    const x = i * BAY;
                    const z = k * BAY;
                    ghostPts.push(x, y0, z, x, y1, z);
                    elements.push({ kind: 'col', x, y: y0, z, len: STOREY, birth: t0 + Math.random() * 0.18 });
                }
            }
            for (let k = 0; k <= NZ; k++) {
                for (let i = 0; i < NX; i++) {
                    ghostPts.push(i * BAY, y1, k * BAY, (i + 1) * BAY, y1, k * BAY);
                    elements.push({ kind: 'bx', x: i * BAY, y: y1, z: k * BAY, len: BAY, birth: t0 + 0.22 + Math.random() * 0.2 });
                }
            }
            for (let i = 0; i <= NX; i++) {
                for (let k = 0; k < NZ; k++) {
                    ghostPts.push(i * BAY, y1, k * BAY, i * BAY, y1, (k + 1) * BAY);
                    elements.push({ kind: 'bz', x: i * BAY, y: y1, z: k * BAY, len: BAY, birth: t0 + 0.26 + Math.random() * 0.2 });
                }
            }
        }
        const ghostMat = track(new LineBasicMaterial({ color: PAPER, transparent: true, opacity: 0.11 }));
        const ghost = lines(ghostPts, ghostMat);
        track(ghost.geometry);
        building.add(ghost);

        const unit = track(new BoxGeometry(1, 1, 1));
        const frameMat = track(new MeshStandardMaterial({ color: 0xe9e3d4, roughness: 0.55, metalness: 0.05, emissive: new Color(0x1b2a3c), emissiveIntensity: 0.5 }));
        const frame = new InstancedMesh(unit, frameMat, elements.length);
        building.add(frame);

        const m = new Matrix4();
        const q = new Quaternion();
        const pos = new Vector3();
        const scl = new Vector3();
        const setElement = (index: number, e: Element, s: number) => {
            const g = Math.max(s, 0.0001);
            if (e.kind === 'col') {
                pos.set(e.x, e.y + (e.len * g) / 2, e.z);
                scl.set(0.17, e.len * g, 0.17);
            } else if (e.kind === 'bx') {
                pos.set(e.x + (e.len * g) / 2, e.y - 0.07, e.z);
                scl.set(e.len * g, 0.15, 0.11);
            } else {
                pos.set(e.x, e.y - 0.07, e.z + (e.len * g) / 2);
                scl.set(0.11, 0.15, e.len * g);
            }
            m.compose(pos, q, scl);
            frame.setMatrixAt(index, m);
        };

        // Slabs: translucent plates with crisp edges, one per storey.
        const slabGeo = track(new BoxGeometry(W + 0.35, 0.07, D + 0.35));
        const slabEdges = track(new EdgesGeometry(slabGeo));
        const slabs = Array.from({ length: FLOORS }, (_, f) => {
            const mat = track(new MeshStandardMaterial({ color: 0xcfc8b8, transparent: true, opacity: 0, roughness: 0.85, depthWrite: false }));
            const edgeMat = track(new LineBasicMaterial({ color: PAPER, transparent: true, opacity: 0 }));
            const slab = new Mesh(slabGeo, mat);
            slab.add(new LineSegments(slabEdges, edgeMat));
            slab.position.set(W / 2, 0.3 + (f + 1) * STOREY + 0.035, D / 2);
            building.add(slab);
            return { mat, edgeMat, birth: f * FLOOR_DUR + FLOOR_DUR * 0.9 };
        });

        // Level marker: an orange outline that rides up with the active storey.
        const markerLineMat = track(new LineBasicMaterial({ color: SIGNAL, transparent: true, opacity: 0.9 }));
        const levelGeo = track(new BufferGeometry());
        const pad = 0.7;
        levelGeo.setAttribute('position', new Float32BufferAttribute([
            -pad, 0, -pad, W + pad, 0, -pad, W + pad, 0, D + pad, -pad, 0, D + pad,
        ], 3));
        const level = new LineLoop(levelGeo, markerLineMat);
        building.add(level);

        /* ---------- tower crane ---------- */
        const craneMat = track(new LineBasicMaterial({ color: SIGNAL }));
        const crane = new Group();
        crane.position.set(W / 2 + 2.4, 0, -0.8);
        scene.add(crane);
        const mastH = H + 4.2;
        const mast = lines(latticeMast(mastH, 0.7, 0.7), craneMat);
        track(mast.geometry);
        crane.add(mast);

        const slew = new Group();
        slew.position.y = mastH;
        crane.add(slew);
        const jib = lines(truss(0, -12.5, 0.7, 0.75, 0.7), craneMat);
        const counterJib = lines(truss(0, 4.2, 0.9, 0.35, 0.7), craneMat);
        const apex = lines([0, 0, 0, 0, 2.6, 0, 0, 2.6, 0, -12.5, 0.75, 0, 0, 2.6, 0, 4.2, 0.35, 0], craneMat);
        [jib, counterJib, apex].forEach((l) => { track(l.geometry); slew.add(l); });

        const ballastMat = track(new MeshStandardMaterial({ color: 0x24364b, roughness: 0.9 }));
        const ballast = new Mesh(track(new BoxGeometry(1.2, 0.9, 1.1)), ballastMat);
        ballast.position.set(3.6, -0.3, 0);
        slew.add(ballast);
        const cabMat = track(new MeshStandardMaterial({ color: SIGNAL, roughness: 0.5, emissive: new Color(SIGNAL), emissiveIntensity: 0.25 }));
        const cab = new Mesh(track(new BoxGeometry(0.8, 0.7, 0.8)), cabMat);
        cab.position.set(-0.6, -0.35, 0.75);
        slew.add(cab);

        const trolley = new Group();
        slew.add(trolley);
        const cableGeo = track(new BufferGeometry());
        cableGeo.setAttribute('position', new Float32BufferAttribute([0, 0, 0, 0, -1, 0], 3));
        const cable = new LineSegments(cableGeo, track(new LineBasicMaterial({ color: PAPER, transparent: true, opacity: 0.6 })));
        trolley.add(cable);
        const load = new Mesh(track(new BoxGeometry(1.6, 0.16, 0.24)), frameMat);
        trolley.add(load);

        // Aviation warning lights on the crane apex and jib tip.
        const beaconMat = track(new MeshBasicMaterial({ color: 0xff2a1a, fog: false }));
        const beaconGeo = track(new SphereGeometry(0.16, 12, 8));
        const beaconA = new Mesh(beaconGeo, beaconMat);
        beaconA.position.set(0, 2.75, 0);
        const beaconB = new Mesh(beaconGeo, beaconMat);
        beaconB.position.set(-12.5, 0.2, 0);
        slew.add(beaconA, beaconB);

        /* ---------- sizing ---------- */
        let width = 0;
        let height = 0;
        const resize = () => {
            width = el.clientWidth;
            height = el.clientHeight;
            if (!width || !height) return;
            renderer.setSize(width, height, false);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            if (reduceMotion) render(BUILD_END + 1);
        };

        /* ---------- input ---------- */
        const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
        const onPointer = (e: PointerEvent) => {
            pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
            pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
        };
        window.addEventListener('pointermove', onPointer, { passive: true });

        /* ---------- animation ---------- */
        let lastPct = -1;
        let built = false;
        const target = new Vector3(0, H * 0.46, 0);

        function render(t: number) {
            // Build sequence.
            if (!built) {
                for (let i = 0; i < elements.length; i++) {
                    const e = elements[i];
                    setElement(i, e, easeOut((t - e.birth) / 0.5));
                }
                frame.instanceMatrix.needsUpdate = true;
                for (const s of slabs) {
                    const k = easeOut((t - s.birth) / 0.5);
                    s.mat.opacity = 0.32 * k;
                    s.edgeMat.opacity = 0.6 * k;
                }
                const raw = Math.min(t / (FLOORS * FLOOR_DUR + 0.5), 1);
                const storey = Math.min(Math.floor(raw * FLOORS) + 1, FLOORS);
                level.position.y = 0.3 + Math.min(raw * FLOORS, FLOORS) * STOREY;
                markerLineMat.opacity = t > BUILD_END ? Math.max(0, 0.9 - (t - BUILD_END) * 1.5) : 0.9;
                const pct = Math.round(raw * 100);
                if (pct !== lastPct) {
                    lastPct = pct;
                    progressRef.current?.(raw, storey);
                }
                if (t > BUILD_END + 0.8) {
                    built = true;
                    level.visible = false;
                }
            }

            // Beacons blink.
            beaconMat.visible = reduceMotion || Math.sin(t * 4.5) > 0.2;

            // Crane: slow slew, trolley travelling along the jib, hoist bobbing.
            const ct = reduceMotion ? 2 : t;
            slew.rotation.y = 0.6 + Math.sin(ct * 0.18) * 0.9;
            const travel = -4 - (Math.sin(ct * 0.35) * 0.5 + 0.5) * 7.5;
            const drop = 4 + Math.sin(ct * 0.5) * 1.5;
            trolley.position.set(travel, 0, 0);
            (cable.geometry.attributes.position as Float32BufferAttribute).setY(1, -drop);
            cable.geometry.attributes.position.needsUpdate = true;
            load.position.y = -drop - 0.1;
            load.rotation.y = Math.sin(ct * 0.4) * 0.4;

            // Camera: slow orbit + gentle pointer parallax. Pull back on tall/narrow panels.
            pointer.x += (pointer.tx - pointer.x) * 0.04;
            pointer.y += (pointer.ty - pointer.y) * 0.04;
            const angle = 0.75 + (reduceMotion ? 0 : t * 0.035) + pointer.x * 0.12;
            const radius = camera.aspect < 1 ? 64 : 46;
            camera.position.set(Math.sin(angle) * radius, 12 + pointer.y * -1.5, Math.cos(angle) * radius);
            target.y = H * 0.6;
            camera.lookAt(target);

            renderer.render(scene, camera);
        }

        let raf = 0;
        let running = false;
        // The build clock starts the first time the panel is actually on screen.
        let start = 0;
        let pausedAt = 0;

        const loop = (now: number) => {
            render((now - start) / 1000);
            raf = requestAnimationFrame(loop);
        };
        const play = () => {
            if (running || reduceMotion) return;
            running = true;
            if (!start) start = performance.now();
            else if (pausedAt) start += performance.now() - pausedAt;
            raf = requestAnimationFrame(loop);
        };
        const pause = () => {
            if (!running) return;
            running = false;
            pausedAt = performance.now();
            cancelAnimationFrame(raf);
        };

        const ro = new ResizeObserver(resize);
        ro.observe(el);
        resize();

        if (reduceMotion) {
            render(BUILD_END + 1);
        }

        const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? play() : pause()), { threshold: 0 });
        io.observe(el);
        const onVisibility = () => (document.hidden ? pause() : play());
        document.addEventListener('visibilitychange', onVisibility);

        const onLost = (e: Event) => { e.preventDefault(); pause(); };
        renderer.domElement.addEventListener('webglcontextlost', onLost);

        return () => {
            pause();
            io.disconnect();
            ro.disconnect();
            document.removeEventListener('visibilitychange', onVisibility);
            window.removeEventListener('pointermove', onPointer);
            renderer.domElement.removeEventListener('webglcontextlost', onLost);
            frame.dispose();
            disposables.forEach((d) => d.dispose());
            scene.traverse((o) => {
                const anyO = o as unknown as { geometry?: BufferGeometry; material?: Material };
                anyO.geometry?.dispose();
            });
            renderer.dispose();
            renderer.domElement.remove();
        };
    }, []);

    return <div ref={host} className="structure-canvas" />;
}
