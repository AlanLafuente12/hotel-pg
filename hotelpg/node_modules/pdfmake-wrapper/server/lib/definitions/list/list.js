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
exports.List = void 0;
var style_definition_1 = require("../style-definition");
/**
 * Class to create a list definition
 */
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * It applies a type marker
     * @param type The type of marker
     */
    List.prototype.type = function (type) {
        this.content.type = type;
        return this;
    };
    /**
     * It sets a color to the marker
     * @param color The color
     */
    List.prototype.markerColor = function (color) {
        this.content.markerColor = color;
        return this;
    };
    return List;
}(style_definition_1.StyleDefinition));
exports.List = List;
//# sourceMappingURL=list.js.map