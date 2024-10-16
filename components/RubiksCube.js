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

        this.frontLayer = [];
        this.backLayer = [];
        this.leftLayer = [];
        this.rightLayer = [];
        this.topLayer = [];
        this.bottomLayer = [];
        this.centerXLayer = [];
        this.centerYLayer = [];
        this.centerZLayer = [];

    }

    generateCubeFaceState() {
        return [
            Array(9).fill('#ff5800'), // orange front
            Array(9).fill('#b71234'), // red back
            Array(9).fill('#ffd500'), // yellow top
            Array(9).fill('#ffffff'), // white bottom
            Array(9).fill('#009b48'), // green left
            Array(9).fill('#0046ad'), // blue right
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
        const cubeGeometry = new THREE.BoxGeometry(0.99,0.99,0.99);
        const faceGeometry = new THREE.BoxGeometry(0.8,0.8,0.05);
        
        this.cubePositions.forEach((position, index) => {
            const piece = new THREE.Mesh(cubeGeometry, cubeMaterial);
            piece.position.set(position[0], position[1], position[2]);
    
            // Store the faces for this piece
            piece.faces = [];  // Initialize faces array on the piece
    
            // Create and add planes for each of the six faces
            const mapping = this.cubeFaceMapping[index];
    
            if(mapping[0] != null) {
                // Front face (Z-positive)
                const faceFront = new THREE.Mesh(faceGeometry, new THREE.MeshBasicMaterial({color: this.rubiksArray[mapping[0][0]][mapping[0][1]]}));
                faceFront.position.set(0, 0, 0.5); // Slightly offset forward
                piece.add(faceFront);
                piece.faces.push(faceFront); // Store reference to the front face
            }
    
            if(mapping[1]) {
                // Back face (Z-negative)
                const faceBack = new THREE.Mesh(faceGeometry,  new THREE.MeshBasicMaterial({color: this.rubiksArray[mapping[1][0]][mapping[1][1]]}));
                faceBack.position.set(0, 0, -0.5); // Slightly offset backward
                faceBack.rotation.y = Math.PI;       // Rotate to face backward
                piece.add(faceBack);
                piece.faces.push(faceBack); // Store reference to the back face
            }
    
            if(mapping[2]) {
                // Top face (Y-positive)
                const faceTop = new THREE.Mesh(faceGeometry,  new THREE.MeshBasicMaterial({color: this.rubiksArray[mapping[2][0]][mapping[2][1]]}));
                faceTop.position.set(0, 0.5, 0);   // Slightly offset upward
                faceTop.rotation.x = -Math.PI / 2;   // Rotate to face upward
                piece.add(faceTop);
                piece.faces.push(faceTop); // Store reference to the top face
            }
    
            if(mapping[3]) {
                // Bottom face (Y-negative)
                const faceBottom = new THREE.Mesh(faceGeometry,  new THREE.MeshBasicMaterial({color: this.rubiksArray[mapping[3][0]][mapping[3][1]]}));
                faceBottom.position.set(0, -0.5, 0); // Slightly offset downward
                faceBottom.rotation.x = Math.PI / 2;   // Rotate to face downward
                piece.add(faceBottom);
                piece.faces.push(faceBottom); // Store reference to the bottom face
            }
    
            if(mapping[4]) {
                // Left face (X-negative)
                const faceLeft = new THREE.Mesh(faceGeometry,  new THREE.MeshBasicMaterial({color: this.rubiksArray[mapping[4][0]][mapping[4][1]]}));
                faceLeft.position.set(-0.5, 0, 0);   // Slightly offset left
                faceLeft.rotation.y = -Math.PI / 2;     // Rotate to face left
                piece.add(faceLeft);
                piece.faces.push(faceLeft); // Store reference to the left face
            }
    
            if(mapping[5]) {
                // Right face (X-positive)
                const faceRight = new THREE.Mesh(faceGeometry,  new THREE.MeshBasicMaterial({color: this.rubiksArray[mapping[5][0]][mapping[5][1]]}));
                faceRight.position.set(0.5, 0, 0);   // Slightly offset right
                faceRight.rotation.y = Math.PI / 2;   // Rotate to face right
                piece.add(faceRight);
                piece.faces.push(faceRight); // Store reference to the right face
            }
    
            // Add the piece to the pieces array
            this.pieces.push(piece);
            this.cube.add(piece);
        });
    }
    

    groupLayers() {
        let prevColors = [];
                this.frontLayer.forEach((piece) => {
                    piece.children.forEach((child) => {
                        prevColors.push(child.material.color);
                    })
                })

        this.frontLayer = [];
        this.backLayer = [];
        this.leftLayer = [];
        this.rightLayer = [];
        this.topLayer = [];
        this.bottomLayer = [];
        this.centerXLayer = [];
        this.centerYLayer = [];
        this.centerZLayer = [];

        this.pieces.forEach((piece) => {
            // this.cube.add(piece);

            // const updatedPos = {x: Math.round(piece.position.x),
            //     y: Math.round(piece.position.y),
            //     z: Math.round(piece.position.z)}  

            if(piece.position.x == 0) {
                this.centerXLayer.push(piece);
            }
            if(piece.position.x < 0) {
                this.leftLayer.push(piece);
            }
            if(piece.position.x > 0) {
                this.rightLayer.push(piece);
            }

            if(piece.position.y == 0) {
                this.centerYLayer.push(piece);
            }
            if(piece.position.y < 0) {
                this.bottomLayer.push(piece);
            }
            if(piece.position.y > 0) {
                this.topLayer.push(piece);
            }

            if(piece.position.z == 0) {
                this.centerZLayer.push(piece);
            }
            if(piece.position.z < 0) {
                this.backLayer.push(piece);
            }
            if(piece.position.z > 0) {
                this.frontLayer.push(piece);
            }
        });


        let currColors = [];
        this.frontLayer.forEach((piece) => {
            piece.children.forEach((child) => {
                currColors.push(child.material.color);
            })
        })

        
        for(let x = 0; x<21; x++) {
            console.log(prevColors[x]);
            console.log(currColors[x]);

            console.log("--");
        }
    }

    updateCubeFaceMapping(layer, direction) {
        // Layer order based on your cube face mapping
        const faceOrder = {
            front: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            back: [18, 19, 20, 21, 22, 23, 24, 25, 26],
            left: [2, 5, 8, 11, 14, 17, 26],    // Left face pieces
            right: [0, 3, 6, 9, 12, 15, 18, 21, 24],   // Right face pieces
            top: [6, 7, 8, 15, 16, 17, 24, 25, 26],      // Top face pieces
            bottom: [0, 1, 2, 9, 10, 11, 18, 19, 20],   // Bottom face pieces
            centerX: [1, 4, 7, 10, 13, 16, 19, 22, 25],    // Center X pieces
            centerY: [3, 4, 5, 12, 13, 14, 21, 22, 23],     // Center Y pieces
            centerZ: [9, 10, 11, 12, 13, 14, 15, 16, 17]

        };

        const clockwise = {
            0: 2,
            1: 5,
            2: 8,
            3: 1,
            5: 7,
            6: 0,
            7: 3,
            8: 6
        }

        const counterClockwise = {
            0: 6,
            1: 3,
            2: 0,
            3: 7,
            5: 1,
            6: 8,
            7: 5,
            8: 2
        }
    
        const pieces = faceOrder[layer]; // Get the relevant pieces
        // const mapping = pieces.map(index => this.cubeFaceMapping[index]);
        const originalColors = this.rubiksArray;
    
        if (direction === 'clockwise') {
            // Shift mapping clockwise
            // pieces.forEach((index, i) => {
            //     this.cubeFaceMapping[index] = originalMapping[clockwise[i]]; // 90 degrees clockwise
            // });

            // console.log(mapping);

            // mapping.forEach((key, index) => {
            //     console.log(index, key, mapping[key])
            // })
            
            pieces.forEach((index) => {

                for(let i = 0; i<9; i++) {

                    if(this.cubeFaceMapping[index][i] && this.cubeFaceMapping[index][clockwise[i]]) {

                        let x = this.cubeFaceMapping[index][i][0];
                        let y = this.cubeFaceMapping[index][i][1];

                        let x_ = this.cubeFaceMapping[index][clockwise[i]][0];
                        let y_ = this.cubeFaceMapping[index][clockwise[i]][1];
                        
                        // console.log([x,y], [x_,y_]);

                        // console.log(this.rubiksArray[x][y] )

                        this.rubiksArray[x][y] = originalColors[x_][y_];
                        // console.log(this.rubiksArray[x][y] )
                    }

                }
            })

        } else if (direction === 'counterclockwise') {
            // Shift mapping counterclockwise
            // pieces.forEach((index, i) => {
            //     this.cubeFaceMapping[index] = originalMapping[counterClockwise[i]]; // 90 degrees counterclockwise
            // });

            pieces.forEach((index) => {

                for(let i = 0; i<9; i++) {
                    if(this.cubeFaceMapping[index][i] && this.cubeFaceMapping[index][counterClockwise[i]]) {

                        let x = this.cubeFaceMapping[index][i][0];
                        let y = this.cubeFaceMapping[index][i][1];

                        let x_ = this.cubeFaceMapping[index][counterClockwise[i]][0];
                        let y_ = this.cubeFaceMapping[index][counterClockwise[i]][1];
                        
                        // console.log([x,y], [x_,y_]);

                        // console.log(this.rubiksArray[x][y] )

                        this.rubiksArray[x][y] = originalColors[x_][y_];
                        // console.log(this.rubiksArray[x][y] )
                    }

                }
            })
            
        }
    }
    

    rotate(object, movingDirection) {
        // let allLayers = [this.frontLayer, this.backLayer, this.topLayer, this.bottomLayer, this.leftLayer, this.rightLayer, this.centerXLayer, this.centerYLayer, this.centerZLayer];

        // let possibleLayers = allLayers.filter(layer => 
        //     layer.some(piece => piece.uuid === selectedPiece.uuid)
        // );

        // return possibleLayers

        let selectedPiece = object.parent;
        let selectedPieceType = selectedPiece.faces.length == 3 ? "corner" : selectedPiece.faces.length == 2 ? "edge" : "center";

        console.log(object.position);

        let selectedPiecePosition = {x: Math.round(selectedPiece.position.x),
            y: Math.round(selectedPiece.position.y),
            z: Math.round(selectedPiece.position.z)} 

        let selectedFace = null;
        // Now you can determine which face was clicked
        if (selectedPiecePosition.z > 0) {
            selectedFace = 'front';
        } else if (selectedPiecePosition.z < 0) {
            selectedFace = 'back';
        } else if (selectedPiecePosition.y > 0) {
            selectedFace = 'top';
        } else if (selectedPiecePosition.y < 0) {
            selectedFace = 'bottom';
        } else if (selectedPiecePosition.x < 0) {
            selectedFace = 'left';
        } else if (selectedPiecePosition.x > 0) {
            selectedFace = 'right';
        }   
        
        console.log(selectedPieceType, selectedFace)


          
        
        switch (selectedFace) {
            case "front" :
                if(selectedPiecePosition.x == -1 && movingDirection == 'UP') this.rotateLeftCounterClockwise();
                else if(selectedPiecePosition.x == -1 && movingDirection == 'DOWN') this.rotateLeftClockwise();
                else if(selectedPiecePosition.x == 1 && movingDirection == 'UP') this.rotateRightCounterClockwise();
                else if(selectedPiecePosition.x == 1 && movingDirection == 'DOWN') this.rotateRightClockwise();
                else if(selectedPiecePosition.x == 0 && movingDirection == 'UP') this.rotateCenterXCounterClockwise();
                else if(selectedPiecePosition.x == 0 && movingDirection == 'DOWN') this.rotateCenterXClockwise();


                else if(selectedPiecePosition.y == 1 && movingDirection == 'LEFT') this.rotateTopCounterClockwise();
                else if(selectedPiecePosition.y == 1 && movingDirection == 'RIGHT') this.rotateTopClockwise();
                else if(selectedPiecePosition.y == 0 && movingDirection == 'LEFT') this.rotateCenterYCounterClockwise();
                else if(selectedPiecePosition.y == 0 && movingDirection == 'RIGHT') this.rotateCenterYClockwise();
                

                break;
            default:
                break;
        }

        
    }

    rotateLayer(layer, axis, direction) {
        const tempGroup = new THREE.Group();
        tempGroup.add(...layer); // Add the layer's pieces to the temp group

        this.cube.add(tempGroup); // Add temp group to the cube (scene)

        let rotationSpeed = Math.PI / 20; // Speed of rotation
        let targetRotation = tempGroup.rotation[axis] + (direction === 'clockwise' ? Math.PI / 2 : -Math.PI / 2);

        const rotateTempGroup = () => {
            if ((direction === 'clockwise' && tempGroup.rotation[axis] < targetRotation) ||
                (direction === 'counterclockwise' && tempGroup.rotation[axis] > targetRotation)) {
                tempGroup.rotation[axis] += (direction === 'clockwise' ? rotationSpeed : -rotationSpeed);
                requestAnimationFrame(rotateTempGroup);
            } else {
               
                // Apply the final transformation to the individual pieces
                const children = [...tempGroup.children];
                children.forEach((child) => {
                    // console.log("BEF",child.position);
                    // child.applyMatrix4(tempGroup.matrixWorld); // Apply the parent's transformation to the child


                    
                    // tempGroup.remove(child);
                    
                    // let updatedPos = {x: Math.round(child.position.x), y:  Math.round(child.position.y), z:  Math.round(child.position.z)} 
                    // console.log("UPD",updatedPos);
                    
                    // // child.position.x = updatedPos.x > 0 ? 1 : updatedPos.x < 0 ? -1 : 0;
                    // // child.position.y = updatedPos.y > 0 ? 1 : updatedPos.y < 0 ? -1 : 0;
                    // // child.position.z = updatedPos.z > 0 ? 1 : updatedPos.z < 0 ? -1 : 0;

                    // child.position.x = Math.sign(updatedPos.x);  // This will snap values to -1, 0, or 1
                    // child.position.y = Math.sign(updatedPos.y); 
                    // child.position.z = Math.sign(updatedPos.z);


                    // console.log("AFT",child.position);

                    // this.cube.attach(child); // Attach each piece back to the cube

                    child.applyMatrix4(tempGroup.matrixWorld); // Apply transformation to the child

                    tempGroup.remove(child); // Remove from tempGroup
    
                    // Rounding positions to ensure correct layer grouping
                    let updatedPos = { 
                        x: Math.round(child.position.x), 
                        y: Math.round(child.position.y), 
                        z: Math.round(child.position.z) 
                    };
    
                    // Assign rounded positions back to the child piece
                    child.position.set(updatedPos.x, updatedPos.y, updatedPos.z);
    
                    // Attach child back to the cube
                    this.cube.attach(child);


                });
                this.cube.remove(tempGroup); // Remove the temp group
                this.pieces = [...this.cube.children];  // Spread operator to create a new array


                // this.pieces = updatedPieces;

                // console.log(this.pieces == updatedPieces);

                
                this.groupLayers();

                
            }
        };



        rotateTempGroup(); // Start the rotation animation
    }

    rotateLeftClockwise() {
        const leftLayer = this.leftLayer;
        this.updateCubeFaceMapping('left', 'clockwise'); // Update mappings
        this.rotateLayer(leftLayer, 'x', 'clockwise'); // Rotate around X-axis clockwise
    }

    rotateLeftCounterClockwise() {
        const leftLayer = this.leftLayer;
        this.updateCubeFaceMapping('left', 'counterclockwise'); // Update mappings
        this.rotateLayer(leftLayer, 'x', 'counterclockwise'); // Rotate around X-axis clockwise
    }

    rotateRightClockwise() {
        const rightLayer = this.rightLayer;
        this.updateCubeFaceMapping('right', 'clockwise'); // Update mappings
        this.rotateLayer(rightLayer, 'x', 'clockwise'); // Rotate around X-axis clockwise
        
    }

    rotateRightCounterClockwise() {
        const rightLayer = this.rightLayer;
        this.updateCubeFaceMapping('right', 'counterclockwise'); // Update mappings
        this.rotateLayer(rightLayer, 'x', 'counterclockwise'); // Rotate around X-axis clockwise

    }

    rotateCenterXClockwise() {
        const centerXLayer = this.centerXLayer;
        this.updateCubeFaceMapping('centerX', 'clockwise'); // Update mappings
        this.rotateLayer(centerXLayer, 'x', 'clockwise'); // Rotate around X-axis clockwise

    }

    rotateCenterXCounterClockwise() {
        const centerXLayer = this.centerXLayer;
        this.updateCubeFaceMapping('centerX', 'counterclockwise'); // Update mappings
        this.rotateLayer(centerXLayer, 'x', 'counterclockwise'); 

    }

    rotateTopCounterClockwise() {
        this.updateCubeFaceMapping('top', 'counterclockwise'); // Update mappings
        this.rotateLayer(this.topLayer, 'y', 'counterclockwise'); 
    }

    rotateTopClockwise() {
        this.updateCubeFaceMapping('top', 'clockwise'); // Update mappings
        this.rotateLayer(this.topLayer, 'y', 'clockwise'); 
    }

    rotateCenterYCounterClockwise() {
        this.updateCubeFaceMapping('centerY', 'counterclockwise'); // Update mappings
        this.rotateLayer(this.centerYLayer, 'y', 'counterclockwise'); 
    }

    rotateCenterYClockwise() {
        this.updateCubeFaceMapping('centerY', 'clockwise'); // Update mappings
        this.rotateLayer(this.centerYLayer, 'y', 'clockwise'); 
    }

    init() {
        this.generateModel();
        this.groupLayers();

    }

}

export default RubiksCube;
