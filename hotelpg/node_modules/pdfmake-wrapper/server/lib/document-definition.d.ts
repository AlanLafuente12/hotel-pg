import { IInfo, IImg, IText, IStyleDefinition, IPermissions, ICustomPageSize, IDocumentNode } from './interfaces';
/**
 * Class that contains the essencial for the document definition
 */
export declare class DocumentDefinition {
    private static usedFont;
    /**
     * It defines the pdf definition
     */
    private definition;
    constructor();
    /**
     * Sets the font that will be used to generate a PDF
     * @param fontName The font type configuration name
     */
    static useFont(fontName: string): void;
    /**
     * It adds content to the PDF body
     * @param content any content
     */
    add(content: any): void;
    /**
     * Preload images setting a name to each images
     *
     * @example
     * { picture1: 'data:image/jpeg;base64...' } or { picture1: await new Img('/path/image.png').build() }
     *
     * @param imgs Dictionary of default images
     */
    images(imgs: {
        [propName: string]: IImg | string;
    }): void;
    /**
     * Preload styles setting a name to each custom styles
     *
     * @example
     * { style1: { bold: true, fontSize: 15 } }
     *
     * @param styles Dictionary of default styles
     */
    styles(styles: {
        [propName: string]: IStyleDefinition;
    }): void;
    /**
     * Preload styles setting name to each custom style that is applied to whole PDF.
     * Some styles won't work
     *
     * @example
     * { style1: { bold: true, fontSize: 15 } }
     *
     * @param styles Dictionary of default styles
     */
    defaultStyle(styles: IStyleDefinition): void;
    /**
     * Set a header definition
     * @param header Data that is applied as header
     */
    header(header: any): void;
    /**
     * Set a footer definition
     * @param footer Data that is applied as footer
     */
    footer(footer: any): void;
    /**
     * Set a background layer definition
     * @param background Data that is applied as background
     */
    background(background: any): void;
    /**
     * Set the page size
     * @param size The page size
     */
    pageSize(size: string | ICustomPageSize): void;
    /**
     * Set the page margin
     * @param margin The page margin
     */
    pageMargins(margin: number | [number, number] | [number, number, number, number]): void;
    /**
     * Set the page orientation
     * @param orientation the orientation
     */
    pageOrientation(orientation: 'landscape' | 'portrait'): void;
    /**
     * Break the page before the condition defined
     * @param breakBefore Function that defines the break of the page
     */
    pageBreakBefore(breakBefore: (currentNode: IDocumentNode, followingNodesOnPage?: IDocumentNode[], nodesOnNextPage?: IDocumentNode[], previousNodesOnPage?: IDocumentNode[]) => boolean): void;
    /**
     * Set metadata to the document, you can set a custom metadata
     * @param info The metadata
     */
    info(info: IInfo): void;
    /**
     * It defines if use compress
     * @param compress
     */
    compress(compress: boolean): void;
    /**
     * Set a watermark
    */
    watermark(watermark: string | IText): void;
    /**
     * Set a raw content
    */
    rawContent(content: any): void;
    /**
     * Sets a password to the PDF to encrypt it and when an user wants to open the document
     * a popup will be shown to type the password
     * @param password
     */
    userPassword(password: string): void;
    /**
     * Sets access privileges providing an owner password and the privileges setting
     * @param password The password
     * @param permissions The permission setting
     */
    permissions(password: string, permissions: IPermissions): void;
    /**
     * Gets the document definition
     */
    getDefinition(): any;
}
//# sourceMappingURL=document-definition.d.ts.map