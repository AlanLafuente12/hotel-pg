import { List } from './list';
import { IUl } from '../../interfaces';
/**
 * Class to create an unordered list definition
 */
export declare class Ul extends List<Ul, IUl> {
    private _items;
    /**
     * @param items Items to print
     */
    constructor(_items: any[]);
    /**
     * It applies a type marker
     * @param type ( square, circle, none )
     */
    type(type: 'square' | 'circle' | 'none'): Ul;
}
//# sourceMappingURL=unordered-list.d.ts.map