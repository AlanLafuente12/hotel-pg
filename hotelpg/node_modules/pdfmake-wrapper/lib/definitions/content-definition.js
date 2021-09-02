/**
 * The main generic class that defines the main properties of the class, T: defines the TYPE to use and I defined the interface that of "content" property will use
 */
var ContentDefinition = /** @class */ (function () {
    function ContentDefinition() {
        /**
         * The content that is shaped on every called method
         */
        this.content = {};
    }
    Object.defineProperty(ContentDefinition.prototype, "end", {
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
     * Break a page
     * @param brk when it break a page (before, after)
     */
    ContentDefinition.prototype.pageBreak = function (brk) {
        this.content.pageBreak = brk;
        return this;
    };
    /**
     * Change the orientation with a page break
     * @param orientation The orientation
     * @param brk the form of page break
     */
    ContentDefinition.prototype.pageOrientationAndBreak = function (orientation, brk) {
        this.content.pageOrientation = orientation;
        this.content.pageBreak = brk;
        return this;
    };
    /**
     * Helper to use with automatically page break
     * @param data Any data
     */
    ContentDefinition.prototype.headlineLevel = function (data) {
        this.content.headlineLevel = data;
        return this;
    };
    /**
     * Sets an ID to an object, This is useful for referencing an object
     * @param id ID
     */
    ContentDefinition.prototype.id = function (id) {
        this.content.id = id;
        return this;
    };
    return ContentDefinition;
}());
export { ContentDefinition };
//# sourceMappingURL=content-definition.js.map