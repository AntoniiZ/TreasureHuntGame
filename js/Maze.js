class Maze extends Phaser.Scene{
    constructor(){
        super("maze");
    }
    preload(){

    }
    create(){
      this.add.text(20, 20, "Maze...");
    }
}
