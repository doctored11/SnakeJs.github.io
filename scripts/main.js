// gameConfiguration
let scoreBlock;
let scoreBlock2;

let ear = 5;
let baseCobbleX = [];
let baseCobbleY = [];
let random;
let secondPlayer = false;
const screenWidth = window.screen.width;
const screenHeight = window.screen.height;
const pixels = window.devicePixelRatio;
console.log(screenHeight, screenWidth, pixels)

const btn = document.querySelector(".start");
const menu = document.querySelector(".block-menu");
const counters = document.querySelector(".counters");
const Player1 = document.querySelector(".player-red");
const Player2 = document.querySelector(".player-blue");
menu.classList.remove("hide");
btn.addEventListener("click", function() {
	startGame();
})
Player2.classList.remove("live") ;
Player2.classList.remove("live") ;

function startGame() {
	menu.classList.add("hide");
	refreshGame( snakeProperty);
	
	refreshGame( snakeProperty2);
	

}
function Gameover(){
	if ( 
		(secondPlayer == false &&  snakeProperty.life == false) ||
		(secondPlayer == true && snakeProperty.life == false && snakeProperty2.life == false)
	){
	menu.classList.remove("hide");
	}
}

function dead(playerProperty) {
	
	playerProperty.life = false;
	
	playerProperty.dx = 0;
	playerProperty.dy = 0;
	drawScore();
	
	Gameover();

}


let speedStep = 1;
let sizeStep = 1;
let invulnerability = false;


const gameConfig = {
	step: 0,
	maxStep: 1,
	sizeCell: 20,
	
	botCell: 1.5 * speedStep,
	sizeBerry: 8,
	sizeCobble: 10,
	

}

