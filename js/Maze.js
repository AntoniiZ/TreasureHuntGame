class Maze extends Phaser.Scene{
    constructor(){
        super("maze");
    }

    create(){
      this.background = this.add.tileSprite(0, 0, config.width*4, config.height*4, "grass").setScale(0.5);

      this.add.sprite(32, config.height-32, 'start').setScale(0.5);
      this.add.sprite(32, config.height-32, 'hero').setScale(0.5);


      //this.background.setOrigin();
    }
}
