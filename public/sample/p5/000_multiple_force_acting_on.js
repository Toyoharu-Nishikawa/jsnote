//p5 public sample
//we can simulate a lot of phics models
//

// Demonstration of multiple force acting on 
// bodies (Mover class)
// Bodies experience gravity continuously
// Bodies experience fluid resistance when in "water"

// Five moving bodies
const s = function(sketch){
var movers = [];

// Liquid
var liquid;

sketch.setup = function(){
  sketch.createCanvas(640, 360);
  sketch.reset();
  // Create liquid object
  liquid = new Liquid(0, sketch.height/2, sketch.width, sketch.height/2, 0.1);
}

sketch.draw = function(){
  sketch.background(127);
  
  // Draw water
  liquid.display();

  for (var i = 0; i < movers.length; i++) {
    
    // Is the Mover in the liquid?
    if (liquid.contains(movers[i])) {
      // Calculate drag force
      var dragForce = liquid.calculateDrag(movers[i]);
      // Apply drag force to Mover
      movers[i].applyForce(dragForce);
    }

    // Gravity is scaled by mass here!
    var gravity = sketch.createVector(0, 0.1*movers[i].mass);
    // Apply gravity
    movers[i].applyForce(gravity);
   
    // Update and display
    movers[i].update();
    movers[i].display();
    movers[i].checkEdges();
  }
  
}


sketch.mousePressed = function(){
  sketch.reset();
}

// Restart all the Mover objects randomly
sketch.reset = function(){
  for (var i = 0; i < 9; i++) {
    movers[i] = new Mover(sketch.random(0.5, 3), 40+i*70, 0);
  }
}

var Liquid = function(x, y, w, h, c) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.c = c;
};
  
// Is the Mover in the Liquid?
Liquid.prototype.contains = function(m) {
  var l = m.position;
  return l.x > this.x && l.x < this.x + this.w &&
         l.y > this.y && l.y < this.y + this.h;
};
// Calculate drag force
Liquid.prototype.calculateDrag = function(m) {
  // Magnitude is coefficient * speed squared
  var speed = m.velocity.mag();
  var dragMagnitude = this.c * speed * speed;

  // Direction is inverse of velocity
  var dragForce = m.velocity.copy();
  dragForce.mult(-1);
  
  // Scale according to magnitude
  // dragForce.setMag(dragMagnitude);
  dragForce.normalize();
  dragForce.mult(dragMagnitude);
  return dragForce;
};
  
Liquid.prototype.display = function() {
  sketch.noStroke();
  sketch.fill(50);
  sketch.rect(this.x, this.y, this.w, this.h);
};

function Mover(m,x,y) {
  this.mass = m;
  this.position = sketch.createVector(x,y);
  this.velocity = sketch.createVector(0,0);
  this.acceleration = sketch.createVector(0,0);
}

// Newton's 2nd law: F = M * A
// or A = F / M
Mover.prototype.applyForce = function(force) {
  var f = p5.Vector.div(force,this.mass);
  this.acceleration.add(f);
};
  
Mover.prototype.update = function() {
  // Velocity changes according to acceleration
  this.velocity.add(this.acceleration);
  // position changes by velocity
  this.position.add(this.velocity);
  // We must clear acceleration each frame
  this.acceleration.mult(0);
};

Mover.prototype.display = function() {
  sketch.stroke(0);
  sketch.strokeWeight(2);
  sketch.fill(255,127);
  sketch.ellipse(this.position.x,this.position.y,this.mass*16,this.mass*16);
};

// Bounce off bottom of window
Mover.prototype.checkEdges = function() {
  if (this.position.y > (sketch.height - this.mass*8)) {
    // A little dampening when hitting the bottom
    this.velocity.y *= -0.9;
    this.position.y = (sketch.height - this.mass*8);
  }
};
}

const myp5 = new p5(s,"draw")