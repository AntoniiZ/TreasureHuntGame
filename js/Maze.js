class Maze extends Phaser.Scene{
    constructor(){
        super("maze");
    }

    place(x, y, name) {
      var positionX = (32*x) + 32*(x-1);
      var positionY = (32*y) + 32*(y-1);
      this.add.sprite(positionX, positionY, name).setScale(0.5);
    }

    setTrap(group, x, y){
      var positionX = (x*32) + 32*(x-1);
      var positionY = (y*32) + 32*(y-1);
      var trap = this.add.sprite(positionX, positionY, 'rock').setScale(0.5);
      group.add(trap);
    }

    create(){
      this.background = this.add.tileSprite(0, 0, config.width*4, config.height*4, "grass").setScale(0.5);

      this.add.sprite(32, config.height-32, 'start').setScale(0.5);
      this.add.sprite(32, config.height-32, 'hero').setScale(0.5);

      this.traps = this.physics.add.group();

      this.setTrap(this.traps, 2, 3);
      this.setTrap(this.traps, 3, 2);
      this.setTrap(this.traps, 3, 5);
      this.setTrap(this.traps, 3, 7);
      this.setTrap(this.traps, 5, 6);
      this.setTrap(this.traps, 7, 3);
      this.setTrap(this.traps, 7, 7);
      this.setTrap(this.traps, 8, 1);
      this.setTrap(this.traps, 10, 6);
      this.setTrap(this.traps, 10, 8);
      this.setTrap(this.traps, 11, 3);
      this.setTrap(this.traps, 13, 3);
      this.setTrap(this.traps, 14, 6);
      this.setTrap(this.traps, 15, 7);

      this.place(3, 1, 'stone');
      this.place(4, 1, 'stone');
      this.place(6, 2, 'stone');
      this.place(7, 2, 'stone');
      this.place(8, 2, 'stone');
      this.place(1, 3, 'stone');
      this.place(3, 3, 'stone');
      this.place(3, 4, 'stone');
      this.place(5, 4, 'stone');
      this.place(7, 4, 'stone');
      this.place(5, 5, 'stone');
      this.place(7, 5, 'stone');
      this.place(8, 5, 'stone');
      this.place(2, 6, 'stone');
      this.place(3, 6, 'stone');
      this.place(7, 6, 'stone');
      this.place(5, 7, 'stone');
      this.place(3, 8, 'stone');
      this.place(5, 8, 'stone');
      this.place(7, 8, 'stone');

      this.place(10, 1, 'stone');
      this.place(15, 1, 'stone');
      this.place(12, 2, 'stone');
      this.place(10, 3, 'stone');
      this.place(12, 3, 'stone');
      this.place(14, 3, 'stone');
      this.place(10, 4, 'stone');
      this.place(14, 4, 'stone');
      this.place(15, 4, 'stone');
      this.place(13, 5, 'stone');
      this.place(14, 5, 'stone');
      this.place(16, 6, 'stone');
      this.place(9, 7, 'stone');
      this.place(10,7, 'stone' );
      this.place(12, 7, 'stone');
      this.place(14, 7, 'stone');
      this.place(16, 7, 'stone');
      this.place(16, 8, 'stone');

      this.place(16, 1, 'treasure');

    }
}
