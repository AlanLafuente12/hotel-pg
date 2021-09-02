import { StyleDefinition } from '../style-definition';
import { IToc, IStyleDefinition } from '../../interfaces';
/**
 * Class to create a table of content
 */
export declare class Toc extends StyleDefinition<Toc, IToc> {
    private _toc;
    /**
     * @param _toc receives the title of the toc
     */
    constructor(_toc: any);
    /**
     * Set a style to the text
     * @param style the style to apply
     */
    textStyle(style: IStyleDefinition): Toc;
    /**
     * Set a style to the number
     * @param style the style to apply
     */
    numberStyle(style: IStyleDefinition): Toc;
    /**
    * Set a magin to the toc
    * @param margin the margin to apply
    */
    textMargin(margin: number | [number, number] | [number, number, number, number]): Toc;
}
//# sourceMappingURL=toc.d.ts.map