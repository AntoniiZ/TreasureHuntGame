import {score} from "./Maze.js";
import {config} from "../config/game.js";

export var withRandom = false;

export class End extends Phaser.Scene{
    constructor(){
        super("end");
    }
    preload(){
        this.load.image('playAgain', 'assets/playAgainButtonNorm.png');
        this.load.image('playAgain1', 'assets/playAgainButtonNorm1.png');
        this.load.image('playAgainRandom', 'assets/playAgainRandom2.png');
        this.load.image('playAgainRandom01', 'assets/playAgainRandom1.png');
        this.load.image('stone', 'assets/stone01.png');
    }

    create(){
        this.background = this.add.tileSprite(0, 0, config.width * 4, config.height * 4, "stone").setScale(0.5);
        if(!withRandom){
          var label =this.add.text(350, 185, "Score: " + (score-512+96), {
            font: "bold 32px Arial",
            color: "white",
            align: 'center'
          }).setScale(2);
        }


        var playAgain = this.add.image(700, 400, 'playAgain1');
        this.playAgainRandom = this.add.image(300, 400, 'playAgainRandom01');

        playAgain.setInteractive();
        this.playAgainRandom.setInteractive();

        this.input.on('gameobjectdown', this.StartGame, this);

        playAgain.on('pointerover', function(pointer){
            playAgain.setTexture('playAgain');
        });

        playAgain.on('pointerout',function(pointer){
            playAgain.setTexture('playAgain1');
        });
        var t = this;

        this.playAgainRandom.on('pointerover', function(pointer){
            t.playAgainRandom.setTexture('playAgainRandom');
        });

        this.playAgainRandom.on('pointerout',function(pointer){
            t.playAgainRandom.setTexture('playAgainRandom01');
        });
    }

    StartGame(pointer, gameObject){
      if(gameObject == this.playAgainRandom){
        withRandom = true;
      }else{
        withRandom = false;
      }
      this.scene.start("loadTheGame");
    }
}
