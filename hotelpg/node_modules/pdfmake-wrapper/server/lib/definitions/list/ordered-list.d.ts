import { List } from './list';
import { IOl } from '../../interfaces';
/**
 * Class to create an ordered list definition
 */
export declare class Ol extends List<Ol, IOl> {
    private _items;
    /**
     * @param items Items to print
     */
    constructor(_items: any[]);
    /**
     * It applies a type marker
     * @param type ( lower-alpha, upper-alpha, upper-roman, lower-roman, none )
     */
    type(type: 'lower-alpha' | 'upper-alpha' | 'upper-roman' | 'lower-roman' | 'none'): Ol;
    /**
     * Orden the list descendent
     */
    reversed(): Ol;
    /**
     * It sets a separator
     * @param separator Type of the separator
     */
    separator(separator: string | [string, string]): Ol;
    /**
     * It sets the number to start the list
     * @param start number to start
     */
    start(start: number): Ol;
}
//# sourceMappingURL=ordered-list.d.ts.map