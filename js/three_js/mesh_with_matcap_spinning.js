// [2605] n8 + Gemini CLI
//
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { PLYLoader } from 'three/addons/loaders/PLYLoader.js';


const wide = 600
const high = 400

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(75, wide /high, 0.1, 1000);
camera.position.x = 2.5;

const container = document.getElementById('three-container');
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( wide, high );
container.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load('/images/www/736655_D9D8D5_2F281F_B1AEAB-512px.png');

const matcapMaterial = new THREE.MeshMatcapMaterial({
    matcap: matcapTexture
});

let mesh;
const loader = new PLYLoader();
loader.load('/meshes/2605-test_twist_number_2.ply', function (geometry) {
    geometry.computeVertexNormals();

    mesh = new THREE.Mesh(geometry, matcapMaterial);

    scene.add(mesh);
});


function animate(time) {
    requestAnimationFrame(animate);
    if (mesh !== undefined) {
        // mesh.rotation.x = time / 20000;
        // mesh.rotation.y = time / 10000;
        // mesh.rotation.z = time / 50000;

        mesh.rotation.x = time / 2000;
        mesh.rotation.y = time / 1000;
        mesh.rotation.z = time / 5000;
    }

    renderer.render(scene, camera);
}
animate();

