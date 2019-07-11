import {AStar} from "../../js/api/pathFinder/AStar.js";
import {Step} from "../../js/api/pathFinder/Step.js";

describe('AStar', () => {
    let aStar,
        maze,
        step;

    beforeEach(() => {
        maze = [
            [0, -1, 0, -1, 0, -1, 0, -1, 0, -1, 0, -1, 0, -1, 0, 0],
            [0, -2, 0, 0, 0, -2, 0, 0, 0, -2, 0, 0, 0, -2, 0, 0],
            [0, -1, -2, -1, 0, -1, 0, -1, -2, -1, -2, -1, -2, -1, -2, -1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, -1, 0, -1, 0, -1, 0, -1, -2, -1, -2, -1, -2, -1, -2, -1],
            [0, -2, 0, -2, 0, 0, 0, 0, 0, -2, 0, 0, 0, -2, 0, 0],
            [0, -1, -2, -1, 0, -1, 0, -1, -2, -1, -2, -1, -2, -1, 0, -1],
            [0, 0, 0, -1, 0, 0, 0, -2, 0, 0, 0, -2, 0, -2, 0, 0]
        ];
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

    it("AStar -> getBestOpen()", () => {
        aStar.addOpen(step);
        aStar.addOpen(new Step(2, 3, 6, 7, 3, false));
        expect(aStar.getBestOpen()).toEqual(step);
    });

    it("AStar -> findPath()", () => {
        console.log(aStar);
        expect(aStar.findPath(0, 0, 0, 2).length).toBe(13);
        expect(aStar.findPath(0, 0, 0, 4).length).toBe(11);
        expect(aStar.findPath(0, 0, 0, 100).length).toBe(0);
    });

    it("AStar -> reset()", () => {
        aStar.addOpen(step);
        aStar.addClosed(step);
        aStar.reset();
        expect(aStar.open).toEqual([]);
        expect(aStar.closed).toEqual([]);
    });

    it("AStar -> buildPath()", () => {
        let s1 = new Step(0, 0, 1, 0, 1, false);
        let s2 = new Step(1, 0, 2, 0, 2, s1);
        let s3 = new Step(2, 1, null, null, 3, s2);

        expect(aStar.buildPath(s3, []).length).toBe(3);
    });

});
