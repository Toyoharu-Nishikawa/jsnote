//three.js
// make grid 

console.clear()

const width = 500;
const height =500;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45,width/height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color("white"));
renderer.setSize(width, height);

document.getElementById("draw").appendChild(renderer.domElement);
const controls =  new THREE.TrackballControls( camera,renderer.domElement );
//const controls =  new THREE.OrbitControls( camera,renderer.domElement );
controls.rotateSpeed = 2.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.3;
controls.keys = [ 'KeyA', 'KeyS', 'KeyD' ]

const axes = new THREE.AxesHelper(40);
scene.add(axes);

const gridHelper = new THREE.GridHelper(100, 10)
gridHelper.material.opacity = 0.5
gridHelper.material.transparent = true 
scene.add( gridHelper );

const geometry = new THREE.BoxGeometry( 30, 30, 30 );
const material = new THREE.MeshPhongMaterial( {color: 0x00ff00} );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube )

const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 )
camera.add( directionalLight );

camera.position.x = 100;
camera.position.y = 100;
camera.position.z = 100;
scene.add( camera );


const animate = () =>{
  requestAnimationFrame( animate );
  controls.update();
  renderer.render( scene, camera );
}

  

animate()