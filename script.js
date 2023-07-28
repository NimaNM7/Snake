let direction = 0;

class snakePart {
    static allSnakeParts = [];
    x;
    y;
    div;
    constructor() {
        if (snakePart.allSnakeParts.length != 0) {
            snakePart.placePart(this);
            snakePart.allSnakeParts.push(this);
        } else {
            this.x = Math.random() * window.innerWidth;
            this.y = Math.random() * window.innerHeight;
        }
        snakePart.makeSnakePartsDiv(this);
    }

    static makeSnakePartsDiv(part) {
        part.div = document.createElement('div');
        part.div.classList.add("snakePart");
        part.div.style.left = part.x + 'px';
        part.div.style.top = part.y + 'px';
        document.body.appendChild(part.div);
    }

    static placePart(part) {
        let backPart = snakePart.allSnakeParts[snakePart.allSnakeParts.length-1];
        part.x = backPart.x;
        part.y = backPart.y;
        if (snakePart.allSnakeParts.length == 1) {
            if (direction == 0) part.y = backPart.y + 20;
            else if (direction == 1) part.x = backPart.x - 20;
            else if (direction == 2) part.y = backPart.y - 20;
            else if (direction == 3) part.x = backPart.x + 20;
        } else {
            console.log(backPart.getBackPart());
            part.x = 2 * backPart.x - backPart.getBackPart().x;
            part.y = 2 * backPart.y - backPart.getBackPart().y;
        }
        console.log("current part:");
        console.log(part);
        console.log("back part:");
        console.log(backPart);
    }

    static moveAll() {
        for (let i = snakePart.allSnakeParts.length - 1 ; i >= 0 ; i--) {
            snakePart.allSnakeParts[i].move();
        }
    }

    static headMove(part,dir) {
        console.log('before moving');
        console.log(part);
        let xChange = 0;
        let yChange = 0;
        if (dir == 0) yChange = -20;
        else if (dir == 1) xChange = 20;
        else if (dir == 2) yChange = 20;
        else if (dir == 3) xChange = -20;
        part.div.remove();
        console.log(part);
        part.x += xChange;
        part.y += yChange;
        snakePart.makeSnakePartsDiv(part);
        console.log('after moving');
        console.log(part);
    }

    static move(part,finalX,finalY) {
        part.div.remove();
        part.x = finalX;
        part.y = finalY;
        snakePart.makeSnakePartsDiv(part);
    }

    getBackPart() {
        let index = snakePart.allSnakeParts.indexOf(this);
        return snakePart.allSnakeParts[index-1];
    }

    move() {
        if (snakePart.allSnakeParts.indexOf(this) == 0) {
            snakePart.headMove(this,direction);
        } else {
            snakePart.move(this,this.getBackPart().x,this.getBackPart().y);
        }
    }
}


let head = new snakePart();
snakePart.allSnakeParts.push(head);

let secondPart = new snakePart();
let thirdPart = new snakePart();

document.addEventListener("keydown",(event) => {
    if(event.code == 'ArrowUp') direction = 0;
    else if (event.code == 'ArrowRight') direction = 1;
    else if (event.code == 'ArrowDown') direction = 2;
    else if (event.code == 'ArrowLeft') direction = 3;
})


// setInterval(snakePart.moveAll,300);