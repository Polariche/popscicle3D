import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Set scene & camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth /3*2 / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth/3*2, window.innerHeight );
renderer.setAnimationLoop( animate );
renderer.setClearColor( 0xEEEEEE );

document.body.getElementsByClassName("canvas")[0].appendChild( renderer.domElement );

// Add Orbit Controls
const controls = new OrbitControls( camera, renderer.domElement );


// Add Meshes & Materials
const loader = new GLTFLoader();


const popsicle_body_geometry = new THREE.BoxGeometry( 1, 1, 1 );
const popsicle_body_material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
const popsicle_body = new THREE.Mesh( popsicle_body_geometry, popsicle_body_material );
scene.add( popsicle_body );


popsicle_body.position.y -= 0.5;


const popsicle_head_geometry = new THREE.BoxGeometry( 1, 1, 1 );
const popsicle_head_material = new THREE.MeshPhongMaterial( { color: 0xffffff } );
const popsicle_head = new THREE.Mesh( popsicle_head_geometry, popsicle_head_material );
scene.add( popsicle_head );


popsicle_body.position.y -= 0.5;

camera.position.z = 5;

// Add Lights
const color = 0xFFFFFF;
const intensity = 1;
const ambientLight = new THREE.AmbientLight(color, intensity);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(color, intensity);
dirLight.position.set(0, 10, 0);
dirLight.target.position.set(-5, 0, 0);
scene.add(dirLight);
scene.add(dirLight.target);



function resizeRendererToDisplaySize( renderer ) {

    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if ( needResize ) {

        renderer.setSize( width, height, false );

    }
    return needResize;

}


function animate() {
    if ( resizeRendererToDisplaySize( renderer ) ) {

        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();

    }

  renderer.render( scene, camera );
}



// Handle material color changes by button

function setMaterialColor(material, color) {
    material.color.setHex(color);
}


document.getElementsByClassName("head_col_red")[0].addEventListener('click',function() {setMaterialColor(popsicle_head_material, 0xff0000)});
document.getElementsByClassName("head_col_blue")[0].addEventListener('click',function() {setMaterialColor(popsicle_head_material, 0x00ff00)});
document.getElementsByClassName("head_col_green")[0].addEventListener('click',function() {setMaterialColor(popsicle_head_material, 0x0000ff)});



document.getElementsByClassName("body_col_red")[0].addEventListener('click',function() {setMaterialColor(popsicle_body_material, 0xff0000)});
document.getElementsByClassName("body_col_blue")[0].addEventListener('click',function() {setMaterialColor(popsicle_body_material, 0x00ff00)});
document.getElementsByClassName("body_col_green")[0].addEventListener('click',function() {setMaterialColor(popsicle_body_material, 0x0000ff)});