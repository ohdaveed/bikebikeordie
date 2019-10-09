//Global Variables

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


//     // checkCollision: function(thing) {
//     //     console.log("asdf")
//     //     if (
//     //         this.x + this.width > thing.x &&
//     //         this.x < thing.x + thing.width &&
//     //         this.y + this.height > thing.y &&
//     //         this.y < thing.y + thing.height
//     //     ) {
//     //         console.log("collision");
//     //         return true
//     //     } 
//     //     else return false;
//     // },
// }
drawBackground();
const game = {
    score: 0,
    lives: 3,
    lives: 0,
    time: 50,
    movingEnemies: [],
    potholesArray: [],
    powerUps: [],
    start() {

        game.createPotholes()
    
        drawBackground();
        game.drawPotholes()
        biker.draw();

        animate();
    },
    drawEnemies: function() {
        for(let i = 0; i <6; i++) {
            
        }
    },
    createPotholes:  function() {
        for(let i = 0; i < 6; i++) {
            let pothole = new StaticEnemy("pothole", 15, 'black')
            this.potholesArray.push(pothole);
        }
        console.log(this.potholesArray)
    },
    drawPotholes: function() {
        for (let i = 0; i < this.potholesArray.length; i++ ) {
            this.potholesArray[i].draw()
        }

    }
}

class StaticEnemy {
    constructor(name, r, color) {
        this.name = name;
        let rx = Math.floor(Math.random() * 700);
        let ry = Math.floor(Math.random() * 700);
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



const movingEnemy = {
    x: 250,
    y: 250,
    width: 100,
    height: 100,
    color: "purple",
    speed: 1,
    obstacleCenter: 50,
    draw: function() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();

    },
    move: function() {
        this.x += 5;

    }
}




/*
 (name, x, y, r = {
    x: rx,
    y: ry,
    r: 20,
    color: "black",
    draw: function() {

    },

}
*/

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
    ctx.fillRect(0, 450, canvas.width, 50);
    ctx.fillRect(0, 250, canvas.width, 50);
    ctx.fillRect(0, 650, canvas.width, 50);
    ctx.fillRect(0, 150, canvas.width, 50);
    ctx.fillRect(0, 450, canvas.width, 50);
    ctx.fillRect(0, 450, canvas.width, 50);


    ctx.beginPath();
    ctx.moveTo(0, 395);
    ctx.lineTo(700, 395)
    ctx.strokeStyle = 'white';
    ctx.setLineDash([5]);
    ctx.lineWidth = 3;
    ctx.strokeWidth = 4;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 350);
    ctx.lineTo(700, 350)
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
    ctx.fillRect(0, 0, 700, 100);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}



// let x = 0;
function animate() {
    // movingEnemy.move();
    clearCanvas()
    drawBackground();
    game.drawPotholes()
    biker.draw();
    window.requestAnimationFrame(animate)

}

// drawBackground();
// obstacle.draw();
// biker.draw();

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


document.getElementById('make-grid').addEventListener('click', (event) => {
    drawGrid();
});

document.getElementById('clear').addEventListener('click', (event) => {
    clearCanvas();
});

document.getElementById('enemies').addEventListener('click', (event) => {
    // animate();

})

document.getElementById('stop-animation').addEventListener('click', (event) => {
    stopAnimation();
})

document.addEventListener('keydown', (event) => {
    if (['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(event.key)) {
        biker.move(event.key)
    }

});


/*

class Person {
    constructor(name) {
        this.name = name
        this.age = Math.random()*10
        this.fish = "red"
    }

    greet() {
        console.log("hi i am " + this.name)
        console.log(this.fish)
    }
}

*/