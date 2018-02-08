//three.js
// make grid 
// reference URL: http://www.natural-science.or.jp/article/20170326230454.php

var width = 500;
var height =500;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45,width/height, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color("rgb(0,0,0)"));
renderer.setSize(width, height);

var controls =  new THREE.OrbitControls( camera );
var axes = new THREE.AxesHelper(20);
scene.add(axes);
var geometry = new THREE.Geometry();
 
function z( x, y ){
    return 70* Math.exp( -(x*x+y*y)/400 );
}
 
var N = 100;
var w = 2;
 
//x軸方吁E
for( var i=0; i<N; i++){
    for( var j=0; j<=N; j++){
        var x0 = (i - N/2 ) * w;
        var y0 = (j - N/2 ) * w;
        var z0 = z(x0, y0);
        var x1 = ((i+1) - N/2 ) * w;
        var y1 = (j - N/2 ) * w;
        var z1 = z(x1, y1);
        //頂点座標データの追加
        geometry.vertices.push( new THREE.Vector3(x0, y0, z0) );
        geometry.vertices.push( new THREE.Vector3(x1, y1, z1) );
    }
 
    for( var j=0; j<=N; j++){
        var x0 = (j - N/2 ) * w;
        var y0 = (i - N/2 ) * w;
        var z0 = z(x0, y0);
        var x1 = (j - N/2 ) * w;
        var y1 = ((i+1) - N/2 ) * w;
        var z1 = z(x1, y1);
        //頂点座標データの追加
        geometry.vertices.push( new THREE.Vector3(x0, y0, z0) );
        geometry.vertices.push( new THREE.Vector3(x1, y1, z1) );
    }
}
 
//材質オブジェクト�E宣言と生�E
var material = new THREE.LineBasicMaterial({ color: 0xFFFFFF, transparent:true, opacity:0.5 });
//線オブジェクト�E生�E
lines = new THREE.LineSegments(geometry, material);
//線オブジェクト�Eシーンへの追加
scene.add(lines);
//線オブジェクト�E位置座標を設宁E
lines.position.set(0, 0, 0);

camera.position.x = 100;
camera.position.y = 100;
camera.position.z = 100;

//camera.up = new THREE.Vector3(0, 0, 1);
//camera.lookAt(scene.position);

function animate() {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
  controls.update();
}

document.getElementById("draw")
  .appendChild(renderer.domElement);
  
//renderer.render(scene, camera)

animate();