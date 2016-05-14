var KEY_SPACE = 32;
var KEY_UP = 87;
var KEY_DOWN = 40;
var KEY_LEFT = 65;
var KEY_RIGHT = 68;
var KEY_ENTER = 13;
var SPACE_HELD = false;
var startFrameMilliseconds = performance.now();
var endFrameMilliseconds = performance.now();

function getDeltaTime()
{
	endFrameMilliseconds = startFrameMilliseconds;
	startFrameMilliseconds = performance.now();
	
	var deltaTime = (startFrameMilliseconds - endFrameMilliseconds) * 0.001;
	
	if(deltaTime > 1)
	{
		deltaTime = 1;
	}
	
	return deltaTime;
}



function loopObject(object){
	//Check for x axis
			if(object.x + object.width/2 < 0)
			{
				//Player has gone off left hand side of screen
				object.x = canvas.width + object.width/2;
			}
			if(object.x - object.width/2 > canvas.width)
			{
				object.x = 0 - object.width/2;
			}
			//Check for y axis
			if(object.y + object.height/2 < 0)
			{
				//Player has gone off left hand side of screen
				object.y = canvas.height + object.height/2;
			}
			if(object.y - object.height/2 > canvas.height)
			{
				object.y = 0 - object.height/2;
			}
}

function onKeyUp(){
	var currentKey = event.keyCode;
	//console.log(currentKey);
	
	
	//Move player up
	
	if(currentKey == KEY_UP)
	{
		player.accelerating = false;
	}

	//Move player left
	if(currentKey == KEY_LEFT)
	{
		player.turnLeft = false;
	}

	//Move player right
	if(currentKey == KEY_RIGHT)
	{
		player.turnRight = false;
	}
	//Shoot bullet
	if(currentKey == KEY_SPACE)
	{
		player.shooting = false;
		SPACE_HELD = false;
	}
 
}

function onKeyDown(event){
	var currentKey = event.keyCode;
	//console.log(currentKey);
	//Move player up

	

	if(currentKey == KEY_UP)
	{
	
		player.accelerating = true;
		
	}

	//Move player left
	if(currentKey == KEY_LEFT)
	{
		
		player.turnLeft = true;
		
	}

	//Move player right
	if(currentKey == KEY_RIGHT)
	{
		
		player.turnRight = true;
		
	}
	
	//Shoot bullet
	if(currentKey == KEY_SPACE)
	{
		
		if(!player.shooting) {
		player.shooting = true;
			}
		
	}
	

	
	
	if(currentKey == KEY_ENTER && gameState == STATE_SPLASH){
		gameState = STATE_GAME;
	}
}







function checkCollisions() {	
	for (var i = 0; i < asteroids.length; i++) {
		for (var j = 0; j < player.bullets.length; j++) {
			if (player.bullets[j].y + player.bullets[j].height < asteroids[i].y || 
				player.bullets[j].x + player.bullets[j].width < asteroids[i].x || 
				player.bullets[j].x > asteroids[i].x + asteroids[i].width ||
				player.bullets[j].y > asteroids[i].y + asteroids[i].height) {
			}	 
			else
			{
				player.bullets.splice(j, 1);
				switch(asteroids[i].type) {
					case "large":
						for (var k = 0; k < 3; k++) {
							asteroids.push(createAsteroid(asteroids[i].x, asteroids[i].y, "medium"));
							asteroids[asteroids.length - 1].setup();
						}
						asteroids.splice(i, 1);
					return;

					case "medium":
						for (var l = 0; l < 3; l++) {
							asteroids.push(createAsteroid(asteroids[i].x, asteroids[i].y, "small"));
							asteroids[asteroids.length - 1].setup();
						}
						asteroids.splice(i, 1);
					return;

					case "small":
						asteroids.splice(i, 1);
					return;
				}
			}
		}
		if (player.x + (player.width * 0.75) < asteroids[i].x ||
			player.y + (player.height * 0.75) < asteroids[i].y || 
			player.x + (player.width / 4) > asteroids[i].x + asteroids[i].width ||
			player.y + (player.height / 4) > asteroids[i].y + asteroids[i].height) {	
		}
		else {
			if (!player.immune) {
				player.loseLife();	
			}
		}
		
	}
}

function deleteBullet(){
	//Check for x axis

			for (var i = 0; i < player.bullets.length; i++) {
				if(player.bullets[i].x - player.bullets[i].width / 2 < 0 || 
					player.bullets[i].x + player.bullets[i].width / 2 > canvas.width || 
					player.bullets[i].y - player.bullets[i].height / 2 < 0 ||
					player.bullets[i].y + player.bullets[i].height / 2 > canvas.height)
				{
					player.bullets.splice(i, 1);
					return;
				}
			}
}