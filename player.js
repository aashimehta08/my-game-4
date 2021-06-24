class Player {
    constructor(){
        this.name = null;
        this.distance = 0;
        this.score = 0;
        this.index = null;
        this.yDistance = 0;
    }

    getCount(){
        database.ref('playerCount').on('value',function(data){
            playerCount = data.val();
        })
    }

    updateCount(playerCount){
        database.ref('/').update({
            playerCount : playerCount
        })
    }

    update(){
       var playerIndex = "players/player"+this.index;
       database.ref(playerIndex).set({
           name : this.name,
           distance : this.distance,
           score : this.score,
           yDistance : this.yDistance
       })

    }

    static getPlayersInfo(){
        database.ref('players').on('value',function(data){
        allPlayers = data.val();
        });
    }
    
}