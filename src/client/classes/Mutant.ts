import * as THREE from 'three'
 import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
 import { Model } from './Model'
 import * as CANNON from 'cannon-es'

 export class Mutant extends Model{

     constructor(model: THREE.Group, 
         mixer: THREE.AnimationMixer,  
         animationsMap: Map<string, THREE.AnimationAction>,
         currentAction: string,
         body: CANNON.Body
         ) {
            
         super(model,mixer,animationsMap,currentAction,body)
     }

   


     public update(delta:number,) : void{
        // this.body.position.set(posVec.x-10,posVec.y+10,posVec.z)
        // this.model.position.set(posVec.x-10,posVec.y-2,posVec.z)
        // this.model.rotation.y = rotation.y-.3
        this.mixer.update(delta)
     }

     public attack():void {
        //todo shoot stuff
     }
 }