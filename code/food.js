class Food{
    constructor(tempX, tempY, tempValue){
        this.x = tempX;
        this.y = tempY;
        this.value = tempValue;
    }

    show(){
        noStroke();
        fill(0, 0, 255);
        ellipse(this.x, this.y, this.value); 
    }

}