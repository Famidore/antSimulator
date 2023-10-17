class Ant {
    constructor(tempX, tempY, tempSize, tempID, tempNestID, tempType) {
        this.nestID = tempNestID;
        this.ID = tempID;

        this.type = tempType;

        this.x = tempX;
        this.y = tempY;

        this.size = tempSize;
        this.angle = 0;

        this.modelPath = antWorkerModel;

        this.xoff = 0;
        this.yoff = 0;


        // battle stats

        this.attack = 3;
        this.health = 10;

        this.foodFound = false;

        this.rectW = world.rectWidth;
        this.rectH = world.rectHeight;
    }

    show() {

        // this.angle += 1;
        this.x = constrain(this.x, 0, width);
        this.y = constrain(this.y, 0, height);

        push();
        translate(this.x, this.y);
        rotate(radians(this.angle));

        noStroke();
        fill(255, 50, 100, 100);


        // noFill()
        // imageMode(CENTER)
        // this.modelPath.resize(this.size, this.size * 2)
        // image(this.modelPath, 0, 0)
        //stroke(255);
        rect(0, 0, this.size, this.size * 2);

        pop();
    }

    move() {
        this.x += random(-1, 1);
        this.y += random(-1, 1);

        // this.xoff += random(-0.001, 0.003);
        // this.yoff += random(-0.001, 0.003);
        // var nx = noise(this.xoff);
        // var ny = noise(this.yoff);

        // this.x = nx * width;
        // this.y = ny * height;

        // do rotation

        this.releasePheromone();
    }

    findFood() {

    }

    carryFood() {

    }

    returnToNest() {

    }

    releasePheromone() {
        if (frameCount % world.delay == 0) {
            if (world.worldMap[floor(floor(this.x) / this.rectW)][floor(floor(this.y) / this.rectH)] < 12) {
                world.worldMap[floor(floor(this.x) / this.rectW)][floor(floor(this.y) / this.rectH)] += 125;
                world.feromoneMap.push([floor(floor(this.x) / this.rectW), floor(floor(this.y) / this.rectH)]);
            }
        }

    }
}