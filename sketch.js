var trex, trex_running, collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage, pumpkinsGroup, pumpkinImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var PLAY, END, OVER, HARD, gameState

var score, lives;

var gameOver,gameOverImage,restart,restartImage,startOver, startOverImage

var meteorsGroup, meteor1;

var flag, flag1 = 0;

var coinImage, coinsGroup;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  pumpkinImage = loadImage("pumpkin.png")
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

  meteor1 = loadImage("meteor.png")

  coinImage = loadImage("coin.png")
  
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
  startOverImage = loadImage("restart.png")
  

}

function setup() {
  createCanvas(displayWidth, displayHeight);
  
   PLAY = 1;
   END = 0;
   OVER = 2;
   HARD = 3;
   gameState = PLAY;

  trex = createSprite(50,displayHeight-20,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,displayHeight-20,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4
  
  invisibleGround = createSprite(200,displayHeight-10,400,10);
  invisibleGround.visible = false;
  
  gameOver = createSprite(300,displayHeight-150,20,20)
  gameOver.addImage("gameOver", gameOverImage)

  restart = createSprite(300,displayHeight-100,20,20)
  restart.addImage("restart", restartImage)
  restart.scale = 0.5

  startOver = createSprite(300,displayHeight-130,20,20)
  startOver.addImage("startOver", startOverImage)
  startOver.scale = 0.5

  

  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  meteorsGroup = new Group();
  coinsGroup = new Group();
  pumpkinsGroup = new Group();
  
  score = 0;
  lives = 3;
}

function draw() {
  console.log(lives)
  if (flag1===1){
    background("red")
  }else if(flag1===0){
  background("teal");
  }
  fill("white")
  text("Score: "+ score, 500,50);

console.log(gameState)
  if (gameState===PLAY){
    flag = 1
    flag1 = 0
    ground.velocityX = -(4 + 2*score/20)
  

    if(keyWentDown("space") && trex.y>555){
      trex.velocityY = -10;
    }

    if(keyDown("LEFT_ARROW") && trex.x>20){
      trex.x = trex.x - 3
    }

    if(keyDown("RIGHT_ARROW") && trex.x<400){
      trex.x = trex.x + 3
    }
  

    trex.velocityY = trex.velocityY + 0.6

    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    gameOver.visible = false
    restart.visible=false
    startOver.visible=false
    
    spawnClouds();
    spawnObstacles();
    spawnMeteors();
    spawnCoins();

    
  if(coinsGroup.isTouching(trex)){
    score = score + 5
    coinsGroup.destroyEach()
  }

   if (trex.isTouching(obstaclesGroup)){
     gameState = END
   }
} else if (gameState===END){
  ground.velocityX = 0;
  trex.velocityY = 0;
  if(flag===1){
    lives = lives-1
    flag=0
  }
  obstaclesGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0)
  meteorsGroup.setVelocityXEach(0)
  meteorsGroup.setVelocityYEach(0)
  coinsGroup.setVelocityXEach(0)
  pumpkinsGroup.setVelocityXEach(0)
  trex.changeAnimation("collided", collided)
  
  obstaclesGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);
  pumpkinsGroup.setLifetimeEach(-1)
  coinsGroup.setLifetimeEach(-1)
  
  gameOver.visible = true
  restart.visible = true
} else if (gameState===OVER){
  ground.velocityX = 0;
  trex.velocityY = 0;
  obstaclesGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0)
  meteorsGroup.setVelocityXEach(0)
  meteorsGroup.setVelocityYEach(0)
  coinsGroup.setVelocityXEach(0)
  pumpkinsGroup.setVelocityXEach(0)
  trex.changeAnimation("collided", collided)
  
  obstaclesGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);
  pumpkinsGroup.setLifetimeEach(-1)
  coinsGroup.setLifetimeEach(-1)
  
  textSize(24)
  text("You have lost all lives. Please start over.",100,100)
  startOver.visible = true
} else if(gameState===HARD){
  flag1 = 1
  ground.velocityX = -7


  if(keyWentDown("space") && trex.y>555){
    trex.velocityY = -10;
  }

  if(keyDown("LEFT_ARROW") && trex.x>20){
    trex.x = trex.x - 3
  }

  if(keyDown("RIGHT_ARROW") && trex.x<400){
    trex.x = trex.x + 3
  }


  trex.velocityY = trex.velocityY + 0.6

  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  gameOver.visible = false
  restart.visible=false
  startOver.visible=false
  
  if (gameState===HARD){
    spawnPumpkins()
  } else{
    spawnClouds();
  }

  spawnObstacles();
  spawnMeteors();
  spawnCoins();
  
if(coinsGroup.isTouching(trex)){
  score = score + 5
  coinsGroup.destroyEach()
}

 if (obstaclesGroup.isTouching(trex) || meteorsGroup.isTouching(trex)){
   gameState = END
  }
}
  if(score>4 && score<31 || score>49 && score<61){
    gameState=HARD
  } else{
    gameState=PLAY
  }

  if(lives===0){
    gameState=OVER
  }

  

  if(mousePressedOver(restart)){
    reset()
  }

  if(mousePressedOver(startOver)){
    reset2()
  }

  trex.collide(invisibleGround);
  drawSprites();
  
  
}

