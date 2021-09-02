import { StyleDefinition } from './style-definition';
import { IText } from '../interfaces';
/**
 * Class to create a text definition
 */
export declare class Txt extends StyleDefinition<Txt, IText> {
    private _text;
    /**
     * @param text Text to print
     */
    constructor(_text: string | (string | IText)[]);
    /**
     * preserve leading spaces
     */
    preserveLeadingSpaces(): Txt;
    /**
     * Set opacity to the text
     */
    opacity(opacity: number): Txt;
}
//# sourceMappingURL=text.d.ts.map