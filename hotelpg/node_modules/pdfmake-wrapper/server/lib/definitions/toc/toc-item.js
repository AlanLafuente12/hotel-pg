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
exports.TocItem = void 0;
var style_definition_1 = require("../style-definition");
/**
 * Class to create a toc item
 */
var TocItem = /** @class */ (function (_super) {
    __extends(TocItem, _super);
    /**
     * @param _txt receives a text object and adds it as toc item
     */
    function TocItem(_txt) {
        var _this = _super.call(this) || this;
        _this._txt = _txt;
        _this.content.tocItem = true;
        for (var key in _this._txt) {
            _this.content[key] = _this._txt[key];
        }
        return _this;
    }
    /**
     * Set a style to de toc item
     * @param style The defined style
     */
    TocItem.prototype.tocStyle = function (style) {
        this.content.tocStyle = style;
        return this;
    };
    /**
     * Set a margin to de toc item
     * @param margin The defined margin
     */
    TocItem.prototype.tocMargin = function (margin) {
        this.content.tocMargin = margin;
        return this;
    };
    return TocItem;
}(style_definition_1.StyleDefinition));
exports.TocItem = TocItem;
//# sourceMappingURL=toc-item.js.map