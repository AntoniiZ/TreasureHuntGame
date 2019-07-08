import {Point} from "../Point.js";

export class Step extends Point {

    constructor(startX, startY, endX, endY, totalSteps, parentStep) {
        super(startX, startY);

        this.g = totalSteps;
        this.h = this.distance(startX, startY, endX, endY);
        this.f = totalSteps + this.h;
        this.parent = parentStep;
    }

    distance(startX, startY, endX, endY) {
        let distanceX = Math.abs(endX - startX),
            distanceY = Math.abs(endY - startY);
        return distanceX + distanceY;
    }
}
