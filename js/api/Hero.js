import {Point} from "../Point.js";
import {MapOptions} from "../config/MapOptions.js";
//import {Utility} from "./Utility.js";
import {EnumConstants} from "./EnumConstants.js";
import {GameMap} from "../GameMap.js";
import {config2} from "../config/config.js";

export var x = 32;
export var y = 480;

export class Hero {

    constructor(gameMap, hero){
        this.field = gameMap;
        this.hero = hero;
        this.i = 0;
    }

    getX(){
      return this.hero.x;
    }

    getY(){
      return this.hero.y;
    }

    setCoords(point){
        if(!(point instanceof Point)){
            throw "Argument of setCoords must be a point";
        }
        this.coords = point;
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

    

}
