/* import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
 */
import * as THREE from 'three'
import { createGeometry,animateGeometry, cubePosition, getCube } from "./geometry.js";
import { executeMovement } from "./movement.js";
import { updateAnims } from '../animation/playerAnim.js';
import { initPlayerModel } from '../loader/3dloader.js';
import { Player } from '../chars/player.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 2000 );
const camhelper = new THREE.CameraHelper( camera );
scene.add( camhelper );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor("teal",.8); //set color of BGROUND
//TODO:Skybox
document.body.appendChild( renderer.domElement );

//adding placeholdr swuares
createGeometry(scene)
//adding ground
const GROUND_SIZE = 2000;
const groundGeometry = new THREE.BoxGeometry(GROUND_SIZE, 1, 55, 70, 1, 70);
const groundMesh = new THREE.Mesh(groundGeometry, new THREE.MeshLambertMaterial({ color: 0x227700 }));
groundMesh.position.set(0,-1,0);
scene.add(groundMesh);
//set camera
camera.position.z = 15;
camera.position.y =5;
camera.rotateOnAxis(new THREE.Vector3(0,0,0),5)

//SET light
const ambientLight = new THREE.AmbientLight("white",.7)
scene.add(ambientLight)
const light = new THREE.PointLight( "white", 3, 50,2 );
light.position.set( 10, 10, 0 );
scene.add( light );

//init player
//initPlayerModel();

let player = new Player(scene);
//animate and render
function animate() {
    requestAnimationFrame( animate );
    animateGeometry(camera)
    let cube = getCube()
    light.position.x=cube.position.x
    light.position.z=cube.position.z
    light.lookAt(cubePosition())
    
    renderer.render( scene, camera );
    executeMovement(getCube());
   // updateAnims()
   player.update()
}


export function returnScene(){
    return scene;
}

animate();