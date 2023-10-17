class Ant {
    constructor(tempX, tempY, tempSize, tempID, tempNestID, tempType) {
        this.nestID = tempNestID;
        this.ID = tempID;

        this.type = tempType;

        this.x = tempX;
        this.y = tempY;

        this.size = tempSize;
        this.angle = 0;

        this.xoff = 0;
        this.yoff = 0;


        // battle stats

        this.attack = 3;
        this.health = 10;
        this.moveSpeed = 1;

        this.foodFound = false;

        this.rectW = world.rectWidth;
        this.rectH = world.rectHeight;

        this.followMouse = false;
    }

    show() {
        this.x = constrain(this.x, this.rectW, width - this.rectW);
        this.y = constrain(this.y, this.rectH, height - this.rectH);

        rect(this.x, this.y, this.size, this.size * 2);
    }

    move() {
        // if (!this.followMouse) {
        this.x += (Math.random() - 0.5) * 2 * this.moveSpeed;
        this.y += (Math.random() - 0.5) * 2 * this.moveSpeed;

        // } else {
        //     this.x += random(-this.moveSpeed, this.moveSpeed) + (mouseX - this.x) * 0.001;
        //     this.y += random(-this.moveSpeed, this.moveSpeed) + (mouseY - this.y) * 0.001;
        // }

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
            if (world.worldMap[floor(floor(this.x) / this.rectW)][floor(floor(this.y) / this.rectH)] < 150) {
                world.worldMap[floor(floor(this.x) / this.rectW)][floor(floor(this.y) / this.rectH)] += 20;
                world.feromoneMap.push([floor(floor(this.x) / this.rectW), floor(floor(this.y) / this.rectH)]);
            }
        }

    }
}