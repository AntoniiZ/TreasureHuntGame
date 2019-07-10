import {AStar} from "../../js/api/pathFinder/AStar.js";
import {Step} from "../../js/api/pathFinder/Step.js";

describe('AStar', () => {
    let aStar,
        maze,
        step;

    beforeEach(() => {
        maze = [3, 4, 5];
        aStar = new AStar(maze);
        step = new Step(2, 3, 6, 7, 2, false);
    });

    it("AStar -> addOpen() -> inOpen()", () => {
        aStar.addOpen(step);
        expect(aStar.inOpen(step)).toBe(step);
    });

    it("AStar -> addClosed() -> inClosed()", () => {
        aStar.addClosed(step);
        expect(aStar.inClosed(step)).toBe(step);
    });

    it("AStar -> addOpen() -> removeOpen()", () => {
        aStar.addOpen(step);
        aStar.removeOpen(step);
        expect(aStar.open).toEqual([]);
    });

});
