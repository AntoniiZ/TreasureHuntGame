class LoadTheGame extends Phaser.Scene{
    constructor(){
        super("loadTheGame");
    }
    preload(){
        this.load.image('grass', 'assets/grass01.png');
    }
    create(){
        this.background = this.add.image(0, 0, "background");
        this.add.text(20, 20, "Loading game...");
        this.scene.start("maze");
    }
}
