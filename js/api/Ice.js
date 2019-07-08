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


    melt(ms){
      var t = this;
      console.log(this.state);

      setTimeout(function(){
        if(t.state > 0){
          t.ice.destroy(true);
          t.ice = t.maze.add.sprite(t.ice.x, t.ice.y, 'ice'+t.state).setScale(0.5);
          t.updateState();
        }
      }, ms);

    }
}
