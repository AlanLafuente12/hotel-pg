"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector = void 0;
/**
 * Abstract class that defines the common properties of a vector
 */
var Vector = /** @class */ (function () {
    /**
     * @param type Vector type
     */
    function Vector(type) {
        this.content = {};
        this.content.type = type;
    }
    Object.defineProperty(Vector.prototype, "end", {
        /**
         * @returns  the built content
         */
        get: function () {
            return this.content;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Sets a color to the vector
     * @param color The color
     * @returns T
     */
    Vector.prototype.color = function (color) {
        this.content.color = color;
        return this;
    };
    /**
     * Sets a color to the line
     * @param lineColor the color
     * @returns T
     */
    Vector.prototype.lineColor = function (lineColor) {
        this.content.lineColor = lineColor;
        return this;
    };
    /**
     * Sets the width of the line
     * @param lineWidth the width
     * @returns T
     */
    Vector.prototype.lineWidth = function (lineWidth) {
        this.content.lineWidth = lineWidth;
        return this;
    };
    /**
     * Defines the boder type of a line
     * @param type 'round' | 'square'
     * @returns T
     */
    Vector.prototype.lineCap = function (type) {
        this.content.lineCap = type;
        return this;
    };
    /**
     * Sets opacity to the vector
     * @param fillOpacity the number of opacity
     * @returns T
     */
    Vector.prototype.fillOpacity = function (fillOpacity) {
        this.content.fillOpacity = fillOpacity;
        return this;
    };
    /**
     * Sets a linear gradient to the vector
     * @param linearGradient an array of given colors
     * @returns T
     */
    Vector.prototype.linearGradient = function (linearGradient) {
        this.content.linearGradient = linearGradient;
        return this;
    };
    /**
     * Sets a dash on the line of the vector
     * @param length The length of the dash
     * @returns T
     */
    Vector.prototype.dash = function (length) {
        this.content.dash = { length: length };
        return this;
    };
    return Vector;
}());
exports.Vector = Vector;
//# sourceMappingURL=vector.js.map