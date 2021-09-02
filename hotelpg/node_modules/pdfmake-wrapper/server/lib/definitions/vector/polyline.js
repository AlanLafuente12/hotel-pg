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
exports.Polyline = void 0;
var vector_1 = require("./vector");
/**
 * Creates a polyline vector
 */
var Polyline = /** @class */ (function (_super) {
    __extends(Polyline, _super);
    /**
     * @param points {Array<IPoint>} An array of points (optional)
     */
    function Polyline(points) {
        if (points === void 0) { points = []; }
        var _this = _super.call(this, 'polyline') || this;
        _this.content.points = points;
        return _this;
    }
    /**
     * Closes the path
     */
    Polyline.prototype.closePath = function () {
        this.content.closePath = true;
        return this;
    };
    /**
     * Adds a new point to draw the polyline
     * @param x coord X
     * @param y coord Y
     */
    Polyline.prototype.addPoint = function (x, y) {
        this.content.points.push({ x: x, y: y });
        return this;
    };
    return Polyline;
}(vector_1.Vector));
exports.Polyline = Polyline;
//# sourceMappingURL=polyline.js.map