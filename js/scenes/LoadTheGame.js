export class LoadTheGame extends Phaser.Scene{
    constructor(){
        super("loadTheGame");
    }
    preload(){
        this.load.image('grass', 'assets/grass01.png');
        this.load.image('tiny_grass', 'assets/_grass/tiny_grass.png');
        this.load.image('start', 'assets/start.png');
        this.load.image('hero', 'assets/player.png');
        this.load.image('stone', 'assets/stone01.png');

        this.load.image('rock', 'assets/_rocks/stone03.png');
        this.load.image('rock2', 'assets/_rocks/stone01.png');
        this.load.image('treasure', 'assets/treasure.png');
        this.load.image('ice_block', 'assets/ice.png');

        this.load.image('ice6', 'assets/_ice/6.png');
        this.load.image('ice5', 'assets/_ice/5.png');
        this.load.image('ice4', 'assets/_ice/4.png');
        this.load.image('ice3', 'assets/_ice/3.png');
        this.load.image('ice2', 'assets/_ice/2.png');
        this.load.image('ice1', 'assets/_ice/1.png');

    }
    create(){
        this.background = this.add.image(0, 0, "background");
        this.add.text(20, 20, "Loading game...");
        this.scene.start("maze");
    }
}
