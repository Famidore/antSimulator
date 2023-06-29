class Ant{
    constructor(tempX, tempY, tempSize, tempModelPath){
        this.x = tempX;
        this.y = tempY;

        this.size = tempSize;
        this.angle = 0;

        this.modelPath = tempModelPath;

        this.xoff = 0;
        this.yoff = 0;
    }

    show(){
        this.x = constrain(this.x, 0, width);
        this.y = constrain(this.y, 0, height);

        push();
        translate(this.x, this.y);
        rotate(radians(this.angle));

        noStroke();
        // imageMode(CENTER);
        // noFill();
        // this.modelPath.resize(this.size, this.size * 2);

        fill(255);
        rect(0, 0, this.size, this.size * 2);
    }

    move(){
        this.xoff += 0.02;
        this.yoff += 0.01;
        var nx = noise(this.xoff) * width;
        var ny = noise(this.yoff) * height;

        this.x = nx;
        this.y = ny;
    }
}