//Global Variables

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const dx = 60;
let raf;

let cyclistImage = new Image();
cyclistImage.src = './media/13.png'

drawBackground();

// Game Object

const game = {
    score: 0,
    lives: 3,
    lives: 0,
    time: 50,
    potholes: [],
    vampires: [],
    cars: [],
    start: function() {

        game.createPotholes();
        game.createCars();
        game.createVampires();
        game.drawPotholes();
        game.drawCars();
        biker.draw();
        animate();
    },

    createCars: function() {
        for (let i = 0; i < 3; i++) {
            let car = new MovingEnemy('car', 70, 40, 'red', 5, 600, 105);
            this.cars.push(car);
        }
        console.log(this.cars)
    },

    createVampires: function() {
        for (let i = 0; i < 3; i++) {
            let vampire = new MovingEnemy("vampire", 46, 46, 'yellow', 5, 400, 100);
            this.vampires.push(vampire);
        }
        console.log(this.vampires);
    },

    createPotholes: function() {
        for (let i = 0; i < 10; i++) {
            let pothole = new StaticEnemy("pothole", 15, 'black')
            this.potholes.push(pothole);
        }
        console.log(this.potholes)
    },

    drawVampires: function() {

    },

  

    drawCars: function() {
        for (let i = 0; i < this.cars.length; i++) {
            this.cars[i].draw();
            this.cars[i].move()
        }
    },

    drawPotholes: function() {
        for (let i = 0; i < this.potholes.length; i++) {
            this.potholes[i].draw()
        }
    },
}

class MovingEnemy {
    constructor(name, width, height, color, speed, x, y) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = speed;
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
        this.x -= this.speed;

        if (this.x <= 0) {
            this.x = 600;
        }
    }
}

class StaticEnemy {
    constructor(name, r, color) {
        this.name = name;
        let rx = Math.floor(Math.random() * 700);
        let ry = (Math.floor(Math.random() * 100) + 550)    
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

// User Object

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
        }1
    },
}

const vampire = {
    x: 0,
    y: 360,
    width: 36,
    height: 36,
    color: "purple",
    speed: 5,
    draw: function() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();

    },
    move: function() {
        this.x += this.speed;

        if (this.x + this.speed > canvas.width || this.x + this.speed < 0) {
            this.speed = -this.speed;
        }

    }
}



function drawBackground() {
    // drawing side walks
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 350, canvas.width, 50);
    ctx.fillRect(0, 200, canvas.width, 50);
    ctx.fillRect(0, 650, canvas.width, 50);
    ctx.fillRect(0, 50, canvas.width, 50);
    ctx.fillRect(0, 500, canvas.width, 50);

    // drawing roads

    ctx.beginPath();
    ctx.moveTo(0, 650);
    ctx.lineTo(700, 650)
    ctx.strokeStyle = 'white';
    ctx.setLineDash([0]);
    ctx.strokeWidth = 4;
    ctx.stroke();


    ctx.beginPath();
    ctx.moveTo(0, 395);
    ctx.lineTo(700, 395)
    ctx.strokeStyle = 'grey';
    ctx.setLineDash([5]);
    ctx.lineWidth = 3;
    ctx.strokeWidth = 4;
    ctx.stroke();


    // Creates Solid Lines
    ctx.beginPath(); 
    ctx.moveTo(0, 650); 
    ctx.lineTo(700, 650); 
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
    ctx.moveTo(0, 500); 
    ctx.lineTo(700, 500); 
    ctx.strokeStyle = 'white'; 
    ctx.setLineDash([0]); 
    ctx.strokeWidth = 4; 
    ctx.stroke();

    ctx.beginPath(); 
    ctx.moveTo(0, 350); 
    ctx.lineTo(700, 350); 
    ctx.strokeStyle = 'white'; 
    ctx.setLineDash([0]); 
    ctx.strokeWidth = 4; 
    ctx.stroke();

    ctx.beginPath(); 
    ctx.moveTo(0, 250); 
    ctx.lineTo(700, 250); 
    ctx.strokeStyle = 'white'; 
    ctx.setLineDash([0]); 
    ctx.strokeWidth = 4; 
    ctx.stroke();

    ctx.beginPath(); 
    ctx.moveTo(0, 200); 
    ctx.lineTo(700, 200); 
    ctx.strokeStyle = 'white'; 
    ctx.setLineDash([0]); 
    ctx.strokeWidth = 4; 
    ctx.stroke();

    ctx.beginPath(); 
    ctx.moveTo(0, 100); 
    ctx.lineTo(700, 100); 
    ctx.strokeStyle = 'white'; 
    ctx.setLineDash([0]); 
    ctx.strokeWidth = 4; 
    ctx.stroke();




    ctx.beginPath(); 
    ctx.moveTo(0, 400); 
    ctx.lineTo(700, 400); 
    ctx.strokeStyle = 'white'; 
    ctx.setLineDash([0]); 
    ctx.strokeWidth = 4; 
    ctx.stroke();


    ctx.beginPath();
    ctx.moveTo(0, 150);
    ctx.lineTo(700, 150)
    ctx.strokeStyle = 'white';
    ctx.setLineDash([5]);
    ctx.strokeWidth = 4;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 300);
    ctx.lineTo(700, 300)
    ctx.strokeStyle = 'white';
    ctx.setLineDash([5]);
    ctx.strokeWidth = 4;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 450);
    ctx.lineTo(700, 450)
    ctx.strokeStyle = 'white';
    ctx.setLineDash([5]);
    ctx.strokeWidth = 4;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 600);
    ctx.lineTo(700, 600)
    ctx.strokeStyle = 'white';
    ctx.setLineDash([5]);
    ctx.strokeWidth = 4;
    ctx.stroke();

    //  Drawing Safe Zone
    ctx.fillStyle = 'rgb(11, 102, 35)';
    ctx.fillRect(0, 0, 700, 50);
}

let x = 0;
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
// Development Functions

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

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Event Listeners

document.getElementById('start-game').addEventListener('click', (event) => {
    game.start();
});``

document.getElementById('draw-grid').addEventListener('click', (event) => {
    console.log('moo')
    drawGrid();
});

document.addEventListener('keydown', (event) => {
    if (['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(event.key)) {
        biker.move(event.key)
    }

});