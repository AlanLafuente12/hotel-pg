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
 * Class that create a QR code
 */
var QR = /** @class */ (function (_super) {
    __extends(QR, _super);
    /**
     * @param _code receives a code
     */
    function QR(_code) {
        var _this = _super.call(this) || this;
        _this._code = _code;
        _this.content.qr = _this._code;
        return _this;
    }
    /**
     * Set a size to the QR
     * @param fit the size
     */
    QR.prototype.fit = function (fit) {
        this.content.fit = fit;
        return this;
    };
    /**
     * Set a version to the QR
     * @param version the version
     */
    QR.prototype.version = function (version) {
        this.content.version = version;
        return this;
    };
    /**
     * Set a foreground to the QR
     * @param foreground the color
     */
    QR.prototype.foreground = function (foreground) {
        this.content.foreground = foreground;
        return this;
    };
    /**
     * Set a ecc level to the QR
     * @param eccLevel the level
     */
    QR.prototype.eccLevel = function (eccLevel) {
        this.content.eccLevel = eccLevel;
        return this;
    };
    /**
     * Set a mode to the QR
     * @param mode the size
     */
    QR.prototype.mode = function (mode) {
        this.content.mode = mode;
        return this;
    };
    /**
     * Set a mask to the QR
     * @param mask the size
     */
    QR.prototype.mask = function (mask) {
        this.content.mask = mask;
        return this;
    };
    return QR;
}(StyleDefinition));
export { QR };
//# sourceMappingURL=qr.js.map