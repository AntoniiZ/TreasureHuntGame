import {Point} from "../api/Point.js";
import {MapOptions} from "../config/MapOptions.js";
import {FindPath} from "./pathFinder/FindPath.js";
//import {GameMap} from "../GameMap.js";
import {config2} from "../config/config.js";

export class Hero {

    constructor(gameMap, hero, path){
        this.field = gameMap;
        this.hero = hero;
        this.path = path;
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

    getNewRoute(x, y) {;
        return this.path.findPath(
            Math.round(7 - (480 - this.hero.y) / config2.GRID_CELL_SIZE),
            Math.round((this.hero.x - 32) / config2.GRID_CELL_SIZE),
            0, 15).reverse();
    }
}
