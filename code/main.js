let ants = [];
let nests = [];

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
}
