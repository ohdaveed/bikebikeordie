//Global Variables

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
console.log(ctx);


const captSquare = {
    x: 502,
    y: 52,
    height: 46,
    width: 46,
    color: "orange",
    speed: 3,
    direction: {
        up: false,
        right: false,
        down: false,
        left: false,
    },
    draw: function() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
    },
    move: function() {
        if (this.direction.up) {
            this.y -= this.speed;
        }
        if (this.direction.left) {
            this.x -= this.speed;
        }
        if (this.direction.right) {
            this.x += this.speed;
        }
        if (this.direction.down) {
            this.y += this.speed;
        }
    },
    setDirection: function(key) {
        if (key == "w") {
            this.direction.up = true;
        }
        if (key == "a") {
            this.direction.left = true;
        }
        if (key == "s") {
            this.direction.down = true;
        }
        if (key == "d") {
            this.direction.right = true;
        }
    },
    unsetDirection: function(key) {
        if (key == "w") {
            this.direction.up = false;
        }
        if (key == "a") {
            this.direction.left = false;
        }
        if (key == "s") {
            this.direction.down = false;
        }
        if (key == "d") {
            this.direction.right = false;
        }
    },
    checkCollision: function(thing) {
        if (
            this.x + this.width > thing.x &&
            this.x < thing.x + thing.width &&
            this.y + this.height > thing.y &&
            this.y < thing.y + thing.height
        ) {
            console.log("collision");
            return true
        } else return false;
    }
}
captSquare.draw();

const cmdrCircle = {
    x: 200,
    y: 40,
    r: 17,
    color: "pink",
    speed: 10,
    draw: function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    },
    move: function(key) {
        console.log("you are pressing", key);
        if (key == "ArrowDown" && this.y + this.r + this.speed < canvas.height) {
            this.y += this.speed;
        }
        if (key == "ArrowUp" && this.y - this.r - this.speed > 0) {
            this.y -= this.speed;
        }
        if (key == "ArrowLeft" && this.x - this.r - this.speed > 0) {
            this.x -= this.speed;
        }
        if (key == "ArrowRight" && this.x + this.r + this.speed < canvas.width) {
            this.x += this.speed;
        }
        clearCanvas();
        this.draw();
    }
}
cmdrCircle.draw();

const obstacle = {
    x: 250,
    y: 250,
    width: 100,
    height: 100,
    color: "purple",
    draw: function() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}
obstacle.draw();

function drawGrid() {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;

    for (let i = 0; i <= canvas.width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
    }
    for (let i = 0; i <= canvas.height; i += 50) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }
}

function drawBackground() {
    // drawing road
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 440, 600, 45);
    ctx.fillRect(0, 240, 600, 45);

    ctx.beginPath();
    ctx.moveTo(0, 395);
    ctx.lineTo(600, 395)
    ctx.strokeStyle = 'white';
    ctx.setLineDash([5]);
    ctx.lineWidth = 3;
    ctx.strokeWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 350);
    ctx.lineTo(600, 350)
    ctx.strokeStyle = 'white';
    ctx.setLineDash([0]);
    ctx.strokeWidth = 4;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 305);
    ctx.lineTo(600, 305)
    ctx.strokeStyle = 'white';
    ctx.setLineDash([5]);
    ctx.strokeWidth = 2;
    ctx.stroke();
    
    // field
    ctx.fillStyle = rgb(133, 60, 8);
    ctx.fillRect(0, 0, 600, 220);
}

function drawRectangle() {
    ctx.beginPath();
    ctx.rect(70, 200, 280, 80);
    ctx.fillStyle = "blue";
    ctx.fill();
}


function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const stopAnimation = () => {
    cancelAnimationFrame(requestID);
    animationRunning = false;
}


let requestID;
let animationRunning = false;
const x = 0;

function animate() {

    animationRunning = true;

    captSquare.move();
    clearCanvas();
    captSquare.draw();

    cmdrCircle.draw();
    obstacle.draw();

    if (captSquare.checkCollision(obstacle)) {
        gameOver();
        return;
    } else {
        requestID = window.requestAnimationFrame(animate);
    }
}

animate();

document.getElementById('start-game')addEventListener('click', () => {
	drawBackground();
});

document.getElementById('make-rect').addEventListener('click', () => {
    drawRectangle();
});

document.getElementById('make-grid').addEventListener('click', (event) => {
    drawGrid();
});

document.getElementById('clear').addEventListener('click', () => {
    clearCanvas();
});

document.getElementById('stop-animation').addEventListener('click', (event) => {
    stopAnimation();
})

document.addEventListener('keydown', (event) => {
    if (['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(event.key)) {
        cmdrCircle.move(event.key)
    }
    if (['w', 'a', 's', 'd'].includes(event.key)) {
        captSquare.setDirection(event.key)
    }
});

document.addEventListener('keyup', (event) => {
    if (['w', 'a', 's', 'd'].includes(event.key)) {
        captSquare.unsetDirection(event.key)
    }
});