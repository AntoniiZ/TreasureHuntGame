import {score} from "./Maze.js";
import {config} from "../config/game.js";

export class End extends Phaser.Scene{
    constructor(){
        super("end");
    }
    preload(){
        this.load.image('playAgain', 'assets/playAgainButtonNorm.png');
        this.load.image('playAgain1', 'assets/playAgainButtonNorm1.png');
        this.load.image('stone', 'assets/stone01.png');
    }

    create(){
        this.background = this.add.tileSprite(0, 0, config.width * 4, config.height * 4, "stone").setScale(0.5);

        var label =this.add.text(350, 185, "Score: " + (score-480), {
          font: "bold 32px Arial",
          color: "white",
          align: 'center'
        }).setScale(2);

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
