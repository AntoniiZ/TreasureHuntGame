import {score} from "./Maze.js";

export class End extends Phaser.Scene{
    constructor(){
        super("end");
    }
    preload(){
        this.load.image('playAgain', 'assets/playAgainButtonNorm.png');
        this.load.image('playAgain1', 'assets/playAgainButtonNorm1.png');
    }

    create(){
        this.add.text(450, 200, "Score: " + (score-479));


        var playAgain = this.add.image(512, 400, 'playAgain1');
        playAgain.setInteractive();

        this.input.on('gameobjectdown', this.StartGame, this);

        playAgain.on('pointerover', function(pointer){
            playAgain.setTexture('playAgain');
        });

        playAgain.on('pointerout',function(pointer){
            playAgain.setTexture('playAgain1');
        });
    }

    StartGame(){
      this.scene.start("loadTheGame");
    }
}
