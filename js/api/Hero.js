import {Point} from "../Point.js";
import {MapOptions} from "../config/MapOptions.js";
import {FindPath} from "./pathFinder/FindPath.js";
import {EnumConstants} from "./EnumConstants.js";
import {GameMap} from "../GameMap.js";
import {config2} from "../config/config.js";

export var x = 32;
export var y = 480;

export class Hero {

    constructor(gameMap, hero, path){
        this.field = gameMap;
        this.hero = hero;
        this.path = path;
        this.i = 0;
    }

    getX(){
      return this.hero.x;
    }

    getY(){
      return this.hero.y;
    }

    moveHeroX(x) {
      if (this.hero.x == x) {
          return;
      } else if (this.hero.x > x) {
          this.hero.flipX = true;
          this.hero.x -= 4;
      } else if (this.hero.x < x) {
          this.hero.flipX = false;
          this.hero.x += 4;
      }
    }

    moveHeroY(y) {
      if (this.hero.y == y) {
          return;
      } else if (this.hero.y < y) {
          this.hero.y += 4;
      } else if (this.hero.y > y) {
          this.hero.y -= 4;
      }
    }

    getNewRoute(x, y) {
        var startX = this.hero.y;
        var startY = this.hero.x;
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
        var arr = [];
        var counter = 0;
        for (var i = l; i >= 0; i--) {
          arr[counter] = moves[i];
          arr[counter].setX(arr[counter].getX());
          counter++;
        }
        x = 32 + config2.GRID_CELL_SIZE * arr[this.i].y;
        y = 480 - config2.GRID_CELL_SIZE * (7-arr[this.i].x);
        console.log(arr);
        return arr;
    }
}
