import {Trap} from "./Trap.js";

export class Ice extends Trap {
    constructor(x, y, name){
        super(x, y, name);

        this.state = 6;
    }

    getState(){
        return this.state;
    }

    updateState(){
        this.state --;
    }
}
