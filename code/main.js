let filePath = "initParams.json";
let initParams;

var cnv;

function preload() {
  initParams = loadJSON(filePath, console.log("File read succesfully"), console.log("There's been an error reading the file"));
}

let ants = [];
let nests = [];
let foodies = [];
let world;

var nestsPop;
var antsPop;

var foodAmmount;
var foodRange;

let foodCount = 0;

let evaporateRate;


function setup() {
  frameRate(60);
  cnv = createCanvas(800, 800);
  centerCanvas();

  nestsPop = readParams("numberOfNests");
  antsPop = readParams("antPopulation");
  foodAmmount = readParams("foodAmmount");
  foodRange = readParams("foodRange");
  evaporateRate = readParams("evaporateRate");

  var worldWidth = readParams("worldWidth");
  var worldHeight = readParams("worldHeight");

  var delay = readParams("delay");
  var deleteValue = readParams("deleteValue");

  world = new WorldMatrix(worldWidth, worldHeight, evaporateRate, delay, deleteValue, 4);
  world.createWorldMap();

  for (let j = 0; j < nestsPop; j++) {
    var nestX = readParams("nestsPosition")[j][0] == "random" ? random(50, width - 50) : readParams("nestsPosition")[j][0];
    var nestY = readParams("nestsPosition")[j][1] == "random" ? random(50, height - 50) : readParams("nestsPosition")[j][1];;

    nests.push(new Nest(nestX, nestY, 'none', j, [random(100, 255), random(10, 255), random(50, 255)]))
    for (let i = 0; i < antsPop; i++) {
      ants.push(new Ant(nests[j].x, nests[j].y, 2, i, j));
    }
  }
}

function draw() {
  background(51);

  world.show();
  // world.spreadSmell();
  world.evaporate();


  noStroke();
  for (let i = 0; i < ants.length; i++) {
    fill(nests[ants[i].nestID].r, nests[ants[i].nestID].g, nests[ants[i].nestID].b, 200);
    ants[i].show();
    ants[i].move();
  }
  for (nest of nests) {
    nest.show();
    nest.grow();
  }

  for (let i = 0; i < foodies.length; i++) {
    foodies[i].show();
    // food.smell();
  }

  noFill();
  stroke(150);
  strokeWeight(1);
  rectMode(CENTER);
  rect(mouseX, mouseY, foodRange, foodRange);

  world.tidyUp();

  var fps = frameRate();
  textSize(15)
  fill(255);
  stroke(0);
  text("FPS: " + fps.toFixed(2), width / 2, height - 10);
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
  spawnFood(mouseX, mouseY, foodRange, foodAmmount, [5, 6, 7, 8, 9]);
}