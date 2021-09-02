import { StyleDefinition } from '../style-definition';
/**
 * Class to create a list definition
 */
export declare abstract class List<T extends List<T, I>, I> extends StyleDefinition<T, I> {
    /**
     * It applies a type marker
     * @param type The type of marker
     */
    type(type: string): T;
    /**
     * It sets a color to the marker
     * @param color The color
     */
    markerColor(color: string): T;
}
//# sourceMappingURL=list.d.ts.map