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
import { List } from './list';
/**
 * Class to create an unordered list definition
 */
var Ul = /** @class */ (function (_super) {
    __extends(Ul, _super);
    /**
     * @param items Items to print
     */
    function Ul(_items) {
        var _this = _super.call(this) || this;
        _this._items = _items;
        _this.content.ul = _this._items;
        return _this;
    }
    /**
     * It applies a type marker
     * @param type ( square, circle, none )
     */
    Ul.prototype.type = function (type) {
        return _super.prototype.type.call(this, type);
    };
    return Ul;
}(List));
export { Ul };
//# sourceMappingURL=unordered-list.js.map