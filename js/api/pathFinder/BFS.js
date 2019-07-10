import {BFSMap} from "./BFSMap.js";
import {Point} from "../Point.js";
import {Step} from "./Step.js";

import {config2} from "../../config/config.js";

export class BFS {

    constructor(map){
        this.map = map;
    }

    findPath(startX, startY, endX, endY) {

        let numbers = new BFSMap(this.map);
        numbers.setField(startX, startY, 1);

        while (numbers.getFieldValue(endX, endY) === 0) {
            let exploreMore = false;
            for (let i = 0; i < config2.MAP_SIZE_Y; i++) {
                for (let j = 0; j < config2.MAP_SIZE_X; j++) {
                    if (numbers.getFieldValue(i, j) > 0) {
                        let valueOfCurrent = numbers.getFieldValue(i, j);
                        let currentPoint = new Point(i, j);

                        if (i > 0 && numbers.getFieldValue(i - 1, j) === 0) {
                            numbers.setField(i - 1, j, valueOfCurrent + 1);
                            numbers.setPrev(i - 1, j, currentPoint);
                            exploreMore = true;
                        }
                        if (i + 1 < config2.MAP_SIZE_Y && numbers.getFieldValue(i + 1, j) === 0) {
                            numbers.setField(i + 1, j, valueOfCurrent + 1);
                            numbers.setPrev(i + 1, j, currentPoint);
                            exploreMore = true;
                        }
                        if (j > 0 && numbers.getFieldValue(i, j - 1) === 0) {
                            numbers.setField(i, j - 1, valueOfCurrent + 1);
                            numbers.setPrev(i, j - 1, currentPoint);
                            exploreMore = true;
                        }
                        if (j + 1 < config2.MAP_SIZE_X && numbers.getFieldValue(i, j + 1) === 0) {
                            numbers.setField(i, j + 1, valueOfCurrent + 1);
                            numbers.setPrev(i, j + 1, currentPoint);
                            exploreMore = true;
                        }
                    }
                }
            }
            if (! exploreMore) {
                //throw "No route found!";
                return [];
            }
        }

        //console.log(JSON.stringify(numbers.getAllPrevious()));
        //console.log(JSON.stringify(numbers.getValues()));
        //console.log(numbers);
        //console.log(numbers.getFieldValue(0, 0));
        //console.log("tries: " + tries);

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