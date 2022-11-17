
import { getPlayerMesh } from "../loader/3dloader.js";

import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

class Player {
    
    constructor( scene )
    {
       
        let myPlayer = this;
        const loader = new GLTFLoader();

        loader.load( '/assets/animating_warlock.glb', function ( object ) {

            myPlayer.mixer = new THREE.AnimationMixer( object.scene );
            //this.mixer = myPlayer.mixer
            console.log(object.animations)
            if ( object.animations[0] != null )
            {
                const action = myPlayer.mixer.clipAction( object.animations[ 2 ] );
                if(action)action.play();
            }


            myPlayer.model = object.scene;

           /*  let objMatrix = new THREE.Matrix4();
            objMatrix.makeScale( 0.01,0.01,0.01);
            myPlayer.model.applyMatrix4( objMatrix );
            myPlayer.model.matrixAutoUpdate = false; */

            scene.add( myPlayer.model );
        } );
    }

    update(){
    const deltaTime = 1/60;
		if ( this.mixer )
			{
				this.mixer.update( deltaTime );
			} 
    }

}

export {Player};

/* let playerMesh;
let mixer;
let clips;

export function initPlayerMesh(){
    playerMesh = getPlayerMesh();
    mixer = new THREE.AnimationMixer(playerMesh)
    clips = playerMesh.animations;
}
export function updateAnims() {
    //mixer.update(deltaSeconds);
    const clip = THREE.AnimationClip.findByName( clips, 'idle' );
    const action = mixer.clipAction( clip );
    action.play();
} */