let rad;
let v;
let turn = 0;
let num;
let swarm = [];
let twists = 1;

// let mobius = 'Mobius Artists Group'

var capture = false; // default is to not capture frames, can be changed with button in browser
var capturer = new CCapture({
  format:'gif', 
  workersPath: 'js/',
  framerate: 15
});

const T = 1;
const NUM_FRAMES = 640;

let myFont;
function preload() {
  myFont = loadFont('assets/Montserrat-SemiBold.ttf');
}

function setup() {
  createCanvas(500, 500, WEBGL);
  colorMode(HSB, 360, 100, 100, 100);
  // rad = height*.03;
  // v = height*.05;
  num = height*.5;
  frameRate(15);
  background(10);
  textFont(myFont);
  for (let i = 0; i < num; i++) {
    swarm.push(new Bug());
  }
}

function draw() {
  if (capture && frameCount==1) capturer.start(); // start the animation capture

  // background(10);
  lights();
  print(frameCount);

  //bugs
  for(let i=0; i < swarm.length; i++){
    swarm[i].run();
  }

  // //Text
  // push();
  // rotateY(turn);
  // rotateX(turn);
  // translate(0, 0, 75);
  // fill(0);
  // rect(-80, -80, 150, 155);
  // fill(255);
  // textSize(30);
  // text(mobius, -60, -60, 125, 500);
  // pop();

  //strip
  push();
  rotateY(turn);
  rotateX(turn);
  rotateZ(-turn);
  //noStroke();
  drawTrack(random(90,100), rad, v);
  //drawEdges(height, rad, v);
  turn += 0.005;
  pop();
  // v = height*.06;
  // rad = height*.35;
  v = map(mouseX, 0, width, height*.03, height/2);
 rad = map(mouseY, 0, height, height*.03, height/2);
 let toggle = int(random(0,2));
 if (toggle == 1) twists += 0.5;
 if (toggle == 2) twists -= 0.5;
 if(frameRate%15==0) toggle;
 if (twists == 2) twists = 0.5;


  //capture details
  if (capture){
    capturer.capture( canvas ); // if capture is 'true', save the frame
    if (frameCount-1 == NUM_FRAMES){ //stop and save after NUM_FRAMES
        capturer.stop(); 
        capturer.save(); 
        noLoop(); 
    }
}
}

function drawTrack(steps, rad, v) {
  beginShape(TRIANGLE_STRIP);
  fill(5)
  // noStroke();
  stroke(100)
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
    noStroke(0);
    // stroke(0);
    fill(100);
    let u = step * TAU / steps;
    let x = (rad - v * cos(twists * u)) * cos(u);
    let y = (rad - v * cos(twists * u)) * sin(u);
    let z = -v * sin(twists * u);
    push();
    translate(x, y, z);
    box(5)
    pop();
    x = (rad + v * cos(twists * u)) * cos(u);
    y = (rad + v * cos(twists * u)) * sin(u);
    z = v * sin(twists * u);
    push();
    translate(x, y, z);
    box(5)
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

function buttonPress()
{
    if (capture == false) {
        capture = true;
        document.getElementById("myButton").value='Saving Frames... Press Again to Cancel'; 
        frameCount = 0;
    } else {
        location.reload(); //refresh the page (starts animation over, stops saving frames)
    }
}