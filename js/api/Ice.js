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
      var ms = Math.floor(Math.random() * (+11000 - +1000)) + 1000;
      setTimeout(function(){
        if(t.state >= 1){
          t.ice.setTexture('ice'+t.state);
          /*t.ice.destroy(true);
          if(t.state > 1){
            t.ice = t.maze.add.sprite(t.ice.x, t.ice.y, 'ice'+t.state).setScale(0.5);
          }*/
          t.updateState();
        }
      }, ms);

    }

    /*end(){
        this.ice.destroy(true);
    }*/
}
