init();

function init() {
  const scene = new THREE.Scene();
  const gui = new dat.GUI();

  const fov = 50;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  const cameraZRotation = new THREE.Group();
  const cameraZPosition = new THREE.Group();
  const cameraXRotation = new THREE.Group();
  const cameraYPosition = new THREE.Group();
  const cameraYRotation = new THREE.Group();

  cameraZRotation.name = "cameraZRotation";
  cameraZPosition.name = "cameraZPosition";
  cameraYRotation.name = "cameraYRotation";
  cameraYPosition.name = "cameraYPosition";
  cameraXRotation.name = "cameraXRotation";

  cameraZRotation.add(camera);
  cameraYPosition.add(cameraZRotation);
  cameraZPosition.add(cameraYPosition);
  cameraXRotation.add(cameraZPosition);
  cameraYRotation.add(cameraXRotation);
  scene.add(cameraYRotation);

  cameraXRotation.rotation.x = 0;
  cameraYPosition.position.y = 5;
  cameraZPosition.position.z = 70;

  gui.add(cameraZPosition.position, "z", -10, 100);
  gui.add(cameraYRotation.rotation, "y", -Math.PI, Math.PI);
  gui.add(cameraXRotation.rotation, "x", -Math.PI, Math.PI);
  gui.add(cameraZRotation.rotation, "z", -Math.PI, Math.PI);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("canvas").appendChild(renderer.domElement);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  console.log(controls);
  animate(renderer, scene, camera, controls);

  const crown = getCrown();
  crown.name = "crown";

  const color = 0xffffff;
  const intensity = 1;
  const light = new THREE.HemisphereLight(color, intensity);
  light.position.set(-200, -400, -650);
  //sphere added to light for light visibility
  //   const sphere = getSphere();
  //   light.add(sphere);

  scene.add(crown);
  scene.add(light);

  //helpers
  //   const axes = new THREE.AxesHelper();
  //   axes.material.depthTest = true;
  //   axes.renderOrder = 1;
  //   crown.add(axes);

  //   const cameraHelper = new THREE.CameraHelper(camera);
  //   scene.add(cameraHelper);

  const leftButton = document.getElementById("left");
  const rightButton = document.getElementById("right");
  const animateButton = document.getElementById("animate");

  let direction;
  let animation = false;
  leftButton.addEventListener("click", function () {
    let clock = new THREE.Clock();
    direction = "left";
    animate(renderer, scene, camera, controls, animation, clock, direction);
  });
  rightButton.addEventListener("click", function () {
    let clock = new THREE.Clock();
    direction = "right";
    animate(renderer, scene, camera, controls, animation, clock, direction);
  });
  animateButton.addEventListener("click", function () {
    let clock = new THREE.Clock();
    animation = !animation;
    animate(renderer, scene, camera, controls, animation, clock);
  });

  function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener("resize", resize, false);
}

function getCrown() {
  const geometry = new THREE.TorusKnotGeometry(9.0, 1.0, 30, 20, 1, 19);
  const material = new THREE.MeshPhongMaterial({
    color: 0xffd300,
    shininess: 100,
  });
  const torusKnot = new THREE.Mesh(geometry, material);
  torusKnot.rotateX(90);
  return torusKnot;
}

// function getSphere() {
//   const geometry = new THREE.SphereGeometry(0.15, 24, 24);
//   const material = new THREE.MeshBasicMaterial({
//     color: 0xffffff,
//   });
//   const sphere = new THREE.Mesh(geometry, material);
//   return sphere;
// }

function animate(
  renderer,
  scene,
  camera,
  controls,
  animation,
  clock,
  direction
) {
  renderer.render(scene, camera);
  controls.update();
  if (clock) {
    let timeElapsed = clock.getElapsedTime();
    if (animation) {
      const cameraZPosition = scene.getObjectByName("cameraZPosition");
      const cameraXRotation = scene.getObjectByName("cameraXRotation");
      const cameraYPosition = scene.getObjectByName("cameraYPosition");
      if (cameraZPosition.position.z > -0) {
        cameraZPosition.position.z -= 0.15;
      } else if (cameraZPosition.position.z < -0 && timeElapsed < 7.8) {
        cameraXRotation.position.x -= 0.01;
      }
    } else {
      const crown = scene.getObjectByName("crown");
      if (timeElapsed < 10 && direction === "left") {
        crown.rotation.z += 0.01;
      }
      if (timeElapsed < 10 && direction === "right") {
        crown.rotation.z -= 0.01;
      }
    }
  }

  requestAnimationFrame(function () {
    animate(renderer, scene, camera, controls, animation, clock, direction);
  });
}
