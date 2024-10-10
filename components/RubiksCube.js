import * as THREE from 'three'

class RubiksCube {
    constructor () {
        this.cubePositions = this.generateCubePositions();
        this.rubiksArray = this.generateCubeFaceState();
        this.cube = new THREE.Group();
        this.pieces = [];
        this.cubeFaceMapping = {
            0: {
                0: [0,0], // front 
                1: null, // back
                2: null, // top
                3: [3,6],// bottom
                4: null, // left
                5: [5,2]// right
            },
            1: {
                0: [0,1], // front 
                1: null, // back
                2: null, // top
                3: [3,7],// bottom
                4: null, // left
                5: null// right
            },
            2: {
                0: [0,2], // front 
                1: null, // back
                2: null, // top
                3: [3,8],// bottom
                4: [4,0], // left
                5: null// right
            },
            3: {
                0: [0,3], // front 
                1: null, // back
                2: null, // top
                3: null,// bottom
                4: null, // left
                5: [5,5]// right
            },
            4: {
                0: [0,4], // front 
                1: null, // back
                2: null, // top
                3: null,// bottom
                4: null, // left
                5: null// right
            },
            5: {
                0: [0,5], // front 
                1: null, // back
                2: null, // top
                3: null,// bottom
                4: [4,3], // left
                5: null// right
            },
            6: {
                0: [0,6], // front 
                1: null, // back
                2: [2,0], // top
                3: null,// bottom
                4: null, // left
                5: [5,8]// right
            },
            7: {
                0: [0,7], // front 
                1: null, // back
                2: [2,1], // top
                3: null,// bottom
                4: null, // left
                5: null// right
            },
            8: {
                0: [0,8], // front 
                1: null, // back
                2: [2,2], // top
                3: null,// bottom
                4: [4,6], // left
                5: null// right
            },
        
            9: {
                0: null, // front 
                1: null, // back
                2: null, // top
                3: [3,3],// bottom
                4: null, // left
                5: [5,1]// right
            },
            10: {
                0: null, // front 
                1: null, // back
                2: null, // top
                3: [3,4],// bottom
                4: null, // left
                5: null// right
            },
            11: {
                0: null, // front 
                1: null, // back
                2: null, // top
                3: [3,5],// bottom
                4: [4,1], // left
                5: null// right
            },
            12: {
                0: null, // front 
                1: null, // back
                2: null, // top
                3: null,// bottom
                4: null, // left
                5: [5,4]// right
            },
            13: {
                0: null, // front 
                1: null, // back
                2: null, // top
                3: null,// bottom
                4: null, // left
                5: null// right
            },
            14: {
                0: null, // front 
                1: null, // back
                2: null, // top
                3: null,// bottom
                4: [4,4], // left
                5: null// right
            },
            15: {
                0: null, // front 
                1: null, // back
                2: [2,3], // top
                3: null,// bottom
                4: null, // left
                5: [5,7]// right
            },
            16: {
                0: null, // front 
                1: null, // back
                2: [2,4], // top
                3: null,// bottom
                4: null, // left
                5: null// right
            },
            17: {
                0: null, // front 
                1: null, // back
                2: [2,5], // top
                3: null,// bottom
                4: [4,7], // left
                5: null// right
            },
        
            18: {
                0: null, // front 
                1: [1,2], // back
                2: null, // top
                3: [3,0],// bottom
                4: null, // left
                5: [5,0]// right
            },
            19: {
                0: null, // front 
                1: [1,1], // back
                2: null, // top
                3: [3,1],// bottom
                4: null, // left
                5: null// right
            },
            20: {
                0: null, // front 
                1: [1,0], // back
                2: null, // top
                3: [3,2],// bottom
                4: [4,2], // left
                5: null// right
            },
            21: {
                0: null, // front 
                1: [1,5], // back
                2: null, // top
                3: null,// bottom
                4: null, // left
                5: [5,3]// right
            },
            22: {
                0: null, // front 
                1: [1,4], // back
                2: null, // top
                3: null,// bottom
                4: null, // left
                5: null// right
            },
            23: {
                0: null, // front 
                1: [1,3], // back
                2: null, // top
                3: null,// bottom
                4: [4,5], // left
                5: null// right
            },
            24: {
                0: null, // front 
                1: [1,8], // back
                2: [2,6], // top
                3: null,// bottom
                4: null, // left
                5: [5,6]// right
            },
            25: {
                0: null, // front 
                1: [1,7], // back
                2: [2,7], // top
                3: null,// bottom
                4: null, // left
                5: null// right
            },
            26: {
                0: null, // front 
                1: [1,6], // back
                2: [2,8], // top
                3: null,// bottom
                4: [4,8], // left
                5: null// right
            }
        };
    }

