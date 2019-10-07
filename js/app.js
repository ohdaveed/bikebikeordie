const user = {
	name: null,
	stamina: 7,
	forward: function(){

	},
	brake: function(){

	},
	jump: function(){

	},
}


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const bike = new Image();
	

	bike.src = "bike.png";

const sx = 0
const sy = 0
const swidth = 40;
const sheight = 40;
const x = 50;
const y = 444;
const width = 30;
const height = 30;


function drawBackground(){
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


function drawBike(){
	ctx.drawImage(document.getElementById('bike'), sx, sy, swidth, sheight, x, y, width, height);
}

function draw (){

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

	drawBackground();
	drawBike();

	requestAnimationFrame(draw);
}
draw();

