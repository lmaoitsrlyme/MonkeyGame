var monkey, running;
var banana, bananaimg, obstacle, obstacleimg;
var foodgrp, obsgrp;
var score = 0;
var survivalTime;
var monkeyeating;
var monkeydyingsound;

function preload() {
  running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaimg = loadImage("banana.png");
  obstacleimg = loadImage("obstacle.png");
  monkeydyingsound = loadSound("monkeydying.wav");
  monkeyeating = loadSound("monkeyeating.wav");
}



function setup() {
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -5;
  ground.x = ground.width / 2;

  monkey = createSprite(100, 300, 50, 50);
  monkey.addAnimation("running", running);
  monkey.scale = 0.1;

  foodgrp = new Group();
  obsgrp = new Group();

}


function draw() {

  background("white");


  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  if (keyDown("space") && monkey.y > 250) {
    monkey.velocityY = -7;
  }

  monkey.velocityY = monkey.velocityY + 0.2;

  monkey.collide(ground);
  food();
  obs();

  drawSprites();


  stroke("red");
  textSize(20);
  fill("black");
  text("Score: " + score, 300, 50);

  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount / frameRate())
  text("Survival Time: " + survivalTime, 100, 50);

  if (obsgrp.isTouching(monkey)) {
    obsgrp.setLifetimeEach(-1);
    foodgrp.setLifetimeEach(-1);
    ground.velocityX = 0;
    monkey.velocityY = 0;
    foodgrp.setVelocityXEach(0);
    obsgrp.setVelocityXEach(0);
    monkeydyingsound.play();
    monkey.destroy();
    }
  
  if (foodgrp.isTouching(monkey)) {
    foodgrp.destroyEach();
    score = score + 1;
    monkeyeating.play();
  }
}



function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600, 250, 40, 10);
    banana.y = random(120, 200);
    banana.velocityX = -5;

    banana.lifetime = 300;
    banana.addImage(bananaimg);
    banana.scale = 0.1;

    foodgrp.add(banana);
  }
}

function obs() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(800, 320, 10, 40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleimg);
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;
    obsgrp.add(obstacle);
  }
}