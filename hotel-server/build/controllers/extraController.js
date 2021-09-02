"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extraController = void 0;
const mysqlConnection = require('../database');
class ExtraController {
    obtenerExtras(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idhosp } = req.params;
            try {
                yield mysqlConnection.query(`select * from extra where id_hospedaje = ?`, [idhosp], (error, result) => {
                    if (error)
                        return res.status(500).json(error);
                    return res.status(200).json(result);
                });
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    crearExtra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            try {
                yield mysqlConnection.query("insert into extra set ?", [req.body], (error, result) => {
                    if (error)
                        res.status(500).json(error);
                    res.json({ message: 'Extra creado' });
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    eliminarExtra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield mysqlConnection.query("delete from extra where id_extra = ?", [id], (error, result) => {
                    if (error)
                        res.status(500).json(error);
                    res.json({ message: 'Extra eliminado' });
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    actualizarExtra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            try {
                yield mysqlConnection.query("update extra set cantidad_cancelados = ? where id_hospedaje = ?", [req.body.cantidad_cancelados, req.body.id_hospedaje], (error, result) => {
                    if (error)
                        res.status(500).json(error);
                    res.json({ message: 'Extra actualizado' });
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.extraController = new ExtraController();
