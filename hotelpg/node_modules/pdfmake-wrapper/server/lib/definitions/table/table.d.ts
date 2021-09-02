import { StyleDefinition } from '../style-definition';
import { ITable, ICustomTableLayout } from '../../interfaces';
/**
 * Class to create a table
 */
export declare class Table extends StyleDefinition<Table, ITable> {
    private _body;
    /**
     * @param _body receives an array of arrays
     */
    constructor(_body: any[][]);
    /**
     * @param layout set table layout {lightHorizontalLines|noBorders|headerLineOnly|ICustomTableLayout}
     */
    layout(layout: 'lightHorizontalLines' | 'noBorders' | 'headerLineOnly' | ICustomTableLayout): Table;
    /**
     * @param rows set number of header rows
     */
    headerRows(rows: number): Table;
    /**
     * @param widths set table widths
     */
    widths(widths: number | '*' | 'auto' | (string | number)[]): Table;
    /**
     * @param heights set table heights
     */
    heights(heights: (row: number) => number | number | number[]): Table;
    /**
     * @param apply move the table to the next page when it will be cut it for a breaking page
     */
    dontBreakRows(apply: boolean): Table;
    /**
     * @param rows number of rows that are held next to the header
     */
    keepWithHeaderRows(rows: number): Table;
}
//# sourceMappingURL=table.d.ts.map