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
}(StyleDefinition));
export { Canvas };
//# sourceMappingURL=canvas.js.map