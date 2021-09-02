/**
 * Abstract class that defines the common properties of a vector
 */
export declare abstract class Vector<T extends Vector<T, I>, I> {
    protected readonly content: any;
    /**
     * @returns  the built content
     */
    get end(): I;
    /**
     * @param type Vector type
     */
    constructor(type: string);
    /**
     * Sets a color to the vector
     * @param color The color
     * @returns T
     */
    color(color: string): T;
    /**
     * Sets a color to the line
     * @param lineColor the color
     * @returns T
     */
    lineColor(lineColor: string): T;
    /**
     * Sets the width of the line
     * @param lineWidth the width
     * @returns T
     */
    lineWidth(lineWidth: number): T;
    /**
     * Defines the boder type of a line
     * @param type 'round' | 'square'
     * @returns T
     */
    lineCap(type: 'round' | 'square'): T;
    /**
     * Sets opacity to the vector
     * @param fillOpacity the number of opacity
     * @returns T
     */
    fillOpacity(fillOpacity: number): T;
    /**
     * Sets a linear gradient to the vector
     * @param linearGradient an array of given colors
     * @returns T
     */
    linearGradient(linearGradient: string[]): T;
    /**
     * Sets a dash on the line of the vector
     * @param length The length of the dash
     * @returns T
     */
    dash(length: number): T;
}
//# sourceMappingURL=vector.d.ts.map