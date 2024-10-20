import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvas = document.getElementById('canvas');

// 1. Create Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('white');

//2. Add Camera
const camera = new THREE.PerspectiveCamera(750,window.innerWidth / window.innerHeight, 0.1,1000);
camera.position.z = 25;

//3. Add Objects
const geometry = new THREE.SphereGeometry( 1.2,16, 32 );
const material = new THREE.MeshStandardMaterial({color: '#1aa0c1', emissive : '#4b4e77'})
const ball = new THREE.Mesh(geometry, material);

const coneGeometry = new THREE.ConeGeometry( 1, 3, 32 ); 
const coneMaterial = new THREE.MeshStandardMaterial({color: '#aa5b41', emissive : '#774b6e'})
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
cone.position.y = -2.5;
cone.rotateX(3.15)

const planeGeometry = new THREE.PlaneGeometry(6,6,4,4);
const planeMaterial = new THREE.MeshStandardMaterial( { color: 0x00ff00 } )
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.receiveShadow = true;
plane.rotateX(-2)
plane.position.y = -4;

scene.add(ball);
scene.add(cone);
scene.add( plane );

//4. Add Lights
const light = new THREE.DirectionalLight( 0xffffff, 1);
light.castShadow = true;
light.position.set(1,1,1);

scene.add(light);

//5. Add Render
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.setPixelRatio);

//6.Add Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = true;

//7. Add Animations
function animate() {
  requestAnimationFrame(animate);

  ball.rotation.y += 0.01;
  cone.rotation.y += 0.01;

  controls.update();
  renderer.render(scene,camera);
}

//8. Handle window resizing
window.addEventListener('resize', ()=>{
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
})

animate();