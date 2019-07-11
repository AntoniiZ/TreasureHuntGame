import {Field} from "./BFSField.js";

export class BFSMap {

    constructor(array){
        this.map = BFSMap.mapInit(array.length, array[0].length,array);
    }

    static mapInit(n, m, arr){
        let array = [];
        for (let i = 0; i < n; ++i) {
            array[i] = [];
            for (let j = 0; j < m; ++j) {
                array[i][j] = new Field(arr[i][j]);
            }
        }
        return array;
    }

    getValues(){
        let array = [];
        for (let i = 0; i < this.sizeX; ++i) {
            array[i] = [];
            for (let j = 0; j < this.sizeY; ++j) {
                array[i][j] = this.map[i][j].getField();
            }
        }
        return array;
    }

    getAllPrevious(){
        let array = [];
        for (let i = 0; i < this.map.length; ++i) {
            array[i] = [];
            for (let j = 0; j < this.map[0].length; ++j) {
                array[i][j] = this.map[i][j].getPrev();
            }
        }
        return array;
    }

    setField(x, y, value){
        this.map[x][y] = new Field(value);
    }

    getFieldValue(x, y){
        return this.map[x][y].getField();
    }

    setPrev(x, y, value){
        this.map[x][y].setPrev(value);
    }

}