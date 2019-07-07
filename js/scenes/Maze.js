import {GameMap} from "../GameMap.js";
import {Trap} from "../Trap.js";
import {Point} from "../Point.js";
import {FindPath} from "../api/pathFinder/FindPath.js";
import {Hero} from "../api/Hero.js";
import {config2} from "../config/config.js";
import {config} from "../config/game.js";

export var x = 32;
export var y = 480;
export var score = 0;
var results = 0;

export class Maze extends Phaser.Scene {

    constructor() {
        super("maze");

    }

    place(x, y, name) {
        var positionX = (32 * x) + 32 * (x - 1);
        var positionY = (32 * y) + 32 * (y - 1);
        var block = this.add.sprite(positionX, positionY, name).setScale(0.5);
    }

    setTrap(x, y) {
        var positionX = (x * 32) + 32 * (x - 1);
        var positionY = (y * 32) + 32 * (y - 1);
        var rock = this.add.sprite(positionX, positionY, 'rock').setScale(0.5);
        var trap = new Trap(positionX, positionY, rock)
        trap.get().setInteractive();
    }

    unactivateTrap(pointer, gameObject) {
        var positionX = (gameObject.x - 32) / config2.GRID_CELL_SIZE;
        var positionY = 7 - (480 - gameObject.y) / config2.GRID_CELL_SIZE;

        console.log(positionX + "; " + positionY);
        this.field[positionY][positionX] = 0;
        gameObject.destroy(true);
        let t = this;
        setTimeout(function(){ t.setTrap(positionX+1, positionY+1); }, 2000);
    }

    activateTrap(pointer, gameObject) {
        if(this.activeTrap != gameObject){
          var positionX = (gameObject.x - 32) / 64;
          var positionY = 7 - (480 - gameObject.y) / 64;

          console.log(positionX + "; " + positionY);
          this.field[positionY][positionX] = -1;

          if (this.activeTrap != null) {
              this.unactivateTrap(pointer, this.activeTrap);
          }

          gameObject.setTexture("rock2");
          this.activeTrap = gameObject;
          this.getNewRoute(this.hero.getY(), this.hero.getX());
        }
    }

    create() {
        score = 0;
        this.background = this.add.tileSprite(0, 0, config.width * 4, config.height * 4, "grass").setScale(0.5);
        this.place(16, 1, 'treasure');
        this.place(1, 8, 'start');
        this.activeTrap = null;
        this.arr = null;

        this.input.on('gameobjectdown', this.activateTrap, this);

        this.field = [
            [0, 0, -1, -1, 0, 0, 0, -2, 0, -1, 0, -2, 0, 0, -1, 0],
            [0, 0, -2, 0, 0, -1, -1, -1, 0, 0, 0, -1, 0, 0, 0, 0],
            [-1, -2, -1, 0, 0, 0, -2, 0, 0, -1, -2, -1, -2, -1, 0, 0],
            [0, 0, -1, 0, -1, 0, -1, 0, 0, -1, 0, 0, 0, -1, -1, 0],
            [0, 0, -2, 0, -1, 0, -1, -1, 0, 0, 0, 0, -1, -1, 0, 0],
            [0, -1, -1, 0, -2, 0, -1, 0, 0, -2, 0, 0, 0, -2, 0, -1],
            [0, 0, -2, 0, -1, 0, -2, 0, -1, -1, 0, -1, 0, -1, -2, -1],
            [0, 0, -1, 0, -1, 0, -1, 0, 0, -2, 0, 0, 0, 0, 0, -1]
        ];
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 16; j++) {
                if (this.field[i][j] === -1) {
                    this.place(j + 1, i + 1, 'stone');
                } else if(this.field[i][j] === -2){
                  this.field[i][j] = 0;
                  console.log(i + "; " +j);
                  this.setTrap(j+1, i+1);
                } else {
                    this.place(j + 1, i + 1, 'tiny_grass');
                }
            }
        }
        var hero = this.physics.add.sprite(32, config.height - 32, 'hero').setScale(0.5);
        this.hero = new Hero(this.field, hero);
        this.path = new FindPath(this.field);
        this.getNewRoute(this.hero.getY(), this.hero.getX());
        this.i = 1;
    }

    getNewRoute(startX, startY) {
        this.arr = null;
        console.log(this.field);
        startX = 7 - (480 - startX) / config2.GRID_CELL_SIZE;
        startY = (startY - 32) / config2.GRID_CELL_SIZE;
        startX = Math.round(startX);
        startY = Math.round(startY);
        console.log(startX);
        console.log(startY);
        var moves = this.path.findPath(startX, startY, 0, 15);
        var l = moves.length;
        l--;
        this.arr = [];
        var counter = 0;
        for (var i = l; i >= 0; i--) {
          this.arr[counter] = moves[i];
          this.arr[counter].setX(this.arr[counter].getX());
          counter++;
        }
        this.i = 0;
        x = 32 + config2.GRID_CELL_SIZE * this.arr[this.i].y;
        y = 480 - config2.GRID_CELL_SIZE * (7-this.arr[this.i].x);
        console.log(this.arr);
    }

    update() {
        if (this.hero.getX() == x && this.hero.getY() == y) {
            if (this.i < this.arr.length) {
                x = 32 + config2.GRID_CELL_SIZE * this.arr[this.i].y;
                y = 480 - config2.GRID_CELL_SIZE * (7-this.arr[this.i].x);
                //console.log(x + "; " + y);
                this.i++;
            }
        }
        if (this.hero.getX() == x) {
            this.hero.moveHeroY(y);
        } else {
            this.hero.moveHeroX(x);
        }

        if (this.hero.getX() == 992 && this.hero.getY() == 32) {
            sessionStorage.setItem(results, score);
            results++;
            x = 32;
            y = 480;
            this.scene.start("end");
        } else {
            score++;
        }
    }
}
