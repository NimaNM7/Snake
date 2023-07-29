let direction = 0;
let madeApple;
let PART_SIZE = 40;
let speed = 100;
let interval;

//main class
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
            if (direction == 0) part.y = backPart.y + PART_SIZE;
            else if (direction == 1) part.x = backPart.x - PART_SIZE;
            else if (direction == 2) part.y = backPart.y - PART_SIZE;
            else if (direction == 3) part.x = backPart.x + PART_SIZE;
        } else {
            part.x = 2 * backPart.x - backPart.getBackPart().x;
            part.y = 2 * backPart.y - backPart.getBackPart().y;
        }
    }

    static moveAll() {
        for (let i = snakePart.allSnakeParts.length - 1 ; i >= 0 ; i--) {
            snakePart.allSnakeParts[i].move();
        }
    }

    static headMove(part,dir) {
        let xChange = 0;
        let yChange = 0;
        if (dir == 0) yChange = -1 * PART_SIZE;
        else if (dir == 1) xChange = PART_SIZE;
        else if (dir == 2) yChange = PART_SIZE;
        else if (dir == 3) xChange = -1 * PART_SIZE;
        part.div.remove();
        part.x += xChange;
        part.y += yChange;
        snakePart.makeSnakePartsDiv(part);
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

//methods
function resetGame() {
    speed = 100;
    clearInterval(interval);
    interval = setInterval(checkGame,speed);
    const bodyChildren = document.querySelectorAll("body > *");
    for (const child of bodyChildren) {
        child.remove();
    }
    while (snakePart.allSnakeParts.length != 0) {
        snakePart.allSnakeParts.pop();
    }
}

function initGame() {
    let headPart = new snakePart();
    snakePart.allSnakeParts.push(headPart); 
    makeApple();
}


function checkGame() {
    snakePart.moveAll();
    if (checkCollisionAll() || checkMargin())
        loseGame();
    else if (checkCollision(snakePart.allSnakeParts[0].div,madeApple))
        eatApple();
}

function loseGame() {
    resetGame();
    initGame();
}

function makeApple() {
    madeApple = document.createElement("div");
    madeApple.classList.add("Apple");
    madeApple.style.left = (Math.random() * window.innerWidth) + 'px';
    madeApple.style.top = (Math.random() * window.innerHeight) + 'px';
    document.body.appendChild(madeApple);
}

function eatApple() {
    madeApple.remove();
    makeApple();
    let addingPart = new snakePart();
    clearInterval(interval);
    speed *= 0.92;
    interval = setInterval(checkGame,speed);
}

function checkCollision(div1, div2) {
    let rect1 = div1.getBoundingClientRect();
    let rect2 = div2.getBoundingClientRect();

    // Check for overlap
    if (
      rect1.left + 1 < rect2.right &&
      rect1.right > rect2.left +1 &&
      rect1.top + 1 < rect2.bottom &&
      rect1.bottom > rect2.top + 1) {
        return true;
    }
    return false;
  }
  

function checkCollisionAll() {
    for (let i = 1 ; i < snakePart.allSnakeParts.length ; i++) {
        if (checkCollision(snakePart.allSnakeParts[0].div,snakePart.allSnakeParts[i].div)) return true;
    }
    return false;
}

function checkMargin() {
    let mainDiv = snakePart.allSnakeParts[0].div;
    let div = mainDiv.getBoundingClientRect();
    if (div.left < 0 || div.top < 0) return true;
    if (div.right > window.innerWidth || div.bottom > window.innerHeight) return true;
    return false;
}



//main 
initGame();

document.addEventListener("keydown",(event) => {
    if(event.code == 'ArrowUp') direction = 0;
    else if (event.code == 'ArrowRight') direction = 1;
    else if (event.code == 'ArrowDown') direction = 2;
    else if (event.code == 'ArrowLeft') direction = 3;
})


interval = setInterval(checkGame,speed);