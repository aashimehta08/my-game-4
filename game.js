class Game {
  constructor(){} 
  
  getGameState(){
    database.ref('gameState').on('value',function(data){
        gameState = data.val();
    })
  }

  updateState(gameState){
    database.ref('/').update({
        gameState : gameState
    })
  }
  
  
  start(){
    if(gameState==0){
     form = new Form();
     form.display();
     player = new Player();
     player.getCount();
    }  
    player1 = createSprite(displayWidth/5-200,300);
    player1.addAnimation("swimming",swimmerImg);
    player1.scale = 0.4;
    player2 = createSprite(displayWidth/5-200,450);
    player2.scale = 0.4;
    player2.addAnimation("swimming",swimmerImg);

    turtle = createSprite(0,0);
    turtle.scale = 0.6;
    turtle.addImage(turtleImg);
    turtle.visible = false;

    youWin = createSprite(displayWidth/2,displayHeight/2-200);
    youWin.scale = 0.4;
    youWin.addImage(youWinImg);
    youWin.visible = false;
    
    

    
    players = [player1,player2]
    
  }
  
  play(){
    if(gameState==1){
    form.hide();
   Player.getPlayersInfo();
   this.scoringSystem();
   if(allPlayers != undefined){
    background("#0cdff2");
     var index = 0;
     var x;
     var y;
     for(var plr in allPlayers){
      
       index += 1;
       textSize(15);
       fill("black");
       y = displayHeight- allPlayers[plr].yDistance;
       x = displayWidth -allPlayers[plr].distance;
       players[index-1].x = x;
       players[index-1].y = y;


       if(index == player.index){
         textSize(12);
         fill("black");
         text(allPlayers[plr].name+" Score: "+allPlayers[plr].score,players[index-1].x,players[index-1].y+30);
        camera.position.x =  players[index-1].x;
        camera.position.y = players[index-1].y;
        turtle.x = players[index-1].x - 200;
        turtle.y = players[index-1].y-100;
        youWin.x = players[index-1].x;
        youWin.y = players[index-1].y-300;

      }

      this.changePositions();
       
     }
     

     this.spawnWaste();
     

     if(keyIsDown(RIGHT_ARROW)&& player.index != null){
       player.distance -= 20;
       player.update();
     }
     
     if(keyIsDown(UP_ARROW)&& player.index != null){
      player.yDistance +=10;
      player.update();
    }

    if(keyIsDown(DOWN_ARROW)&& player.index != null){
      player.yDistance -= 10;
      player.update();
    }

    if(keyIsDown(LEFT_ARROW)&& player.index != null){
      player.distance += 20;
      player.update();
    }

    if(player.score>=200){
      this.updateState(2);
    }
    
     
   }
   drawSprites();

  }
  }

  changePositions(){
    Player.getPlayersInfo();
    var i = 0
    for(var plr in allPlayers){
    i +=1
    players[i-1].y -= 100;
 }
    players[i-1].y+=300;
  }
  


  spawnWaste(){
    var randomNumber = Math.round(random(1,3));
    if(frameCount%30==0){
    if(randomNumber==1){
      bottle = createSprite(displayWidth*6,random(0,displayHeight),10,10);
      bottle.velocityX = -7;
      bottle.addImage(bottleImg);
      bottle.scale = 0.1;
      bottleGroup.add(bottle);
    }else if(randomNumber==2){
      sodaCan = createSprite(displayWidth*6,random(0,displayHeight),10,10);
      sodaCan.velocityX = -7;
      sodaCan.addImage(sodaCanImg);
      sodaCan.scale = 0.1;
      sodaGroup.add(sodaCan);
    }else {
      bag = createSprite(displayWidth*6,random(0,displayHeight),10,10);
      bag.velocityX = -7;
      bag.addImage(bagImg);
      bag.scale = 0.6;
      bagGroup.add(bag);
    }
  }
  }

  scoringSystem(){
    if(bottleGroup.isTouching(players)){
      player.score = player.score + 10;
      bottleGroup.destroyEach();
      player.update();
      ding.play();
    } else if(sodaGroup.isTouching(players)){
      player.score = player.score + 5;
      sodaGroup.destroyEach();
      player.update;
      ding.play();
    }else if(bagGroup.isTouching(players)){
      player.score = player.score + 15;
      bagGroup.destroyEach();
      player.update();
      ding.play();
    }
  }

  end(){
    this.getGameState();
     bagGroup.destroyEach();
     bagGroup.setVelocityEach(0,0);
     sodaGroup.destroyEach();
     sodaGroup.setVelocityEach(0,0);
     bottleGroup.destroyEach();
     bottleGroup.setVelocityEach(0,0);
     turtle.visible = true;
     youWin.visible = true;
     fill("black");
     textSize(30);
     text("YOU WON!!",displayWidth/2,displayHeight/2+200);
     drawSprites();

       
     
  }

}