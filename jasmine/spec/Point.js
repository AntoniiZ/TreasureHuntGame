import {Point} from '../../js/api/Point.js';

describe('Point', () => {
    let point;

    beforeEach(() => {
        point = new Point(10, 20);
    });

    it("point -> getX()", () => {
        expect(point.getX()).toBe(10);
    });
    it("point -> getY()", () => {
        expect(point.getY()).toBe(20);
    });
    it("point -> getY() > getX()", () => {
        expect(point.getY() > point.getX()).toBeTruthy();
    });
});
