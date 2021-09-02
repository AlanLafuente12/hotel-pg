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
import { StyleDefinition } from '../style-definition';
/**
 * Class to create a table of content
 */
var Toc = /** @class */ (function (_super) {
    __extends(Toc, _super);
    /**
     * @param _toc receives the title of the toc
     */
    function Toc(_toc) {
        var _this = _super.call(this) || this;
        _this._toc = _toc;
        _this.content.toc = {};
        _this.content.toc.title = _this._toc;
        return _this;
    }
    /**
     * Set a style to the text
     * @param style the style to apply
     */
    Toc.prototype.textStyle = function (style) {
        this.content.toc.textStyle = style;
        return this;
    };
    /**
     * Set a style to the number
     * @param style the style to apply
     */
    Toc.prototype.numberStyle = function (style) {
        this.content.toc.numberStyle = style;
        return this;
    };
    /**
    * Set a magin to the toc
    * @param margin the margin to apply
    */
    Toc.prototype.textMargin = function (margin) {
        this.content.toc.textMargin = margin;
        return this;
    };
    return Toc;
}(StyleDefinition));
export { Toc };
//# sourceMappingURL=toc.js.map