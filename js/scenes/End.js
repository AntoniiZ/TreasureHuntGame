class End extends Phaser.Scene{
    constructor(){
        super("end");
    }
    preload(){
        this.load.image('playAgain', 'assets/playAgainButtonNorm.png');
    }
    SortSessionStorage(){
        if(sessionStorage.length > 0){
           var sessionStorageArray = new Array();
           for (var i=0;i<sessionStorage.length;i++){
                sessionStorageArray[i] = sessionStorage.getItem(sessionStorage.key(i));
           }
        }
        var sortedArray = sessionStorageArray.sort();
        return sortedArray;
     }
    create(){
        var scores = this.SortSessionStorage();
        this.add.text(450, 200, "Score: " + score);
        score=0;

        for(var i=0; i<4;i++){
            if(scores[i]){
                //this.add.text(450, 250 + i*20, "" + (i+1) + ".Score: " + scores[i]);
            }

        }

        var playAgain = this.add.image(512, 400, 'playAgain');
        playAgain.setInteractive();
        this.input.on('gameobjectdown', this.StartGame, this);
    }

    StartGame(){
      this.scene.start("loadTheGame");
    }
}
