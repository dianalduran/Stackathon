console.log(THREE);
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

  const crown = getCrown();
  crown.name = "crown";
  const sphere = getSphere();

  //light
  const color = 0xffffff;
  const intensity = 1;
  const light = new THREE.HemisphereLight(color, intensity);
  light.position.set(-200, -400, -650);
  light.add(sphere);

  scene.add(crown);
  scene.add(light);

  //helpers
  const axes = new THREE.AxesHelper();
  // axes.material.depthTest = true;
  // axes.renderOrder = 1;
  crown.add(axes);

  //   const cameraHelper = new THREE.CameraHelper(camera);
  //   scene.add(cameraHelper);

  animate(renderer, scene, camera);

  // responsive design
  function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener("resize", resize, false);
}
init();

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

function getSphere() {
  const geometry = new THREE.SphereGeometry(0.15, 24, 24);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
  });
  const sphere = new THREE.Mesh(geometry, material);
  return sphere;
}

function animate(renderer, scene, camera) {
  const crown = scene.getObjectByName("crown");
  crown.rotation.z += 0.01;

  renderer.render(scene, camera);
  requestAnimationFrame(function () {
    animate(renderer, scene, camera);
  });
}
