import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

const container = document.getElementById('three-container');

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 6;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

/* LIGHTING */
const light = new THREE.PointLight(0x00eaff, 3);
light.position.set(5, 5, 5);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambient);

/* SAMPLE OBJECT (placeholder until you add model) */
const geometry = new THREE.TorusKnotGeometry(1, 0.3, 200, 32);
const material = new THREE.MeshStandardMaterial({
  color: 0x00eaff,
  metalness: 0.7,
  roughness: 0.2
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/* MOUSE INTERACTION */
document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;
  mesh.rotation.y = x * 0.6;
  mesh.rotation.x = y * 0.6;
});

/* ANIMATION LOOP */
function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.z += 0.003;
  renderer.render(scene, camera);
}
animate();

/* RESPONSIVE */
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
