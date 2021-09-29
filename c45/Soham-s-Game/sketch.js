var bg,bgImg;
var player,shooterImg,shooter_shooting;
var Bullets = 70;


function preload(){
 bgImg=loadImage("assets/bg.jpeg");
 shooterImg=loadImage("assets/shooter_2.png");
 shooter_shooting=loadImage("assets/shooter_3.png");
 heart1Img=loadImage("assets/heart_1.png");
 heart2Img=loadImage("assets/heart_2.png");
 heart3Img=loadImage("assets/heart_3.png");
}

function setup(){
createCanvas(windowWidth,windowHeight);
bg=createSprite(displayWidth/2-20,displayHeight/2-40,20,20);
bg.addImage(bgImg);
bg.scale=1.1;

player=createSprite(displayWidth-1150,displayHeight-300,50,50);
player.addImage(shooterImg);
player.scale=0.3;
player.debug=true;
player.setCollider("rectangle",0,0,300,300);

heart1=createSprite(displayWidth-150,40,20,20);
heart1.visible=false;
heart1.addImage("heart1",heart1Img);
heart1.scale=0.4;

heart2=createSprite(displayWidth-100,40,20,20);
heart2.visible=false;
heart2.addImage("heart2",heart2Img);
heart2.scale=0.4;

heart3.Img=createSprite(displayWidth-50,40,20,20);
heart3.visible=false;
heart3.addImage("heart3",heart3Img);
heart3.scale=0.4;

zombieGroup=new Group();
BulletGroup=new Group();

}
function draw(){
background(0);
if (gameState==="fight"){
if (keyDown("UP_ARROW")||touches.length>0){
player.y=player.y-30;
}
if (keyDown("DOWN_ARROW")||touches.length>0){
player.y=player.y+30;
}
if (keyWentDown("space")){
Bullet=createSprite(displayWidth-1150,player.y-30,20,10);
Bullet.velocityX=20;
BulletGroup.add(Bullet);
player.depth=Bullet.depth;
player.depth=player.depth+2;
player.addImage(shooter_shooting);
Bullets=Bullets-1;
}
if (Bullets===0){
gameState="Bullet";
}
if (zombieGroup.isTouching(BulletGroup)){
for (var i=0;i<zombieGroup.length;i++){
zombieGroup[i].destroy();
BulletGroup.destroyEach();
}
}
}
if (zombieGroup.isTouching(player)){
for (var i=0;i<zombieGroup.length;i++){

if (zombieGroup[i].isTouching(player)){
zombieGroup[i].destroy();

}
}
}
enemy();
drawSprites();

if (gameState==="lost"){
textSize(100);
fill("red");
text("U LOST",400,400);
zombieGroup.destroyEach();
player.destroy();

}
 else if (gameState==="win"){
textSize(100);
fill("Yellow");
text("U WIN",400,400);
zombieGroup.destroyEach();
player.destroy();
}
else if (gameState==="Bullet"){
textSize(100);
fill("Yellow");
text("U RAN OUT OF BULLETS",400,400);
zombieGroup.destroyEach();
player.destroy();
BulletGroup.destroyEach();
}
}