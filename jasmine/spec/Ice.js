import {Ice} from "../../js/api/Ice.js";

describe('Ice', () => {
    let ice;
    let maze = [3, 4, 5];

    beforeEach(() => {
        ice = new Ice(5, 4, "small", maze);
    });

    it("Ice -> getState()", () => {
        expect(ice.getState()).toBe(6);
    });

    it("Ice -> updateState() -> getState()", () => {
        expect(ice.getState()).toBe(6);
        ice.updateState();
        expect(ice.getState()).toBe(5);
    });
});
