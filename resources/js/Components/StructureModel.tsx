import { useEffect, useRef, useState } from 'react';
import {
    AmbientLight, BoxGeometry, DirectionalLight, EdgesGeometry, GridHelper, LineBasicMaterial,
    LineSegments, Mesh, MeshStandardMaterial, OrthographicCamera, Scene, Vector3, WebGLRenderer,
    type BufferGeometry,
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default function StructureModel() {
    const viewport = useRef<HTMLDivElement>(null);
    const view = useRef<{ rotate: (angle: number) => void; reset: () => void } | null>(null);
    const [available, setAvailable] = useState(true);

    useEffect(() => {
        const host = viewport.current;
        if (!host) return;

        let renderer: WebGLRenderer;

        try {
            renderer = new WebGLRenderer({ alpha: true, antialias: true });
        } catch {
            setAvailable(false);
            return;
        }

        const scene = new Scene();
        const camera = new OrthographicCamera(-5, 5, 5, -5, 0.1, 100);
        camera.position.set(10, 8, 12);
        const up = new Vector3(0, 1, 0);

        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.domElement.setAttribute('aria-hidden', 'true');
        host.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.target.set(0, 2, 0);
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.minPolarAngle = 0.25;
        controls.maxPolarAngle = Math.PI / 2;
        controls.update();
        controls.saveState();

        const frame = new MeshStandardMaterial({ color: 0x1976b7, roughness: 0.48 });
        const slabs = new MeshStandardMaterial({ color: 0xcce8f9, roughness: 0.75, transparent: true, opacity: 0.72 });
        const foundation = new MeshStandardMaterial({ color: 0xa9c9e2, roughness: 0.8 });
        const highlight = new MeshStandardMaterial({ color: 0xff9e29, roughness: 0.45 });
        const outlines = new LineBasicMaterial({ color: 0x0e598b, opacity: 0.5, transparent: true });
        const geometries: BufferGeometry[] = [];

        function addBox(width: number, height: number, depth: number, x: number, y: number, z: number, material: MeshStandardMaterial) {
            const geometry = new BoxGeometry(width, height, depth);
            const edges = new EdgesGeometry(geometry);
            geometries.push(geometry, edges);
            const box = new Mesh(geometry, material);
            box.position.set(x, y, z);
            box.add(new LineSegments(edges, outlines));
            scene.add(box);
        }

        const columns = [-2.55, 0, 2.55];
        const rows = [-1.7, 1.7];
        addBox(6.1, 0.22, 4.3, 0, 0.1, 0, foundation);

        for (const x of columns) {
            for (const z of rows) {
                addBox(0.24, 4.2, 0.24, x, 2.2, z, x === 2.55 && z === 1.7 ? highlight : frame);
            }
        }

        for (const y of [1.48, 2.85, 4.22]) {
            for (const z of rows) addBox(5.35, 0.21, 0.2, 0, y, z, z > 0 ? highlight : frame);
            for (const x of columns) addBox(0.2, 0.21, 3.6, x, y, 0, frame);
            addBox(5.6, 0.1, 3.82, 0, y + 0.16, 0, slabs);
        }

        const grid = new GridHelper(17, 24, 0x75a5c8, 0xaccde4);
        scene.add(grid, new AmbientLight(0xffffff, 2));
        const sun = new DirectionalLight(0xffffff, 2.5);
        sun.position.set(5, 9, 7);
        scene.add(sun);

        const render = () => renderer.render(scene, camera);
        const resize = new ResizeObserver(() => {
            const width = host.clientWidth;
            const height = host.clientHeight;
            if (!width || !height) return;

            const aspect = width / height;
            const halfHeight = Math.max(4.1, 4.6 / aspect);
            camera.left = -halfHeight * aspect;
            camera.right = halfHeight * aspect;
            camera.top = halfHeight;
            camera.bottom = -halfHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height, false);
            render();
        });

        const handleContextLoss = (event: Event) => {
            event.preventDefault();
            setAvailable(false);
        };

        resize.observe(host);
        controls.addEventListener('change', render);
        renderer.domElement.addEventListener('webglcontextlost', handleContextLoss);
        view.current = {
            rotate(angle) {
                camera.position.sub(controls.target).applyAxisAngle(up, angle).add(controls.target);
                controls.update();
            },
            reset: () => controls.reset(),
        };

        return () => {
            view.current = null;
            resize.disconnect();
            renderer.domElement.removeEventListener('webglcontextlost', handleContextLoss);
            controls.dispose();
            geometries.forEach((geometry) => geometry.dispose());
            [frame, slabs, foundation, highlight, outlines].forEach((material) => material.dispose());
            grid.dispose();
            renderer.dispose();
            renderer.domElement.remove();
        };
    }, []);

    return (
        <div className="cn-structure">
            <div className="cn-model-canvas" ref={viewport} hidden={!available} />
            {available ? (
                <div className="cn-model-toolbar" role="group" aria-label="Structural model controls">
                    <button type="button" onClick={() => view.current?.rotate(Math.PI / 6)}>Rotate left</button>
                    <button type="button" onClick={() => view.current?.rotate(-Math.PI / 6)}>Rotate right</button>
                    <button type="button" onClick={() => view.current?.reset()}>Reset</button>
                </div>
            ) : (
                <>
                    <div className="cn-model-diagram" aria-hidden="true"><i /><i /><i /></div>
                    <p className="cn-model-message" role="status">3D is unavailable on this device.</p>
                </>
            )}
        </div>
    );
}
