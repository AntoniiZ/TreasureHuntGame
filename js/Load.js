class Load extends Phaser.Scene{
    constructor(){
        super("load");
    }
    preload(){
        this.load.image('play', 'assets/play.png');
    }
    create(){
        this.add.text(20, 20, "Loading game...");
        this.scene.start("start");
    }
}
