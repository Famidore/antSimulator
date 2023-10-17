let ants = [];
let nests = [];
let foodies = [];
let world;

var nestsPop = 2;
var antsPop = 5000;

var foodRange = 20;


function setup() {
  frameRate(60);
  createCanvas(800, 800);

  world = new WorldMatrix(100, 100, 20);
  world.createWorldMap();

  for (let j = 0; j < nestsPop; j++) {
    nests.push(new Nest(random(50, width - 50), random(50, height - 50), 'none', j))
    for (let i = 0; i < antsPop; i++) {
      ants.push(new Ant(nests[j].x, nests[j].y, 2, i, j));
    }
  }
}

function draw() {
  background(51);

  world.show();
  world.spreadSmell();


  noStroke();
  fill(255, 50, 100, 100);
  for (ant of ants) {
    ant.show();
    ant.move();
  }
  for (nest of nests) {
    nest.show();
    nest.grow();
  }

  for (food of foodies) {
    food.show();
    food.smell();
  }

  noFill();
  stroke(150);
  strokeWeight(1);
  rectMode(CENTER);
  rect(mouseX, mouseY, foodRange, foodRange);

  world.tidyUp();

  let fps = frameRate();
  fill(255);
  stroke(0);
  text("FPS: " + fps.toFixed(2), 10, height - 10);
}


function spawnFood(x, y, range, ammount, values) {
  for (let i = 0; i < ammount; i++) {
    if (x > range && y > range && x < width - range && y < height - range) {

      var fx = random(x - range / 2, x + range / 2);
      var fy = random(y - range / 2, y + range / 2);
      foodies.push(new Food(fx, fy, values[floor(random(0, values.length))]))

      world.smellMap.push([floor(fx / world.rectWidth), floor(fy / world.rectHeight)])
      world.worldMap[floor(fx / world.rectWidth)][floor(fy / world.rectHeight)] += 225;
    }
  }
}

function mousePressed() {
  spawnFood(mouseX, mouseY, foodRange, 5, [5, 6, 7, 8, 9]);
}