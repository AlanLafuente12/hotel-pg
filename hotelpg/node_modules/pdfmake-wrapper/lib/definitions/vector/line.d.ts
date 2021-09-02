import { Vector } from './vector';
import { ILine } from '../../interfaces';
/**
 * Creates a line vector
 */
export declare class Line extends Vector<Line, ILine> {
    /**
     * if either of the params receive one number (`new Line(10,10)`):
     *  * `point1` is applied to `x1` and `y1`
     *  * `point2` is applied to `x2` and `y2`
     *
     * if either of the params receive a tuple (`new Line([10, 5],[20, 30])`)
     *  * `point1[0]` is applied to `x1` and `point1[1]` is applied to `y1`
     *  * `point2[0]` is applied to `x2` and `point2[1]` is applied to `y2`
     *
     * @param point1 the first point where the line will start
     * @param point2 the second point where the line will finish
     */
    constructor(point1: number | [number, number], point2: number | [number, number]);
    /**
     * Sets the first point to the line vector
     * @param point the point of the line vector
     */
    private setPoint1;
    /**
     * Sets the second point to the line vector
     * @param point the point of the line vector
     */
    private setPoint2;
}
//# sourceMappingURL=line.d.ts.map