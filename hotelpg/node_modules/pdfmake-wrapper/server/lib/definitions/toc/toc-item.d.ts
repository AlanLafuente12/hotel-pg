import { StyleDefinition } from '../style-definition';
import { ITocItem, IText, IStyleDefinition } from '../../interfaces';
/**
 * Class to create a toc item
 */
export declare class TocItem extends StyleDefinition<TocItem, ITocItem> {
    private _txt;
    /**
     * @param _txt receives a text object and adds it as toc item
     */
    constructor(_txt: IText);
    /**
     * Set a style to de toc item
     * @param style The defined style
     */
    tocStyle(style: IStyleDefinition): TocItem;
    /**
     * Set a margin to de toc item
     * @param margin The defined margin
     */
    tocMargin(margin: number | [number, number] | [number, number, number, number]): TocItem;
}
//# sourceMappingURL=toc-item.d.ts.map