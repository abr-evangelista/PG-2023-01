// Variables to store scene, cameras, and objects
let scene, camera1, camera2, renderer, cube, sphere;

// Variables for simple movement
let cubeRotationSpeed = 0.02;

// Initialize the scene
function init() {
    // Create a scene
    scene = new THREE.Scene();

    // Create a perspective camera
    camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera1.position.z = 5;

    // Create an orthographic camera
    const aspectRatio = window.innerWidth / window.innerHeight;
    const frustumSize = 2;
    camera2 = new THREE.OrthographicCamera(-frustumSize * aspectRatio, frustumSize * aspectRatio, frustumSize, -frustumSize, 1, 100);
    camera2.position.set(0, 0, 5);

    // Create a WebGL renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('scene-container').appendChild(renderer.domElement);

    // Create a cube
    const cubeGeometry = new THREE.BoxGeometry();
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = -2;
    scene.add(cube);

    // Create a sphere
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.x = 2;
    scene.add(sphere);
}

// Animate the cube
function animate() {
    requestAnimationFrame(animate);

    // Rotate the cube
    cube.rotation.x += cubeRotationSpeed;
    cube.rotation.y += cubeRotationSpeed;

    // Render the scene
    renderer.render(scene, camera1);
}

// Handle window resize
function onWindowResize() {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera1.aspect = newWidth / newHeight;
    camera1.updateProjectionMatrix();

    camera2.left = -2 * newWidth / newHeight;
    camera2.right = 2 * newWidth / newHeight;
    camera2.top = 2;
    camera2.bottom = -2;
    camera2.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
}

// Initialize the scene, animate, and handle resize
init();
animate();
window.addEventListener('resize', onWindowResize);