class Nest {
    constructor(tempX, tempY, tempType, tempID, tempCol, tempfoodLimit) {
        this.ID = tempID;

        this.x = tempX;
        this.y = tempY;
        this.type = tempType;

        this.r = tempCol[0];
        this.g = tempCol[1];
        this.b = tempCol[2];

        this.size = 10;

        this.food = 0;
        this.foodLimit = tempfoodLimit
    }

    show() {
        stroke(0);
        strokeWeight(this.size / 10);
        fill(this.r, this.g, this.b, 50);
        rectMode(CENTER);
        rect(this.x, this.y, this.size, this.size);

        fill(255);
        stroke(0);
        textAlign(CENTER, CENTER);
        textSize(20);
        text(this.food, this.x, this.y - 30);
    }

    grow() {
        if (this.food >= this.foodLimit) {
            this.food = 0;
            this.produceAnt();
            this.size += 1;
        }
    }

    produceAnt() {
        ants.push(new Ant(this.x, this.y, 2, ants.length + 1, this.ID));
    }
}