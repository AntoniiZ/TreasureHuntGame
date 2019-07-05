//import {Point} from "./Point";

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
      var rock = this.add.sprite(positionX, positionY, 'rock').setScale(0.5);
      var trap = new Trap(positionX, positionY, rock)
      trap.get().setInteractive();
    }

    unactivateTrap(pointer, gameObject){
      var positionX = (gameObject.x - 32)/config2.GRID_CELL_SIZE;
      var positionY = 7 - (480 - gameObject.y)/config2.GRID_CELL_SIZE;

      console.log(positionX + "; " + positionY);
      this.field[positionY][positionX] = 0;
      gameObject.setTexture("rock");
    }

    activateTrap(pointer, gameObject){
      var positionX = (gameObject.x - 32)/64;
      var positionY = 7 - (480 - gameObject.y)/64;

      console.log(positionX + "; " + positionY);
      this.field[positionY][positionX] = -1;

      if(this.activeTrap != null){
        this.unactivateTrap(pointer, this.activeTrap);
      }

      gameObject.setTexture("rock2");
      this.activeTrap = gameObject;
      this.end.setX(0);
      this.getNewRoute(this.hero.y, this.hero.x);

      //console.log(this.i);
      this.i = 0;
      x = 32 + config2.GRID_CELL_SIZE*this.arr[this.i].y;
      y = 480 - config2.GRID_CELL_SIZE*this.arr[this.i].x;

      this.f = true;

    }


    create(){
      this.background = this.add.tileSprite(0, 0, config.width*4, config.height*4, "grass").setScale(0.5);
      this.blocks = this.physics.add.group();
      this.place(this.blocks, 16, 1, 'treasure');
      this.treasure = this.physics.add.sprite(32, config.height-32, 'start').setScale(0.5);
      this.hero = this.physics.add.sprite(32, config.height-32, 'hero').setScale(0.5);

      this.traps = this.physics.add.group();

      this.activeTrap = null;

      this.f = false;

      this.arr = null;

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
      this.setTrap(this.traps, 12, 1);


      this.input.on('gameobjectdown', this.activateTrap, this);

      this.field = [
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
             if(this.field[i][j] === -1){
                 this.place(this.blocks, j+1, i+1, 'stone');
             }
         }
      }

      console.log(this.hero.x + "; " +this.hero.y);
      this.end  = new Point(0, 15);
      console.log(this.end);

      this.getNewRoute(this.hero.y, this.hero.x);

      this.i = 1;
    }

    getNewRoute(startX, startY){
      this.arr = null;
      console.log(this.field);
      startX = 7 - (480 - startX)/config2.GRID_CELL_SIZE;
      startY = (startY - 32)/config2.GRID_CELL_SIZE;
      startX = Math.round(startX);
      startY = Math.round(startY);
      console.log(startX);
      console.log(startY);

      let start = new Point(startX, startY);
      var moves = this.findRoute(this.field, start, this.end);

      if(this.arr == null){
        this.arr = [];
        var counter = 0;
        console.log(moves.length);
        var l = moves.length;
        l--;
        for(var i = l; i>=0; i--){
          this.arr[counter] = moves[i];
          this.arr[counter].setX(7-this.arr[counter].getX());
          counter++;
        }
      }
      console.log(this.arr);

    }

    moveHeroX(x){
      if(this.hero.x == x){
        return;
      }else if(this.hero.x < x){
        this.hero.flipX = false;
        this.hero.x+=4;
      }else if(this.hero.x > x){
        this.hero.flipX = true;
        this.hero.x-=4;
      }
    }

    moveHeroY(y){
      if(this.hero.y == y){
        return;
      } else if(this.hero.y > y){
        this.hero.y -= 4;
      }else if(this.hero.y < y){
        this.hero.y += 4;
      }
    }

    update(){

      if(this.hero.x == x && this.hero.y == y){
        if(this.i < this.arr.length){

          x = 32 + config2.GRID_CELL_SIZE*this.arr[this.i].y;
          y = 480 - config2.GRID_CELL_SIZE*this.arr[this.i].x;
          this.i++;
        }
      }

      if(this.hero.x == x){
        this.moveHeroY(y);
      } else {
        this.moveHeroX(x);
      }

      if(this.f == true){
        this.f = false;
        this.i =1;
      }

      if(this.hero.x == 992 && this.hero.y == 32){

        sessionStorage.setItem(results, score);

        results++;
        x = 32;
        y = 480;
        this.scene.start("end");

      }
      else{
        score++;
      }

    }

    findRoute(array, start, end){

        let tries = 0;
        let numbers = new GameMap(config2.MAP_SIZE_Y, config2.MAP_SIZE_X, array);

        numbers.setField(start.getX(), start.getY(), 1);

        while (numbers.getFieldValue(end.getX(), end.getY()) === 0) {
            for (let i = 0; i < config2.MAP_SIZE_Y; i++) {
                for (let j = 0; j < config2.MAP_SIZE_X; j++) {
                    if(numbers.getFieldValue(i, j) > 0){
                        let valueOfCurrent = numbers.getFieldValue(i, j);
                        let currentPoint = new Point(i, j);

                        if(i > 0 && numbers.getFieldValue(i - 1, j) === 0){
                            numbers.setField(i - 1, j, valueOfCurrent + 1);
                            numbers.setPrev(i - 1, j, currentPoint);
                        }
                        if(j + 1 < config2.MAP_SIZE_X && numbers.getFieldValue(i, j + 1) === 0){
                            numbers.setField(i, j + 1, valueOfCurrent + 1);
                            numbers.setPrev(i, j + 1, currentPoint);
                        }
                        if(j > 0 && numbers.getFieldValue(i, j - 1) === 0){
                            numbers.setField(i, j - 1, valueOfCurrent + 1);
                            numbers.setPrev(i, j - 1, currentPoint);
                        }
                        if(i + 1 < config2.MAP_SIZE_Y && numbers.getFieldValue(i + 1, j) === 0){
                            numbers.setField(i + 1, j, valueOfCurrent + 1);
                            numbers.setPrev(i + 1, j, currentPoint);
                        }

                    }
                }
            }
            tries ++;
            if(tries > config2.MAP_SIZE_X * config2.MAP_SIZE_Y){
                throw "No route found!";
            }
        }

        console.log(JSON.stringify(numbers.getAllPrevious()));
        console.log(JSON.stringify(numbers.getValues()));
        console.log("tries: " + tries);

        return this.getRoute(numbers.getAllPrevious(), start, end);
    }


  getRoute(prevArr, start, end) {

    let path = [];

    let current = end,
        prev = prevArr[current.getX()][current.getY()];

    while(true){

      path.push(current);

      if(current.getX() === start.getX() && current.getY() === start.getY()){
        break;
      }

      current = prev;
      prev = prevArr[current.getX()][current.getY()];

    }
    return path;
  }

}
