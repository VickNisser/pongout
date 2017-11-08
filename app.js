'use strict';

const playerOne  = document.getElementsByClassName('player--one');
/*const playerTwo  = document.getElementsByClassName('player--two');*/
let ballLaunched = false;
let timePassed = 0;

setInterval(tick,10);
let ball = makeBall(587,623,10);
fillField();

function tick() {
	checkOutOfBounds();
	moveBalls();
}

function checkOutOfBounds() {
	var balls = document.getElementsByClassName('ball');
	if( ball.cy >= 642 ) {
		ball.cy = 1000;
		balls[0].setAttribute('cy', ball.cy);
	}

	if( ball.cy < 10 ) {
		ball.yDirection = "down";
	}

	if( ball.cx < 10 ) {
		ball.xDirection = "right";
	}

	if( ball.cx > 1190 ) {
		ball.xDirection = "left";
	}
	
}

function fillField() {
	var fillStartX = 0;
	var fillStartY = 0;
	var i; 
	addBall(ball.cx,ball.cy,ball.r);
	for ( i = 0; i < 400; i++){ 
		addRect(fillStartX,fillStartY);
		fillStartX = fillStartX + 76;

		if( fillStartX > 1140 ){
			fillStartX = 0;
			fillStartY = fillStartY + 16;
		}
	}
}

function preLaunch() {
	var balls = document.getElementsByClassName('ball');
	if( ballLaunched === false ) {
		var player1Position = playerOne[0].getAttribute('x');
		player1Position = parseInt(player1Position);
		var ballX = player1Position + 37;
		ball.cx = ballX;
		balls[0].setAttribute('cx', ball.cx);
		/*var player2Position = playerTwo[0].getAttribute('x');
		player2Position = parseInt(player2Position);*/
	}
}

function moveBalls() {
	var balls = document.getElementsByClassName('ball');
	var rectangles = document.getElementsByClassName('rectangle');
	var i;
	var j;

	if ( ballLaunched === true ) {
		timePassed = timePassed + 1;

		if( timePassed/100 > 30 ) {
			ball.speed = 6;
		}

		if( timePassed/100 > 90 ) {
			ball.speed = 7;
		}

		if( timePassed/100 > 180) {
			ball.speed = 9;
		}
		
		if( ball.xDirection == "neutral" && ball.yDirection == "up" ) {
			ball.cy = ball.cy - ball.speed;
			balls[0].setAttribute('cy', ball.cy);
		}
		
		if( ball.xDirection == "neutral" && ball.yDirection == "down" ) {
			ball.cy = ball.cy + ball.speed;
			ball.cx = ball.cx + 1;
			balls[0].setAttribute('cy', ball.cy);
		}

		if( ball.xDirection == "left" && ball.yDirection == "down" ) {
			ball.cx = ball.cx - ball.speed;
			ball.cy = ball.cy + ball.speed;
			balls[0].setAttribute('cx', ball.cx);
			balls[0].setAttribute('cy', ball.cy);
		}

		if( ball.xDirection == "left" && ball.yDirection == "up" ) {
			ball.cx = ball.cx - ball.speed;
			ball.cy = ball.cy - ball.speed;
			balls[0].setAttribute('cx', ball.cx);
			balls[0].setAttribute('cy', ball.cy);
		}

		if( ball.xDirection == "right" && ball.yDirection == "down" ) {
			ball.cx = ball.cx + ball.speed;
			ball.cy = ball.cy + ball.speed;
			balls[0].setAttribute('cx', ball.cx);
			balls[0].setAttribute('cy', ball.cy);
		}

		if( ball.xDirection == "right" && ball.yDirection == "up" ) {
			ball.cx = ball.cx + ball.speed;
			ball.cy = ball.cy - ball.speed;
			balls[0].setAttribute('cx', ball.cx);
			balls[0].setAttribute('cy', ball.cy);
		}

		for ( i = 0; i < balls.length; i++ ) {
			for ( j = 0; j < rectangles.length; j++ ) {
				if ( checkCollision( rectangles[j],balls[i]) === true && ball.yDirection == "up" && ball.xDirection == "neutral" ) {
					ball.yDirection = "down";
					ball.xDirecion = "neutral";
					if ( rectangles[j].getAttribute("class") == "rectangle") {
						rectangles[j].parentNode.removeChild(rectangles[j]);
					}
				}

				if ( checkCollision( rectangles[j],balls[i]) === true && ball.yDirection == "down" && ball.xDirection == "neutral" ) {
					ball.yDirection = "up";
					ball.xDirecion = "neutral";
					if ( rectangles[j].getAttribute("class") == "rectangle") {
						rectangles[j].parentNode.removeChild(rectangles[j]);
					}
				}
	
				if ( checkCollision(rectangles[j],balls[i]) === true && ball.yDirection == "up" && ball.xDirection == "left" ) {
					ball.yDirection = "down";
					ball.xDirecion = "left";
					if ( rectangles[j].getAttribute("class") == "rectangle") {
						rectangles[j].parentNode.removeChild(rectangles[j]);
					}
				}
	
				if ( checkCollision(rectangles[j],balls[i]) === true && ball.yDirection == "down" && ball.xDirection == "left" ) {
					ball.yDirection = "up";
					ball.xDirecion = "left";
					if ( rectangles[j].getAttribute("class") == "rectangle") {
						rectangles[j].parentNode.removeChild(rectangles[j]);
					}
				}

				if ( checkCollision(rectangles[j],balls[i]) === true && ball.yDirection == "up" && ball.xDirection == "right" ) {
					ball.yDirection = "down";
					ball.xDirecion = "right";
					if ( rectangles[j].getAttribute("class") == "rectangle") {
						rectangles[j].parentNode.removeChild(rectangles[j]);
					}
				}
	
				if ( checkCollision(rectangles[j],balls[i]) === true && ball.yDirection == "down" && ball.xDirection == "right" ) {
					ball.yDirection = "up";
					ball.xDirecion = "right";
					if ( rectangles[j].getAttribute("class") == "rectangle") {
						rectangles[j].parentNode.removeChild(rectangles[j]);
					}
				}
			}
		}
	}
}

