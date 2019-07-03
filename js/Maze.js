class Maze extends Phaser.Scene{
    constructor(){
        super("maze");
    }

    place(group, x, y, name) {
      var positionX = (32*x) + 32*(x-1);
      var positionY = (32*y) + 32*(y-1);
      var block = this.add.sprite(positionX, positionY, name).setScale(0.5);
      group.add(block);
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
      this.blocks = this.physics.add.group();

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

      this.place(this.blocks, 3, 1, 'stone');
      this.place(this.blocks, 4, 1, 'stone');
      this.place(this.blocks, 6, 2, 'stone');
      this.place(this.blocks, 7, 2, 'stone');
      this.place(this.blocks, 8, 2, 'stone');
      this.place(this.blocks, 1, 3, 'stone');
      this.place(this.blocks, 3, 3, 'stone');
      this.place(this.blocks, 3, 4, 'stone');
      this.place(this.blocks, 5, 4, 'stone');
      this.place(this.blocks, 7, 4, 'stone');
      this.place(this.blocks, 5, 5, 'stone');
      this.place(this.blocks, 7, 5, 'stone');
      this.place(this.blocks, 8, 5, 'stone');
      this.place(this.blocks, 2, 6, 'stone');
      this.place(this.blocks, 3, 6, 'stone');
      this.place(this.blocks, 7, 6, 'stone');
      this.place(this.blocks, 5, 7, 'stone');
      this.place(this.blocks, 3, 8, 'stone');
      this.place(this.blocks, 5, 8, 'stone');
      this.place(this.blocks, 7, 8, 'stone');

      this.place(this.blocks, 10, 1, 'stone');
      this.place(this.blocks, 15, 1, 'stone');
      this.place(this.blocks, 12, 2, 'stone');
      this.place(this.blocks, 10, 3, 'stone');
      this.place(this.blocks, 12, 3, 'stone');
      this.place(this.blocks, 14, 3, 'stone');
      this.place(this.blocks, 10, 4, 'stone');
      this.place(this.blocks, 14, 4, 'stone');
      this.place(this.blocks, 15, 4, 'stone');
      this.place(this.blocks, 13, 5, 'stone');
      this.place(this.blocks, 14, 5, 'stone');
      this.place(this.blocks, 16, 6, 'stone');
      this.place(this.blocks, 9, 7, 'stone');
      this.place(this.blocks, 10,7, 'stone' );
      this.place(this.blocks, 12, 7, 'stone');
      this.place(this.blocks, 14, 7, 'stone');
      this.place(this.blocks, 16, 7, 'stone');
      this.place(this.blocks, 16, 8, 'stone');

      this.place(this.blocks, 16, 1, 'treasure');


      var field = [
        [0,0,-1,0,-1,0,-1,0,0,0,0,0,0,0,0,-1],
        [0,0,0,0,-1,0,0,0,-1,-1,0,-1,0,-1,0,-1],
        [0,-1,-1,0,0,0,-1,0,0,0,0,0,0,0,0,-1],
        [0,0,0,0,-1,0,-1,-1,0,0,0,0,-1,-1,0,0],
        [0,0,-1,0,-1,0,-1,0,0,-1,0,0,0,-1,-1,0],
        [-1,0,-1,0,0,0,0,0,0,-1,0,-1,0,-1,0,0],
        [0,0,0,0,0,-1,-1,-1,0,0,0,-1,0,0,0,0],
        [0,0,-1,-1,0,0,0,0,0,-1,0,0,0,0,-1,0]        
      ];

    }
}
