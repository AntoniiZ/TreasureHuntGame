import {BFSMap} from "./BFSMap.js";
import {Point} from "../Point.js";
import {Step} from "./Step.js";

const config = {
    GRID_CELL_SIZE: 30,
    GRID_CELL_MARGIN: 1,
    MAP_SIZE_X: 8,
    MAP_SIZE_Y: 16,
    INITIAL_VALUE: 0
};

export class BFS {

    constructor(map){
        this.map = map;
    }

    findPath(startX, startY, endX, endY) {

        let tries = 0;
        let numbers = new BFSMap(this.map);

        numbers.setField(startX, startY, 1);

        while (numbers.getFieldValue(endX, endY) === 0) {
            for (let i = 0; i < config.MAP_SIZE_X; i++) {
                for (let j = 0; j < config.MAP_SIZE_Y; j++) {
                    if (numbers.getFieldValue(i, j) > 0) {
                        let valueOfCurrent = numbers.getFieldValue(i, j);
                        let currentPoint = new Point(i, j);

                        if (i > 0 && numbers.getFieldValue(i - 1, j) === 0) {
                            numbers.setField(i - 1, j, valueOfCurrent + 1);
                            numbers.setPrev(i - 1, j, currentPoint);
                        } else if (i + 1 < config.MAP_SIZE_X && numbers.getFieldValue(i + 1, j) === 0) {
                            numbers.setField(i + 1, j, valueOfCurrent + 1);
                            numbers.setPrev(i + 1, j, currentPoint);
                        } else if (j > 0 && numbers.getFieldValue(i, j - 1) === 0) {
                            numbers.setField(i, j - 1, valueOfCurrent + 1);
                            numbers.setPrev(i, j - 1, currentPoint);
                        } else if (j + 1 < config.MAP_SIZE_Y && numbers.getFieldValue(i, j + 1) === 0) {
                            numbers.setField(i, j + 1, valueOfCurrent + 1);
                            numbers.setPrev(i, j + 1, currentPoint);
                        }
                    }
                }
            }
            tries++;
            if (tries > config.MAP_SIZE_X * config.MAP_SIZE_Y) {
                throw "No route found!";
            }
        }

        console.log(JSON.stringify(numbers.getAllPrevious()));
        console.log(JSON.stringify(numbers.getValues()));
        console.log(numbers);
        console.log(numbers.getFieldValue(0, 0));
        console.log("tries: " + tries);

        return this.getRoute(numbers.getAllPrevious(), new Point(startX, startY), new Point(endX, endY));
    }

    getRoute(prevArr, start, end) {

        let path = [];

        let current = end,
            prev = prevArr[current.getX()][current.getY()];

        while (true) {

            //path.push(current);
            path.push(new Step(current.getX(), current.getY(), 0, 0,0, prev));

            if (current.getX() === start.getX() && current.getY() === start.getY()) {
                break;
            }

            current = prev;
            prev = prevArr[current.getX()][current.getY()];

        }
        return path;
    }

}