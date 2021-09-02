import { StyleDefinition } from './style-definition';
import { IColumns } from '../interfaces';
/**
 * Class to create some columns
 */
export declare class Columns extends StyleDefinition<Columns, IColumns> {
    private _columns;
    /**
     * @param _columns receives a column array
     */
    constructor(_columns: any[]);
    /**
     * @param space optional space between columns
     */
    columnGap(space: number): Columns;
}
//# sourceMappingURL=columns.d.ts.map