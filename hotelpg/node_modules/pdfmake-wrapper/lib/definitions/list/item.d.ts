import { StyleDefinition } from '../style-definition';
import { IItem } from '../../interfaces';
/**
 * Class to create a list definition
 */
export declare class Item extends StyleDefinition<Item, IItem> {
    private _content;
    constructor(_content: {
        [propName: string]: any;
    });
    /**
     * It applies a counter on the marker
     * @param counter The counter of the marker
     */
    counter(counter: number): Item;
    /**
     * It applies a type of marker
     * @param type The type of the marker
     */
    listType(type: string): Item;
}
//# sourceMappingURL=item.d.ts.map