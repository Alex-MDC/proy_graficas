import * as THREE from 'three'
import * as CANNON from 'cannon-es'

import { Model } from './Model'
import { Matrix4 } from 'three'

export class Player extends Model{
    private readonly name: string = "Warlock"
    private readonly fadeDuration: number = .2
    private readonly runVelocity:number = .4
    private readonly walkVelocity:number = .1
    private toggleRun: boolean = true
    private shooting: boolean = false
    //gltf object
    public gltfObject: any;
    public matrix: THREE.Matrix4 = new Matrix4
    //animation durations
    private readonly attack1Hduration: number = 800
    private timeAttacking =0;

    constructor(
        model: THREE.Group, 
        mixer: THREE.AnimationMixer,  
        animationsMap: Map<string, THREE.AnimationAction>,
        currentAction: string,
        body: CANNON.Body
        ){
        super(model,mixer,animationsMap,currentAction,body)
    }

    public switchRunToggle() : void {
        this.toggleRun = !this.toggleRun
    }

    public switchShooting() : void {
        this.shooting = !this.shooting
    }
    public getShooting():boolean{
        return this.shooting
    }


    public update(delta:number, keysPressed:any, mouseButtonsPressed:any) : void{
        const directionPressed = ['w','a','s','d'].some(key => keysPressed[key] == true)
        const attack_1 =['0'].some(key => mouseButtonsPressed[key] == true)
        const attack_2 =['2'].some(key => mouseButtonsPressed[key] == true)
        //attack press
        let play = '' //current anim
        if (directionPressed && this.toggleRun) {
            play = 'walk'
        } else if (directionPressed) {
            play = 'run.001' //walking
        } else if(attack_1){
            // 1h_attack
            console.log("1H_attack")
            play = '1H_attack'
            this.timeAttacking +=100
            console.log(this.timeAttacking);
            if(this.timeAttacking >=800) {
                this.timeAttacking =0;
                this.switchShooting();
            }
          //  this.switchShooting();
        }
        else if(attack_2){
            console.log("2H_attack")
            play = '2H_attack'
        }
        else {
            play = 'idle'
            this.timeAttacking =0;
        }
        if (this.currentAction != play) {
            const toPlay= this.animationsMap.get(play)
            const current = this.animationsMap.get(this.currentAction)

            current?.fadeOut(this.fadeDuration)
            toPlay?.reset().fadeIn(this.fadeDuration).play()
            //attempted to make a one time looping animation unsuccsefully, the shoot toggle updates too often most likely
           /*  if(this.shooting){
               // toPlay?.reset().fadeIn(this.attack1Hduration).play()
                //toPlay?.fadeIn(this.attack1Hduration).play()
                if (toPlay != undefined) {
                    toPlay.setLoop(THREE.LoopOnce,1).fadeIn(this.attack1Hduration).clampWhenFinished=true;
                    toPlay.play()
                }
                this.switchShooting()
            } else {
                toPlay?.reset().fadeIn(this.fadeDuration).play()
            } */
            this.currentAction = play
        }
        this.mixer.update(delta)
        if (this.currentAction == 'run.001' || this.currentAction == 'walk') {
            const velocity = this.currentAction == 'run.001' ? this.runVelocity : this.walkVelocity
            if(keysPressed.d==true){
                this.body.position.x += velocity
                this.model.rotation.y = 1.5
            }
            if(keysPressed.a==true){
                this.body.position.x -= velocity
                this.model.rotation.y = -1.5

            }
            if(keysPressed.s==true){
                this.body.position.z += velocity
                this.model.rotation.y = 0

            }
            if(keysPressed.w==true){
                this.body.position.z -= velocity
                this.model.rotation.y = 3
            }
        }
        this.model.position.set( 
            this.body.position.x,
            this.body.position.y-2,
            this.body.position.z)
    }

    public getPosition():CANNON.Vec3 {
        return this.body.position;
    }

}