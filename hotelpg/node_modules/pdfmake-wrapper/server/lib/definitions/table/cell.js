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
exports.Cell = void 0;
var style_definition_1 = require("../style-definition");
/**
 * Class to create a cell of a table
 */
var Cell = /** @class */ (function (_super) {
    __extends(Cell, _super);
    /**
     * @param data receives a any object and add cell properties
     */
    function Cell(data) {
        var _this = _super.call(this) || this;
        _this.data = data;
        for (var key in _this.data) {
            _this.content[key] = _this.data[key];
        }
        return _this;
    }
    /**
     * @param space optional space between columns
     */
    Cell.prototype.colSpan = function (cols) {
        this.content.colSpan = cols;
        return this;
    };
    /**
     * @param rows define a number of rowSpan
     */
    Cell.prototype.rowSpan = function (rows) {
        this.content.rowSpan = rows;
        return this;
    };
    /**
     * @param color define a color code or name
     */
    Cell.prototype.fillColor = function (color) {
        this.content.fillColor = color;
        return this;
    };
    /**
     * @param border define the border top, left, bottom and right
     */
    Cell.prototype.border = function (border) {
        this.content.border = border;
        return this;
    };
    return Cell;
}(style_definition_1.StyleDefinition));
exports.Cell = Cell;
//# sourceMappingURL=cell.js.map