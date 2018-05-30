var camera;
var mesh;
var scene;
var renderer;
var light;
var r = 600;
var theta = 0;
var dTheta = 2 * Math.PI / 1000;

function createStars() {
  var canvas = document.createElement('canvas');
  canvas.setAttribute('width', window.innerWidth);
  canvas.setAttribute('height', window.innerHeight);
  canvas.setAttribute('id', "stars");

  var ctx = canvas.getContext('2d');
  ctx.fillStyle = "#ffffff";

  for (var i = 0; i < 200; i++) {
    ctx.beginPath();
    sizeRandom = Math.random() * 2.5;
    ctx.arc(Math.random() * window.innerWidth, Math.random() * window.innerHeight, sizeRandom, 0, 2*Math.PI, 0);
    ctx.fill();
  }

  document.body.appendChild(canvas);
}

function createMoon() {
  var geometry = new THREE.SphereGeometry(40, 20, 20);
  var material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    flatShading: THREE.FlatShading
  });

  var moon = new THREE.Mesh(geometry, material);

  moon.name = 'moon';
  moon.position.set(35,0,0);

  scene.add(moon);
}

function createEarth() {
  var geometry = new THREE.SphereGeometry(400, 50, 50);
  var texture = new THREE.Texture();
	var loader = new THREE.ImageLoader();
	loader.load('earth-texture.jpg', function(image) {
		texture.image = image;
		texture.needsUpdate = true;
  });

  var material = new THREE.MeshPhongMaterial();
	material.map = texture;

  var earth = new THREE.Mesh(geometry, material);
  earth.name = 'earth';

  scene.add(earth);
}

function createCamera() {
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 1000;
}

function createRenderer() {
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setClearColor( 0xffffff, 0);
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function createLight() {
  light = new THREE.HemisphereLight( 0xffffff )
  light.position.set( 1, 1, 1 )
  scene.add( light )
}

function init() {
  scene = new THREE.Scene;
  createRenderer();
  createCamera();
  createLight();
  createStars();
  createEarth();
  createMoon();

  document.body.appendChild(renderer.domElement);

  render();
}

function render() {
  theta -= dTheta;

  scene.getObjectByName('moon').position.x = r * Math.cos(theta);
  scene.getObjectByName('moon').position.z = r * Math.sin(theta);
  scene.getObjectByName('earth').rotation.y += 0.00125;
  // scene.getObjectByName('earth').rotation.y += 0.0005;

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

init();