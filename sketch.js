var ninja,ninjaImg
var bg , bgImg
var building,building1Img,building2Img,building3Img,building4Img,buildingGrp;
var coin,coinImg,coinGrp,coin1Img;
var obstacle,obstacleImg1,obstacleImg2,obstacleGrp;
var heartImg;
var heart = 5;
var score = 0;
var isTouching = false;
var gamestate = "start";
var start = false;

function preload(){
ninjaImg = loadAnimation("assets/ninja1.png","assets/ninja2.png","assets/ninja3.png","assets/ninja4.png","assets/ninja5.png","assets/ninja6.png")
bgImg = loadImage("assets/city.jpg");
building1Img = loadImage("assets/building1.png");
building2Img = loadImage("assets/building2.png");
building3Img = loadImage("assets/building3.png");
building4Img = loadImage("assets/building4.png");
coinImg = loadAnimation("assets/coin1.png","assets/coin2.png","assets/coin3.png","assets/coin4.png","assets/coin5.png","assets/coin6.png");
obstacleImg1 = loadImage("assets/obstacle1.png");
obstacleImg2 = loadImage("assets/obstacle2.png");
heartImg = loadImage("assets/heart.png");
coin1Img = loadImage("assets/coin1.png");

}

function setup() {
  createCanvas(windowWidth,windowHeight);
 
  ninja = createSprite(180,height / 2 - 50)
  ninja.scale = 1.5
  ninja.addAnimation("run",ninjaImg);

  ninja.setCollider("rectangle",0,0,50,100)

  buildingGrp = createGroup();
  coinGrp = createGroup();
  obstacleGrp = createGroup();

  if(gamestate == "play"){

  

  }
  
  
}

function draw() {
  background(bgImg);

  if(gamestate == "start"){
    fill("blue")
  textSize(50)
  text("WELCOME TO URBAN NINJA",width/2-300,50)
  textSize(40)
  fill("pink")
  text("Rules:",width/2-50,200)
  text("1.Run on top of the buildings",width/2-300,260)
  text("2.Collect coins to get a high score",width/2-300,310)
  text("3.Avoid obstacles(chimney,satellite)to save your lives",width/2-300,360)
  text("4.Dont FALL OFF the building",width/2-300,410)
  text("5.Press UP ARROW to jump",width/2-300,460)
  text("Press",width/2 - 300,height-50)
  fill("red")
  text(" SPACE",width/2 - 200,height-50)
  fill("pink")
  text(" to start the game",width/2 - 50,height - 50)

  if(keyDown("space")){
    gamestate = "play"
    start = true
  }
  }

  if(start == true){
    initialBuildings();
    start = false
  }

  if(gamestate == "play"){
  fill("white")
  textSize(50)
  text("= "+score,width - 200,90)
  image(coin1Img,width-250,50,50,50)

  for(var i=0;i<heart;i++){
    image(heartImg,30+(i*70),30,40,40)
  }

  if(keyDown(UP_ARROW)){
    ninja.velocityY = -12
    isTouching = false
  }  


  ninja.velocityY = ninja.velocityY + 0.5
  ninja.collide(buildingGrp);

  coinGrp.collide(ninja,collideCoin)

  if(obstacleGrp.isTouching(ninja)&& isTouching == false){
    heart -=1
    isTouching = true
  }

  if(heart <=0 || ninja.y>height-200){
    gamestate = "end"
  }

  console.log(gamestate)
  
  

  spawnBuilding();
}

if(gamestate=="end"){
 gameOver()
  buildingGrp.setVelocityXEach(0)
  coinGrp.setVelocityXEach(0)
  obstacleGrp.setVelocityXEach(0)
}
  drawSprites();

}

