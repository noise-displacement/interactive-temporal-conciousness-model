import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import dat from "dat.gui/src/dat";
/*
// Initialize Three.js and set up the scene, camera, and renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a cube geometry and add it to the scene
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Create a raycaster object to detect which face the user clicks on
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

// Define a function to handle mouse clicks on the cube
function onDocumentMouseDown(event) {
  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // cast a ray from the camera through the mouse position
  raycaster.setFromCamera(mouse, camera);

  // check for intersection with the cube's faces
  var intersects = raycaster.intersectObject(cube);

  console.log(geometry);

  // if the ray intersects a face, select that face
  if (intersects.length > 0) {
    var face = intersects[0].face;
    var faceIndex = intersects[0].faceIndex;

    // highlight the selected face
    geometry.faces[faceIndex].color.setRGB(1, 0, 0);
    geometry.colorsNeedUpdate = true;

    // define a function to handle changes to the face's position
    function updatePosition() {
      geometry.verticesNeedUpdate = true;
      renderer.render(scene, camera);
    }

    // create a dat.GUI object to allow the user to edit the face's position
    var gui = new dat.GUI();
    var folder = gui.addFolder('Position');
    folder.add(geometry.vertices[face.a], 'x').onChange(updatePosition);
    folder.add(geometry.vertices[face.a], 'y').onChange(updatePosition);
    folder.add(geometry.vertices[face.a], 'z').onChange(updatePosition);
    folder.open();
  }
}

// Add an event listener to handle mouse clicks on the cube
document.addEventListener('mousedown', onDocumentMouseDown, false);

// Set up the camera position
camera.position.z = 5;

// Render the scene
renderer.render(scene, camera);


function RayCasterSet() {
    return(
        <></>
    )
}

export default RayCasterSet;
*/