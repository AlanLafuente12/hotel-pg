"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = void 0;
var style_definition_1 = require("../style-definition");
/**
 * Class to create a table
 */
var Table = /** @class */ (function (_super) {
    __extends(Table, _super);
    /**
     * @param _body receives an array of arrays
     */
    function Table(_body) {
        var _this = _super.call(this) || this;
        _this._body = _body;
        _this.content.table = {};
        _this.content.table.body = _this._body;
        return _this;
    }
    /**
     * @param layout set table layout {lightHorizontalLines|noBorders|headerLineOnly|ICustomTableLayout}
     */
    Table.prototype.layout = function (layout) {
        this.content.layout = layout;
        return this;
    };
    /**
     * @param rows set number of header rows
     */
    Table.prototype.headerRows = function (rows) {
        this.content.table.headerRows = rows;
        return this;
    };
    /**
     * @param widths set table widths
     */
    Table.prototype.widths = function (widths) {
        this.content.table.widths = widths;
        return this;
    };
    /**
     * @param heights set table heights
     */
    Table.prototype.heights = function (heights) {
        this.content.table.heights = heights;
        return this;
    };
    /**
     * @param apply move the table to the next page when it will be cut it for a breaking page
     */
    Table.prototype.dontBreakRows = function (apply) {
        this.content.table.dontBreakRows = apply;
        return this;
    };
    /**
     * @param rows number of rows that are held next to the header
     */
    Table.prototype.keepWithHeaderRows = function (rows) {
        this.content.table.keepWithHeaderRows = rows;
        return this;
    };
    return Table;
}(style_definition_1.StyleDefinition));
exports.Table = Table;
//# sourceMappingURL=table.js.map