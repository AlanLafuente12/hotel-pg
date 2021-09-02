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
exports.SVG = void 0;
var style_definition_1 = require("./style-definition");
/**
 * Class to create an SVG definition
 */
var SVG = /** @class */ (function (_super) {
    __extends(SVG, _super);
    /**
     * @param svg {string} The svg
     */
    function SVG(svg) {
        var _this = _super.call(this) || this;
        _this.content.svg = svg;
        return _this;
    }
    /**
     * It fits the svg
     * @param fit {[ number, number ]}
     */
    SVG.prototype.fit = function (fit) {
        this.content.fit = fit;
        return this;
    };
    return SVG;
}(style_definition_1.StyleDefinition));
exports.SVG = SVG;
//# sourceMappingURL=svg.js.map