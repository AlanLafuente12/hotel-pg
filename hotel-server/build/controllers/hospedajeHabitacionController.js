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
exports.hospedajeHabitacionController = void 0;
const mysqlConnection = require('../database');
class HospedajeHabitacionController {
    obtenerHospedajeHabitaciones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idhosp } = req.params; //, idhab } = req.params;
            try {
                yield mysqlConnection.query(`
                    select HH.id_hospedaje_habitacion, HH.check_in, HH.check_out, HH.tarifa, 
                    HH.dias_cancelados, HH.estado, HH.last_update, HH.id_usuario_op, 
                    HH.id_habitacion, HH.id_hospedaje, HB.nombre_habitacion, CA.nombre_categoria
                    from hospedaje_habitacion HH
                    inner join habitacion HB on HB.id_habitacion = HH.id_habitacion
                    inner join categoria_habitacion CA on CA.id_categoria_habitacion = HB.id_categoria_habitacion
                    where HH.id_hospedaje = ?;`, // and HH.id_habitacion = ?;`, 
                [idhosp], (error, result) => {
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
    crearHospedajeHabitacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            try {
                yield mysqlConnection.beginTransaction((error) => {
                    if (error) {
                        throw error;
                    }
                    mysqlConnection.query(`insert into hospedaje_habitacion set ?`, [req.body], (error, result) => {
                        if (error) {
                            return mysqlConnection.rollback(() => {
                                throw error;
                            });
                        }
                        mysqlConnection.query(`update habitacion set ocupado = 't' where id_habitacion = ?`, [req.body.id_habitacion], (error, result) => {
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
                                return res.status(200).json({ message: 'Hospedaje_habitacion creado' });
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
    eliminarHospedajeHabitacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idhosp, idhab } = req.params;
            try {
                yield mysqlConnection.beginTransaction((error) => {
                    if (error) {
                        throw error;
                    }
                    mysqlConnection.query(`delete from hospedaje_habitacion where id_hospedaje = ? and id_habitacion = ? and dias_cancelados = 0`, [idhosp, idhab], (error, result) => {
                        if (error) {
                            return mysqlConnection.rollback(() => {
                                throw error;
                            });
                        }
                        mysqlConnection.query(`update habitacion set ocupado = 'f' where id_habitacion = ?`, [idhab], (error, result) => {
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
                                return res.status(200).json({ message: 'Hospedaje_habitacion eliminado' });
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
    actualizarHospedajeHabitacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            try {
                yield mysqlConnection.query("update hospedaje_habitacion set dias_cancelados = ? where id_hospedaje_habitacion = ?", [req.body.dias_cancelados, req.body.id_hospedaje_habitacion], (error, result) => {
                    if (error)
                        res.status(500).json(error);
                    res.json({ message: 'Hospedaje_habitacion actualizado' });
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.hospedajeHabitacionController = new HospedajeHabitacionController();