function reset(){
  cloudsGroup.destroyEach()
  obstaclesGroup.destroyEach()
  meteorsGroup.destroyEach()
  coinsGroup.destroyEach()
  gameState=PLAY
  gameOver.visible = false;
  restart.visible = false;
  trex.changeAnimation("running", trex_running)
  console.log("reset")
}

function reset2(){
  lives=3
  cloudsGroup.destroyEach()
  obstaclesGroup.destroyEach()
  meteorsGroup.destroyEach()
  coinsGroup.destroyEach()
  gameState=PLAY
  gameOver.visible = false;
  restart.visible = false;
  trex.changeAnimation("running", trex_running)
  score=0
  console.log("reset2")
  trex.x=50
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 70 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(280,320));
    cloud.addImage(cloudImage);
   
    
      cloud.scale = 0.2;
      cloud.velocityX = -(3 + 1*score/100)
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}

function spawnPumpkins(){
  if(frameCount % 70 === 0){
    var pumpkin = createSprite(600,120,40,10);
    pumpkin.y = Math.round(random(240,360));
    pumpkin.addImage(pumpkinImage);
    pumpkin. velocityX = -7
    pumpkin.scale = 0.15

    pumpkin.lifetime = 200;

    pumpkinsGroup.add(pumpkin)
  }
}  


function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,570,10,40);
    if(gameState===HARD){
      obstacle.velocityX = -7
    }else{
    obstacle.velocityX = -(4 + 2*score/100)
    }
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle        
    obstacle.setCollider("circle", 0, 0, 50)   
    obstacle.scale = 0.25;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnMeteors(){
  if(frameCount % 120 === 0){
    var meteor = createSprite(0,20,20,20);
   
    if (gameState===HARD){
      meteor.scale=0.1
      meteor.velocityX = -7
      meteor.velocityY = 9
      meteor.setCollider("circle",0, 50, 80)
    } else{
    meteor.scale = 0.05
    meteor.velocityY = (5 + 1*score/20)
    meteor.velocityX = -(5 + 1*score/20)
    meteor.setCollider("circle", 0, 50, 50)
        }
    meteor.x = trex.x + Math.round(random(350,450));
    meteor.addImage(meteor1);
    meteorsGroup.add(meteor)

  }
}

function spawnCoins(){
  if(frameCount % 120 === 0){
    var coin = createSprite(600,0,20,20);
    coin.scale = 0.1
    coin.velocityX = -(4 + 2*score/20)
    coin.y = Math.round(random(480,520))
    coin.addImage(coinImage);
    coin.lifetime = 300

    coinsGroup.add(coin)
  }
}
