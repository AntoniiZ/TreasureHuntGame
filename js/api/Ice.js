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


    melt(){
      var t = this;
      console.log(this.state);
      var ms = Math.floor(Math.random() * (+11000 - +1000)) + +1000;
      console.log(ms); 
      setTimeout(function(){
        if(t.state > 0){
          t.ice.destroy(true);
          t.ice = t.maze.add.sprite(t.ice.x, t.ice.y, 'ice'+t.state).setScale(0.5);
          t.updateState();
        }
      }, ms);

    }
}
