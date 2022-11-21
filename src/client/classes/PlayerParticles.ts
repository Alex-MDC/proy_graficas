import * as THREE from 'three';



export class PlayerParticles
{
    public vertices: number[][]=[];
    public particleTimers: number[] = [];
    public particleOffsets: THREE.Vector3[]=[];
    public parameters: any[]=[]; 
    public materials: any[]=[];
    public geometry: any;
    public particles: THREE.Points<any, any> | undefined;
    public particlesCount: number;
    private toggleOn: boolean = true;

    constructor(
        sprite: THREE.Texture,
        geometry: THREE.BufferGeometry,
        //textureLoader: THREE.TextureLoader,
        particlesCount: number        
        ){
            this.particlesCount = particlesCount;
            //super(sprite,geometry,textureLoader,particlesCount)
            for ( let i = 0; i < particlesCount; i++ ) {

                const x = Math.random() * 1000 - 500;
                const y = Math.random() * 1000 - 500;
                const z = Math.random() * 1000 - 500;
        
                this.particleTimers[i] = Math.random();
                this.particleOffsets[i] = new THREE.Vector3();
        
                this.vertices.push( x, y, z );
                
            }
            this.geometry = geometry;
            this.geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( this.vertices, 3 ) );
        
          /*   this.parameters = [
                [[ 1.0, 0.2, 0.5 ], sprite, .5 ]
            ];
        
            this.materials = []; */
            
        }
        
        
    

    public update( player:any, delta:number ) :void
    {
        for ( let i = 0; i < this.materials.length; i ++ ) {

            const color = this.parameters[ i ][ 0 ];

            const h = ( 360 * ( color[ 0 ] + delta ) % 360 ) / 360;
            this.materials[ i ].color.setHSL( h, color[ 1 ], color[ 2 ] );

        }
        const position = this.geometry.attributes.position.array;

        if ( player )
        {
            for ( let i = 0; i < this.particlesCount; i++ ) 
            {
                this.particleTimers[i] -= delta;

                position[i*3] = this.vertices[i][0];
                position[i*3+1] = this.vertices[i][1];
                position[i*3+2] = this.vertices[i][2];
                // position[i*3] = myPlayerShip.birdyShip.position.x;
                // position[i*3+1] = myPlayerShip.birdyShip.position.y;
                // position[i*3+2] = myPlayerShip.birdyShip.position.z;

                let maxTime = .25;
                let timeLeft = (maxTime - this.particleTimers[i]);

                position[i*3] += timeLeft*this.particleOffsets[i].x + .05 - .1*Math.random();
                position[i*3+1] += timeLeft*this.particleOffsets[i].y + .01 - .02*Math.random();
                position[i*3+2] += timeLeft*this.particleOffsets[i].z + .05 - .1*Math.random();

                if ( this.particleTimers[i] <= 0.0 )
                {
                    this.particleTimers[i] = maxTime;

                    let xAxis=new THREE.Vector3();
                    let yAxis=new THREE.Vector3();
                    let zAxis=new THREE.Vector3();
                    //myPlayerShip.birdyShip = gltf
                    //myPlayerShip.birdyShip.matrix.extractBasis(xAxis,yAxis,zAxis);
                    player.gltfObject.matrix.extractBasis(xAxis,yAxis,zAxis);
    
                    this.particleOffsets[i].set(0,0,0);
                    this.particleOffsets[i].addScaledVector( xAxis, -200 );
                    this.particleOffsets[i].addScaledVector( zAxis, -20 + 40*Math.random() );
    
                }
            }
        }

        this.geometry.attributes.position.needsUpdate = true;
    }
}
