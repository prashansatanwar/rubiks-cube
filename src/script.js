import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui';
import gsap from 'gsap';

import RubiksCube from '../components/RubiksCube';

/**
 * Debug
 */
const gui = new GUI()

const parameters = {
    materialColor: '#ffeded'
}

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Rubik's Cube
 */

const rubiksCube = new RubiksCube();
rubiksCube.init();

scene.add(rubiksCube.cube);


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

let raycaster = new THREE.Raycaster();
let cursor = {
    x: 0,
    y: 0
}
let selectedPiece = null;
let dragging = false;
let prevCursor =  {x:0, y:0};

let movingDirection = null;

let selectedLayer = null;
let selectedFace = null;

let selectedObject = null;

window.addEventListener('mousedown', (event) => {
    // Calculate mouse position in normalized device coordinates
    cursor.x = (event.clientX / sizes.width) * 2 - 1;
    cursor.y = -(event.clientY / sizes.height) * 2 + 1;

    // Update the raycaster with the camera and cursor position
    raycaster.setFromCamera(cursor, camera);

    // Calculate objects intersecting the raycaster
    const intersects = raycaster.intersectObjects(rubiksCube.pieces.flatMap(piece => piece.faces));

    if (intersects.length > 0) {
        selectedObject = intersects[0].object; 

        console.log(selectedObject);

        // Now you can handle dragging or rotating based on the clicked face
        dragging = true;
        prevCursor = { x: cursor.x, y: cursor.y };
    }
});

 
window.addEventListener('mousemove', (event) => {
    
    if(dragging && !movingDirection) {
        cursor.x = (event.clientX / sizes.width) * 2 - 1;
        cursor.y = -(event.clientY / sizes.height) * 2 + 1;

        const offset = 0.4;
        const directionalOffset = 0.2;

        if(cursor.y - offset > prevCursor.y) {

            let tempCursor = cursor;

            if(tempCursor.y + directionalOffset >= cursor.y) {
                console.log("UP");
                movingDirection = "UP";
            }



        }
        else if( cursor.y + offset < prevCursor.y) {
            let tempCursor = cursor;

            if(tempCursor.y + directionalOffset >= cursor.y) {
                console.log("DOWN");
                movingDirection = "DOWN";
            }
        }
        
        else if(cursor.x - offset > prevCursor.x) {
            let tempCursor = cursor;

            if(tempCursor.y + directionalOffset >= cursor.y) {
                console.log("RIGHT");
                movingDirection = "RIGHT";
            }
        }
        else if( cursor.x + offset < prevCursor.x) {
            let tempCursor = cursor;

            if(tempCursor.y + directionalOffset >= cursor.y) {
                console.log("LEFT");
                movingDirection = "LEFT";
            }
        }

        rubiksCube.rotate(selectedObject, movingDirection);
        

        
    }
    // prevCursor = {x: cursor.x, y: cursor.y};
})

window.addEventListener('mouseup', (event) => {
    cursor = {x:0,y:0};
    prevCursor = {x:0,y:0};
    dragging = false;
    movingDirection = null;
    selectedObject = null;
})

/**
 * Camera
*/

const cameraGroup = new THREE.Group();
scene.add(cameraGroup);

// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.y = 6;
camera.position.x = -6;
camera.position.z = 7;
camera.lookAt(new THREE.Vector3(0,0,0))
cameraGroup.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true // fix elastic scroll
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


// Controls
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.dampingFactor = 0.05;
// controls.enableZoom = true;







/**
 * Animate
 */

const tick = () =>
{   

    // Render
    renderer.render(scene, camera)

    // Update controls
    // controls.update()



    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()