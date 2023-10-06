class Nest {
    constructor(tempX, tempY, tempType, tempID) {
        this.ID = tempID;

        this.x = tempX;
        this.y = tempY;
        this.type = tempType;

        this.r = 0;
        this.g = 255;
        this.b = 0;

        this.size = 10;

        this.food = 0;
    }

    show() {
        stroke(0);
        strokeWeight(this.size / 10);
        fill(this.r, this.g, this.b);
        rectMode(CENTER);
        rect(this.x, this.y, this.size, this.size);
    }

    grow() {
        if (this.food >= 100){
            this.food = 0;
            this.produceAnt();
            this.size += 1;
        }
    }

    produceAnt() {
        ants.push(new Ant(this.x, this.y, 5, ants.length + 1));
    }
}