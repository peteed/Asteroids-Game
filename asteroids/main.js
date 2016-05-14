var STATE_SPLASH = 0;
var STATE_GAME = 1;
var STATE_GAMEOVER = 2;
var STATE_LOSE = 3;

var gameState = STATE_SPLASH;

//Main javaScript file that is executed in the body of the HTML file
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

//Canvas Constants
var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;

//Maths constants
var PI = 3.14159265359;

//Game Constants
var STARTING_ASTEROIDS = 3;
var STARTING_ASTEROIDS_OFFSET = 30;


//Background
var background = document.createElement("img");
background.src = "Sprites/background.png";

var splash = document.createElement("img");
splash.src = "Sprites/splash.png";

var gameOver = document.createElement("img");
gameOver.src = "Sprites/gameover.png";

var gameLose = document.createElement("img");
gameLose.src = "sprites/gamelose.png";


//Game Objects
////Gameplay
var asteroids = [];
var player;
setUpGame();

//Events Listener
window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);

update();