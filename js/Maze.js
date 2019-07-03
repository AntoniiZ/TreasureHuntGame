class Maze extends Phaser.Scene{
    constructor(){
        super("maze");
    }
    place(x, y) {
      var positionX = (32*x) + 32*(x-1);
      var positionY = (32*y) + 32*(y-1);
      this.add.sprite(positionX, positionY, 'stone').setScale(0.5);
    }
    create(){
      this.background = this.add.tileSprite(0, 0, config.width*4, config.height*4, "grass").setScale(0.5);

      this.add.sprite(32, config.height-32, 'start').setScale(0.5);
      this.add.sprite(32, config.height-32, 'hero').setScale(0.5);

      this.place(3, 1);
      this.place(4, 1);
      this.place(6, 2);
      this.place(7, 2);
      this.place(8, 2);
      this.place(1, 3);
      this.place(3, 3);
      this.place(3, 4);
      this.place(5, 4);
      this.place(7, 4);
      this.place(5, 5);
      this.place(7, 5);
      this.place(8, 5);
      this.place(2, 6);
      this.place(3, 6);
      this.place(7, 6);
      this.place(5, 7);
      this.place(3, 8);
      this.place(5, 8);
      this.place(7, 8);

      this.place(10, 1);
      this.place(15, 1);
      this.place(12, 2);
      this.place(10, 3);
      this.place(12, 3);
      this.place(14, 3);
      this.place(10, 4);
      this.place(14, 4);
      this.place(15, 4);
      this.place(13, 5);
      this.place(14, 5);
      this.place(16, 6);
      this.place(9, 7);
      this.place(10,7 );
      this.place(12, 7);
      this.place(14, 7);
      this.place(16, 7);
      this.place(16, 8);






      //this.background.setOrigin();
    }
}
