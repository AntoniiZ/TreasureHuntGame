class Load extends Phaser.Scene{
    constructor(){
        super("load");
    }

    create(){
        this.add.text(20, 20, "Loading game...");
        this.scene.start("start");
    }
}