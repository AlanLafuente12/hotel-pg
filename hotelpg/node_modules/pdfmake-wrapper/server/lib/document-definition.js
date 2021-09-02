"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentDefinition = void 0;
var is_base64_1 = require("./utils/is-base64");
/**
 * Class that contains the essencial for the document definition
 */
var DocumentDefinition = /** @class */ (function () {
    function DocumentDefinition() {
        /**
         * It defines the pdf definition
         */
        this.definition = {
            content: []
        };
        if (DocumentDefinition.usedFont) {
            this.defaultStyle(DocumentDefinition.usedFont);
        }
    }
    /**
     * Sets the font that will be used to generate a PDF
     * @param fontName The font type configuration name
     */
    DocumentDefinition.useFont = function (fontName) {
        DocumentDefinition.usedFont = { font: fontName };
    };
    /**
     * It adds content to the PDF body
     * @param content any content
     */
    DocumentDefinition.prototype.add = function (content) {
        this.definition.content.push(content);
    };
    /**
     * Preload images setting a name to each images
     *
     * @example
     * { picture1: 'data:image/jpeg;base64...' } or { picture1: await new Img('/path/image.png').build() }
     *
     * @param imgs Dictionary of default images
     */
    DocumentDefinition.prototype.images = function (imgs) {
        var newImgs = {};
        for (var img in imgs) {
            if (typeof imgs[img] === 'string' && is_base64_1.isBase64(imgs[img])) {
                newImgs[img] = imgs[img];
                // it's probably that the first condition is not passed for the regex condition, but it's a string yet
            }
            else if (typeof imgs[img] !== 'string') {
                newImgs[img] = imgs[img].image;
            }
        }
        this.definition.images = newImgs;
    };
    /**
     * Preload styles setting a name to each custom styles
     *
     * @example
     * { style1: { bold: true, fontSize: 15 } }
     *
     * @param styles Dictionary of default styles
     */
    DocumentDefinition.prototype.styles = function (styles) {
        this.definition.styles = styles;
    };
    /**
     * Preload styles setting name to each custom style that is applied to whole PDF.
     * Some styles won't work
     *
     * @example
     * { style1: { bold: true, fontSize: 15 } }
     *
     * @param styles Dictionary of default styles
     */
    DocumentDefinition.prototype.defaultStyle = function (styles) {
        this.definition.defaultStyle = __assign(__assign({}, (this.definition.defaultStyle || {})), styles);
    };
    /**
     * Set a header definition
     * @param header Data that is applied as header
     */
    DocumentDefinition.prototype.header = function (header) {
        this.definition.header = header;
    };
    /**
     * Set a footer definition
     * @param footer Data that is applied as footer
     */
    DocumentDefinition.prototype.footer = function (footer) {
        this.definition.footer = footer;
    };
    /**
     * Set a background layer definition
     * @param background Data that is applied as background
     */
    DocumentDefinition.prototype.background = function (background) {
        this.definition.background = background;
    };
    /**
     * Set the page size
     * @param size The page size
     */
    DocumentDefinition.prototype.pageSize = function (size) {
        this.definition.pageSize = size;
    };
    /**
     * Set the page margin
     * @param margin The page margin
     */
    DocumentDefinition.prototype.pageMargins = function (margin) {
        this.definition.pageMargins = margin;
    };
    /**
     * Set the page orientation
     * @param orientation the orientation
     */
    DocumentDefinition.prototype.pageOrientation = function (orientation) {
        this.definition.pageOrientation = orientation;
    };
    /**
     * Break the page before the condition defined
     * @param breakBefore Function that defines the break of the page
     */
    DocumentDefinition.prototype.pageBreakBefore = function (breakBefore) {
        this.definition.pageBreakBefore = breakBefore;
    };
    /**
     * Set metadata to the document, you can set a custom metadata
     * @param info The metadata
     */
    DocumentDefinition.prototype.info = function (info) {
        this.definition.info = info;
    };
    /**
     * It defines if use compress
     * @param compress
     */
    DocumentDefinition.prototype.compress = function (compress) {
        this.definition.compress = compress;
    };
    /**
     * Set a watermark
    */
    DocumentDefinition.prototype.watermark = function (watermark) {
        this.definition.watermark = watermark;
    };
    /**
     * Set a raw content
    */
    DocumentDefinition.prototype.rawContent = function (content) {
        this.definition.content = content;
    };
    /**
     * Sets a password to the PDF to encrypt it and when an user wants to open the document
     * a popup will be shown to type the password
     * @param password
     */
    DocumentDefinition.prototype.userPassword = function (password) {
        this.definition.userPassword = password;
    };
    /**
     * Sets access privileges providing an owner password and the privileges setting
     * @param password The password
     * @param permissions The permission setting
     */
    DocumentDefinition.prototype.permissions = function (password, permissions) {
        this.definition.ownerPassword = password;
        this.definition.permissions = permissions;
    };
    /**
     * Gets the document definition
     */
    DocumentDefinition.prototype.getDefinition = function () {
        return this.definition;
    };
    return DocumentDefinition;
}());
exports.DocumentDefinition = DocumentDefinition;
//# sourceMappingURL=document-definition.js.map