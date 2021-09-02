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
exports.Ellipse = void 0;
var vector_1 = require("./vector");
/**
 * Creates a ellipse vector
 */
var Ellipse = /** @class */ (function (_super) {
    __extends(Ellipse, _super);
    /**
     * if either of the params receive one number (`new Ellipse(10,10)`):
     *  * `point` is applied to `x` and `y`
     *  * `radius` is applied to `r1` (radius1) and `r2` (radius2)
     *
     * if either of the params receive a tuple (`new Ellipse([10, 5],[20, 30])`)
     *  * `point[0]` is applied to `x` and `point[1]` is applied to `y`
     *  * `radius[0]` is applied to `r1` (radius1) and `radius[1]` is applied to `r2` (radius2)
     *
     * @param point the point where the ellipse will be drawn
     * @param radius the radius of the ellipse
     */
    function Ellipse(point, radius) {
        var _this = _super.call(this, 'ellipse') || this;
        _this.setPoint(point);
        _this.setRadius(radius);
        return _this;
    }
    /**
     * Sets the point to the ellipse vector
     * @param point the point of the ellipse vector
     */
    Ellipse.prototype.setPoint = function (point) {
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
     * Sets the radius to the ellipse vector
     * @param radius the radius of the ellipse vector
     */
    Ellipse.prototype.setRadius = function (radius) {
        if (Array.isArray(radius)) {
            this.content.r1 = radius[0];
            this.content.r2 = radius[1];
        }
        else {
            this.content.r1 = radius;
            this.content.r2 = radius;
        }
    };
    return Ellipse;
}(vector_1.Vector));
exports.Ellipse = Ellipse;
//# sourceMappingURL=ellipse.js.map