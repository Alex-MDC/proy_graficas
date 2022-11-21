import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import { Player } from './classes/Player'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {  GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import CannonDebugRenderer from './utils/cannonDebugRenderer'
import CannonUtils from './utils/cannonUtils'
import { MySkybox } from './classes/MySkybox'
import { PlayerParticles } from './classes/PlayerParticles'
//Scene
const scene = new THREE.Scene()
scene.background = null

//Camera
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,2000)
camera.position.set(0, 2, 10)

//Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)
renderer.shadowMap.enabled = true

//Skybox
let mySkybox = new MySkybox( scene );
//World
const world = new CANNON.World()
world.gravity.set(0, -9.82, 0)

// Cannon debugger
const cannonDebugRenderer = new CannonDebugRenderer(scene, world)

//Loading textures
const textureLoader = new THREE.TextureLoader()

//GLTF Loader
const loader = new GLTFLoader()


// Contorls
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true
orbitControls.minDistance = 5
orbitControls.maxDistance = 15
orbitControls.enablePan = false
orbitControls.maxPolarAngle = Math.PI / 2 - 0.05
orbitControls.update();


light() //Light
createPlane() // Plane

let player : Player = createPlayer() //Player

const enemyCube = new THREE.Mesh(
    new THREE.BoxGeometry(2,2,2),
    new THREE.MeshPhongMaterial({color: 0x33333})
)
enemyCube.position.set(7,1,0)
scene.add(enemyCube)


const clock = new THREE.Clock()
function animate() : void {
    const delta = clock.getDelta()
    world.step(Math.min(delta, 0.1))
    // checkForTarget()

    player ? player.update(delta,keysPressed) : null
    playerParticles ? playerParticles.update(player,delta) : null
    cannonDebugRenderer.update()
    orbitControls.update()
    mySkybox.update( camera );
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}
animate()

//Things forgotten by the hand of god

// Player
function createPlayer() : Player {
    loader.load('/models/warlock.glb',function (gltf) {
        const model = gltf.scene
        const gltfAnimations: THREE.AnimationClip[] = gltf.animations
        const mixer = new THREE.AnimationMixer(model)
        const animationMap: Map<string, THREE.AnimationAction> = new Map()
        gltfAnimations.filter(a=> a.name != 'Armature.001|mixamo.com|Layer0').forEach((a:THREE.AnimationClip)=>{
            animationMap.set(a.name,mixer.clipAction(a))
        })
        const shape =  new CANNON.Cylinder(1, 1, 4, 12)
        const body = new CANNON.Body({ mass: 1, shape: shape})
        body.position.y = 7
        model.name = 'Warlock'
        model.traverse((object: any)=>{if(object.isMesh) object.castShadow = true})
        scene.add(model)
        world.addBody(body)
        player = new Player(model,mixer,animationMap,'idle',body)
        player.matrix = gltf.scene.matrix;
        console.log(player.matrix)
        }
    )
    
    return player
}

let playerParticles = createPlayerParticles();
//player particles
function createPlayerParticles() : PlayerParticles {
    const sprite = textureLoader.load("./textures/particles/spark1.png");
    const geometry = new THREE.BufferGeometry();
    const particlesCount = 15;
    playerParticles = new PlayerParticles(sprite,geometry,particlesCount);
    playerParticles.parameters = [
        [[ 1.0, 0.2, 0.5 ], sprite, 2 ]
    ];
    playerParticles.materials = [];
    for ( let i = 0; i < playerParticles.parameters.length; i ++ ) {
        const color = playerParticles.parameters[ i ][ 0 ];
        const sprite = playerParticles.parameters[ i ][ 1 ];
        const size = playerParticles.parameters[ i ][ 2 ];

        playerParticles.materials[ i ] = new THREE.PointsMaterial( { size: size, map: sprite, blending: THREE.AdditiveBlending, depthTest: false, transparent: true } );
        playerParticles.materials[ i ].color.setHSL( color[ 0 ], color[ 1 ], color[ 2 ] );
        playerParticles.particles = new THREE.Points( playerParticles.geometry, playerParticles.materials[ i ] );
        scene.add( playerParticles.particles );
    }
   return playerParticles;
}

// Plane
function createPlane() : void {
    const soilBaseColor = textureLoader.load("./textures/soil/Rock_Moss_001_basecolor.jpg");
    const soilNormalMap = textureLoader.load("./textures/soil/Rock_Moss_001_normal.jpg");
    const soilHeightMap = textureLoader.load("./textures/soil/Rock_Moss_001_height.png");
    const soilRoughness = textureLoader.load("./textures/soil/Rock_Moss_001_roughness.jpg");
    const soilAmbientOcclusion = textureLoader.load("./textures/soil/Rock_Moss_001_ambientOcclusion.jpg");

    const geometrySoil = new THREE.PlaneGeometry(25, 10,200,200)
    const planeSoil = new THREE.Mesh(geometrySoil, new THREE.MeshStandardMaterial({
        map: soilBaseColor,
        normalMap: soilNormalMap,
        displacementMap: soilHeightMap, displacementScale: 2,
        roughnessMap: soilRoughness, roughness: 0,
        aoMap: soilAmbientOcclusion
    }));

    planeSoil.rotateX(-Math.PI / 2)
    planeSoil.receiveShadow = true;
    planeSoil.receiveShadow = true
    planeSoil.position.y = -1
    scene.add(planeSoil)
    const planeShape = new CANNON.Plane()
    const planeBody = new CANNON.Body({ mass: 0, shape: planeShape})
    planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2)
    world.addBody(planeBody)

}

// Lights
function light() : void {
    scene.add(new THREE.AmbientLight(0xffffff, 0.7))
    const dirLight = new THREE.DirectionalLight(0xffffff, 1)
    dirLight.position.set(- 60, 100, - 10);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 50;
    dirLight.shadow.camera.bottom = - 50;
    dirLight.shadow.camera.left = - 50;
    dirLight.shadow.camera.right = 50;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 200;
    dirLight.shadow.mapSize.width = 4096;
    dirLight.shadow.mapSize.height = 4096;
    scene.add(dirLight);
    // scene.add( new THREE.CameraHelper(dirLight.shadow.camera))
}

// Resize handler
function onWindowResize() : void {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
}
window.addEventListener('resize', onWindowResize, false)

// Player controller
const keysPressed  = { }
window.addEventListener("keydown", (event) => {
    if(event.shiftKey && player){
        player.switchRunToggle()
    }else{
        (keysPressed as any)[event.key.toLowerCase()] = true
    }
    event.preventDefault();
}, false)
document.addEventListener('keyup', (event) => {
    (keysPressed as any)[event.key.toLowerCase()] = false
}, false)
window.addEventListener('mousedown',(e)=>{
    setTimeout(function() {
        console.log('hi')

      }, 500);
})

