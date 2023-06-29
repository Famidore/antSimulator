let ants = [];


function setup() {
  createCanvas(800, 800);

  for (let i = 0; i < 10; i++){
    ants.push(new Ant(0, 0, 10));
  }
}

function draw() {
  background(51);

  for (ant of ants){
    ant.show();
    ant.move();
  }
}
