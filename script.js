console.log(THREE);
function init() {
  const scene = new THREE.Scene();

  // camera
  const fov = 50;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, 28);
  //   camera.position.x = 0;
  //   camera.lookAt(0, 0, 0);

  // renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("canvas").appendChild(renderer.domElement);

  const crown = getShape();

  //light
  const color = 0xffffff;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);

  scene.add(crown);
  scene.add(light);

  //helpers
  const axes = new THREE.AxesHelper();
  // axes.material.depthTest = true;
  // axes.renderOrder = 1;
  crown.add(axes);

  //   const cameraHelper = new THREE.CameraHelper(camera);
  //   scene.add(cameraHelper);

  function animate() {
    // crown.rotation.x += 0.01;
    // crown.rotation.y += 0.01;
    crown.rotation.z += 0.01;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);

  // responsive design
  function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener("resize", resize, false);
}
init();

// shape
function getShape() {
  const geometry = new THREE.TorusKnotGeometry(8.0, 1.0, 30, 17, 1, 19);
  const material = new THREE.MeshPhongMaterial({
    color: 0xffd300,
    shininess: 100,
  });
  const torusKnot = new THREE.Mesh(geometry, material);
  torusKnot.rotateX(90);

  return torusKnot;
}
