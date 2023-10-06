let ants = [];
let nests = [];
let foodies = [];
let world;

var nestsPop = 5;
var antsPop = 50;

var foodRange = 20;

function preload() {

  antWorkerModel = loadImage('assets/antModel1.png');
}


function setup() {
  createCanvas(800, 800);

  for (let j = 0; j < nestsPop; j++) {
    nests.push(new Nest(random(50, width - 50), random(50, height - 50), 'none', j))
    for (let i = 0; i < antsPop; i++) {
      ants.push(new Ant(nests[j].x, nests[j].y, 5, i, j));
    }
  }

  world = new WorldMatrix(100, 100, 1);
  world.createWorldMap();
}

function draw() {
  background(51);

  world.show();

  for (ant of ants) {
    ant.show();
    ant.move();
  }
  for (nest of nests) {
    nest.show();
    nest.grow();
  }

  for (food of foodies){
    food.show();
  }

  noFill();
  stroke(150);
  strokeWeight(1);
  rectMode(CENTER);
  rect(mouseX, mouseY, foodRange, foodRange);

}


function spawnFood(x, y, range, ammount, values) {
  for (let i = 0; i < ammount; i++) {
    foodies.push(new Food(random(x - range / 2, x + range / 2), random(y - range / 2, y + range / 2), values[floor(random(0, values.length))]))
  }
}

function mousePressed() {
  spawnFood(mouseX, mouseY, foodRange, 5, [5, 6, 7, 8, 9]);
  console.log(world.worldMap);
}