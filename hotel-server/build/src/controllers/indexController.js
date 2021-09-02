"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
class IndexController {
    index(req, res) {
        res.json({ text: 'API Is /api/hotel' });
        //res.send("Hello from indexController");
    }
}
exports.indexController = new IndexController();
