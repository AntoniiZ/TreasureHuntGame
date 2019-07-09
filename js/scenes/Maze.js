import {Trap} from "../api/Trap.js";
import {Point} from "../api/Point.js";
import {Ice} from "../api/Ice.js";
import {AStar} from "../api/pathFinder/AStar.js";
import {Hero} from "../api/Hero.js";
import {config2} from "../config/config.js";
import {config} from "../config/game.js";

var x = 32;
var y = 480;
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
        return block;
    }

    setTrap(x, y) {
        var positionX = (x * 32) + 32 * (x - 1);
        var positionY = (y * 32) + 32 * (y - 1);
        var rock = this.add.sprite(positionX, positionY, 'rock').setScale(0.5);
        var trap = new Trap(positionX, positionY, rock);
        trap.get().setInteractive();
    }

    unactivateTrap(gameObject) {
        var positionX = (gameObject.x - 32) / config2.GRID_CELL_SIZE;
        var positionY = 7 - (480 - gameObject.y) / config2.GRID_CELL_SIZE;

        console.log(positionX + "; " + positionY);
        this.field[positionY][positionX] = 0;
        let t = this;
        gameObject.visible = false;
        setTimeout(function(){
          if(gameObject != undefined){
            gameObject.setTexture("rock");
            gameObject.visible = true;
            gameObject.input.enable = true;
          }
        }, 2000);
    }

    activateTrap(pointer, gameObject) {
      if(this.activeTrap != gameObject){
        var positionX = (gameObject.x - 32) / 64;
        var positionY = 7 - (480 - gameObject.y) / 64;

        console.log(positionX + "; " + positionY);
        this.field[positionY][positionX] = -1;

        if (this.activeTrap != null) {
            this.unactivateTrap(this.activeTrap);
        }
        gameObject.setTexture("rock2");
        this.activeTrap = gameObject;
        this.arr = this.hero.getNewRoute();
        this.i = 0;
      }
    }

    create() {
        score = 0;
        this.background = this.add.tileSprite(0, 0, config.width * 4, config.height * 4, "grass").setScale(0.5);
        this.activeTrap = null;
        this.arr = null;

        this.input.on('gameobjectdown', this.activateTrap, this);

        this.field = [
          [0, -1, 0, -1, 0, -1, 0, -1, 0, -1, 0, -1, 0, -1, 0, 0],
          [0, -2, 0, 0, 0, -2, 0, -3, 0, -2, 0, -3, 0, -2, 0, 0],
          [-2, -1, -2, -1, 0, -1, 0, -1, -2, -1, -2, -1, -2, -1, -2, -1],
          [0, 0, 0, -3, 0, -3, 0, -2, 0, -3, 0, -2, 0, -3, 0, 0],
          [-2, -1, 0, -1, 0, -1, 0, -1, -2, -1, -2, -1, -2, -1, -2, -1],
          [0, -2, 0, -2, 0, -3, 0, -3, 0, -2, 0, -3, 0, -2, 0, 0],
          [0, -1, -2, -1, 0, -1, 0, -1, -2, -1, -2, -1, -2, -1, -3, -1],
          [0, 0, 0, -1, 0, 0, 0, -2, 0, -3, 0, -2, 0, -2, 0, 0]
        ];

        this.iceBlocks = new Array();

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 16; j++) {
                if (this.field[i][j] === -1) {
                    this.place(j + 1, i + 1, 'stone');
                } else if(this.field[i][j] === -2){
                  this.field[i][j] = 0;
                  this.setTrap(j+1, i+1);
                } else if(this.field[i][j] === -3) {
                  this.field[i][j] = -1;
                  var ice = this.place(j + 1, i + 1, 'ice_block');
                  var iceBlock = new Ice(j + 1, i + 1, ice, this);
                  this.iceBlocks.push(iceBlock);
                } else {

                  this.place(j + 1, i + 1, 'tiny_grass');
                }
            }
        }

        this.place(16, 1, 'treasure');
        this.place(1, 8, 'start');
        this.path = new AStar(this.field);
        var hero = this.physics.add.sprite(32, config.height - 32, 'hero').setScale(0.5);
        this.hero = new Hero(this.field, hero, this.path);
        this.i = 1;
        this.arr = this.hero.getNewRoute();
        this.meltingTimer = 0;
    }

    update() {
        if (this.hero.getX() == x && this.hero.getY() == y) {
            if (this.i < this.arr.length) {
                x = 32 + config2.GRID_CELL_SIZE * this.arr[this.i].y;
                y = 480 - config2.GRID_CELL_SIZE * (7-this.arr[this.i].x);
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

        this.meltingTimer++;

        if(this.meltingTimer > 100){
          this.iceBlocks.forEach(ice => {ice.melt(this)});
          this.meltingTimer = 0;
          this.iceBlocks.forEach(ice => {
            if(ice.getState() == 0){
              console.log(ice.getState());
              this.field[ice.getY()-1][ice.getX()-1] = 0;
            }
          });
        }
    }
}
