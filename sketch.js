var ghost,ghost_Image;
var tower,tower_Image;
var door,door_Image,doorGroup,climber,climberGroup,climber_Image;
var invisibleGroup;
var PLAY=1
var END=0
var gameState=PLAY;

function preload() {
ghost_Image=loadImage("ghost-standing.png");
tower_Image=loadImage("tower.png");
door_Image=loadImage("door.png");
climber_Image=loadImage("climber.png");
spookySound=loadSound("spooky.wav");
}  

function setup() {
createCanvas(600,500);
 
//spookySound.loop();  
  
tower = createSprite(300,350);  
tower.addImage(tower_Image);
tower.velocityY=2;
  
ghost = createSprite(300,350,20,20);
ghost.addImage(ghost_Image);
ghost.scale=0.4;  

invisibleGroup=new Group();
doorGroup= new Group();
climberGroup= new Group();
}


function draw() {
background(0); 
 
if (gameState===PLAY){
  
 if (tower.y > ghost.y + 200){
    tower.y=ghost.y-200;
}
camera.position.y = ghost.y;
camera.position.x = 300;
if (ghost.isTouching(climberGroup)){
    ghost.velocityY= 0;
}
if (ghost.isTouching(invisibleGroup)){
   gameState=END;
}
if (ghost.y > 700){
  gameState=END;
}
  
if(keyDown("space")){
  ghost.velocityY = -10;
    } 
  
if (keyDown("right")){
  ghost.x=ghost.x+5;
}
  if (keyDown("left")){
  ghost.x=ghost.x-5;
}
ghost.velocityY = ghost.velocityY + 0.7  
spawndoor();  
  
drawSprites();
}
  
  else if (gameState === END){
    textSize(50);  
    text("Game Over",200,300);
  }
}

function spawndoor(){
  if (frameCount %250 === 0){
   door = createSprite(Math.round(random(150,450)),ghost.y - 300)
   door.addImage(door_Image)
   door.velocityY= 2  
   climber = createSprite(door.x,ghost.y - 250) 
   climber.addImage(climber_Image)
   climber.velocityY= 2 
   var invisible= createSprite(door.x,ghost.y - 240,100,5)
   invisible.velocityY= 2
   invisible.visible=false 
   invisibleGroup.add(invisible)
   doorGroup.add(door)
   climberGroup.add(climber)
   door.depth=ghost.depth
   ghost.depth = ghost.depth +1 
  }
  
}