const snakeProperty = {
	x: 160,
	y: 160,
	dx: 0.1,
	dy: 0,
	snakeLength: [],
	maxLength: 3 * ear,
	id: "firstPlayer",
	life: true,
	score: 0,
	snakeCell: 2 * speedStep,

}
const snakeProperty2 = {
	x: 50,
	y: 50,
	dx: 0.8,
	dy: 0,
	snakeLength: [],
	maxLength: 3 * ear,
	id: "secondPlayer",
	life: true,
	score: 0,
	snakeCell: 2 * speedStep,
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
scoreBlock = document.querySelector(".game-score .count1");
scoreBlock2 = document.querySelector(".game-score .count2");

drawScore();

function gameLoop() {

	requestAnimationFrame(gameLoop);
	if (++gameConfig.step < gameConfig.maxStep) {
		return;
	}
	gameConfig.step = 0;

	context.clearRect(0, 0, canvas.width, canvas.height);

	drawBerry();
	if (random == false) {
		drawCobble();
	} else {
		botSnake();
		drawCobble();
	}
	
	if (secondPlayer == false && snakeProperty.score < 1){
		document.addEventListener("keydown", function(e) {
			if ( snakeProperty.score < 1 && (e.code == "KeyO" ||  e.code == "ArrowLeft" || e.code == "ArrowRight" || e.code == "ArrowDown" || e.code == "ArrowUp" )){
				secondPlayer = true;
				  counters.classList.add("active-second-player");
			}
		})
	}
if (secondPlayer == true ){
	drawsnakeProperty( snakeProperty2);}
	drawsnakeProperty( snakeProperty);
	

	// botDinner();

}
requestAnimationFrame(gameLoop);


function Speed(playerProperty) {
	switch (playerProperty.score) {
		case 1:



			playerProperty.snakeCell = 2 * speedStep;

			break;
		case 2:
			addCobble();
			playerProperty.snakeCell = 3 * speedStep;


			break;
		case 5:
			addCobble();

			playerProperty.snakeCell = 5 * speedStep;
			break;
		case 10:

			playerProperty.snakeCell = 3 * speedStep;
			break;
		case 15:
			destroy();


			playerProperty.snakeCell = 4.5 * speedStep;
			break;
		case 23:
			destroy();
			playerProperty.snakeCell = 4.7 * speedStep;
			break;
		case 40:
			destroy();
			playerProperty.snakeCell = 5.5 * speedStep;
			break;
		case 50:
			destroy();

			break;
		case 70:
			destroy();
			playerProperty.snakeCell = 7 * speedStep;
			break;
		case 100:
			destroy();
			playerProperty.snakeCell = 8 * speedStep;
			break;
		case 150:

			destroy();
			playerProperty.snakeCell = 9 * speedStep;
			break;
		case 210:
			playerProperty.snakeCell = 13 * speedStep;
			break;
		case 215:
			playerProperty.snakeCell = 1 * speedStep;
			break;

		case 220:
			playerProperty.snakeCell = 2 * speedStep;
			break;
		case 235:
			playerProperty.snakeCell = 4 * speedStep;
			break;
		case 250:
			playerProperty.snakeCell = 2 * speedStep;
			break;
		case 251:
			playerProperty.snakeCell = 3 * speedStep;
			break;
		case 260:
			playerProperty.snakeCell = 4 * speedStep;
			break;
		case 299:
			playerProperty.snakeCell = 5 * speedStep;
			break;

		case 333:
			cobble.log("win");
			break;


	}


}

function addCobble() {
	if (random == false) {
		cobble.x = getRandomInt(0, canvas.width / gameConfig.sizeCell) * gameConfig.sizeCell;
		cobble.y = getRandomInt(0, canvas.height / gameConfig.sizeCell) * gameConfig.sizeCell;
		let bx = baseCobbleX.push(cobble.x);
		let by = baseCobbleY.push(cobble.y);
		drawCobble();
	}

}

function destroy() {
	let rnd = Math.random() * (baseCobbleX.length - 1) + 1;
	baseCobbleX.splice(rnd, 1);
	baseCobbleY.splice(rnd, 1);
	drawCobble();
	console.log(baseCobbleX);


}

function drawsnakeProperty(playerProperty) {
	playerProperty.x += playerProperty.dx;
	playerProperty.y += playerProperty.dy;

	collisionBorder(playerProperty);


	playerProperty.snakeLength.unshift({
		x: playerProperty.x,
		y: playerProperty.y
	});

	if (playerProperty.snakeLength.length > playerProperty.maxLength) {
		playerProperty.snakeLength.pop();
	}

	playerProperty.snakeLength.forEach(function(el, index) {
		// let ear =5;
		// let rad = 20;
		let n =2;
		
		if ( playerProperty.id == "firstPlayer"){
		if (index < ear - 2) {
			context.fillStyle = "#00CF00";

		} else if (index == playerProperty.snakeLength.length - 1) {
			context.fillStyle = "#FA0556";



		} else {
			context.fillStyle = "#008D00";

		}
	} else if  ( playerProperty.id == "secondPlayer") 
	{ 
		let line = index%2 == 0;
		// console.log( roundTo10(index * ( snakeProperty2.snakeLength.length) / (ear* sizeStep)), snakeProperty2.snakeLength.length, index, ear* sizeStep);
		
		// 
		if (index < ear - 2) {
			context.fillStyle = "#e7e7de";

		} else if (index == playerProperty.snakeLength.length - 1) {
			context.fillStyle = "#0f3057";



		} 
			
		else
		{
			context.fillStyle = "#008891";
			
			
			
			
			

		}


	}
		context.fillRect(el.x, el.y, gameConfig.sizeCell, gameConfig.sizeCell);

		if (el.x < berry.x + berry.rad && el.x > berry.x - berry.rad && el.y < berry.y + berry.rad && el.y > berry.y - berry.rad) {
			playerProperty.maxLength += ear *  sizeStep;
			incScore (playerProperty);
			randomPositionBerry();
			Speed(playerProperty);


		}
		for (let i = 0; i < baseCobbleX.length; i++) {
			if (el.x < baseCobbleX[i] + cobble.rad + 15 && el.x > baseCobbleX[i] - (cobble.rad - 5) && el.y < baseCobbleY[i] + cobble.rad + 10 && el.y > baseCobbleY[i] - (cobble.rad - 5)) {
				dead(playerProperty);
				// startGame();
			}
			if (berry.x < baseCobbleX[i] + cobble.rad + 25 && berry.x > baseCobbleX[i] - (cobble.rad + 10) && baseCobbleY[i] < cobble.y + cobble.rad + 10 && berry.y > baseCobbleY[i] - (cobble.rad + 10)) {
				randomPositionBerry();

			}
		}


		botProperty.snakeLength.forEach(function(elb) {

			for (let l = index + 1; l < botProperty.snakeLength.length; l++) {
				if (index < ear - 2) {

					
					if (el.x > elb.x - 10 && el.x < elb.x + 10 && el.y < elb.y + 10 && el.y > elb.y - 10) {
						dead(playerProperty);
					}
				}



			}


		})

		if (botProperty.x > berry.x - 9 && botProperty.x < berry.x + 9) {
			botProperty.x = berry.x
			botProperty.dy = 0;


		} else if (botProperty.y > berry.y - 9 && botProperty.y < berry.y + 9) {
			botProperty.y = berry.y
			botProperty.dx = 0;
		}



 
		for (let i = index + 1; i < playerProperty.snakeLength.length; i++) {

			if (el.x == playerProperty.snakeLength[i].x && el.y == playerProperty.snakeLength[i].y && invulnerability != true) {
			
				dead(playerProperty);
				drawBerry();
			}





		}


	});
	if( secondPlayer == true){
	snakeProperty.snakeLength.forEach(function(el) {
		if (snakeProperty2.x < el.x + 10 &&  snakeProperty2.x > el.x - 10 && snakeProperty2.y > el.y - 10  && snakeProperty2.y < el.y + 10 ){
			dead(snakeProperty2);
		}

	});
	snakeProperty2.snakeLength.forEach(function(el2) {
		if (snakeProperty.x < el2.x + 10 &&  snakeProperty.x > el2.x - 10 && snakeProperty.y > el2.y - 10  && snakeProperty.y < el2.y + 10 ){
			dead(snakeProperty);
		}

	});}




}


function collisionBorder(  playerProperty ) {
	if (playerProperty.x < 0) {
		playerProperty.x = canvas.width - gameConfig.sizeCell;
	} else if (playerProperty.x >= canvas.width) {
		playerProperty.x = 0;
	}

	if (playerProperty.y < 0) {
		playerProperty.y = canvas.height - gameConfig.sizeCell;
	} else if (playerProperty.y >= canvas.height) {
		playerProperty.y = 0;
	}

	// 
	if (botProperty.x < 0) {
		botProperty.x = canvas.width - gameConfig.sizeCell;
	} else if (botProperty.x >= canvas.width) {
		botProperty.x = 0;
	}

	if (botProperty.y < 0) {
		botProperty.y = canvas.height - gameConfig.sizeCell;
	} else if (botProperty.y >= canvas.height) {
		botProperty.y = 0;
	}
}

function refreshGame( playerProperty ) {
	secondPlayer  = false;
	Player1.classList.add("live") ;
	Player2.classList.add("live") ;
	counters.classList.remove("active-second-player");

	baseCobbleX = [];
	baseCobbleY = [];
	if (Math.random() > 0.97) {
		random = true;

	} else {
		random = false;
		randomPositionCobble();
	}


	// gameConfig.maxStep =  3,
	playerProperty.score = 0;
	if (pixels < 1.1 || (screenWidth > 1800 && screenHeight > 1000)) {
		speedStep = 0.42;
		sizeStep = 2;
		console.log(screenHeight, screenWidth, pixels)
		console.log("!понижение скорости змейки на экранах с меньшей плотностью пикселей \n все во имя баланса \n надеюсь работает корректно)");
	}
	playerProperty.snakeCell = 1 * speedStep;
	drawScore();

	snakeProperty.x = 50;
	snakeProperty.y = 50;
	snakeProperty2.x = 300;
	snakeProperty2.y = 300;
	playerProperty.snakeCell = 1;
	gameConfig.botCell = 0.9;
	playerProperty.snakeLength = [];
	playerProperty.maxLength = 3 * ear * sizeStep;
	playerProperty.life = true;
	snakeProperty.dx = 0.1  * speedStep;
	snakeProperty2.dx = 0.8 * speedStep;
	botProperty.dx = 1;
	botProperty.x = 360;
	botProperty.y = 360;
	botProperty.snakeLength = [];
	botProperty.maxLength = 4 * ear * sizeStep;
	botProperty.dx = 0.1;

	botProperty.dy = 0;


	randomPositionBerry();

	

}
let blue = 0;
let yellow = 0;

function drawBerry() {
	if (blue !== 1 && yellow !== 1) {
		context.beginPath();
		context.fillStyle = "#A00034";
		context.arc(berry.x + (gameConfig.sizeCell / 2), berry.y + (gameConfig.sizeCell / 2), gameConfig.sizeBerry, 0, 2 * Math.PI);
		context.fill();
	}

	if (snakeProperty.score / 10 == 1 && Math.random() > 0.75) {
		context.fillStyle = "#010c71";
		context.arc(berry.x + (gameConfig.sizeCell / 2), berry.y + (gameConfig.sizeCell / 2), gameConfig.sizeBerry, 0, 2 * Math.PI);
		context.fill();
		blue = 1;
	}
	if (snakeProperty.score / 15 == 1 && Math.random() > 0.9) {
		context.fillStyle = "#adb60e";
		context.arc(berry.x + (gameConfig.sizeCell / 2), berry.y + (gameConfig.sizeCell / 2), gameConfig.sizeBerry, 0, 2 * Math.PI);
		context.fill();
		yellow = 1;
	}
}

function randomPositionBerry() {
	berry.x = getRandomInt(0, canvas.width / gameConfig.sizeCell) * gameConfig.sizeCell;
	berry.y = getRandomInt(0, canvas.height / gameConfig.sizeCell) * gameConfig.sizeCell;
}

function drawCobble() {
	context.beginPath();

	context.fillStyle = "#222523f6";
	for (let i = 0; i < baseCobbleX.length; i++) {
		context.fillRect(baseCobbleX[i], baseCobbleY[i], gameConfig.sizeCell * 2, gameConfig.sizeCell * 2);
		context.fill();
	}
}

function randomPositionCobble() {
	for (let i = 0; i < 9; i++) {
		cobble.x = getRandomInt(0, canvas.width / gameConfig.sizeCell) * gameConfig.sizeCell;
		cobble.y = getRandomInt(0, canvas.height / gameConfig.sizeCell) * gameConfig.sizeCell;
		let bx = baseCobbleX.push(cobble.x);
		let by = baseCobbleY.push(cobble.y)
	}
	// console.log(baseCobbleX,baseCobbleY);

}


function incScore( playerProperty) {
	playerProperty.score++;
	
	if (blue == 1) {
		playerProperty.score += 10;
		blue = 0;
	}
	if (yellow == 1) {
		playerProperty.score += 50;
		yellow = 0;
	}
	drawScore();
}

function drawScore() {
	scoreBlock.innerHTML = snakeProperty.score;
	scoreBlock2.innerHTML = snakeProperty2.score;
	if (snakeProperty.life == false){
		 Player1.classList.remove("live") 
	}
	if (snakeProperty2.life == false){
		Player2.classList.remove("live") 
   }
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

document.addEventListener("keydown", function(e) {
	// console.log(e.code);
	
	// console.log(snakeProperty.dy,snakeProperty.dx, gameConfig.snakeCell,gameConfig.sizeCell, gameConfig.maxStep,gameConfig.step, gameConfig.snakeCell,speedStep );
	if (e.code == "KeyW") {
		// console.log (  el.x , elb.x, el.y , elb.y + "!" );
		if (snakeProperty.dy !== 0 && snakeProperty.dy > 0) {


			snakeProperty.dx = -snakeProperty.snakeCell;
			snakeProperty.dy = -snakeProperty.snakeCell;
			setTimeout(() => {
				invulnerability = true;
				snakeProperty.dx = 0;
			}, 80);
			invulnerability = false;

		} else {
			invulnerability = false;

			snakeProperty.dy = -snakeProperty.snakeCell;
			snakeProperty.dx = 0;
		}




	} else if (e.code == "KeyA") {
		if (snakeProperty.dx !== 0 && snakeProperty.dx > 0) {

			snakeProperty.dy = snakeProperty.snakeCell;
			snakeProperty.dx = -snakeProperty.snakeCell;
			setTimeout(() => {
				invulnerability = true;
				snakeProperty.dy = 0;
			}, 80);
			invulnerability = false;
		} else {
			invulnerability = false;
			snakeProperty.dx = -snakeProperty.snakeCell;
			snakeProperty.dy = 0;
		}
	} else if (e.code == "KeyS") {
		if (snakeProperty.dy !== 0 && snakeProperty.dy < 0) {

			snakeProperty.dx = snakeProperty.snakeCell;
			snakeProperty.dy = snakeProperty.snakeCell;
			setTimeout(() => {
				invulnerability = true;
				snakeProperty.dx = 0;
			}, 80);
			invulnerability = false;
		} else {
			invulnerability = false;
			snakeProperty.dy = snakeProperty.snakeCell;
			snakeProperty.dx = 0;
		}
	} else if (e.code == "KeyD") {
		if (snakeProperty.dx !== 0 && snakeProperty.dx < 0) {

			snakeProperty.dy = -snakeProperty.snakeCell;
			snakeProperty.dx = snakeProperty.snakeCell;
			setTimeout(() => {
				invulnerability = true;
				snakeProperty.dy = 0;
			}, 80);
			invulnerability = false;
		} else {
			invulnerability = false;
			snakeProperty.dx = snakeProperty.snakeCell;
			snakeProperty.dy = 0;
		}
		
	
	}
	if ( secondPlayer == true && snakeProperty2.life == true){

	// 
	if (e.code == 'ArrowUp' || e.code == '38') {
		// console.log (  el.x , elb.x, el.y , elb.y + "!" );
		if (snakeProperty2.dy !== 0 && snakeProperty2.dy > 0) {


			snakeProperty2.dx = -snakeProperty.snakeCell;
			snakeProperty2.dy = -snakeProperty.snakeCell;
			setTimeout(() => {
				invulnerability = true;
				snakeProperty2.dx = 0;
			}, 80);
			invulnerability = false;

		} else {
			invulnerability = false;

			snakeProperty2.dy = -snakeProperty.snakeCell;
			snakeProperty2.dx = 0;
		}




	} else if (e.code == "ArrowLeft" || e.code == "37" ) {
		if (snakeProperty2.dx !== 0 && snakeProperty2.dx > 0) {

			snakeProperty2.dy = snakeProperty.snakeCell;
			snakeProperty2.dx = -snakeProperty.snakeCell;
			setTimeout(() => {
				invulnerability = true;
				snakeProperty2.dy = 0;
			}, 80);
			invulnerability = false;
		} else {
			invulnerability = false;
			snakeProperty2.dx = -snakeProperty.snakeCell;
			snakeProperty2.dy = 0;
		}
	} else if (e.code == "ArrowDown" || e.code == "40") {
		if (snakeProperty2.dy !== 0 && snakeProperty2.dy < 0) {

			snakeProperty2.dx = snakeProperty.snakeCell;
			snakeProperty2.dy = snakeProperty.snakeCell;
			setTimeout(() => {
				invulnerability = true;
				snakeProperty2.dx = 0;
			}, 80);
			invulnerability = false;
		} else {
			invulnerability = false;
			snakeProperty2.dy = snakeProperty.snakeCell;
			snakeProperty2.dx = 0;
		}
	} else if (e.code == "ArrowRight" || e.code == "39") {
		if (snakeProperty2.dx !== 0 && snakeProperty2.dx < 0) {

			snakeProperty2.dy = -snakeProperty.snakeCell;
			snakeProperty2.dx = snakeProperty.snakeCell;
			setTimeout(() => {
				invulnerability = true;
				snakeProperty2.dy = 0;
			}, 80);
			invulnerability = false;
		} else {
			invulnerability = false;
			snakeProperty2.dx = snakeProperty.snakeCell;
			snakeProperty2.dy = 0;
		}
		
	
	}
}
});
// 
// 








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


	collisionBorder( botProperty);


	botProperty.snakeLength.unshift({
		x: botProperty.x,
		y: botProperty.y
	});

	if (botProperty.snakeLength.length > botProperty.maxLength) {
		botProperty.snakeLength.pop();
	}

	botProperty.snakeLength.forEach(function(el, index) {
		// let ear =5;
		// let rad = 20;
		
		if (index < ear - 2) {
			context.fillStyle = "#b4ea8d";

		} 
		else if ( index < ear -1 ){
			context.fillStyle = "white";

		}
		else if (index == botProperty.snakeLength.length - 1) {
			context.fillStyle = "white";



		} 
		else if(roundTo5(index )% 15 == 0 ){
			context.fillStyle = "#383838";


		}
		
		else {
			context.fillStyle = "#e69d76";

		}
		context.fillRect(el.x, el.y, gameConfig.sizeCell, gameConfig.sizeCell);

		if (el.x < berry.x + berry.rad && el.x > berry.x - berry.rad && el.y < berry.y + berry.rad && el.y > berry.y - berry.rad) {
			botProperty.maxLength += ear * sizeStep;
			
	if (gameConfig.botCell <=5 ){
	gameConfig.botCell += 0.15;

			} else
			
			if (gameConfig.botCell > 12) {
				console.log("превышение" )
				gameConfig.botCell = 6;
				

			} else if (gameConfig.botCell > 7) {
				gameConfig.botCell += 0.01;

			} else if (gameConfig.botCell > 5) {
				
				gameConfig.botCell += 0.08;

			} else {
				gameConfig.botCell = 1;

			}
			// incScore();
			randomPositionBerry();
			console.log(gameConfig.botCell);
			// Speed();


		}

		botDinner();






		for (let i = index + 1; i < botProperty.snakeLength.length; i++) {

			if (el.x == botProperty.snakeLength[i].x && el.y == botProperty.snakeLength[i].y && invulnerability != true) {
				
				// dead();

				// drawBerry();
			}

		}





	});

	botProperty.x += botProperty.dx;
	botProperty.y += botProperty.dy;
}

let botrad = 50;

function botDinner() {
	// console.log("bot");
	// console.log(botProperty.x,botProperty.y,berry.x,berry.y);
	// console.log("///");





	berryBotSearch();







}


function berryBotSearch() {
	let botrad = 45;




	if (botProperty.x < berry.x) {
		botProperty.dx = Math.round(gameConfig.botCell);
		botProperty.dy = 0;
	}
	if (botProperty.x > berry.x) {
		botProperty.dx = Math.round(-gameConfig.botCell);
		botProperty.dy = 0;
	}
	if (botProperty.y < berry.y) {
		botProperty.dy = Math.round(gameConfig.botCell);
		botProperty.dx = 0;
	}
	if (botProperty.y > berry.y) {
		botProperty.dy = Math.round(-gameConfig.botCell);
		botProperty.dx = 0;
	}


}

1
2
3
function roundTo5(num) {
    return Math.round(num/5)*5;
}