var splashTimer = 3;
function runSplash(deltaTime) {
	context.drawImage(splash, 0, 0);
	requestAnimationFrame(update);
	splashTimer -= deltaTime;
	if (splashTimer <= 0) {
		gameState = STATE_GAME;
		return;
	}
}

function runGame(deltaTime) {

	context.drawImage(background, 0, 0);
	gameStateUpdate(deltaTime);
	requestAnimationFrame(update);
}

function runGameOver(deltaTime) {
	
	context.drawImage(gameOver, 0, 0);
	requestAnimationFrame(update);
	//context.fillStyle = "#fff";
	//context.font = "100px Arial";
	//context.fillText("YOU WIN!!!", 400, 420);
}

function runGameLose(deltaTime) {
	
	context.drawImage(gameLose, 0, 0);
	requestAnimationFrame(update);
}

function update(){
	context.drawImage(background, 0, 0);
	var deltaTime = getDeltaTime();

	switch(gameState) {
		case STATE_SPLASH:
			runSplash(deltaTime);
			break;
		case STATE_GAME:
			runGame(deltaTime);
			break;
		case STATE_GAMEOVER:
			runGameOver(deltaTime);
			break;
		case STATE_LOSE:
			runGameLose(deltaTime);
			break;

	}
	
	
}

function gameStateUpdate(deltaTime){
	//Check Collisions
	
	//Run gameLogic and Draw
	//Asteroids
	
	checkCollisions();
	
	for(var i = 0; i < asteroids.length; i++){
		asteroids[i].update();
		asteroids[i].draw();
	}	
	deleteBullet();
	for(var i = 0; i < player.bullets.length; i++) {
		player.bullets[i].update();
		player.bullets[i].draw();
	}

	if (asteroids.length == 0) {
		gameState = STATE_GAMEOVER;
	}

	if (player.deaths >= 3) {
		gameState = STATE_LOSE;
	}
	
	//update and draw player
	player.update(deltaTime);
	player.draw(deltaTime);
}

function setUpGame(){
	//Game Objects
	for(var i = 0; i < STARTING_ASTEROIDS; i++){
		var coinFlip = Math.random();
		if(coinFlip > 0.5){
			//Spawn at the top
			asteroids.push(createAsteroid(Math.random() * SCREEN_WIDTH, 0 + STARTING_ASTEROIDS_OFFSET, "large"));
			asteroids[asteroids.length - 1].setup();
		}else{
			//Spawn at the bottom;
			asteroids.push(createAsteroid(Math.random() * SCREEN_WIDTH, SCREEN_HEIGHT - STARTING_ASTEROIDS_OFFSET, "large"));
			asteroids[asteroids.length - 1].setup();
		}
	}
	player = createPlayer(SCREEN_WIDTH/2, SCREEN_HEIGHT/2, "Sprites/ship.png");
	player.setup();

	//var borgAudio = new Audio("borg.mp3");
	//borgAudio.play();
}