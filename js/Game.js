class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    end=false
    car1 = createSprite(100,200);
    car1.addImage(car1Img)
    car2 = createSprite(300,200);
    car2.addImage(car2Img)
    car3 = createSprite(500,200);
    car3.addImage(car3Img)
    car4 = createSprite(700,200);
    car4.addImage(car4Img)
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getfinish()
    
    if(allPlayers !== undefined){
      background("grey")
      image(trackImg,0,-displayHeight*4,displayWidth,displayHeight*5)
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 140;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          fill("red")
          ellipse(x,y,60,70)
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        textSize(15);
        text(allPlayers[plr].name,x,y+35)
      }

    }
    if(player.distance>4420 && end===false){
      Player.updatefinish()
      player.rank=finish
      player.update()
      end=true
    }
    if(keyIsDown(UP_ARROW) && player.index !== null&& end===false){
      player.distance +=10
      player.update();
    }

    drawSprites();
  }
  end(){
    console.log("GameOver")
    var a=createElement('h1')
    a.html("GameOver")
    a.position(displayWidth/2,100)
  }
  displayrank(){
    camera.position.x=0
    camera.position.y=0
    Player.getplayerInfo()
    textSize(40)
    fill("white")
    textAlign(CENTER)
    for(var index in allPlayers){
      if(allPlayers[index].rank===1){
        text("Winner:"+allPlayers[index].name,displayWidth/4-350,displayHeight-600)
      }
      else if(allPlayers[index].rank===2){
        text("FirstRunner:"+allPlayers[index].name,displayWidth/4-40,displayHeight-500)
      }
      else if(allPlayers[index].rank===3){
        text("SecondRunner:"+allPlayers[index].name,-350,displayHeight-400)
      }
      else{
        text("ThirdRunner:"+allPlayers[index].name,30,displayHeight-300)
      }
    }
  }
}
