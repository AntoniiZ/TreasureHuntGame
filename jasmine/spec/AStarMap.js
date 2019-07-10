import {AStarMap} from "../../js/api/pathFinder/AStarMap.js";
import {Point} from "../../js/api/Point.js";

describe('AStarMap', () => {

    let aStarMap,
        map;

    beforeEach(() => {
        map = [
            [0, -1, 0, 0],
            [0, -1, -1, 0],
            [0, 0, 0, 0],
        ];
        aStarMap = new AStarMap(map);
    });

    it("AStarMap -> outOfBonds()", () => {
        expect(aStarMap.outOfBounds(-2, 2)).toBeTruthy();
        expect(aStarMap.outOfBounds(0, 2)).toBeFalsy();
        expect(aStarMap.outOfBounds(4, 3)).toBeTruthy();
    });

    it("AStarMap -> blocked()", () => {
        expect(aStarMap.blocked(1, 1)).toBeTruthy();
        expect(aStarMap.blocked(1, 9)).toBeTruthy();
        expect(aStarMap.blocked(0, 0)).toBeFalsy();
    });

    it("AStarMap -> getNeighbors()", () => {
        expect(aStarMap.getNeighbors(0, 0)).toEqual([new Point(1, 0)]);
    });

    it("AStarMap -> getField()", () => {
        expect(aStarMap.getField(0, 0)).toBe(0);
        expect(aStarMap.getField(1, 1)).toBe(-1);
    });


});
