import {Point} from "../api/Point.js";
import {MapOptions} from "../config/MapOptions.js";
import {AStar} from "./pathFinder/AStar.js";
//import {GameMap} from "../GameMap.js";
import {config2} from "../config/config.js";

var x = 32;
var y = 480;

export class Hero {

    constructor(gameMap, hero, path) {
        this.hero = hero;
        this.path = path;
        this.i = 0;
        this.arr = [];
    }

    getX() {
        return this.hero.x;
    }

    getY() {
        return this.hero.y;
    }

    moveHeroX(x) {
        if (this.hero.x > x) {
            this.hero.flipX = true;
            this.hero.x -= 4;
        } else if (this.hero.x < x) {
            this.hero.flipX = false;
            this.hero.x += 4;
        }
    }

    moveHeroY(y) {
        if (this.hero.y < y) {
            this.hero.y += 4;
        } else if (this.hero.y > y) {
            this.hero.y -= 4;
        }
    }


    getNewRoute() {
        var x = Math.round(7 - (480 - this.hero.y) / config2.GRID_CELL_SIZE);
        var y = Math.round((this.hero.x - 32) / config2.GRID_CELL_SIZE);
        var a = this.path.findPath(x, y, 0, 15).reverse();

        console.log(x + "; " + y);

        /*if(x == a[0].x && y==a[0].y){
          a.splice(0, 1);
        }*/

        console.log(a[0].x +"; "+ a[0].y);

        return a;
    }


}
