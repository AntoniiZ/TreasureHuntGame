import {Point} from "./Point.js";

export class Ice extends Point {
    constructor(x, y, name, maze){
        super(x, y, name);
        this.ice = name;
        this.state = 6;
        this.maze = maze;
    }

    getState(){
        return this.state;
    }

    updateState(){
        this.state --;
    }


    melt(){
      var t = this;
      var ms = Math.floor(Math.random() * (+11000 - +1000)) + 1000;
      setTimeout(function(){
        if(t.state >= 1){
          t.ice.setTexture('ice'+t.state);
          t.updateState();
        }
      }, ms);

    }
}
