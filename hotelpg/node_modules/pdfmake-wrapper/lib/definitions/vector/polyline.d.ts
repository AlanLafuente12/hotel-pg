import { Vector } from './vector';
import { IPolyline, IPoint } from '../../interfaces';
/**
 * Creates a polyline vector
 */
export declare class Polyline extends Vector<Polyline, IPolyline> {
    /**
     * @param points {Array<IPoint>} An array of points (optional)
     */
    constructor(points?: IPoint[]);
    /**
     * Closes the path
     */
    closePath(): Polyline;
    /**
     * Adds a new point to draw the polyline
     * @param x coord X
     * @param y coord Y
     */
    addPoint(x: number, y: number): Polyline;
}
//# sourceMappingURL=polyline.d.ts.map