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

        this.currX = floor(floor(this.x) / this.rectW);
        this.currY = floor(floor(this.y) / this.rectH);
    }

    show() {
        this.x = constrain(this.x, this.rectW, width - this.rectW);
        this.y = constrain(this.y, this.rectH, height - this.rectH);

        rect(this.x, this.y, this.size, this.size);
    }

    move() {
        if (!this.foodFound) {
            if (ifContains(world.foodMap, [floor(floor(this.x) / this.rectW), floor(floor(this.y) / this.rectH)])) {
                this.foodFound = true;
                for (let i = 0; i < foodies.length; i++) {
                    if (dist(this.x, this.y, foodies[i].x, foodies[i].y) < this.rectW) {
                        this.carriedFoodID = i;
                        if (!foodies[i].isCarried) {
                            foodies[i].isCarried = true;
                        }
                    }
                }
            } else {
                if (this.checkIfNewPos()) {
                    newMove = this.checkPheromone(this.currX, this.currY);

                    this.x += (Math.random() - 0.5) * 2 * this.moveSpeed + (newMove[0] * this.rectW) * 0.01;
                    this.y += (Math.random() - 0.5) * 2 * this.moveSpeed + (newMove[1] * this.rectH) * 0.01;
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

    checkIfNewPos() {
        if (floor(floor(this.x) / this.rectW) != this.currX || floor(floor(this.y) / this.rectH) != this.currY) {
            this.currX = floor(floor(this.x) / this.rectW);
            this.currY = floor(floor(this.y) / this.rectH);
            return true;
        } else {
            return false;
        }
    }

    // find new square to head to
    checkPheromone(xPos, yPos) {
        var lu = world.worldMap[xPos - 1][yPos - 1];
        var ll = world.worldMap[xPos - 1][yPos];
        var ld = world.worldMap[xPos - 1][yPos + 1];

        var uu = world.worldMap[xPos][yPos - 1];
        var dd = world.worldMap[xPos][yPos + 1];

        var ru = world.worldMap[xPos + 1][yPos - 1];
        var rr = world.worldMap[xPos + 1][yPos];
        var rd = world.worldMap[xPos + 1][yPos + 1];

        const arr = [lu, ll, ld, uu, dd, ru, rr, rd];

        const max = Math.max(arr)
        const chosen = arr[arr.indexOf(max)]

        switch (chosen) {
            case lu: return [-1, -1]; break;
            case ll: return [-1, 0]; break;
            case ld: return [-1, +1]; break;
            case uu: return [0, -1]; break;
            case dd: return [0, +1]; break;
            case ru: return [+1, -1]; break;
            case rr: return [+1, -0]; break;
            case rd: return [+1, +1]; break;

            default: return [floor(random(-1, 1)), floor(random(-1, 1))]; break;
        }
    }
}