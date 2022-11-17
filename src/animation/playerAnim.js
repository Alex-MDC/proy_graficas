
import { getPlayerMesh } from "../loader/3dloader.js";
import * as THREE from 'three'


let playerMesh;
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
}