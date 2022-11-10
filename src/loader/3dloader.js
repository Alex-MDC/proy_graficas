import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";
import { returnScene } from "../sceneScript/scene.js";
const loader = new GLTFLoader();
//const loader = new THREE.GLTFLoader();
let scene = returnScene();
loader.load( '/public/wolf-fixed.glb', function ( gltf ) {

	
	let wolf = gltf.scene
	wolf.scale.set(5,5,5);
	scene.add( gltf.scene );
	

}, undefined, function ( error ) {

	console.error( error );

} );