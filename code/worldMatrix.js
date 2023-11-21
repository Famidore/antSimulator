class WorldMatrix {
    constructor(tempXSize, tempYSize, tempEvapRate, tempDelay, tempDeleteValue, tempSpreadStrength) {
        this.xSize = tempXSize;
        this.ySize = tempYSize;
        this.evapRate = tempEvapRate;

        this.worldMap = [];
        this.feromoneMap = [];
        this.foodMap = [];

        this.rectWidth = width / this.xSize;
        this.rectHeight = height / this.ySize;

        this.smellMap = [];

        this.delay = tempDelay;
        this.deleteValue = tempDeleteValue;
        this.spreadStrength = tempSpreadStrength;
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
        if (frameCount % this.delay == 0) {
            for (let i = 0; i < this.xSize; i++) {
                for (let j = 0; j < this.ySize; j++) {
                    if (this.worldMap[i][j] > 0) {
                        this.worldMap[i][j] -= this.evapRate;
                    }
                }
            }
        }

    }

    show() {
        stroke(150, 50);
        strokeWeight(1);
        for (let i = 0; i < this.xSize; i++) {
            line(this.rectWidth * i, 0, this.rectWidth * i, height);
        }
        for (let i = 0; i < this.ySize; i++) {
            line(0, this.rectHeight * i, width, this.rectHeight * i);
        }

        noStroke();
        rectMode(CORNER);
        if (this.feromoneMap.length > 0) {
            for (let c = 0; c < this.feromoneMap.length; c++) {
                if (this.worldMap[this.feromoneMap[c][0]][this.feromoneMap[c][1]] >= 20) {
                    fill(120, 51, 200, this.worldMap[this.feromoneMap[c][0]][this.feromoneMap[c][1]]);
                    rect(this.feromoneMap[c][0] * this.rectWidth, this.feromoneMap[c][1] * this.rectHeight, this.rectWidth, this.rectHeight);
                }
            }
        }
    }

    spreadSmell() {
        if (frameCount % this.delay == 0) {
            for (let food of foodies) {
                if (this.smellMap.length > 0) {
                    var chosen = floor(random(0, this.smellMap.length));
                    var chosenStrength = this.worldMap[this.smellMap[chosen][0]][this.smellMap[chosen][1]];

                    if (chosen && chosenStrength > 25) {

                        this.smellMap.push([this.smellMap[chosen][0] - 1, [this.smellMap[chosen][1]]]);           // -1  0
                        this.worldMap[this.smellMap[chosen][0] - 1][this.smellMap[chosen][1]] += chosenStrength / this.spreadStrength;

                        this.smellMap.push([this.smellMap[chosen][0] + 1, [this.smellMap[chosen][1]]]);           // +1  0
                        this.worldMap[this.smellMap[chosen][0] + 1][this.smellMap[chosen][1]] += chosenStrength / this.spreadStrength;

                        this.smellMap.push([this.smellMap[chosen][0], [this.smellMap[chosen][1]] - 1]);           // 0  -1
                        this.worldMap[this.smellMap[chosen][0]][this.smellMap[chosen][1] - 1] += chosenStrength / this.spreadStrength;

                        this.smellMap.push([this.smellMap[chosen][0], [this.smellMap[chosen][1]] + 1]);           // 0  +1
                        this.worldMap[this.smellMap[chosen][0]][this.smellMap[chosen][1] + 1] += chosenStrength / this.spreadStrength;

                        this.smellMap.push([this.smellMap[chosen][0] - 1, [this.smellMap[chosen][1]] - 1]);       // -1 -1
                        this.worldMap[this.smellMap[chosen][0] - 1][this.smellMap[chosen][1] - 1] += chosenStrength / this.spreadStrength;

                        this.smellMap.push([this.smellMap[chosen][0] + 1, [this.smellMap[chosen][1]] + 1]);       // +1 +1
                        this.worldMap[this.smellMap[chosen][0] + 1][this.smellMap[chosen][1] + 1] += chosenStrength / this.spreadStrength;

                        this.smellMap.push([this.smellMap[chosen][0] - 1, [this.smellMap[chosen][1]] + 1]);       // -1 +1
                        this.worldMap[this.smellMap[chosen][0] - 1][this.smellMap[chosen][1] + 1] += chosenStrength / this.spreadStrength;

                        this.smellMap.push([this.smellMap[chosen][0] + 1, [this.smellMap[chosen][1]] - 1]);       // +1 -1
                        this.worldMap[this.smellMap[chosen][0] + 1][this.smellMap[chosen][1] - 1] += chosenStrength / this.spreadStrength;
                    }
                }
            }
            this.evaporate();
        }
    }

    tidyUp() {
        if (this.smellMap.length > 0 && frameCount % this.delay == 0) {
            for (let i = 0; i < this.smellMap.length; i++) {
                if (this.worldMap[this.smellMap[i][0]][this.smellMap[i][1]] < this.deleteValue) {
                    this.smellMap.splice(this.smellMap[i], 1);
                }
            }
        }

        if (this.feromoneMap.length > 0 && frameCount % this.delay == 0) {
            for (let i = 0; i < this.feromoneMap.length; i++) {
                if (this.worldMap[this.feromoneMap[i][0]][this.feromoneMap[i][1]] < this.deleteValue) {
                    this.feromoneMap.splice(this.feromoneMap[i], 1);
                }
            }
        }
    }
}