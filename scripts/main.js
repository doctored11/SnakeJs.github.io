// gameConfiguration
let scoreBlock;
let score = 0;
let ear =5;
let baseCobbleX = [];
let baseCobbleY = [];
const screenWidth = window.screen.width;
const screenHeight = window.screen.height;
const pixels = window.devicePixelRatio;
console.log(screenHeight,screenWidth,pixels)

const btn =document.querySelector(".start");
const menu =document.querySelector(".block-menu");
menu.classList.remove("hide");
btn.addEventListener("click", function(){
	startGame();
})
function startGame(){
	menu.classList.add("hide");
	refreshGame();

}
function dead(){
	score = 0;
	menu.classList.remove("hide");
	snakeProperty.dx = 0;
		snakeProperty.dy = 0;

}


let speedStep = 1;
let invulnerability = false;


const gameConfig = {
	step:0,
	maxStep: 1,
	sizeCell: 20,
	snakeCell: 2 * speedStep,
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
	rad: 23
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
	botSnake();
	drawsnakeProperty();
	
	// botDinner();
	
}
requestAnimationFrame( gameLoop );

function Speed(){
	switch (score){ 
		case 1:
			
			
			
			gameConfig.snakeCell =  2 * speedStep ;
			
			break;
		case 2:
			addCobble();
			gameConfig.snakeCell =  3 * speedStep ;
			
			
			break;
		case 5:
			addCobble();
			
			gameConfig.snakeCell =  5 * speedStep ;
			break;
		case 10:
			
			gameConfig.snakeCell =  3 * speedStep ;
			break;
		case 15:
			destroy();
			
			
			gameConfig.snakeCell =  4.5 * speedStep ;
			break;
		case 23:
			destroy();
			gameConfig.snakeCell =  4.7 * speedStep ;
			break;
		case 40:
			destroy();
			gameConfig.snakeCell =  5.5 * speedStep ;
			break;
		case 50:
			destroy();
			
			break;
		case 70:
			destroy();
			gameConfig.snakeCell =  7 * speedStep ;
			break;
		case 100:
			destroy();
			gameConfig.snakeCell =  8 * speedStep ;
			break;
		case 150:
			
			destroy();
			gameConfig.snakeCell =  9 * speedStep ;
			break;
		case 210:
			gameConfig.snakeCell =  13 * speedStep;
			break;
		case 215:
			gameConfig.snakeCell =  1 * speedStep;
			break;

		case 220:
			gameConfig.snakeCell =  2 * speedStep;
			break;
		case 235:
			gameConfig.snakeCell =  4 * speedStep;
			break;
		case 250:
			gameConfig.snakeCell =  2 * speedStep;
			break;
		case 251:
			gameConfig.snakeCell =  3 * speedStep;
			break;
		case 260:
			gameConfig.snakeCell =  4 * speedStep;
			break;
		case 299:
			gameConfig.snakeCell =  5 * speedStep;
			break;
			
		case 333:
			cobble.log("win");
			break;
			
				
	}


}
function addCobble(){
	cobble.x = getRandomInt( 0, canvas.width / gameConfig.sizeCell ) * gameConfig.sizeCell;
	cobble.y = getRandomInt( 0, canvas.height / gameConfig.sizeCell ) * gameConfig.sizeCell;
	let bx = baseCobbleX.push(cobble.x);
	let by = baseCobbleY.push(cobble.y);
	drawCobble();

}
function destroy(){
	let rnd = Math.random() * (baseCobbleX.length - 1) + 1;
	 baseCobbleX.splice(rnd,1);
	 baseCobbleY.splice(rnd,1);
	drawCobble();
	console.log(baseCobbleX);


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
				dead();
				// startGame();
			}
			if ( berry.x < baseCobbleX[i] + cobble.rad+25 && berry.x > baseCobbleX[i] - (cobble.rad+10)  && baseCobbleY[i] < cobble.y + cobble.rad+10 && berry.y > baseCobbleY[i] - (cobble.rad+10) ) {
				randomPositionBerry();
				
			}
		}
		

		

		for( let i = index + 1; i < snakeProperty.snakeLength.length; i++ ) {

			if ( el.x == snakeProperty.snakeLength[i].x && el.y == snakeProperty.snakeLength[i].y && invulnerability != true ) {
				menu.classList.remove("hide");
				dead();
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
	
	// 
	if (botProperty.x < 0) {
		botProperty.x = canvas.width - gameConfig.sizeCell;
	} else if ( botProperty.x >= canvas.width ) {
		botProperty.x = 0;
	}

	if (botProperty.y < 0) {
		botProperty.y = canvas.height - gameConfig.sizeCell;
	} else if ( botProperty.y >= canvas.height ) {
		botProperty.y = 0;
	}
}
function refreshGame() {
	baseCobbleX = [];
 baseCobbleY = [];
 
 
	// gameConfig.maxStep =  3,
	score = 0;
	if (pixels < 1.1 ||( screenWidth > 1800  && screenHeight > 1000) ){
		speedStep = 0.33;
		console.log(screenHeight,screenWidth,pixels)
		console.log("!понижение скорости змейки на экранах с меньшей плотностью пикселей \n все во имя баланса \n надеюсь работает корректно)");
	}
	gameConfig.snakeCell = 1 * speedStep;
	drawScore();

	snakeProperty.x = 160;
	snakeProperty.y = 160;
	snakeProperty.snakeLength = [];
	snakeProperty.maxLength = 3 * ear;
	snakeProperty.dx = 0.1;
	botProperty.dx = 1;
	botProperty.x = 160;
	botProperty.y = 160;
	botProperty.snakeLength = [];
	botProperty.maxLength = 4 * ear;
	botProperty.dx = 0.1;

	botProperty.dy = 0;
	
randomPositionCobble();
	randomPositionBerry();
	
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
	for ( let i =0 ; i < baseCobbleX.length; i++){
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
	console.log(snakeProperty.dy,snakeProperty.dx, gameConfig.snakeCell,gameConfig.sizeCell, gameConfig.maxStep,gameConfig.step, gameConfig.snakeCell,speedStep );
	if ( e.code == "KeyW"  ) { 
		 if ( snakeProperty.dy !==0 &&  snakeProperty.dy > 0){
			
			
			snakeProperty.dx = -gameConfig.snakeCell ;
		 snakeProperty.dy =  -gameConfig.snakeCell;
		 setTimeout(() => { invulnerability = true; snakeProperty.dx = 0; }, 80);
		 invulnerability = false;
		 
		 } else{
			invulnerability = false;
			
			 snakeProperty.dy = -gameConfig.snakeCell;
		snakeProperty.dx = 0;
		 }
		 
		 
		
		
	} else if ( e.code == "KeyA" ) {
		if(  snakeProperty.dx !==0 &&  snakeProperty.dx > 0){
			
			snakeProperty.dy = gameConfig.snakeCell;
		 snakeProperty.dx =  -gameConfig.snakeCell;
		 setTimeout(() => {invulnerability = true; snakeProperty.dy = 0; }, 80);
		 invulnerability = false;
		}else{
			invulnerability = false;
		snakeProperty.dx = -gameConfig.snakeCell;
		snakeProperty.dy = 0;
		}
	} else if ( e.code == "KeyS" ) {
		if ( snakeProperty.dy !==0 &&  snakeProperty.dy < 0){
			
			snakeProperty.dx = gameConfig.snakeCell;
		 snakeProperty.dy =  gameConfig.snakeCell;
		 setTimeout(() => {invulnerability = true; snakeProperty.dx = 0; }, 80);
		 invulnerability = false;
		 } else{
			invulnerability = false;
			 snakeProperty.dy = gameConfig.snakeCell;
		snakeProperty.dx = 0;
		 }
	} else if ( e.code == "KeyD" ) {
		if(  snakeProperty.dx !==0 &&  snakeProperty.dx < 0){
			
			snakeProperty.dy = -gameConfig.snakeCell;
		 snakeProperty.dx =  gameConfig.snakeCell;
		 setTimeout(() => { invulnerability = true; snakeProperty.dy = 0; }, 80);
		 invulnerability = false;
		}else{
			invulnerability = false;
		snakeProperty.dx = gameConfig.snakeCell;
		snakeProperty.dy = 0;
		}
	}
});







// 





// 

// 
// 
//  
const botProperty = {
	x: 0,
	y: 0,
	dx: 1,
	dy: 0,
	snakeLength: [],
	maxLength: 4 * ear
}

function botSnake() {
	

	collisionBorder();

	
	botProperty.snakeLength.unshift( { x: botProperty.x, y: botProperty.y } );

	if ( botProperty.snakeLength.length > botProperty.maxLength ) {
		botProperty.snakeLength.pop();
	}

	botProperty.snakeLength.forEach( function(el, index){
		// let ear =5;
		// let rad = 20;
		if (index < ear -2 ) {
			context.fillStyle = "#fff";

		} else if(index == botProperty.snakeLength.length-1){
			context.fillStyle = "#fff";
			
			

		}
		else {
			context.fillStyle = "#000";

		}
		context.fillRect( el.x, el.y, gameConfig.sizeCell, gameConfig.sizeCell );

		if ( el.x < berry.x + berry.rad && el.x > berry.x - berry.rad  && el.y < berry.y + berry.rad && el.y > berry.y - berry.rad ) {
			botProperty.maxLength+=ear;
			// incScore();
			randomPositionBerry();
			// Speed();
			
			
		}
		for ( let i =0 ; i < baseCobbleX.length; i++){
			let botrad = 5;

			

			if ( el.x < baseCobbleX[i] + cobble.rad+15 && el.x > baseCobbleX[i] - (cobble.rad-5)  && el.y < baseCobbleY[i] + cobble.rad+10 && el.y > baseCobbleY[i] - (cobble.rad-5) ) {
				// dead();
				context.fillStyle = "#787333";

				context.fillRect( el.x, el.y, gameConfig.sizeCell, gameConfig.sizeCell );
				 botProperty.dx = 0; botProperty.dy = 0;
				
				return;
			
				
				// startGame();
			} else {botDinner();}
			if ( berry.x < baseCobbleX[i] + cobble.rad+25 && berry.x > baseCobbleX[i] - (cobble.rad+10)  && baseCobbleY[i] < cobble.y + cobble.rad+10 && berry.y > baseCobbleY[i] - (cobble.rad+10) ) {
				randomPositionBerry();
				
			}
		}
		

		

		for( let i = index + 1; i < botProperty.snakeLength.length; i++ ) {

			if ( el.x == botProperty.snakeLength[i].x && el.y == botProperty.snakeLength[i].y && invulnerability != true ) {
				// menu.classList.remove("hide");
				// dead();

				// drawBerry();
			}
			
		}
		
		
		


	} );
	
	botProperty.x += botProperty.dx;
	botProperty.y += botProperty.dy;
}

let botrad =50;
function botDinner(){
	console.log("bot");
	console.log(botProperty.x,botProperty.y,berry.x,berry.y);
	console.log("///");
	

 

	
	berryBotSearch();
	
	
		
		

	

}


function berryBotSearch(){
	let botrad = 45;


	

	if ( botProperty.x < berry.x){
		botProperty.dx = gameConfig.snakeCell;
		botProperty.dy = 0;
	} 
	if ( botProperty.x > berry.x){
		botProperty.dx = -gameConfig.snakeCell;
		botProperty.dy = 0;
	} 
	if ( botProperty.y < berry.y){
		botProperty.dy = gameConfig.snakeCell;
		botProperty.dx = 0;
	} 
	if ( botProperty.y > berry.y){
		botProperty.dy = -gameConfig.snakeCell;
		botProperty.dx = 0;
	}  
	

}
