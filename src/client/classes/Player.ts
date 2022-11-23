import * as THREE from 'three'
import * as CANNON from 'cannon-es'

import { Model } from './Model'
import { Matrix4 } from 'three'

export class Player extends Model{
    private readonly name: string = "Warlock"
    private readonly fadeDuration: number = .2
    private readonly runVelocity:number = .7
    private readonly walkVelocity:number = .3
    private toggleRun: boolean = true
    private shooting: boolean = false
    //gltf object
    public gltfObject: any;
    public matrix: THREE.Matrix4 = new Matrix4
    //animation durations
    private readonly attack1Hduration: number = 800
    private timeAttacking =5000;
    private boundCastA = this.castA.bind(this);
    private boundswitcShooting = this.switchShooting.bind(this)

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
        this.shooting = !this.shooting;
        console.log('shoot toggle')
    }
    public getShooting():boolean{
        return this.shooting
    }


    public update(delta:number, keysPressed:any, mouseButtonsPressed:any) : void{
        const directionPressed = ['w','a','s','d'].some(key => keysPressed[key] == true)
        let attack_1 =['0'].some(key => mouseButtonsPressed[key] == true)
        let attack_2 =['2'].some(key => mouseButtonsPressed[key] == true)
        //attack press
        let play = '' //current anim
        if (directionPressed && this.toggleRun) {
            play = 'walk'
        } else if (directionPressed) {
            play = 'run.001' //walking
        } else if(attack_1 ){
            // 1h_attack
            play = '1H_attack'
            //play attack only if casting is done fully
          this.mixer.addEventListener( 'loop', this.boundCastA)
        }
        else if(attack_2){
            play = '2H_attack'
            //this.castA()
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
        this.mixer.removeEventListener('loop',this.boundCastA)
    }

    public getPosition():CANNON.Vec3 {
        return this.body.position;
    }
    public getModel(): THREE.Group {
        return this.model
    }

    //HAPPENS on full attack animation
    public castA(): void {
        console.log('function cast called',this.currentAction)
        this.switchShooting()
        setTimeout(this.boundswitcShooting, 500); 
        
    }

}
