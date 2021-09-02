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
exports.hospedajeController = void 0;
const mysqlConnection = require('../database');
class HospedajeController {
    listarHospedajes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield mysqlConnection.beginTransaction((error) => {
                    if (error) {
                        throw error;
                    }
                    mysqlConnection.query(`call prc_calcular_totales();`, (error, result) => {
                        if (error) {
                            return mysqlConnection.rollback(() => {
                                throw error;
                            });
                        }
                        mysqlConnection.query(`select * from hospedaje where estado = 'a' and id_hotel = ?`, [id], (error, result) => {
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
                                return res.status(200).json(result);
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
    obtenerHospedaje(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield mysqlConnection.beginTransaction((error) => {
                    if (error) {
                        throw error;
                    }
                    mysqlConnection.query(`call prc_calcular_totales();`, (error, result) => {
                        if (error) {
                            return mysqlConnection.rollback(() => {
                                throw error;
                            });
                        }
                        mysqlConnection.query("select * from hospedaje where id_hospedaje = ?", [id], (error, result) => {
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
                                if (result.length > 0)
                                    return res.status(200).json(result[0]);
                                return res.status(404).json({ message: 'No se encuentra el hospedaje' });
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
    crearHospedaje(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            try {
                yield mysqlConnection.query("insert into hospedaje set ?", [req.body], (error, result) => {
                    if (error)
                        res.status(500).json(error);
                    res.json({
                        message: 'Hospedaje creado',
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
    eliminarHospedaje(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield mysqlConnection.query("update hospedaje set estado = 'e' where id_hospedaje = ?", [id], (error, result) => {
                    if (error)
                        res.status(500).json(error);
                    res.json({ message: 'Hospedaje eliminado' });
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    actualizarHospedaje(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield mysqlConnection.query("update hospedaje set ? where id_hospedaje = ?", [req.body, id], (error, result) => {
                    if (error)
                        res.status(500).json(error);
                    res.json({ message: 'Hospedaje actualizado' });
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    // HUESPED
    obtenerHospedajeHuespedes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idhosp } = req.params; //, idhues } = req.params;
            try {
                yield mysqlConnection.query(`
                    select HH.id_hospedaje, HH.id_huesped, HP.nombres, HP.primer_apellido, HP.segundo_apellido, HP.documento_identidad
                    from hospedaje_huesped HH
                    inner join huesped HP on HH.id_huesped = HP.id_huesped
                    where HH.id_hospedaje = ?;`, // and HH.id_huesped = ?;`, 
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
    crearHospedajeHuesped(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            try {
                yield mysqlConnection.beginTransaction((error) => {
                    if (error) {
                        throw error;
                    }
                    mysqlConnection.query("insert into hospedaje_huesped set ?", [req.body], (error, result) => {
                        if (error) {
                            return mysqlConnection.rollback(() => {
                                throw error;
                            });
                        }
                        mysqlConnection.query(`update hospedaje set total_personas = total_personas +1 where id_hospedaje = ?`, [req.body.id_hospedaje], (error, result) => {
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
                                return res.status(200).json({ message: 'Hospedaje_huesped creado' });
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
    eliminarHospedajeHuesped(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idhosp, idhues } = req.params;
            try {
                yield mysqlConnection.beginTransaction((error) => {
                    if (error) {
                        throw error;
                    }
                    mysqlConnection.query("delete from hospedaje_huesped where id_hospedaje = ? and id_huesped = ?", [idhosp, idhues], (error, result) => {
                        if (error) {
                            return mysqlConnection.rollback(() => {
                                throw error;
                            });
                        }
                        mysqlConnection.query(`update hospedaje set total_personas = total_personas -1 where id_hospedaje = ?`, [idhosp], (error, result) => {
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
                                return res.status(200).json({ message: 'Hospedaje_huesped eliminado' });
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
}
exports.hospedajeController = new HospedajeController();
