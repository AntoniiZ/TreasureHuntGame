import {Step} from "../../js/api/pathFinder/Step.js";

describe('Step', () => {
    let step;

    beforeEach(() => {
        step = new Step(1, 2, 5, 6, 2, false);
    });

    it("Step -> distance()", () => {
        expect(step.distance(0, 0, 9, 5)).toBe(9+5);
    });

});
