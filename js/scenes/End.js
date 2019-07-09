import {score} from "./Maze.js";

export class End extends Phaser.Scene{
    constructor(){
        super("end");
    }
    preload(){
        this.load.image('playAgain', 'assets/playAgainButtonNorm.png');
        this.load.image('playAgain1', 'assets/playAgainButtonNorm1.png');
    }
    SortSessionStorage(){
        if(sessionStorage.length > 0){
           var sessionStorageArray = [];
           for (var i=0;i<sessionStorage.length;i++){
                sessionStorageArray[i] = sessionStorage.getItem(sessionStorage.key(i));
           }
        }
        return sessionStorageArray.sort();
     }
    create(){
        var scores = this.SortSessionStorage();
        this.add.text(450, 200, "Score: " + (score-479));
        for(var i=0; i<4;i++){
            if(scores[i]){
                //this.add.text(450, 250 + i*20, "" + (i+1) + ".Score: " + scores[i]);
            }
        }

        var playAgain = this.add.image(512, 400, 'playAgain1');
        playAgain.setInteractive();

        this.input.on('gameobjectdown', this.StartGame, this);

        playAgain.on('pointerover', function(pointer){
            playAgain.setTexture('playAgain');
        });

        playAgain.on('pointerout',function(pointer){
            playAgain.setTexture('playAgain1');
        })﻿﻿;
    }

    StartGame(){
      this.scene.start("loadTheGame");
    }
}
