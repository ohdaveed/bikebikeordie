//Global Variables

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let raf;

drawBackground();

const game = {
    score: 0,
    lives: 3,
    lives: 0,
    time: 50,
    movingEnemies: [],
    potholesArray: [],
    powerUps: [],
    cars: [],
    start: function() {

        game.createPotholes();
        game.createCars();

        drawBackground();
        game.drawPotholes();
        game.drawCars();
        biker.draw();

        /// 4 interval 
        // create enemy
        animate();
    },

    createCars: function() {
        for (let i = 0; i < 3; i++) {
            let car = new MovingEnemy('car', 100, 50, 'red', 5, 600, 100)
            this.cars.push(car);
        }
        console.log(this.cars)
    },

    createPotholes: function() {
        for (let i = 0; i < 6; i++) {
            let pothole = new StaticEnemy("pothole", 15, 'black')
            this.potholesArray.push(pothole);
        }
        console.log(this.potholesArray)
    },

    drawEnemies: function() {
        for (let i = 0; i < 6; i++) {
            console.log[i]
        }
    },

    drawCars: function() {
        for (let i = 0; i < this.cars.length; i++) {
            this.cars[i].draw();
            this.cars[i].move()
        }
    },

    drawPotholes: function() {
        for (let i = 0; i < this.potholesArray.length; i++) {
            this.potholesArray[i].draw()
        }

    },

    gameOver: function() {

    },

    checkCollision: function() {},

}

class MovingEnemy {
    constructor(name, width, height, color, vx, x, y) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.color = color;
        this.vx = vx;
        this.x = x;
        this.y = y;
    }
    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    move() {
        this.x -= this.vx;

        if (this.x <= 0) {
            this.x = 600;
        }
    }

    collide() {

    }
}

class StaticEnemy {
    constructor(name, r, color) {
        this.name = name;
        let rx = Math.floor(Math.random() * 700);

        let ry = Math.floor(Math.random() * 700);
        // 1 fix this to be on street
        this.x = rx
        this.y = ry
        this.r = r;
        this.color = color;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

const biker = {
    x: 5,
    y: 650,
    height: 46,
    width: 46,
    color: "black",
    speed: 5,

    draw: function() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
    },
    move: function(key) {
        if (key == "ArrowDown" && this.y + this.speed < canvas.height) {
            this.y += this.speed;
        }
        if (key == "ArrowUp" && this.y - this.speed > 0) {
            this.y -= this.speed;
        }
        if (key == "ArrowLeft" && this.x - this.speed > 0) {
            this.x -= this.speed;
        }
        if (key == "ArrowRight" && this.x + this.speed < canvas.width) {
            this.x += this.speed;
        }
    },
}

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

const vampire = {
    x: 0,
    y: 400,
    width: 50,
    height: 50,
    color: "purple",
    vx: 5,
    obstacleCenter: 50,
    draw: function() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();

    },
    move: function() {
        this.x += this.vx;

        if (this.x + this.vx > canvas.width || this.x + this.vx < 0) {
            this.vx = -this.vx;
        }

    }
}

function drawBackground() {
    // drawing road
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 350, canvas.width, 50);
    ctx.fillRect(0, 200, canvas.width, 50);
    ctx.fillRect(0, 650, canvas.width, 50);
    ctx.fillRect(0, 50, canvas.width, 50);
    ctx.fillRect(0, 500, canvas.width, 50);



    ctx.beginPath();
    ctx.moveTo(0, 395);
    ctx.lineTo(700, 395)
    ctx.strokeStyle = 'white';
    ctx.setLineDash([5]);
    ctx.lineWidth = 3;
    ctx.strokeWidth = 4;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 650);
    ctx.lineTo(700, 650)
    ctx.strokeStyle = 'white';
    ctx.setLineDash([0]);
    ctx.strokeWidth = 4;
    ctx.stroke();

    ctx.beginPath(); 
    ctx.moveTo(0, 650); 
    ctx.lineTo(700, 650); 
    ctx.strokeStyle = 'white'; 
    ctx.setLineDash([0]); 
    ctx.strokeWidth = 4; 
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 305);
    ctx.lineTo(700, 305)
    ctx.strokeStyle = 'white';
    ctx.setLineDash([5]);
    ctx.strokeWidth = 4;
    ctx.stroke();

    // field
    ctx.fillStyle = 'rgb(11, 102, 35)';
    ctx.fillRect(0, 0, 700, 50);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// let x = 0;
function animate() {
    clearCanvas()
    drawBackground();
    game.drawPotholes()
    biker.draw();
    game.drawCars();
    vampire.draw();
    vampire.move();

    window.requestAnimationFrame(animate)
}


// // const cmdrCircle = {
//     x: 200,
//     y: 40,
//     r: 17,
//     color: "pink",
//     speed: 10,
//     draw: function() {
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
//         ctx.fillStyle = this.color;
//         ctx.fill();
//     },
//     move: function(key) {
//         console.log("you are pressing", key);
//         if (key == "ArrowDown" && this.y + this.r + this.speed < canvas.height) {
//             this.y += this.speed;
//         }
//         if (key == "ArrowUp" && this.y - this.r - this.speed > 0) {
//             this.y -= this.speed;
//         }
//         if (key == "ArrowLeft" && this.x - this.r - this.speed > 0) {
//             this.x -= this.speed;
//         }
//         if (key == "ArrowRight" && this.x + this.r + this.speed < canvas.width) {
//             this.x += this.speed;
//         }
//         clearCanvas();
//         this.draw();
//         obstacle.draw();
//         captSquare.draw();
//         captSquare.checkCollision(this);


//     }
// }

// cmdrCircle.draw();



// const stopAnimation = () => {
//     cancelAnimationFrame(requestID);
//     animationRunning = false;
// }

// let requestID;
// let animationRunning = false;



// Event Listeners

document.getElementById('start-game').addEventListener('click', (event) => {
    game.start();
});

document.addEventListener('keydown', (event) => {
    if (['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(event.key)) {
        biker.move(event.key)
    }

});