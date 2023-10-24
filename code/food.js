class Food {
    constructor(tempX, tempY, tempValue, tempID) {
        this.ID = tempID;

        this.x = tempX;
        this.y = tempY;
        this.value = tempValue;

        this.isCarried = false;
        this.selfPos = [floor(this.x / world.rectWidth), floor(this.y / world.rectHeight)];
    }

    show() {
        noStroke();
        fill(0, 0, 255);
        ellipse(this.x, this.y, this.value);
    }

    smell() {
        if (this.isCarried == false) {
            world.worldMap[floor(this.x / world.rectWidth)][floor(this.y / world.rectHeight)] = 200;
        }
    }

    removeSelf(){
        for (let i = 0; i < world.foodMap.length; i++){
            if (JSON.stringify(world.foodMap[i]) == JSON.stringify(this.selfPos)){
                world.foodMap.splice(i, 1);
            }
        }
        
    }

}