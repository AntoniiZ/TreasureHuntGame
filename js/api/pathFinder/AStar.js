import {Step} from "./Step.js";
import {AStarMap} from "./AStarMap.js";
import {config2} from "../../config/config.js";

export class AStar {

    constructor(map) {
        this.map = new AStarMap(map);

        this.open = [];
        this.closed = [];
    }

    addOpen(step) {
        this.open.push(step);
        return this;
    }

    removeOpen(step) {
        for (let i = 0; i < this.open.length; i++) {
            if (this.open[i] === step) this.open.splice(i, 1);
        }
        return this;
    }

    inOpen(step) {
        for (let i = 0; i < this.open.length; i++) {
            if (this.open[i].x === step.x && this.open[i].y === step.y) {
                return this.open[i];
            }
        }
        return false;
    }

    getBestOpen() {
        let bestId = 0;
        for (let i = 0; i < this.open.length; i++) {
            if (this.open[i].f < this.open[bestId].f) {
                bestId = i;
            }
        }
        return this.open[bestId];
    }

    addClosed(step) {
        this.closed.push(step);
        return this;
    }

    inClosed(step) {
        for (let i = 0; i < this.closed.length; i++) {
            if (this.closed[i].x === step.x && this.closed[i].y === step.y)
                return this.closed[i];
        }

        return false;
    }

    findPath(startX, startY, endX, endY) {
        let current,
            neighbors,
            neighborRecord,
            stepCost;

        this.reset()
            .addOpen(new Step(startX, startY, endX, endY, this.step, false));

        let i = 0;

        while (this.open.length !== 0) {

            i ++;
            if(i > config2.MAP_SIZE_X * config2.MAP_SIZE_Y){
                break;
            }

            current = this.getBestOpen();

            if (current.x === endX && current.y === endY) {
                return this.buildPath(current, []);
            }

            this.removeOpen(current)
                .addClosed(current);

            neighbors = this.map.getNeighbors(current.x, current.y);
            for (let i = 0; i < neighbors.length; i++) {

                stepCost = current.g + this.map.getCost(neighbors[i].x, neighbors[i].y);

                neighborRecord = this.inClosed(neighbors[i]);
                if (neighborRecord && stepCost >= neighborRecord.g) {
                    continue;
                }

                neighborRecord = this.inOpen(neighbors[i]);
                if (!neighborRecord || stepCost < neighborRecord.g) {
                    if (!neighborRecord) {
                        this.addOpen(new Step(neighbors[i].x, neighbors[i].y, endX, endY, stepCost, current));
                    } else {
                        neighborRecord.parent = current;
                        neighborRecord.g = stepCost;
                        neighborRecord.f = stepCost + neighborRecord.h;
                    }
                }
            }
        }

        console.warn("Can't find path!");
        return [];
    }

    buildPath(tile, stack) {
        stack.push(tile);

        if (tile.parent) {
            return this.buildPath(tile.parent, stack);
        }
        return stack;
    }

    reset() {
        this.closed = [];
        this.open = [];
        return this;
    }
}
