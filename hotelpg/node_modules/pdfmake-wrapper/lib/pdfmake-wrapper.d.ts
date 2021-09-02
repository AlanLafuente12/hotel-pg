import { ICreatePDF, IFonts, IFontTypeConfiguration } from './interfaces';
import { DocumentDefinition } from './document-definition';
/**
 * Main class that contains the essencial for build the PDF
 */
export declare class PdfMakeWrapper extends DocumentDefinition {
    /**
     * Sets custom fonts. This changes the global font types
     * @param fonts {{ [propName: string]: string }} The generated fonts object
     * @param fontTypesConfig {{ [propName: string]: IFontTypes }} The font type configuration
     *
     * @example
     * import { PdfMakeWrapper } from 'pdfmake-wrapper';
     * import customFonts 'path/to/custom/fonts';
     *
     * PdfMakeWrapper.setFonts(
     *  customFonts,
     *  {
     *      customFonts: { // The property name can be any
     *          normal: 'custom-fonts.ttf',
     *          bold: 'custom-fonts-bold.ttf',
     *          italics: 'custom-fonts-italics.ttf',
     *          bolditalics: 'custom-fonts-bolditalics.ttf'
     *      },
     *      ...
     *  }
     * );
     */
    static setFonts(fonts: IFonts, fontTypesConfig?: IFontTypeConfiguration): void;
    /**
     * Create the PDF
     */
    create(): ICreatePDF;
    /**
     * It returns new lines
     * @param num numbers of newline
     * @deprecated This will be deprecated in next minor version
     */
    ln(num?: number): string;
}
//# sourceMappingURL=pdfmake-wrapper.d.ts.map