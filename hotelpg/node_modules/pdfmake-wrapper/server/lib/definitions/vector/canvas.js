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
exports.Canvas = void 0;
var style_definition_1 = require("../style-definition");
/**
 * Creates a canvas to set vectors
 */
var Canvas = /** @class */ (function (_super) {
    __extends(Canvas, _super);
    /**
     * @param vectors {Array<IVector>} Array of vectors
     */
    function Canvas(vectors) {
        var _this = _super.call(this) || this;
        _this.content.canvas = vectors;
        return _this;
    }
    return Canvas;
}(style_definition_1.StyleDefinition));
exports.Canvas = Canvas;
//# sourceMappingURL=canvas.js.map