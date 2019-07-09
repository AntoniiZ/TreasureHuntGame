import {Trap} from "./Trap.js";

export class Ice extends Trap {
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


    melt(scene){
      var t = this;
      console.log(this.state);
      var ms = Math.floor(Math.random() * (+11000 - +1000)) + 1000;
      setTimeout(function(){
        if(t.state > 0){
          if(scene != undefined){
            t.ice.setTexture('ice'+t.state);
            t.updateState();
          }
        }
      }, ms);

    }
}
