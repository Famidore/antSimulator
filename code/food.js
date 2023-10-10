class Food {
    constructor(tempX, tempY, tempValue) {
        this.x = tempX;
        this.y = tempY;
        this.value = tempValue;

        this.isCarried = false;
    }

    show() {
        noStroke();
        fill(0, 0, 255);
        ellipse(this.x, this.y, this.value);
    }

    smell() {
        if (this.isCarried == false) {
            world.worldMap[floor(this.x / world.rectWidth)][floor(this.y / world.rectHeight)] == 100;

            world.smellMap.push([floor(this.x / world.rectWidth)][floor(this.y / world.rectHeight)]);
        }
    }

}