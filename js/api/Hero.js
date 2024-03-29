import {Point} from "../api/Point.js";
import {AStar} from "./pathFinder/AStar.js";
import {config2} from "../config/config.js";

var x = 32;
var y = 480;

export class Hero {

    constructor(gameMap, hero, path) {
        this.field = gameMap;
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


    getNewRoute(arr) {
        var x = Math.round(7 - (480 - this.hero.y) / config2.GRID_CELL_SIZE);
        var y = Math.round((this.hero.x - 32) / config2.GRID_CELL_SIZE);
        var a = this.path.findPath(x, y, 0, 15).reverse();

        if(typeof arr === "undefined" || arr === null){
            return a;
        }
        if(arr.length > 0){
          if(a.length === 0){
              for(var i = 0; i < arr.length; i++ ){
                if(this.field[arr[i].x][arr[i].y] == -1){
                  arr.splice(-(arr.length-i));
                  console.log(arr);
                }
              }
              return arr;
          }
          a.splice(0, 1);
          if(a[0].x != arr[0].parent.x && a[0].y != arr[0].parent.y){
            a.unshift(arr[0].parent.parent);
          }
        }
        return a;
    }


}
