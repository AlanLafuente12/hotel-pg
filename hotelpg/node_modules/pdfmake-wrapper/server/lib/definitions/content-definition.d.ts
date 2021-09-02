/**
 * The main generic class that defines the main properties of the class, T: defines the TYPE to use and I defined the interface that of "content" property will use
 */
export declare abstract class ContentDefinition<T extends ContentDefinition<T, I>, I> {
    /**
     * The content that is shaped on every called method
     */
    protected readonly content: any;
    /**
     * @returns  the built content
     */
    get end(): I;
    /**
     * Break a page
     * @param brk when it break a page (before, after)
     */
    pageBreak(brk: 'before' | 'after'): T;
    /**
     * Change the orientation with a page break
     * @param orientation The orientation
     * @param brk the form of page break
     */
    pageOrientationAndBreak(orientation: 'landscape' | 'portrait', brk: 'before' | 'after'): T;
    /**
     * Helper to use with automatically page break
     * @param data Any data
     */
    headlineLevel(data: any): T;
    /**
     * Sets an ID to an object, This is useful for referencing an object
     * @param id ID
     */
    id(id: string): T;
}
//# sourceMappingURL=content-definition.d.ts.map