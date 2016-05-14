//Player Constants
var PLAYER_ACCELERATION = 0.25;
var PLAYER_TURN_SPEED = 0.08;
var PLAYER_MAX_VEL = 10;
var PLAYER_IMMUNE_TIME = 3;
var PLAYER_IMMUNE_FLASH_RATE = 0.05;

var BULLET_SPEED = 20.0;
var BULLET_MAX = 3;

function createBullet(){
			return{
			x: 0,
			y: 0,
			width: 0,
			height: 0,
			velX: 0,
			velY: 0,
			sprite: document.createElement("img"),
			set: false,
			isDead: true,

			setup: function(){
				this.sprite.src = "Sprites/bullet.png"
			},

			update: function(){
				this.x += this.velX;
				this.y += this.velY;
			},

			draw: function(){
				if (this.sprite.complete && this.set == false) {
					this.width = this.sprite.width;
					this.height = this.sprite.height;
					this.set = true;
				}else if (this.set == true) {
					context.drawImage(this.sprite, this.x - (this.width / 2), this.y - (this.height / 2));

				}
			},
	};
}


function createPlayer(a_posX, a_posY, a_fileName){
	return{
		//Member variables
		x: a_posX,
		y: a_posY,
		width: 0,
		height: 0,
		set: false,
		velX: 0,
		velY: 0,
		rot: PI,
		sprite: document.createElement("img"),
		accelerating: false,
		turnLeft: false,
		turnRight: false,
		shooting: false,
		bullets: [],
		isDead: false,
		deaths: 0,
		fireRate: 0.1, 
		fireTimer: 0,
		immune: false,
		immuneTimer: 0,
		flashEffectTimer: 0,
		//Member function
		setup: function(){
			this.sprite.src = a_fileName;
		},

		update: function(deltaTime){
			//this.respawnCheck();
			if(this.accelerating){
				var sin = Math.sin(this.rot);
				var cos = Math.cos(this.rot);
				var X = 0;
				var Y = 1;
				this.velX += (X * cos) - (Y * sin) * PLAYER_ACCELERATION;
				this.velY += (X * sin) + (Y * cos) * PLAYER_ACCELERATION;
				
				//Limit max Velocity
				var magnitude = Math.sqrt((this.velX*this.velX) + (this.velY*this.velY));
				if(magnitude > PLAYER_MAX_VEL){
					this.velX = (this.velX / magnitude) * PLAYER_MAX_VEL;
					this.velY = (this.velY / magnitude) * PLAYER_MAX_VEL;
				}
			}
			if(this.turnLeft){
				this.rot -= PLAYER_TURN_SPEED;
			}
			if(this.turnRight){
				this.rot += PLAYER_TURN_SPEED;
			}
			
			this.fireTimer += deltaTime;

			if (this.shooting) {
				if (this.fireTimer > this.fireRate && this.bullets.length < BULLET_MAX) {					
					player.shoot();
					this.fireTimer -= this.fireTimer;
					}
			}


			if (this.immune) {
				this.immuneTimer += deltaTime;
				if (this.immuneTimer >= PLAYER_IMMUNE_TIME) {
					this.immune = false;
					this.immuneTimer -= this.immuneTimer;
				}
			}







			this.velX *= 0.9935;
			this.velY *= 0.9935;
			
			this.x += this.velX;
			this.y += this.velY;
		},


		//respawnCheck: function() {
				//var respawnTimer -= deltaTime;
				//if (respawnTimer <= 0) {
				//	this.immune = true;
				//}	else{
				//	this.immune = false;
				//}
						
		//},



		draw: function(deltaTime){
			loopObject(this);
			//Make sure the sprite has loaded before we fetch the width and height
			if(this.sprite.complete && this.set == false){
				this.width = this.sprite.width;
				this.height = this.sprite.height;
				this.set = true;
			}else if(this.set == true){
				//Rotate and draw the asteroid to the screen
				context.save();
					context.translate(this.x, this.y);
					context.rotate(this.rot);
					
					if (this.immune && gameState == STATE_GAME) {
						this.flashEffectTimer += deltaTime;
						if (this.flashEffectTimer > PLAYER_IMMUNE_FLASH_RATE) {
						context.drawImage(this.sprite, -(this.width/2), -(this.height/2));
						this.flashEffectTimer -= this.flashEffectTimer;
				}


					} else {
					context.drawImage(this.sprite, -(this.width/2), -(this.height/2));
					}
				context.restore();
			}
		},

		shoot: function(){

			var bullet = createBullet();
			bullet.setup();
			bullet.x = this.x;
			bullet.y = this.y;
			var X = 0;
			var Y = 1;
			var sin = Math.sin(this.rot);
			var cos = Math.cos(this.rot);
			var dirX = ((X * cos) - (Y * sin));
			var dirY = ((X * sin) + (Y * cos));
			bullet.velX = dirX * BULLET_SPEED;
			bullet.velY = dirY * BULLET_SPEED;
			bullet.velX += this.velX;
			bullet.velY += this.velY;
			bullet.isDead = false;
			this.bullets.push(bullet);
		
		},	

		loseLife: function() {

				
				this.x = SCREEN_WIDTH / 2;
				this.y = SCREEN_HEIGHT / 2;
				this.velX = 0;
				this.velY = 0;
				this.accelerating = false;
				this.turnLeft = false;
				this.turnRight = false;
				this.shooting = false;
				this.rot = PI;
				this.immune = true;
				this.deaths = this.deaths + 1;



			
		},
					

};

}




			













