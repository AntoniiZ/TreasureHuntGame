export class Field {

    constructor(value){
        this.value = value;
        this.parent = null;
    }

    getPrev(){
        return this.parent;
    }

    getField(){
        return this.value;
    }

    setPrev(prev){
        this.parent = prev;
    }

    setField(value){
        this.value = value;
    }
}