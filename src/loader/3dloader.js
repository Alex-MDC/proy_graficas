/* import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js"; */

import { returnScene } from "../sceneScript/scene.js";

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
//const loader = new THREE.GLTFLoader();
let scene = returnScene();
loader.load( '/assets/animating_warlock.glb', function ( gltf ) {

	
	let player = gltf.scene
	player.scale.set(1,1,1);
	scene.add( gltf.scene );
	

}, undefined, function ( error ) {

	console.error( error );

} );