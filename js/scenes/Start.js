export class Start extends Phaser.Scene{
    constructor(){
        super("start")
    }

    create(){
        this.background = this.add.image(0, 0, "background");
        this.btn1 = this.add.image(512, 256, "play").setScale(1);
        this.btn1.setInteractive();

        //this.background.setInteractive();
        this.input.on('gameobjectdown', this.StartGame, this);
    }

    StartGame(){
      this.scene.start("loadTheGame");
    }

}
