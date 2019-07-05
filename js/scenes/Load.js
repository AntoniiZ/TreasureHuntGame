export class Load extends Phaser.Scene{
    constructor(){
        super("load");
    }
    preload(){
        this.load.image('btn1', 'assets/btn1.png');
        this.load.image('btn2', 'assets/btn2.png');
        this.load.image('background', 'assets/background.png');

    }
    create(){
        this.background = this.add.image(0, 0, "background");
        this.add.text(20, 20, "Loading game...");
        this.scene.start("start");
    }
}
