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


        let array = [];
        for (let i = 0; i < config2.MAP_SIZE_X; ++i) {
            array[i] = [];
            for (let j = 0; j < config2.MAP_SIZE_Y; ++j) {
                array[i][j] = 0;
            }
        }
        for(let i = 0; i < 10; i ++){
            for(let j = 5; j < 10; j ++){
                array[i][j] = -1;
            }
        }

        for(let i = 1; i < 10; i++){
            array[12][i] = - 1;
        }


        let start = new Point(7, 14);
        let end  = new Point(0, 1);
        console.log(this.findRoute(array, start, end));

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

      //this.f = false;

    }

    moveHeroX(hero, x){
      if(hero.x == x){
        return;
      }else if(hero.x < x){
        hero.flipX = false;
        hero.x+=2;
      }else if(hero.x > x){
        hero.flipX = true;
        hero.x-=2;
      }
    }

    moveHeroY(hero, y){
      if(this.hero.y == y){
        return;
      } else if(hero.y > y){
        this.hero.y -= 2;
      }else if(hero.y < y){
        hero.y += 2;
      }
    }

    update(){

      if(this.hero.x == x && this.hero.y == y){
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



    findRoute(array, start, end){

        let tries = 0;
        let numbers = new GameMap(config2.MAP_SIZE_X, config2.MAP_SIZE_Y, array);

        numbers.setField(start.getX(), start.getY(), 1);

        while (numbers.getFieldValue(end.getX(), end.getY()) === 0) {
            for (let i = 0; i < config2.MAP_SIZE_X; i++) {
                for (let j = 0; j < config2.MAP_SIZE_Y; j++) {
                    if(numbers.getFieldValue(i, j) > 0){
                        let valueOfCurrent = numbers.getFieldValue(i, j);
                        let currentPoint = new Point(i, j);

                        if(i > 0 && numbers.getFieldValue(i - 1, j) === 0){
                            numbers.setField(i - 1, j, valueOfCurrent + 1);
                            numbers.setPrev(i - 1, j, currentPoint);
                        }
                        else if(i + 1 < config2.MAP_SIZE_X && numbers.getFieldValue(i + 1, j) === 0){
                            numbers.setField(i + 1, j, valueOfCurrent + 1);
                            numbers.setPrev(i + 1, j, currentPoint);
                        }
                        else if(j > 0 && numbers.getFieldValue(i, j - 1) === 0){
                            numbers.setField(i, j - 1, valueOfCurrent + 1);
                            numbers.setPrev(i, j - 1, currentPoint);
                        }
                        else if(j + 1 < config2.MAP_SIZE_Y && numbers.getFieldValue(i, j + 1) === 0){
                            numbers.setField(i, j + 1, valueOfCurrent + 1);
                            numbers.setPrev(i, j + 1, currentPoint);
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
