"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const keys_1 = __importDefault(require("./keys"));
const mysql = require('mysql');
const mysqlConnection = mysql.createConnection(keys_1.default.database);
mysqlConnection.connect((err) => {
    if (err) {
        throw (err);
    }
    console.log('DB is connected');
});
module.exports = mysqlConnection;
