// gameConfiguration
let scoreBlock;
let score = 0;
let ear =5;
let baseCobbleX = [];
let baseCobbleY = [];



const gameConfig = {
	step:0,
	maxStep: 1,
	sizeCell: 20,
	snakeCell: 2,
	sizeBerry:  8,
	sizeCobble: 10

}

const snakeProperty = {
	x: 160,
	y: 160,
	dx: gameConfig.snakeCell,
	dy: 0,
	snakeLength: [],
	maxLength: 3 * ear
}

let berry = {
	x: 32,
	y: 32,
	rad: 20
} 
let cobble = {
	x: 64,
	y: 64,
	rad: 25
} 


let canvas = document.querySelector("#game-canvas");
let context = canvas.getContext("2d");
scoreBlock = document.querySelector(".game-score .score-count");
drawScore();

function gameLoop() {

	requestAnimationFrame( gameLoop );
	if ( ++gameConfig.step < gameConfig.maxStep) {
		return;
	}
	gameConfig.step = 0;

	context.clearRect(0, 0, canvas.width, canvas.height);

	drawBerry();
	drawCobble();
	drawsnakeProperty();
}
requestAnimationFrame( gameLoop );

function Speed(){
	switch (score){ 
		case 1:
			gameConfig.snakeCell =  4;
			
			break;
		case 2:
			gameConfig.snakeCell =  5;
			
			
			break;
		case 5:
			gameConfig.snakeCell =  6;
			break;
		case 10:
			gameConfig.snakeCell =  3;
			break;
		case 15:
			gameConfig.snakeCell =  8;
			break;
		case 23:
			gameConfig.snakeCell =  9;
			break;
		case 40:
			gameConfig.snakeCell =  10;
			break;
		case 70:
			gameConfig.snakeCell =  11;
			break;
		case 100:
			gameConfig.snakeCell =  15;
			break;
		case 150:
			gameConfig.snakeCell =  18;
			break;
		case 210:
			gameConfig.snakeCell =  19;
			break;
				
	}


}

function drawsnakeProperty() {
	snakeProperty.x += snakeProperty.dx;
	snakeProperty.y += snakeProperty.dy;

	collisionBorder();

	
	snakeProperty.snakeLength.unshift( { x: snakeProperty.x, y: snakeProperty.y } );

	if ( snakeProperty.snakeLength.length > snakeProperty.maxLength ) {
		snakeProperty.snakeLength.pop();
	}

	snakeProperty.snakeLength.forEach( function(el, index){
		// let ear =5;
		// let rad = 20;
		if (index < ear -2 ) {
			context.fillStyle = "#00CF00";

		} else if(index == snakeProperty.snakeLength.length-1){
			context.fillStyle = "#FA0556";
			
			

		}
		else {
			context.fillStyle = "#008D00";

		}
		context.fillRect( el.x, el.y, gameConfig.sizeCell, gameConfig.sizeCell );

		if ( el.x < berry.x + berry.rad && el.x > berry.x - berry.rad  && el.y < berry.y + berry.rad && el.y > berry.y - berry.rad ) {
			snakeProperty.maxLength+=ear;
			incScore();
			randomPositionBerry();
			Speed();
			
			
		}
		for ( let i =0 ; i < baseCobbleX.length; i++){
			if ( el.x < baseCobbleX[i] + cobble.rad+15 && el.x > baseCobbleX[i] - (cobble.rad-5)  && el.y < baseCobbleY[i] + cobble.rad+10 && el.y > baseCobbleY[i] - (cobble.rad-5) ) {
				refreshGame();
			}
			if ( berry.x < baseCobbleX[i] + cobble.rad+25 && berry.x > baseCobbleX[i] - (cobble.rad+10)  && baseCobbleY[i] < cobble.y + cobble.rad+10 && berry.y > baseCobbleY[i] - (cobble.rad+10) ) {
				randomPositionBerry();
				
			}
		}
		

		

		for( let i = index + 1; i < snakeProperty.snakeLength.length; i++ ) {

			if ( el.x == snakeProperty.snakeLength[i].x && el.y == snakeProperty.snakeLength[i].y ) {
				refreshGame();
				drawBerry();
			}
			

		}

	} );
}

