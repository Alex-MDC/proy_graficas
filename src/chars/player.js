


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
        myPlayer.currentAnim = 4; //idle

        
        loader.load( '/assets/animating_warlock.glb', function ( object ) {

            myPlayer.mixer = new THREE.AnimationMixer( object.scene );
            myPlayer.animations = object.animations
            
            console.log(object.animations)
           /*  if ( object.animations[0] != null )
            {
                const action = myPlayer.mixer.clipAction( object.animations[ 4 ] );
                if(action)action.play();
            } */


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
        const deltaTime = 1/60;
        let lastAnimAction = this.mixer.clipAction(this.animations[this.currentAnim]);
        let newAnimAction;
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
           /*  lastAnimAction.fadeOut( 0.2 );
            this.currentAnim = 5
            newAnimAction = this.mixer.clipAction(this.animations[this.currentAnim]);
            newAnimAction.fadeIn( 0.2 );
            newAnimAction.reset();
            newAnimAction.play();
 */
        } 
        if (keyMap[32]) {
            //cube.position.set(-.2,.5,0)
            this.model.position.set(-.2,.5,0)
        }

        this.mixer.update( deltaTime );
    };

    playerAnimsHandler(){
        let lastAnimAction = this.mixer.clipAction(this.animations[this.currentAnim]);
        let newAnimAction;
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
            lastAnimAction.fadeOut( 0.2 );
            this.currentAnim = 5
            newAnimAction = this.mixer.clipAction(this.animations[this.currentAnim]);
            newAnimAction.fadeIn( 0.2 );
            newAnimAction.reset();
            newAnimAction.play();

        } 
        if (keyMap[32]) {
            //cube.position.set(-.2,.5,0)
            this.model.position.set(-.2,.5,0)
        }
    }
}

export {Player};

function onDocumentKeyDown(event){ 
    let keyCode = event.keyCode;
    keyMap[keyCode] = true;
    playerAnimsHandler()
}

function onDocumentKeyUp(event){
    let keyCode = event.keyCode;
    keyMap[keyCode] = false;
}

function playerAnimsHandler(Player){
    let lastAnimAction = Player.mixer.clipAction(Player.animations[Player.currentAnim]);
    let newAnimAction;
    if (keyMap[65]) { //left runn back
       
    }
    if (keyMap[68]) { //right run normal
        lastAnimAction.fadeOut( 0.2 );
        Player.currentAnim = 5
        newAnimAction = Player.mixer.clipAction(Player.animations[Player.currentAnim]);
        newAnimAction.fadeIn( 0.2 );
        newAnimAction.reset();
        newAnimAction.play();

    } 
   
}