    generateCubeFaceState() {
        return [
            Array(9).fill('#ff5800'), // orange
            Array(9).fill('#0046ad'), // blue
            Array(9).fill('#ffd500'), // yellow
            Array(9).fill('#b71234'), // red
            Array(9).fill('#009b48'), // green
            Array(9).fill('#ffffff'), // white
        ]
    };
    
    generateCubePositions() {
        let positions = [];
        
        for (let z = 1; z>=-1; z--) {
            for (let y = -1; y<=1; y++) {
                for (let x = 1; x>=-1; x--) {
                    positions.push([x,y,z]);
                }
            }
        }
    
        return positions;
    };    

    generateModel() {
        const cubeMaterial = new THREE.MeshBasicMaterial({color:'#111111'});
        const cubeGeometry = new THREE.BoxGeometry(0.97,0.97,0.97);

        const faceGeometry = new THREE.PlaneGeometry(0.8,0.8);
        const faceMaterial = new THREE.MeshBasicMaterial();

        // const faceMaterials = [
        //     new THREE.MeshBasicMaterial({ color: '#FF0000' }), // Front face
        //     new THREE.MeshBasicMaterial({ color: '#00FF00' }), // Back face
        //     new THREE.MeshBasicMaterial({ color: '#0000FF' }), // Top face
        //     new THREE.MeshBasicMaterial({ color: '#FFFF00' }), // Bottom face
        //     new THREE.MeshBasicMaterial({ color: '#FF00FF' }), // Left face
        //     new THREE.MeshBasicMaterial({ color: '#00FFFF' }), // Right face
        // ];

        this.cubePositions.forEach((position, index) => {
            const piece = new THREE.Mesh(cubeGeometry, cubeMaterial);
            piece.position.set(position[0], position[1], position[2]);

            // Create and add planes for each of the six faces
            const faces = [];
            const mapping = this.cubeFaceMapping[index];

            if(mapping[0] != null) {
                // Front face (Z-positive)
                const faceFront = new THREE.Mesh(faceGeometry, new THREE.MeshBasicMaterial({color: this.rubiksArray[mapping[0][0]][mapping[0][1]]}));
                faceFront.position.set(0, 0, 0.5); // Slightly offset forward
                faces.push(faceFront);
            }

            if(mapping[1]) {
                // Back face (Z-negative)
                const faceBack = new THREE.Mesh(faceGeometry,  new THREE.MeshBasicMaterial({color: this.rubiksArray[mapping[1][0]][mapping[1][1]]}));
                faceBack.position.set(0, 0, -0.5); // Slightly offset backward
                faceBack.rotation.y = Math.PI;       // Rotate to face backward
                faces.push(faceBack);
            }

            if(mapping[2]) {
                // Top face (Y-positive)
                const faceTop = new THREE.Mesh(faceGeometry,  new THREE.MeshBasicMaterial({color: this.rubiksArray[mapping[2][0]][mapping[2][1]]}));
                faceTop.position.set(0, 0.5, 0);   // Slightly offset upward
                faceTop.rotation.x = -Math.PI / 2;   // Rotate to face upward
                faces.push(faceTop);
            }

            if(mapping[3]) {
                // Bottom face (Y-negative)
                const faceBottom = new THREE.Mesh(faceGeometry,  new THREE.MeshBasicMaterial({color: this.rubiksArray[mapping[3][0]][mapping[3][1]]}));
                faceBottom.position.set(0, -0.5, 0); // Slightly offset downward
                faceBottom.rotation.x = Math.PI / 2;   // Rotate to face downward
                faces.push(faceBottom);
            }

            if(mapping[4]) {
                // Left face (X-negative)
                const faceLeft = new THREE.Mesh(faceGeometry,  new THREE.MeshBasicMaterial({color: this.rubiksArray[mapping[4][0]][mapping[4][1]]}));
                faceLeft.position.set(-0.5, 0, 0);   // Slightly offset left
                faceLeft.rotation.y = -Math.PI / 2;     // Rotate to face left
                faces.push(faceLeft);
            }

            if(mapping[5]) {
                // Right face (X-positive)
                const faceRight = new THREE.Mesh(faceGeometry,  new THREE.MeshBasicMaterial({color: this.rubiksArray[mapping[5][0]][mapping[5][1]]}));
                faceRight.position.set(0.5, 0, 0);   // Slightly offset right
                faceRight.rotation.y = Math.PI / 2;   // Rotate to face right
                faces.push(faceRight);
            }

            // Add all faces to the cube piece
            faces.forEach(face => piece.add(face));

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
