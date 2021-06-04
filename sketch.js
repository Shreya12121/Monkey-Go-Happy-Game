var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var FoodScore = 0;
var restart,restart_Image;

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  restart_Image = loadImage("reset.png");
 }

function setup() {
  createCanvas(400,400);

  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  restart = createSprite(200,200,20,20);
  restart.addImage(restart_Image);
  restart.scale = 0.2;
  restart.visible = false;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  FoodScore = 0;
}

function draw() {
  background("white");
   text("FoodScore: "+ FoodScore, 300,50);
  text("FoodScore: "+ FoodScore, 300,50);
  
  if (gameState===PLAY){
    if (keyDown("space")&& monkey.y >= 159){
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
    
    if (ground.x<0){
    ground.x = ground.width/2;
  }
    
    if(monkey.isTouching(FoodGroup)) {
      FoodScore = FoodScore + 1
    }
  spawnFood();
  spawnObstacles();
  if(obstaclesGroup.isTouching(monkey)) {
    gameState = END; 
  }
  }
  else if(gameState === END) {
     restart.visible = true;
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);  
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  drawSprites();
  stroke("black");
  textSize(20); 
  fill("black");
  text("FoodScore : " + FoodScore,500,50);
  }

function spawnFood(){
  if(frameCount % 80 === 0){
   var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);
    banana.velocityX = -5;
    banana.lifeTime = 300;
    monkey.depth = banana.depth+1;
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if (frameCount % 100 === 0){
  var  obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.lifeTime = 300;
    obstaclesGroup.add(obstacle);
  }
}

function reset() {
   gameState = PLAY;
  restart.visible = false;
  obstaclesGroup.destroyEach();
  FoodGroup.destroyEach();
  FoodScore = 0;
}