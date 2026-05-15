import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js';

async function init() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 25;
    camera.position.y = -5;

    const container = document.getElementById('three-container');
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize( 600, 400 );
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
    scene.add(ambientLight);

    try {
        const response = await fetch('/datasets/osa-radial-560-ljg_srgbhex.tsv');
        const data = await response.text();
        const lines = data.trim().split('\n');

        const sphereGeometry = new THREE.SphereGeometry(0.75, 16, 16);

        lines.forEach(line => {
            const parts = line.split('\t');
            if (parts.length >= 4) {
                const x = parseFloat(parts[0]);
                const y = parseFloat(parts[1]);
                const z = parseFloat(parts[2]);
                const colorHex = parts[3].trim();

                const material = new THREE.MeshPhongMaterial({ color: colorHex });
                const sphere = new THREE.Mesh(sphereGeometry, material);
                sphere.position.set(x, y, z);
                scene.add(sphere);
            }
        });
    } catch (error) {
        console.error('Error loading TSV data:', error);
    }

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(600, 400);
    });
}

init();
