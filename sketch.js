const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
// variables
var ball;
var ground;
var lWall , rWall;
var obs , obsImg ;
var ballS , ballImg;

var myEngine , myWorld;

//*********************************************   PRELOAD   ***************************************************

function preload()
{
	obsImg = loadImage("obstacle.png");
	ballImg = loadImage("ball.png");
}

//------------------------------------------------  SETUP  -------------------------------------------------------------

function setup() {
	createCanvas(1000, 700);
	angleMode(DEGREES);
	
	myEngine = Engine.create();
	myWorld = myEngine.world;

	// creating obstacle
	obs = createSprite(500,350);
	obs.addImage(obsImg);
	obs.scale = 0.3;

	obs.debug = false;
	obs.setCollider("circle",0,0,200);

	// creating ball sprite
	ballS=createSprite(100,200,10,10);
	ballS.addImage(ballImg);
	ballS.scale= 0.1;

	// creating options variable to give the objects values
	// ball options
	var options = {
		isStatic : false,
		restitution:0.3
	};
	
	// ground options
	var gOption = {
		isStatic : true,
		restitution : 1,
		friction : 0,
		density : 1.2
	};

	// right and left wall options
	var ist_Option = {
		isStatic : true
	};
	
	
	//creating ball object
      ball = Bodies.circle(100,200,15,options);  
	  World.add(myWorld , ball);

	// creating ground object
	  ground = Bodies.rectangle(400,700,2000,33,gOption);
	  World.add(myWorld , ground);

	// creating left wall object
	  lWall = Bodies.rectangle(600,657,17,53,ist_Option);
	  World.add(myWorld , lWall);

	// creating right wall object
	  rWall = Bodies.rectangle(800,657,17,53,ist_Option);
	  World.add(myWorld , rWall);


	  ellipseMode(CENTER);

  
}

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  DRAW   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

function draw() {
  rectMode(CENTER);
  background("lightblue");

  Engine.update(myEngine);

  // rotating obstacle
  obs.rotation = obs.rotation+2;

  // making ball object equal to ball sprite
  ballS.x= ball.position.x;
  ballS.y= ball.position.y; 

  // bouncing off ball from obstacle
  ballS.bounceOff(obs);
  
  // making body of ball
  push();
  strokeWeight(0);
  fill("lightblue");
 var bpx = ball.position;
 ellipse(bpx.x , bpx.y,35);
  pop();

  // making body of ground
 var gp = ground.position;
 rect(gp.x , gp.y,2000,25);

 // making body of left wall
 var lwp = lWall.position;
 rect(lwp.x , lwp.y , 10 , 60);

 // making body of roght wall
 var rwp = rWall.position;
 rect(rwp.x , rwp.y , 10 , 60);
  
  drawSprites();

  // texts
  textSize(20);
  fill("red");
  text("right arrow for moving forward",10,20);
  fill("black");
  text("left arrow for moving backward",10,45);
  fill("#BDA800");
  text("#trick :- press the right arrow key before the ball touches the ground", 10,72);
  fill("green");
  text("if the ball goes outside the screen press 'CTRL + R' to reset",10,99);
 
}

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$          function key pressed          $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

function keyPressed(){

	if(keyCode === RIGHT_ARROW){
	
	
	
	Body.applyForce( ball, {x : 0.3, y : 0}, {x: 0.03, y: -0.01});
	}
	
	if(keyCode === LEFT_ARROW){
	
	
	Body.applyForce( ball, {x: -0.3, y: 0}, {x:-0.03, y: 0.01});
	
}

}

