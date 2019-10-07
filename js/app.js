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

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// drawing road
ctx.fillStyle = 'grey';
ctx.fillRect(0, 440, 570, 45);
ctx.fillRect(0, 240, 570, 45);

ctx.beginPath();
ctx.moveTo(0,350);
ctx.lineTo(570,350)
ctx.strokeStyle = 'white';
ctx.setLineDash([0]);
ctx.strokeWidth = 4;
ctx.stroke()

ctx.beginPath();
ctx.moveTo(0,305);
ctx.lineTo(570,305)
ctx.strokeStyle = 'white';
ctx.setLineDash([5]);
ctx.strokeWidth = 2;
ctx.stroke()

// water

ctx.fillStyle = 'rgb(133,60,8)';
ctx.fillRect(0, 0, 570, 220)

// draw background