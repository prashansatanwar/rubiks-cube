import * as THREE from 'three'

const cubeFaceMapping = {

}

class RubiksCube {
    constructor () {
        this.cubePositions = this.generateCubePositions();
        this.rubiksArray = this.generateCubeFaceState();
        this.cube = new THREE.Group();
        this.pieces = [];
    }

    generateCubeFaceState() {
        return [
            Array(9).fill('O'),
            Array(9).fill('B'),
            Array(9).fill('Y'),
            Array(9).fill('R'),
            Array(9).fill('G'),
            Array(9).fill('W'),
        ]
    };
    
    generateCubePositions() {
        let positions = [];
        
        for (let x = 1; x>=-1; x--) {
            for (let y = -1; y<=1; y++) {
                for (let z = 1; z>=-1; z--) {
                    positions.push([x,y,z]);
                }
            }
        }
    
        return positions;
    };    

    generateModel() {
        const cubeMaterial = new THREE.MeshBasicMaterial({color:'#ffeded'});
        const cubeGeometry = new THREE.BoxGeometry(0.97,0.97,0.97);

        this.cubePositions.forEach((position, index) => {
            const piece = new THREE.Mesh(cubeGeometry, cubeMaterial);
            piece.position.set(position[0], position[1], position[2]);

            this.pieces.push(piece);
            this.cube.add(piece);
        });
    }

    init() {
        this.generateModel();
    }

    getCube() {
        return this.cube;
    }
}

export default RubiksCube;
