export class Start extends Phaser.Scene{
    constructor(){
        super("start")
    }

    create(){
        this.background = this.add.image(0, 0, "background");
        let btn1 = this.add.image(512, 256, "btn1").setScale(1);
        btn1.setInteractive();

        //this.background.setInteractive();
        this.input.on('gameobjectdown', this.StartGame, this);

        btn1.on('pointerover', function(pointer){
            btn1.setTexture('btn2');
        });

        btn1.on('pointerout',function(pointer){
            btn1.setTexture('btn1');
        })﻿﻿;

    }

    StartGame(){
      this.scene.start("loadTheGame");
    }

}
