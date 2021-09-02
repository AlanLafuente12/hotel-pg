var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { DocumentDefinition } from './document-definition';
import pdfMake from 'pdfmake/build/pdfmake';
/**
 * Main class that contains the essencial for build the PDF
 */
var PdfMakeWrapper = /** @class */ (function (_super) {
    __extends(PdfMakeWrapper, _super);
    function PdfMakeWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
    PdfMakeWrapper.setFonts = function (fonts, fontTypesConfig) {
        pdfMake.vfs = fonts.pdfMake.vfs;
        if (fontTypesConfig) {
            pdfMake.fonts = fontTypesConfig;
        }
    };
    /**
     * Create the PDF
     */
    PdfMakeWrapper.prototype.create = function () {
        return pdfMake.createPdf(this.getDefinition());
    };
    // ======================== HELPERS =========================
    /**
     * It returns new lines
     * @param num numbers of newline
     * @deprecated This will be deprecated in next minor version
     */
    PdfMakeWrapper.prototype.ln = function (num) {
        if (num === void 0) { num = 1; }
        if (num < 1)
            num = 1;
        return '\n'.repeat(num);
    };
    return PdfMakeWrapper;
}(DocumentDefinition));
export { PdfMakeWrapper };
//# sourceMappingURL=pdfmake-wrapper.js.map