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
exports.Line = void 0;
var vector_1 = require("./vector");
/**
 * Creates a line vector
 */
var Line = /** @class */ (function (_super) {
    __extends(Line, _super);
    /**
     * if either of the params receive one number (`new Line(10,10)`):
     *  * `point1` is applied to `x1` and `y1`
     *  * `point2` is applied to `x2` and `y2`
     *
     * if either of the params receive a tuple (`new Line([10, 5],[20, 30])`)
     *  * `point1[0]` is applied to `x1` and `point1[1]` is applied to `y1`
     *  * `point2[0]` is applied to `x2` and `point2[1]` is applied to `y2`
     *
     * @param point1 the first point where the line will start
     * @param point2 the second point where the line will finish
     */
    function Line(point1, point2) {
        var _this = _super.call(this, 'line') || this;
        _this.setPoint1(point1);
        _this.setPoint2(point2);
        return _this;
    }
    /**
     * Sets the first point to the line vector
     * @param point the point of the line vector
     */
    Line.prototype.setPoint1 = function (point) {
        if (Array.isArray(point)) {
            this.content.x1 = point[0];
            this.content.y1 = point[1];
        }
        else {
            this.content.x1 = point;
            this.content.y1 = point;
        }
    };
    /**
     * Sets the second point to the line vector
     * @param point the point of the line vector
     */
    Line.prototype.setPoint2 = function (point) {
        if (Array.isArray(point)) {
            this.content.x2 = point[0];
            this.content.y2 = point[1];
        }
        else {
            this.content.x2 = point;
            this.content.y2 = point;
        }
    };
    return Line;
}(vector_1.Vector));
exports.Line = Line;
//# sourceMappingURL=line.js.map