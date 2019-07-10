import {Trap} from "../../js/api/Trap.js";

describe('Trap', () => {
    let trap;

    beforeEach(() => {
        trap = new Trap(2, 3, "small");
    });

    it("trap -> get()", () => {
        expect(trap.get()).toBe("small");
    });

});
