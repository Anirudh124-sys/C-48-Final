var PLAY = 1,END = 0;
var gamestate = PLAY,score,count = 0;
var player,player_damage,player_running,player_jump,player_idle,player_shooting,player_dead
var backGround,background_image;
var obstacle_img,obstaclesGroup;
var invisbleGround;
var resetButton,resetButtonImage

function preload(){
player_damage = loadAnimation("damage01.png","damage02.png","damage03.png","damage04.png","damage05.png");
player_running = loadAnimation("run1.png","run2.png","run3.png","run4.png","run5.png",
"run6.png","run7.png","run8.png");
player_idle = loadImage("idle01.png");
player_jump = loadAnimation("jump01.png","jump02.png","jump03.png","jump04.png");
player_shooting = loadAnimation("shooting1.01.png","shooting1.02.png","shooting1.03.png","shooting1.04.png",
"shooting2.01.png","shooting2.02.png","shooting2.03.png","shooting1.04.png",)
background_image = loadImage("f0c67138e03caef.png")
obstacle_img = loadImage("stone.png")
resetButtonImage = loadImage("reset.jpg")
}

function setup() {
  createCanvas(1400,800);
  player = createSprite(200, 700, 50, 50);
  player.addAnimation("player_shooting",player_shooting);
  player.addAnimation("player_jump",player_jump);
  player.addAnimation("player_running",player_running)
  player.addAnimation("player_damage",player_damage)
  player.addAnimation("player_idle",player_idle);
  player.scale = 3.5;
  player.setCollider("rectangle",-5,0,20,40);
  player.debug = true
  
  backGround = createSprite(600,320,1600,800);
  backGround.addImage("background_image",background_image);
  backGround.scale = 2.5;  
  backGround.velocityX = 2;
  obstaclesGroup = new Group()

  invisbleGround = createSprite(210,1000,400,400);
  invisbleGround.visible = false;

  resetButton = createSprite(550,400,50,50)
  resetButton.addImage("resetButtonImage",resetButtonImage);
  resetButton.scale = 0.5
}

function draw() {
  background(0);
  if (gamestate === PLAY){
  backGround.velocityX = -3;
  if(backGround.x < 0){
    backGround.x = 1200; 
  }
  player.depth = backGround.depth;
  player.depth = player.depth+1
  obstaclesGroup.depth =player.depth;
  console.log()
  
  if(keyDown("space") && player.y >= 687 ){
    player.velocityY = -20;
    player.changeAnimation("player_jump",player_jump);
  }
  
  player.velocityY = player.velocityY + 0.8
  spawnObstacles();

  if(obstaclesGroup.isTouching(player)){
    //player.velocityY = 0;
    player.changeAnimation("player_damage",player_damage);
    obstaclesGroup.destroyEach();
    count = count+1
    if(count === 3){gamestate = END}
  }
    player.collide(invisbleGround)
    player.changeAnimation("player_running",player_running);

    resetButton.visible = false;
}

  player.collide(invisbleGround)
  drawSprites();
  if(gamestate === END){
    player.velocityY = 0;
    backGround.velocityX = 0;
    textSize(30);
    fill("red")
    text("You broke 3 obstacle... You have to reset :(",300,400); 
    player.changeAnimation("player_idle",player_idle);
    resetButton.visible = true;
    if(mousePressedOver(resetButton)){
      reset();
    }
  }
}
  
  
function spawnObstacles() {
  if(frameCount % 200 === 0) {
    var obstacle = createSprite(1200,750,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);
    obstacle.debug = true
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    
  }
}

function reset() {
  gamestate = PLAY;
  reset.visible = false
}
