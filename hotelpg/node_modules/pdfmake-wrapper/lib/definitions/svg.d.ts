import { StyleDefinition } from './style-definition';
import { ISVG } from '../interfaces';
/**
 * Class to create an SVG definition
 */
export declare class SVG extends StyleDefinition<SVG, ISVG> {
    /**
     * @param svg {string} The svg
     */
    constructor(svg: string);
    /**
     * It fits the svg
     * @param fit {[ number, number ]}
     */
    fit(fit: [number, number]): SVG;
}
//# sourceMappingURL=svg.d.ts.map