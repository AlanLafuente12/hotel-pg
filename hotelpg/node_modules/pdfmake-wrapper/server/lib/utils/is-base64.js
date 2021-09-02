"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBase64 = void 0;
function isBase64(str) {
    return /^data:image\/(jpeg|png|jpg);base64,/.test(str);
}
exports.isBase64 = isBase64;
//# sourceMappingURL=is-base64.js.map