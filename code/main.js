let ants = [];

function preload(){

  antWorkerModel = loadImage('assets/antModel1.png');
}


function setup() {
  createCanvas(800, 800);

  for (let i = 0; i < 50; i++){
    var x = random(50, width-50);
    var y = random(50, height-50);
    ants.push(new Ant(x, y, 10));
  }
}

function draw() {
  background(51);

  for (ant of ants){
    ant.show();
    // ant.move();
  }
}
