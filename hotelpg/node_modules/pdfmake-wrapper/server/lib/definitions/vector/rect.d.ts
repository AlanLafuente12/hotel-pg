import { Vector } from './vector';
import { IRect } from '../../interfaces';
/**
 * Creates a rect vector
 */
export declare class Rect extends Vector<Rect, IRect> {
    /**
     * if either of the params receive one number (`new Rect(10,10)`):
     *  * `point` is applied to `x` and `y`
     *  * `size` is applied to `w` (width) and `h` (height)
     *
     * if either of the params receive a tuple (`new Rect([10, 5],[20, 30])`)
     *  * `point[0]` is applied to `x` and `point[1]` is applied to `y`
     *  * `size[0]` is applied to `w` (width) and `size[1]` is applied to `h` (height)
     *
     * @param point the point where the rect will be drawn
     * @param size the size of the rect
     */
    constructor(point: number | [number, number], size: number | [number, number]);
    /**
     * Sets the point to the rect vector
     * @param point the point of the rect vector
     */
    private setPoint;
    /**
     * Sets the size of the rect vector
     * @param size the sixe of the rect vector
     */
    private setSize;
    /**
     * round the borders
     * @param num radius number
     */
    round(num: number): Rect;
}
//# sourceMappingURL=rect.d.ts.map