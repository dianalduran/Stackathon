init();

function init() {
  const scene = new THREE.Scene();

  const fov = 50;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, 35);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("canvas").appendChild(renderer.domElement);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
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
  //   renderer.render(scene, camera);

  //helpers
  //   const axes = new THREE.AxesHelper();
  // axes.material.depthTest = true;
  // axes.renderOrder = 1;
  //   crown.add(axes);

  //   const cameraHelper = new THREE.CameraHelper(camera);
  //   scene.add(cameraHelper);

  const leftButton = document.getElementById("left");
  const rightButton = document.getElementById("right");

  let direction;
  leftButton.addEventListener("click", function () {
    let clock = new THREE.Clock();
    direction = "left";
    animate(renderer, scene, camera, controls, clock, direction);
  });
  rightButton.addEventListener("click", function () {
    let clock = new THREE.Clock();
    direction = "right";
    animate(renderer, scene, camera, controls, clock, direction);
  });

  // responsive design
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

function animate(renderer, scene, camera, controls, clock, direction) {
  if (clock) {
    let timeElapsed = clock.getElapsedTime();
    const crown = scene.getObjectByName("crown");

    if (timeElapsed < 10 && direction === "left") {
      crown.rotation.z += 0.1;
    }

    if (timeElapsed < 10 && direction === "right") {
      crown.rotation.z -= 0.1;
    }
  } else {
    renderer.render(scene, camera);
    controls.update();
  }

  requestAnimationFrame(function () {
    animate(renderer, scene, camera, controls, clock, direction);
  });
}
