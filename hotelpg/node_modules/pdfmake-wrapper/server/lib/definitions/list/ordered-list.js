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
exports.Ol = void 0;
var list_1 = require("./list");
/**
 * Class to create an ordered list definition
 */
var Ol = /** @class */ (function (_super) {
    __extends(Ol, _super);
    /**
     * @param items Items to print
     */
    function Ol(_items) {
        var _this = _super.call(this) || this;
        _this._items = _items;
        _this.content.ol = _this._items;
        return _this;
    }
    /**
     * It applies a type marker
     * @param type ( lower-alpha, upper-alpha, upper-roman, lower-roman, none )
     */
    Ol.prototype.type = function (type) {
        return _super.prototype.type.call(this, type);
    };
    /**
     * Orden the list descendent
     */
    Ol.prototype.reversed = function () {
        this.content.reversed = true;
        return this;
    };
    /**
     * It sets a separator
     * @param separator Type of the separator
     */
    Ol.prototype.separator = function (separator) {
        this.content.separator = separator;
        return this;
    };
    /**
     * It sets the number to start the list
     * @param start number to start
     */
    Ol.prototype.start = function (start) {
        this.content.start = start;
        return this;
    };
    return Ol;
}(list_1.List));
exports.Ol = Ol;
//# sourceMappingURL=ordered-list.js.map