function spawnBuilding(){

  if(frameCount % 200 === 0){
    building = createSprite(width + 100, height / 2 + 200);
    var rand = Math.round(random(1,4));
    switch(rand){
      case 1: building.addImage("building",building1Img);
              building.scale = 1.8
              building.setCollider("rectangle",0,0,200,200)
              
              obstacle = createSprite(building.x-95,building.y-215)
    
              obstacle.addImage("avoid",obstacleImg2)
              obstacle.scale = 0.5
              break;
      case 2: building.addImage("building",building2Img);
              building.scale = 1.5
              building.setCollider("rectangle",0,0,250,290)
              var randomy = random(building.x - 100,building.x+100)
              obstacle = createSprite(randomy,building.y-250)
              obstacle.addImage("avoid",obstacleImg1)
              obstacle.scale = 0.3
              break;
      case 3: building.addImage("building",building3Img); 
              building.scale = 1.8
              building.setCollider("rectangle",0,0,170,270)
              obstacle = createSprite(building.x,building.y-260)
              obstacle.addImage("avoid",obstacleImg2)
              obstacle.scale = 0.5
              break;
      case 4: building.addImage("building",building4Img); 
              building.scale = 2 
              building.setCollider("rectangle",0,0,150,170)
              var randomy = random(building.x - 100,building.x+100)
              obstacle = createSprite(randomy,building.y-190)
              obstacle.addImage("avoid",obstacleImg1)
              obstacle.scale = 0.3
              break;                   
    }
    
    building.velocityX = -3
    
    building.lifetime = 1000
    buildingGrp.add(building)

    var randomx = random(building.x - 100,building.x+100)
    coin = createSprite(randomx,building.y-300)
    coin.addAnimation("star",coinImg)
    coin.scale = 0.5
    coin.velocityX = -3

    coinGrp.add(coin)

    /*var randomy = random(building.x - 100,building.x+100)
    obstacle = createSprite(randomy,building.y-250)
    var randomz = Math.round(random(1,2))
    

    switch(randomz){

      case 1:obstacle.addImage("avoid",obstacleImg1)
             obstacle.scale = 0.3
             break;
      case 2:obstacle.addImage("avoid",obstacleImg2)
             obstacle.scale = 0.3
             break;
    }*/
    obstacle.velocityX = -3
    obstacleGrp.add(obstacle)
  } 
}

function collideCoin(coin){
  score += 1
  coin.destroy();
}

function gameOver(){
  swal({
    title: `Game Over`,
    text: "Oops you lost....!!!",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize: "100x100",
    confirmButtonText: "Play Again"
  },
  function(isConfirm) {
    if (isConfirm) {
      location.reload();
    }
  }
  );

}
  
function initialBuildings(){
  building = createSprite(200, height / 2 + 200);
  building.addImage("building",building1Img);
  building.scale = 1.8
  building.velocityX = -3
  

  buildingGrp.add(building)
  //building.debug = true
  building.setCollider("rectangle",0,0,200,200)

  var randomx = random(building.x - 100,building.x+100)
    coin = createSprite(randomx,building.y-300)
    coin.addAnimation("star",coinImg)
    coin.scale = 0.5
    coin.velocityX = -3

    coinGrp.add(coin)

 // var randomy = random(building.x - 100,building.x+100)
 /* obstacle = createSprite(building.x-95,building.y-315)
    
  obstacle.addImage("avoid",obstacleImg2)
  obstacle.scale = 0.5
  obstacle.velocityX = -3
  obstacleGrp.add(obstacle)*/
    

  building = createSprite(width/2 - 90, height / 2 + 200);
  building.addImage("building",building2Img);
  building.scale = 1.5
  building.velocityX = -3

  
  buildingGrp.add(building)
  //building.debug = true
  building.setCollider("rectangle",0,0,250,290)

  var randomx = random(building.x - 100,building.x+100)
    coin = createSprite(randomx,building.y-300)
    coin.addAnimation("star",coinImg)
    coin.scale = 0.5
    coin.velocityX = -3

    coinGrp.add(coin)

var randomy = random(building.x - 100,building.x+100)
obstacle = createSprite(randomy,building.y-250)
obstacle.addImage("avoid",obstacleImg1)
obstacle.scale = 0.3
obstacle.velocityX = -3
obstacleGrp.add(obstacle)

  building = createSprite(width/2 + 400, height / 2 + 200);
  building.addImage("building",building3Img);
  building.scale = 1.8
  building.velocityX = -3

  buildingGrp.add(building)
  //building.debug = true
  building.setCollider("rectangle",0,0,170,270)

  var randomx = random(building.x - 100,building.x+100)
    coin = createSprite(randomx,building.y-300)
    coin.addAnimation("star",coinImg)
    coin.scale = 0.5
    coin.velocityX = -3

    coinGrp.add(coin)

    obstacle = createSprite(building.x,building.y-260)
    
  obstacle.addImage("avoid",obstacleImg2)
  obstacle.scale = 0.5
  obstacle.velocityX = -3
  obstacleGrp.add(obstacle)


  building = createSprite(width/2 + 800, height / 2 + 200);
  building.addImage("building",building4Img);
  building.scale = 1.8
  building.velocityX = -3

  buildingGrp.add(building)
 //building.debug = true
  building.setCollider("rectangle",0,0,150,170)
 // building.debug = true

  var randomx = random(building.x - 100,building.x+100)
    coin = createSprite(randomx,building.y-300)
    coin.addAnimation("star",coinImg)
    coin.scale = 0.5
    coin.velocityX = -3
    coinGrp.add(coin)

var randomy = random(building.x - 100,building.x+100)
obstacle = createSprite(randomy,building.y-190)
obstacle.addImage("avoid",obstacleImg1)
obstacle.scale = 0.3
obstacle.velocityX = -3
obstacleGrp.add(obstacle)
  //.debug = true



}


