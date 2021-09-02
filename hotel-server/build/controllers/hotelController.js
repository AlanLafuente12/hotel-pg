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
exports.hotelController = void 0;
const mysqlConnection = require('../database');
//import { mysqlConnection } from '../database';
class HotelController {
    listarHoteles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mysqlConnection.query("select * from hotel where estado = 'a'", (error, result) => {
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
    obtenerHotel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params; // destructuring, obtener solo una parte de un objeto
            try {
                yield mysqlConnection.query("select * from hotel where id_hotel = ?", [id], (error, result) => {
                    //console.log(req.usuario[0]);
                    if (error)
                        return res.status(500).json(error);
                    if (result.length > 0)
                        return res.status(200).json(result[0]);
                    return res.status(404).json({ message: 'No se encuentra el hotel' });
                });
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    crearHotel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            try {
                yield mysqlConnection.query("insert into hotel set ?", [req.body], (error, result) => {
                    if (error)
                        res.status(500).json(error);
                    //return res.status(200).send({params: req.body});
                    res.json({
                        message: 'Hotel creado',
                        insertId: result.insertId
                        //direccion: req.body['direccion']
                    });
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    crearHotel2(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            try {
                yield mysqlConnection.beginTransaction((error) => {
                    if (error) {
                        throw error;
                    }
                    mysqlConnection.query('insert into hotel set ?', [req.body], (error, result) => {
                        if (error) {
                            return mysqlConnection.rollback(() => {
                                throw error;
                            });
                        }
                        mysqlConnection.query('select last_insert_id();', (error, result) => {
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
                                return res.status(200).json(res.json({
                                    message: 'Hotel creado',
                                    insertId: result[0]
                                }));
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
    eliminarHotel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield mysqlConnection.query("update hotel set estado = 'e' where id_hotel = ?", [id], (error, result) => {
                    if (error)
                        res.status(500).json(error);
                    res.json({ message: 'Hotel eliminado' });
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    actualizarHotel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield mysqlConnection.query("update hotel set ? where id_hotel = ?", [req.body, id], (error, result) => {
                    if (error)
                        res.status(500).json(error);
                    res.json({ message: 'Hotel actualizado' });
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.hotelController = new HotelController();
