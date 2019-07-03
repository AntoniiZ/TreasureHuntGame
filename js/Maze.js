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
      this.hero = this.add.sprite(32, config.height-32, 'hero').setScale(0.5);

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

      this.place(this.blocks, 16, 1, 'treasure');

      var field = [
        [ 0, 0,-1,-1, 0, 0, 0, 0, 0,-1, 0, 0, 0, 0,-1, 0],
        [ 0, 0, 0, 0, 0,-1,-1,-1, 0, 0, 0,-1, 0, 0, 0, 0],
        [-1, 0,-1, 0, 0, 0, 0, 0, 0,-1, 0,-1, 0,-1, 0, 0],
        [ 0, 0,-1, 0,-1, 0,-1, 0, 0,-1, 0, 0, 0,-1,-1, 0],
        [ 0, 0, 0, 0,-1, 0,-1,-1, 0, 0, 0, 0,-1,-1, 0, 0],
        [ 0,-1,-1, 0, 0, 0,-1, 0, 0, 0, 0, 0, 0, 0, 0,-1],
        [ 0, 0, 0, 0,-1, 0, 0, 0,-1,-1, 0,-1, 0,-1, 0,-1],
        [ 0, 0,-1, 0,-1, 0,-1, 0, 0, 0, 0, 0, 0, 0, 0,-1]
      ];

      for(let i = 0 ; i < 8; i ++){
        for(let j = 0; j < 16; j++){
             if(field[i][j] === -1){
                 this.place(this.blocks, j+1, i+1, 'stone');
             }
         }
      }

      //hardcoded array for the moves of the hero
      this.arr = [];

      this.arr[0] = {x: 1, y:0};
      this.arr[1] = {x: 1, y:1};
      this.arr[2] = {x: 2, y:1};
      this.arr[3] = {x: 3, y:1};
      this.arr[4] = {x: 3, y:0};
      this.arr[5] = {x: 3, y:1};
      this.arr[6] = {x: 2, y:1};
      this.arr[7] = {x: 1, y:0};
      this.arr[8] = {x: 0, y:0};
      //counter for the array (this.arr[])
      this.i = 0;

    }

    moveHeroX(hero, x){
      if(hero.x == x){
        return;
      }else if(hero.x < x){
        hero.x+=2;
      }else if(hero.x > x){
        hero.x-=2;
      }
    }

    moveHeroY(hero, y){
      if(hero.y == y){
        return;
      }else if(hero.y > y){
        hero.y -= 2;
      }else if(hero.y < y){
        hero.y += 2;
      }
    }

    update(){

      if(this.hero.x == x && this.hero.y == y){
        console.log("yes");
        if(this.i < this.arr.length){
          x = 32 + 64*this.arr[this.i].x;
          console.log(x);
          y = 480 - 64*this.arr[this.i].y;
          this.i++;
          console.log(y);
        }
      }

      if(this.hero.x == x){
        this.moveHeroY(this.hero, y);
      }else{
        this.moveHeroX(this.hero, x);
      }

    }
}