function makeBall(xPosition,yPosition,radius){
	return {
		className: "ball",
		cx: xPosition,
		cy: yPosition,
		r: radius,
		xDirection: "left",
		yDirection: "up",
		speed: 5
	};
}

function addBall(positionX,positionY,radius) {
	var field = document.getElementsByClassName('field');
	field[0].innerHTML = field[0].innerHTML + '<circle cx='+positionX+' cy='+positionY+' r='+radius+' class="ball" style="fill:green"/>';
}

function addRect(positionX,positionY) {
	var field = document.getElementsByClassName('field');
	field[0].innerHTML = field[0].innerHTML + '<rect width="75" height="15" x='+positionX+' y='+positionY+' class="rectangle" style="fill:pink"/>';
}

function checkCollision(rect,circle) {
	var tempX;
	var tempY;
	var rectangle = rect;
	var ball = circle;

	//get needed info for calculations
	var BPX = ball.getAttribute('cx');
	var BPY = ball.getAttribute('cy');
	var BR = ball.getAttribute('r');
	var RPX = rectangle.getAttribute('x');
	var RPY = rectangle.getAttribute('y');
	var RW = rectangle.getAttribute('width');
	var RH = rectangle.getAttribute('height');
	//parse strings to ints
	var ballPositionX = parseInt(BPX);
	var ballPositionY = parseInt(BPY);
	var ballRadius = parseInt(BR);
	var rectPositionX = parseInt(RPX);
	var rectPositionY = parseInt(RPY);
	var rectWidth = parseInt(RW);
	var rectHeight = parseInt(RH);

	var tempX = ballPositionX;
	var tempY = ballPositionY;
	//find side of the rectangle to calculate from
	if( ballPositionX < rectPositionX ) {
		var tempX = rectPositionX;
	}
	else if ( ballPositionX > rectPositionX + rectWidth ) {
		var tempX = rectPositionX + rectWidth;
	}
	if( ballPositionY < rectPositionY ) {
		var tempY = rectPositionY;
	}
	else if( ballPositionY > rectPositionY + rectHeight ) {
		var tempY = rectPositionY + rectHeight;
	}
	//calculate X and Y distance between elements
	var xDistance = ballPositionX - tempX;
	var yDistance = ballPositionY - tempY;
	var distance = Math.sqrt( (xDistance*xDistance) + (yDistance*yDistance) );
	// if distance is smaller than the ball radius collision is true
	if ( distance <= ballRadius ) {
		return true;
	}
	return false;
}

document.addEventListener('keydown', function(event) {
	switch(event.which) {
			case 37:
				var positionX = playerOne[0].getAttribute('x');
				positionX = parseInt(positionX);
					if( positionX < 30 ) {
						positionX = 30;
					}
				playerOne[0].setAttribute('x', positionX - 50);
				preLaunch();
				break;
			case 39:
				var positionX = playerOne[0].getAttribute('x');
				positionX = parseInt(positionX);
					if( positionX > 1095 ) {
						positionX = 1095;
					}
				playerOne[0].setAttribute('x', positionX + 50);
				preLaunch();
				break;
			case 38:
				ballLaunched = true;
				break;
			/*case 65:
				var positionX = playerTwo[0].getAttribute('x');
				positionX = parseInt(positionX);
					if( positionX < 30 ) {
						positionX = 30;
					}
				playerTwo[0].setAttribute('x', positionX - 30);
				preLaunch();
				break;
			case 68:
				var positionX = playerTwo[0].getAttribute('x');
				positionX = parseInt(positionX);
					if( positionX > 1095 ) {
						positionX = 1095;
					}
				playerTwo[0].setAttribute('x', positionX + 30);
				preLaunch();
				break;
			case 87:
				ballLaunched = true;
				break;*/
		}
});
