import {Point} from "../Point.js";

export class AStarMap {

    constructor(map) {
        this.map = map;
    }

    outOfBounds(x, y) {
        return x < 0 || x >= this.map.length ||
            y < 0 || y >= this.map[0].length;
    }

    blocked(x, y) {
        if (this.outOfBounds(x, y)) {
            return true;
        }

        return this.map[x][y] < 0;
    }

    getNeighbors(x, y) {
        let neighbors = [];

        // Check left, right, top, bottom
        if (!this.blocked(x + 1, y)) neighbors.push(new Point(x + 1, y));
        if (!this.blocked(x - 1, y)) neighbors.push(new Point(x - 1, y));
        if (!this.blocked(x, y + 1)) neighbors.push(new Point(x, y + 1));
        if (!this.blocked(x, y - 1)) neighbors.push(new Point(x, y - 1));

        return neighbors;
    }

    getField(x, y) {
        return this.map[x][y];
    }
}
