const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
console.log(ctx);


let requestID;
let animationRunning = false;
let x = 0;
function animate() {
	
	animationRunning = true;

	captSquare.move();
	clearCanvas();
	captSquare.draw();

	cmdrCircle.draw();
	requestID = window.requestAnimationFrame(animate);
}
animate();

const stopAnimation = () => {
	cancelAnimationFrame(requestID)
	animationRunning = false;
}

function drawBackground() {
// drawing road
	ctx.fillStyle = 'grey';
	ctx.fillRect(0, 440, 600, 45);
	ctx.fillRect(0, 240, 600, 45);

	ctx.beginPath();
	ctx.moveTo(0,395);
	ctx.lineTo(600,395)
	ctx.strokeStyle = 'white';
	ctx.setLineDash([5]);
	ctx.lineWidth = 3;
	ctx.strokeWidth = 2;
	ctx.stroke()

	ctx.beginPath();
	ctx.moveTo(0,350);
	ctx.lineTo(600,350)
	ctx.strokeStyle = 'white';
	ctx.setLineDash([0]);
	ctx.strokeWidth = 4;
	ctx.stroke()

	ctx.beginPath();
	ctx.moveTo(0,305);
	ctx.lineTo(600,305)
	ctx.strokeStyle = 'white';
	ctx.setLineDash([5]);
	ctx.strokeWidth = 2;
	ctx.stroke()

	// field

	ctx.fillStyle = 'rgb(133,60,8)';
	ctx.fillRect(0, 0, 600, 220)
}

function drawGrid() {
	ctx.strokeStyle = 'black';
	ctx.lineWidth = 1;

	for(let i = 0; i <= canvas.width; i += 50) {
		ctx.beginPath();
		ctx.moveTo(i, 0);
		ctx.lineTo(i, canvas.height);
		ctx.stroke();
	}
	for(let i = 0; i <= canvas.height; i += 50) {
		ctx.beginPath();
		ctx.moveTo(0,i);
		ctx.lineTo(canvas.width, i);
		ctx.stroke();
	}
}

function clearCanvas() {
	ctx.clearRect(0 ,0 , canvas.width, canvas.height)
}

function drawRectangle() {
	ctx.beginPath();
	ctx.rect(300, 300, 80, 180);
	ctx.fillStyle = 'blue';
	ctx.fill();
}

function init() {
	drawBackground();

}

const captSquare = {
	x: 100,
	y: 52,
	height: 46,
	width: 46,
	color: 'orangw',
	speed: 2,
	direction: {
		up: false,
		right: false,
		down: false,
		left: false,
	},
	draw () {
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.fillStyle = this.color;
		ctx.fill();
	},
	setDirection(key) {
		if(key == "w") this.direction.up = true;
	    if(key == "a") this.direction.left = true;
	    if(key == "s") this.direction.down = true;
	    if(key == "d") this.direction.right = true;
  	},
  	unsetDirection(key) {
  		if(key == "w") this.direction.up = false;
	    if(key == "a") this.direction.left = false;
	    if(key == "s") this.direction.down = false;
	    if(key == "d") this.direction.right = false;
  	},
	move () {
		if(this.direction.up) this.y -= this.speed;
	    if(this.direction.right) this.x += this.speed;
	    if(this.direction.down) this.y += this.speed;
	    if(this.direction.left) this.x -= this.speed;
	},
}

captSquare.draw();

const cmdrCircle = {
	x: 200,
	y: 40,
	r: 17,
	color: "pink",
	speed: 10,
	draw() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
		ctx.fillStyle = this.color;
		ctx.fill();
	},
	move(direction) {
		if(direction == "ArrowDown") {
			this.y += this.speed;
		}
		if(direction == "ArrowUp") {
			this.y -= this.speed;
		}
		if(direction == "ArrowLeft") {
			this.x -= this.speed;
		}
		if(direction == "ArrowRight") {
			this.x += this.speed;
		}
		eraseCanvas();
		this.draw();
	}
}
cmdrCircle.draw();


document.getElementById('start-game').addEventListener('click', (event) => {
	init();
})

document.getElementById('make-grid').addEventListener('click', (event) => {
	drawGrid();
})

document.getElementById('make-rect').addEventListener('click', (event) => {
  drawRectangle();
})

document.getElementById('clear').addEventListener('click', (event) => {
	clearCanvas();
})

document.addEventListener('keydown', (event) => {
	cmdrCircle.move(event.key)
	if(event.key === "1") {
    	if(!animationRunning) 
    		animate();
    	else console.log("nope");
 		}
  		if(event.key === "2") {
    	stopAnimation();
  		}
})

document.addEventListener('keyup', (event) => {
	if(["w", "a", "s", "d"].includes(event.key)) {
		captSquare.unsetDirection(event.key)
	}
})

document.getElementById('stop-animation').addEventListener('click', (event) => {
  stopAnimation();
})
