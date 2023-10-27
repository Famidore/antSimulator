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
        this.carriedFoodID = null;

        this.rectW = world.rectWidth;
        this.rectH = world.rectHeight;

        this.followMouse = false;
    }

    show() {
        this.x = constrain(this.x, this.rectW, width - this.rectW);
        this.y = constrain(this.y, this.rectH, height - this.rectH);

        rect(this.x, this.y, this.size, this.size);
    }

    move() {
        // if (!this.followMouse) {
        this.x += (Math.random() - 0.5) * 2 * this.moveSpeed;
        this.y += (Math.random() - 0.5) * 2 * this.moveSpeed;

        // } else {
        //     this.x += random(-this.moveSpeed, this.moveSpeed) + (mouseX - this.x) * 0.001;
        //     this.y += random(-this.moveSpeed, this.moveSpeed) + (mouseY - this.y) * 0.001;
        // }


        if (!this.foodFound) {
            if (ifContains(world.foodMap, [floor(floor(this.x) / this.rectW), floor(floor(this.y) / this.rectH)])) {
                this.foodFound = true;
                // console.log("food found")
                for (let i = 0; i < foodies.length; i++) {
                    if (dist(this.x, this.y, foodies[i].x, foodies[i].y) < this.rectW) {
                        this.carriedFoodID = i;
                        if (!foodies[i].isCarried) {
                            foodies[i].isCarried = true;
                        }
                    }
                }
            }
        } else {
            this.releasePheromone();
            this.carryFood();
            this.returnToNest();
        }
    }

    carryFood() {
        if (this.carriedFoodID) {
            foodies[this.carriedFoodID].x = this.x;
            foodies[this.carriedFoodID].y = this.y;
        }
    }

    returnToNest() {
        if (dist(this.x, this.y, nests[this.nestID].x, nests[this.nestID].y) >= nests[this.nestID].size / 2) {
            this.x += random(-this.moveSpeed, this.moveSpeed) + (nests[this.nestID].x - this.x) * 0.01;
            this.y += random(-this.moveSpeed, this.moveSpeed) + (nests[this.nestID].y - this.y) * 0.01;
        } else {

            // carried food gets it's id mixed up, need to use indexOf()
            if (this.foodFound) {
                this.removeFood();
            }
        }
    }

    releasePheromone() {
        if (frameCount % world.delay == 0) {
            if (world.worldMap[floor(floor(this.x) / this.rectW)][floor(floor(this.y) / this.rectH)] < 150) {
                world.worldMap[floor(floor(this.x) / this.rectW)][floor(floor(this.y) / this.rectH)] += 50;
                world.feromoneMap.push([floor(floor(this.x) / this.rectW), floor(floor(this.y) / this.rectH)]);
            }
        }

    }

    removeFood() {
        if (foodies[this.carriedFoodID]) {
            nests[this.nestID].food += foodies[this.carriedFoodID].value;
            foodies[this.carriedFoodID].removeSelf();
            foodies.splice(this.carriedFoodID, 1);

            for (let i = 0; i < ants.length; i++) {
                if (ants[i].foodFound && ants[i].ID != this.ID)
                    if (ants[i].carriedFoodID > this.carriedFoodID) {
                        ants[i].carriedFoodID -= 1;
                    }
            }

            this.foodFound = false;
            this.carriedFoodID = null;
            console.log("returned");
        }
    }
}