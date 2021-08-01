let rad;
let v;
let turn = 0;
let num;
let swarm = [];
let twists = 1;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB, 360, 100, 100, 100);
  rad = height*.03;
  v = height*.05;
  num = height*.5;
  frameRate(15);
  background(10)
  for (let i = 0; i < num; i++) {
    swarm.push(new Bug());
  }
}

function draw() {
  background(10);
  lights();
  for(let i=0; i < swarm.length; i++){
    swarm[i].run();
  }
  push();
  rotateY(turn);
  rotateX(turn);
  rotateZ(turn);
  //noStroke();
  drawTrack(random(90,100), rad, v);
  //drawEdges(height*0.15, rad, v);
  turn += 0.005;
  pop();
  v = height*.1;
  rad = height*.4;
}

function drawTrack(steps, rad, v) {
  //beginShape(TRIANGLE_STRIP);
  beginShape(TRIANGLE_STRIP);
  fill(10)
  stroke(255)
  //noFill();
  //fill(150, 70, 50, 50)
  //strokeWeight(2);
  //stroke(random(150, 200), 70, 50, 50);
  //noStroke()
  for (let step = 0; step < (steps + 1); step += 1) {
    let u = step * TAU / steps;
    let x = (rad - v * cos(twists * u)) * cos(u);
    let y = (rad - v * cos(twists * u)) * sin(u);
    let z = -v * sin(twists * u);
    vertex(x, y, z);
    x = (rad + v * cos(twists * u)) * cos(u);
    y = (rad + v * cos(twists * u)) * sin(u);
    z = v * sin(twists * u);
    vertex(x, y, z);
  }
  endShape(CLOSE);
}

function drawEdges(steps, rad, v) {
  for (let step = 0; step < (steps + 1); step += 1) {
    stroke(0);
    fill(random(260, 300), random(100), random(100));
    let u = step * TAU / steps;
    let x = (rad - v * cos(twists * u)) * cos(u);
    let y = (rad - v * cos(twists * u)) * sin(u);
    let z = -v * sin(twists * u);
    push();
    translate(x, y, z);
    //box(10)c
    box(random(6,10))
    pop();
    x = (rad + v * cos(twists * u)) * cos(u);
    y = (rad + v * cos(twists * u)) * sin(u);
    z = v * sin(twists * u);
    push();
    translate(x, y, z);
    box(random(6,10))
    //box(10);
    pop();
  }
}

class Bug{
  constructor(){
    this.loc = createVector(0, 0, 0);
    this.vel = createVector(0, 0, 0);
    this.rad = random(height*0.1);
    this.ts = random(5);
    this.color = random(360);
  }

  run(){
    this.update();
    this.display();
  }
  
  update(){
    this.a = p5.Vector.random3D();
    this.a.mult(random(3));
    this.vel.add(this.a);
    this.vel.limit(this.ts);
    this.loc.add(this.vel);
  }
  
  display(){
    push();
    fill(this.color, random(100), random(100));
    noStroke()
    translate(this.loc);
    plane(random(this.rad), random(20));
    pop();
  }
}
  