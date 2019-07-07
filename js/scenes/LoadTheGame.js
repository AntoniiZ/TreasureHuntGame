export class LoadTheGame extends Phaser.Scene{
    constructor(){
        super("loadTheGame");
    }
    preload(){
        this.load.image('grass', 'assets/grass01.png');
        this.load.image('tiny_grass', 'assets/_grass/tiny_grass.png');
        this.load.image('start', 'assets/start.png');
        this.load.image('hero', 'assets/player.png');
        this.load.image('hero_back', 'assets/player_back.png');
        this.load.image('stone', 'assets/stone01.png');

        this.load.image('rock', 'assets/_rocks/stone03.png');
        this.load.image('rock2', 'assets/_rocks/stone01.png');
        this.load.image('treasure', 'assets/treasure.png');

    }
    create(){
        this.background = this.add.image(0, 0, "background");
        this.add.text(20, 20, "Loading game...");
        this.scene.start("maze");
    }
}
