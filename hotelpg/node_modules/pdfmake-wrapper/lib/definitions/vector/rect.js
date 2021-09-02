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
import { Vector } from './vector';
/**
 * Creates a rect vector
 */
var Rect = /** @class */ (function (_super) {
    __extends(Rect, _super);
    /**
     * if either of the params receive one number (`new Rect(10,10)`):
     *  * `point` is applied to `x` and `y`
     *  * `size` is applied to `w` (width) and `h` (height)
     *
     * if either of the params receive a tuple (`new Rect([10, 5],[20, 30])`)
     *  * `point[0]` is applied to `x` and `point[1]` is applied to `y`
     *  * `size[0]` is applied to `w` (width) and `size[1]` is applied to `h` (height)
     *
     * @param point the point where the rect will be drawn
     * @param size the size of the rect
     */
    function Rect(point, size) {
        var _this = _super.call(this, 'rect') || this;
        _this.setPoint(point);
        _this.setSize(size);
        return _this;
    }
    /**
     * Sets the point to the rect vector
     * @param point the point of the rect vector
     */
    Rect.prototype.setPoint = function (point) {
        if (Array.isArray(point)) {
            this.content.x = point[0];
            this.content.y = point[1];
        }
        else {
            this.content.x = point;
            this.content.y = point;
        }
    };
    /**
     * Sets the size of the rect vector
     * @param size the sixe of the rect vector
     */
    Rect.prototype.setSize = function (size) {
        if (Array.isArray(size)) {
            this.content.w = size[0];
            this.content.h = size[1];
        }
        else {
            this.content.w = size;
            this.content.h = size;
        }
    };
    /**
     * round the borders
     * @param num radius number
     */
    Rect.prototype.round = function (num) {
        this.content.r = num;
        return this;
    };
    return Rect;
}(Vector));
export { Rect };
//# sourceMappingURL=rect.js.map