/* import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
 */
import * as THREE from 'three'

let cube,cube2,cube3
export function createGeometry(scene){

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshLambertMaterial( { color: "blue" } );
    cube = new THREE.Mesh( geometry, material );
    cube2 = new THREE.Mesh(
        new THREE.BoxGeometry( 2, 3, 1 ),
        new THREE.MeshLambertMaterial({color: "red"})
    );
    cube3 = new THREE.Mesh(
        new THREE.BoxGeometry( 1, 1, 1 ),
        new THREE.MeshLambertMaterial({color: "purple"})
    );
    cube3.position.set(-2,2,2);
    cube2.position.set(2,2,-10);
    cube.position.set(-.2,.5,0)
    scene.add(cube);
    scene.add(cube2);
    scene.add(cube3)
}

export function animateGeometry(camera) {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube2.rotation.x += 0.02;
    cube2.rotation.y += 0.02;
    cube3.rotation.y-=.005
    //camera.lookAt(cube.position)
    //camera.position.x=cube.position.x
}

export function cubePosition() {
    return cube.position
}

export function getCube() {
    return cube
}