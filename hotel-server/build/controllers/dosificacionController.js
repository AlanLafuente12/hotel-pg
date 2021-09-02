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
exports.dosificacionController = void 0;
const mysqlConnection = require('../database');
class DosificacionController {
    listarDosificaciones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idhotel } = req.params;
            try {
                yield mysqlConnection.query("select * from dosificacion where id_hotel = ? order by last_update desc", [idhotel], (error, result) => {
                    if (error)
                        return result.status(500).json(error);
                    return res.status(200).json(result);
                });
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    obtenerUltimaDosificacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idhotel } = req.params;
            try {
                yield mysqlConnection.query("select * from dosificacion where id_hotel = ? and estado = 'a'", [idhotel], (error, result) => {
                    if (error)
                        return res.status(500).json(error);
                    return res.status(200).json(result[0]);
                });
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    obtenerDosificacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield mysqlConnection.query("select * from dosificacion where id_dosificacion = ?", [id], (error, result) => {
                    if (error)
                        return res.status(500).json(error);
                    if (result.length > 0)
                        return res.status(200).json(result[0]);
                    return res.status(404).json({ message: 'No se encuentra la dosificacion' });
                });
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    crearDosificacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            try {
                yield mysqlConnection.beginTransaction((error) => {
                    if (error) {
                        throw error;
                    }
                    mysqlConnection.query(`call st_close_last_dosificacion(?);`, [req.body.id_hotel], (error, result) => {
                        if (error) {
                            return mysqlConnection.rollback(() => {
                                throw error;
                            });
                        }
                        mysqlConnection.query(`insert into dosificacion set ?`, [req.body], (error, result) => {
                            if (error) {
                                return mysqlConnection.rollback(() => {
                                    throw error;
                                });
                            }
                            mysqlConnection.commit((error) => {
                                if (error) {
                                    return mysqlConnection.rollback(() => {
                                        throw error;
                                    });
                                }
                                return res.status(200).json({ message: 'Dosificacion creada' });
                            });
                        });
                    });
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    eliminarDosificacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield mysqlConnection.query("update dosificacion set estado = 'e' where id_hotel = ?", [id], (error, result) => {
                    if (error)
                        res.status(500).json(error);
                    res.json({ message: 'Dosificacion eliminada' });
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.dosificacionController = new DosificacionController();
