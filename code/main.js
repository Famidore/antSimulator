let ants = [];
let nests = [];
let foodies = [];
let world;

var nestsPop = 2;
var antsPop = 1000;

var foodRange = 50;

let foodCount = 0;


function setup() {
  frameRate(60);
  createCanvas(800, 800);

  world = new WorldMatrix(100, 100, 20);
  world.createWorldMap();

  for (let j = 0; j < nestsPop; j++) {
    nests.push(new Nest(random(50, width - 50), random(50, height - 50), 'none', j, [random(100, 255), random(10, 255), random(50, 255)]))
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
  for (ant of ants) {
    fill(nests[ant.nestID].r, nests[ant.nestID].g, nests[ant.nestID].b, 200);
    ant.show();
    ant.move();
  }
  for (nest of nests) {
    nest.show();
    nest.grow();
  }

  for (food of foodies) {
    food.show();
    // food.smell();
  }

  noFill();
  stroke(150);
  strokeWeight(1);
  rectMode(CENTER);
  rect(mouseX, mouseY, foodRange, foodRange);

  world.tidyUp();

  let fps = frameRate();
  textSize(15)
  fill(255);
  stroke(0);
  text("FPS: " + fps.toFixed(2), 10, height - 10);

  // console.log([floor(floor(ants[0].x) / ants[0].rectW), floor(floor(ants[0].y) / ants[0].rectH)])
}


function spawnFood(x, y, range, ammount, values) {
  for (let i = 0; i < ammount; i++) {
    if (x > range && y > range && x < width - range && y < height - range) {

      var fx = random(x - range / 2, x + range / 2);
      var fy = random(y - range / 2, y + range / 2);
      foodies.push(new Food(fx, fy, values[floor(random(0, values.length))], foodCount))

      foodCount++;

      world.smellMap.push([floor(fx / world.rectWidth), floor(fy / world.rectHeight)]);
      world.worldMap[floor(fx / world.rectWidth)][floor(fy / world.rectHeight)] += 225;
      world.foodMap.push([floor(fx / world.rectWidth), floor(fy / world.rectHeight)]);
    }
  }
}

function mousePressed() {
  spawnFood(mouseX, mouseY, foodRange, 5, [5, 6, 7, 8, 9]);
}