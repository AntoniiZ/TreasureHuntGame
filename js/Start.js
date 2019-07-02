class Start extends Phaser.Scene{
    constructor(){
        super("start")
    }

    create(){
        this.add.image(400, 300, "play").setScale(0.2);
    }
}