function collisionBorder() {
	if (snakeProperty.x < 0) {
		snakeProperty.x = canvas.width - gameConfig.sizeCell;
	} else if ( snakeProperty.x >= canvas.width ) {
		snakeProperty.x = 0;
	}

	if (snakeProperty.y < 0) {
		snakeProperty.y = canvas.height - gameConfig.sizeCell;
	} else if ( snakeProperty.y >= canvas.height ) {
		snakeProperty.y = 0;
	}
}
function refreshGame() {
	baseCobbleX = [];
 baseCobbleY = [];
	// gameConfig.maxStep =  3,
	score = 0;
	drawScore();

	snakeProperty.x = 160;
	snakeProperty.y = 160;
	snakeProperty.snakeLength = [];
	snakeProperty.maxLength = 2 * ear +1;
	snakeProperty.dx = gameConfig.sizeCell;
	snakeProperty.dy = 0;

	randomPositionBerry();
	randomPositionCobble();
}
let blue = 0;
let yellow = 0;
function drawBerry() {
	if (blue !==1 && yellow!==1){
	context.beginPath();
	context.fillStyle = "#A00034";
	context.arc( berry.x + (gameConfig.sizeCell / 2 ), berry.y + (gameConfig.sizeCell / 2 ), gameConfig.sizeBerry , 0, 2 * Math.PI );
	context.fill();}
	
	if (score/10 == 1 &&  Math.random()<=0.35){
		context.fillStyle = "#010c71";
		context.arc( berry.x + (gameConfig.sizeCell /2 ), berry.y + (gameConfig.sizeCell/2  ), gameConfig.sizeBerry , 0, 2 * Math.PI );
		context.fill();
		blue = 1;
	}
	if (score/15 == 1 && Math.random() <= 0.2){
		context.fillStyle = "#adb60e";
		context.arc( berry.x + (gameConfig.sizeCell / 2 ), berry.y + (gameConfig.sizeCell / 2 ), gameConfig.sizeBerry , 0, 2 * Math.PI );
		context.fill();
		yellow = 1;
	}
}

function randomPositionBerry() {
	berry.x = getRandomInt( 0, canvas.width / gameConfig.sizeCell ) * gameConfig.sizeCell;
	berry.y = getRandomInt( 0, canvas.height / gameConfig.sizeCell ) * gameConfig.sizeCell;
}
function drawCobble() {
	context.beginPath();
	
	context.fillStyle = "#222523f6";
	for ( let i =0 ; i < 9; i++){
	context.fillRect( baseCobbleX[i], baseCobbleY[i], gameConfig.sizeCell * 2, gameConfig.sizeCell *2 );
	context.fill();}
}
function randomPositionCobble() {
	for ( let i =0 ; i < 9; i++){
	cobble.x = getRandomInt( 0, canvas.width / gameConfig.sizeCell ) * gameConfig.sizeCell;
	cobble.y = getRandomInt( 0, canvas.height / gameConfig.sizeCell ) * gameConfig.sizeCell;
	let bx = baseCobbleX.push(cobble.x);
	let by = baseCobbleY.push(cobble.y)
	}
	console.log(baseCobbleX,baseCobbleY);
	
}


function incScore() {
	score++;
	drawScore();
	if (blue == 1){
		score += 10;
		blue = 0;
	}
	if (yellow == 1){
		score += 50;
		yellow = 0;
	}
}

function drawScore() {
	scoreBlock.innerHTML = score;
}

function getRandomInt(min, max) {
	return Math.floor( Math.random() * (max - min) + min );
}

document.addEventListener("keydown", function (e) {
	if ( e.code == "KeyW" ) {
		snakeProperty.dy = -gameConfig.snakeCell;
		snakeProperty.dx = 0;
		
	} else if ( e.code == "KeyA" ) {
		snakeProperty.dx = -gameConfig.snakeCell;
		snakeProperty.dy = 0;
	} else if ( e.code == "KeyS" ) {
		snakeProperty.dy = gameConfig.snakeCell;
		snakeProperty.dx = 0;
	} else if ( e.code == "KeyD" ) {
		snakeProperty.dx = gameConfig.snakeCell;
		snakeProperty.dy = 0;
	}
});