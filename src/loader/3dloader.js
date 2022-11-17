/* import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js"; */

import { returnScene } from "../sceneScript/scene.js";

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { initPlayerMesh } from "../animation/playerAnim.js";

const loader = new GLTFLoader();
//const loader = new THREE.GLTFLoader();
//let scene = returnScene();
let player;
export function initPlayerModel() {
	loader.load( '/assets/animating_warlock.glb', function ( gltf ) {
		let scene = returnScene();
		
		player = gltf.scene
		player.scale.set(1,1,1);
		scene.add( gltf.scene );
		//initPlayerMesh();

	}, undefined, function ( error ) {

		console.error( error );

	} );
}

export function getPlayerMesh() {
	return player;
}