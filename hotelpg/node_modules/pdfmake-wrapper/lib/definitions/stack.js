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
 * Class that create a stack of paragraphs
 */
var Stack = /** @class */ (function (_super) {
    __extends(Stack, _super);
    /**
     * @param _stack receives an array of text
     */
    function Stack(_stack) {
        var _this = _super.call(this) || this;
        _this._stack = _stack;
        _this.content.stack = _this._stack;
        return _this;
    }
    return Stack;
}(StyleDefinition));
export { Stack };
//# sourceMappingURL=stack.js.map