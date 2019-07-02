class Start extends Phaser.Scene{
    constructor(){
        super("start");
    }
    preload(){
        this.load.image('play', 'assets/play.png');
    }
    create(){
        //this.platforms = this.physics.add.staticGroup();
        this.add.image(400, 300, 'play').setScale(0.2);
    }
}