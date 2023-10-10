class WorldMatrix {
    constructor(tempXSize, tempYSize, tempEvapRate) {
        this.xSize = tempXSize;
        this.ySize = tempYSize;
        this.evapRate = tempEvapRate;
        this.worldMap = [];

        this.rectWidth = width / this.xSize;
        this.rectHeight = height / this.ySize;

        this.smellMap = [];
    }

    createWorldMap() {
        for (let i = 0; i < this.xSize; i++) {
            this.worldMap[i] = []
            for (let j = 0; j < this.ySize; j++) {
                this.worldMap[i][j] = 0;
            }
        }
    }

    evaporate() {
        for (let i = 0; i < this.xSize; i++) {
            for (let j = 0; j < this.ySize; j++) {
                if (this.worldMap[i][j] > 0) {
                    this.worldMap[i][j] -= evapRate;
                }
            }
        }

    }

    show() {
        // 1st
        stroke(150, 50);
        strokeWeight(1);
        for (let i = 0; i < this.xSize; i++) {
            line(this.rectWidth * i, 0, this.rectWidth * i, height);
        }
        for (let i = 0; i < this.ySize; i++) {
            line(0, this.rectHeight * i, width, this.rectHeight * i);
        }

        //2nd
        // for (let i = 0 ; i < this.xSize; i++){
        //     for (let j = 0; j < this.ySize; j++){
        //         noFill();
        //         stroke(150, 50);
        //         strokeWeight(1);
        //         rect(i * this.rectWidth, j * this.rectHeight, this.rectWidth, this.rectHeight);
        //     }
        // }

        if (this.smellMap.length > 0) {
            for (let z = 0; z < this.smellMap.length; z++) {
                noStroke();
                fill(this.worldMap[this.smellMap[z][0]][this.smellMap[z][1]], 0, 0, 100);
                rectMode(CORNER);
                rect(this.smellMap[z][0] * this.rectWidth, this.smellMap[z][1] * this.rectHeight, this.rectWidth, this.rectHeight);
            }

        }
    }
}