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
exports.PageReference = void 0;
var style_definition_1 = require("./style-definition");
/**
 * Class to create a page reference to a Text object
 */
var PageReference = /** @class */ (function (_super) {
    __extends(PageReference, _super);
    /**
     * @param _id receives the id reference
     */
    function PageReference(_id) {
        var _this = _super.call(this) || this;
        _this._id = _id;
        _this.content.pageReference = _this._id;
        return _this;
    }
    return PageReference;
}(style_definition_1.StyleDefinition));
exports.PageReference = PageReference;
//# sourceMappingURL=page-reference.js.map