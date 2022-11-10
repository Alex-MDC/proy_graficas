import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";


const xSpeed = 0.4;
const zSpeed = .4;
let keyMap = [];
document.addEventListener("keydown", onDocumentKeyDown, true); 
document.addEventListener("keyup", onDocumentKeyUp, true);
function onDocumentKeyDown(event){ 
    let keyCode = event.keyCode;
    keyMap[keyCode] = true;
}
function onDocumentKeyUp(event){
    let keyCode = event.keyCode;
    keyMap[keyCode] = false;
}
export function executeMovement(cube){
    if (keyMap[87]) {
        cube.position.z -= zSpeed;
    } 
    if (keyMap[83]) {
        cube.position.z += zSpeed;
    } 
    if (keyMap[65]) {
        cube.position.x -= xSpeed;
    }
    if (keyMap[68]) {
        cube.position.x += xSpeed;
    } 
    if (keyMap[32]) {
        cube.position.set(-.2,.5,0)
    }
}
