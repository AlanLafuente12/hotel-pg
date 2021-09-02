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
 * Class to create a list definition
 */
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item(_content) {
        var _this = _super.call(this) || this;
        _this._content = _content;
        for (var key in _this._content) {
            _this.content[key] = _this._content[key];
        }
        return _this;
    }
    /**
     * It applies a counter on the marker
     * @param counter The counter of the marker
     */
    Item.prototype.counter = function (counter) {
        this.content.counter = counter;
        return this;
    };
    /**
     * It applies a type of marker
     * @param type The type of the marker
     */
    Item.prototype.listType = function (type) {
        this.content.listType = type;
        return this;
    };
    return Item;
}(StyleDefinition));
export { Item };
//# sourceMappingURL=item.js.map