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
exports.Columns = void 0;
var style_definition_1 = require("./style-definition");
/**
 * Class to create some columns
 */
var Columns = /** @class */ (function (_super) {
    __extends(Columns, _super);
    /**
     * @param _columns receives a column array
     */
    function Columns(_columns) {
        var _this = _super.call(this) || this;
        _this._columns = _columns;
        _this.content.columns = _this._columns;
        return _this;
    }
    /**
     * @param space optional space between columns
     */
    Columns.prototype.columnGap = function (space) {
        this.content.columnGap = space;
        return this;
    };
    return Columns;
}(style_definition_1.StyleDefinition));
exports.Columns = Columns;
//# sourceMappingURL=columns.js.map