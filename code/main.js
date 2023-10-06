let ants = [];
let nests = [];
let foodies = [];

var nestsPop = 5;
var antsPop = 50;

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

}

function draw() {
  background(51);

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
}


function spawnFood(x, y, range, ammount, values) {
  for (let i = 0; i < ammount; i++) {
    foodies.push(new Food(random(x - range / 2, x + range / 2), random(y - range / 2, y + range / 2), values[floor(random(0, values.length))]))
  }
  console.log(foodies[0]);
}

function mousePressed() {
  spawnFood(mouseX, mouseY, 20, 5, [5, 6, 7, 8, 9]);
}