const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
console.log(ctx);




function gameOver() {
	document.write(`
		<h1>YOU ARE DEAD YOU SHOULD NOT HAVE CRASHED INTO THAT</h1>
    <FORM>
      <INPUT TYPE="hidden" VALUE="you also shouldn't capitalize your html or use STYLE='' because it's not 1995">
      <BUTTON STYLE="font-size: 18pt">CLICK</BUTTON>
    </FORM>`)
}

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

const captSquare = {
	x: 100,
	y: 52,
	height: 46,
	width: 46,
	color: 'orange',
	speed: 3,
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
	checkCollision(thing) {
		if(
			this.x + this.width > thing.x &&
			this.x < thing.x + thing.width &&
			thing.y < this.y + this.height &&
			thing.y + thing.height > this.y
		) {
			console.log("collision");
			return true
		}
		else return false;
	},
}

captSquare.draw();

const obstacle = {
	x: 250,
	y: 250,
	width: 100,
	height: 100,
	color: "purple",
	draw () {
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.fillStyle = this.color;
		ctx.fill();
	}
}
obstacle.draw();

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
	move(key) {
		console.log("you are pressing", key);
    	if(key == "ArrowDown" && this.y + this.r + this.speed < canvas.height) {
      		this.y += this.speed;
    	}
    	if(key == "ArrowUp" && this.y - this.r - this.speed > 0) {
      		this.y -= this.speed;
    	}
    	if(key == "ArrowLeft" && this.x - this.r - this.speed > 0) {
      		this.x -= this.speed;
    	}
    	if(key == "ArrowRight" && this.x + this.r + this.speed < canvas.width) {
      		this.x += this.speed;
    	}
		eraseCanvas();
		this.draw();
	}
}
cmdrCircle.draw();

let requestID;
let animationRunning = false;
let x = 0;

function animate() {
	
	animationRunning = true;

	captSquare.move();
	clearCanvas();
	captSquare.draw();

	cmdrCircle.draw();
	obstacle.draw();

	if(captSquare.checkCollision(obstacle)) {
		gameOver();
		return;
	} else {
		requestID = window.requestAnimationFrame(animate);
	}
}
animate();

function init() {
	drawBackground();
}


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
