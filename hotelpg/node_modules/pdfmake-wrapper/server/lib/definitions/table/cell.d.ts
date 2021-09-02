import { StyleDefinition } from '../style-definition';
import { ICell } from '../../interfaces';
/**
 * Class to create a cell of a table
 */
export declare class Cell extends StyleDefinition<Cell, ICell> {
    private data;
    /**
     * @param data receives a any object and add cell properties
     */
    constructor(data: {
        [propName: string]: any;
    });
    /**
     * @param space optional space between columns
     */
    colSpan(cols: number): Cell;
    /**
     * @param rows define a number of rowSpan
     */
    rowSpan(rows: number): Cell;
    /**
     * @param color define a color code or name
     */
    fillColor(color: string): Cell;
    /**
     * @param border define the border top, left, bottom and right
     */
    border(border: [boolean] | [boolean, boolean] | [boolean, boolean, boolean, boolean]): Cell;
}
//# sourceMappingURL=cell.d.ts.map