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
import { StyleDefinition } from './style-definition';
/**
 * Class to create a text definition
 */
var Txt = /** @class */ (function (_super) {
    __extends(Txt, _super);
    /**
     * @param text Text to print
     */
    function Txt(_text) {
        var _this = _super.call(this) || this;
        _this._text = _text;
        _this.content.text = _this._text;
        return _this;
    }
    /**
     * preserve leading spaces
     */
    Txt.prototype.preserveLeadingSpaces = function () {
        this.content.preserveLeadingSpaces = true;
        return this;
    };
    /**
     * Set opacity to the text
     */
    Txt.prototype.opacity = function (opacity) {
        if (opacity > 1)
            opacity = 1;
        this.content.opacity = opacity;
        return this;
    };
    return Txt;
}(StyleDefinition));
export { Txt };
//# sourceMappingURL=text.js.map