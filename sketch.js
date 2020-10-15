var dog, happyDog
var dogIMG, happyDogIMG
var database
var foodS
var foodStock

function preload()
{
  dogIMG =loadImage("images/dogImg.png");
  happyDogIMG = loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database()

  createCanvas(500, 500);
  
  dog=createSprite(250,300,150,150)
  dog.addImage(dogIMG);
  dog.scale=0.15

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20);
}


function draw() {
  background(46,139,87);
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogIMG);

  }


  drawSprites();
  fill(255,255,254);
  stroke("black")
  text("Remaining Food : " +foodS,170,200);
 

}

function readStock(data){
  foodS= data.val();

}

function writeStock(x){
  if(x<=0){
    x=0;

  }
  else{
    x=x-1;

  }
  database.ref('/').update({
    Food:x
  })
}



