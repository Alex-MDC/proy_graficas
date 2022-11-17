


import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let keyMap = [];
document.addEventListener("keydown", onDocumentKeyDown, true); 
document.addEventListener("keyup", onDocumentKeyUp, true);
class Player {
    

    constructor( scene )
    {
       
        let myPlayer = this;
        const loader = new GLTFLoader();
        
       
        myPlayer.xSpeed = 0.4;
        myPlayer.zSpeed = 0.4;
        myPlayer.keyMap = [];

        
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
            myPlayer.model.rotateY(1)
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
    };

    //movement
    
  
    MovePlayer(){
        
        if (keyMap[87]) {
            //cube.position.z -= this.zSpeed;
            this.model.position.z -= this.zSpeed
        } 
        if (keyMap[83]) {
            //cube.position.z += this.zSpeed;
            this.model.position.z += this.zSpeed
        } 
        if (keyMap[65]) {
            //cube.position.x -= this.xSpeed;
            this.model.position.x -= this.xSpeed
        }
        if (keyMap[68]) {
            //cube.position.x += this.xSpeed;
            this.model.position.x += this.xSpeed
        } 
        if (keyMap[32]) {
            //cube.position.set(-.2,.5,0)
            this.model.position.set(-.2,.5,0)
        }
    };

}

export {Player};

function onDocumentKeyDown(event){ 
    let keyCode = event.keyCode;
    keyMap[keyCode] = true;
}
function onDocumentKeyUp(event){
    let keyCode = event.keyCode;
    keyMap[keyCode] = false;
}