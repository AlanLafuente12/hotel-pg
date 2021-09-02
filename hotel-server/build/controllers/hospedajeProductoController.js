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
exports.hospedajeProductoController = void 0;
const mysqlConnection = require('../database');
class HospedajeProductoController {
    obtenerHospedajeProductos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idhosp } = req.params; //, idprod } = req.params;
            try {
                yield mysqlConnection.query(`
                    select HP.id_hospedaje_producto, HP.cantidad, HP.total, HP.cantidad_cancelados, HP.id_producto, HP.id_hospedaje, PR.nombre_producto, PR.precio_unitario
                    from hospedaje_producto HP
                    inner join producto PR on HP.id_producto = PR.id_producto
                    where HP.id_hospedaje = ?;`, // and HP.id_producto = ?;`, 
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
    crearHospedajeProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            try {
                yield mysqlConnection.beginTransaction((error) => {
                    if (error) {
                        throw error;
                    }
                    mysqlConnection.query(`select count(id_hospedaje_producto) as cantidad from hospedaje_producto where id_hospedaje = ? and id_producto = ?;`, [req.body.id_hospedaje, req.body.id_producto], (error, result) => {
                        if (error) {
                            return mysqlConnection.rollback(() => {
                                throw error;
                            });
                        }
                        const cantidad = result[0]['cantidad'];
                        if (cantidad == 0) {
                            // crear
                            mysqlConnection.query(`insert into hospedaje_producto set ?`, [req.body], (error, result) => {
                                if (error) {
                                    return mysqlConnection.rollback(() => {
                                        throw error;
                                    });
                                }
                            });
                        }
                        else {
                            // editar
                            mysqlConnection.query(`
                            update hospedaje_producto set cantidad = cantidad + ?, total = total + ? 
                            where id_hospedaje = ? and id_producto = ?`, [req.body.cantidad, req.body.total, req.body.id_hospedaje, req.body.id_producto], (error, result) => {
                                if (error) {
                                    return mysqlConnection.rollback(() => {
                                        throw error;
                                    });
                                }
                            });
                        }
                        mysqlConnection.query(`update producto set stock = stock - ? where id_producto = ?`, [req.body.cantidad, req.body.id_producto], (error, result) => {
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
                                return res.status(200).json({ message: 'Hospedaje_producto creado' });
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
    eliminarHospedajeProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idhosp, idprod } = req.params;
            try {
                yield mysqlConnection.beginTransaction((error) => {
                    if (error) {
                        throw error;
                    }
                    mysqlConnection.query(`select sum(cantidad) as cantidad from hospedaje_producto where id_hospedaje = ? and id_producto = ?`, [idhosp, idprod], (error, result) => {
                        if (error) {
                            return mysqlConnection.rollback(() => {
                                throw error;
                            });
                        }
                        const cantidad = result[0]['cantidad'];
                        mysqlConnection.query(`delete from hospedaje_producto where id_hospedaje = ? and id_producto = ? and cantidad_cancelados = 0`, [idhosp, idprod], (error, result) => {
                            if (error) {
                                return mysqlConnection.rollback(() => {
                                    throw error;
                                });
                            }
                            mysqlConnection.query(`update producto set stock = stock + ? where id_producto = ?`, [cantidad, idprod], (error, result) => {
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
                                    return res.status(200).json({ message: 'Hospedaje_producto eliminado' });
                                });
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
    actualizarHospedajeProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            try {
                yield mysqlConnection.query("update hospedaje_producto set cantidad_cancelados = ? where id_hospedaje_producto = ?", [req.body.cantidad_cancelados, req.body.id_hospedaje_producto], (error, result) => {
                    if (error)
                        res.status(500).json(error);
                    res.json({ message: 'Hospedaje_producto actualizado' });
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.hospedajeProductoController = new HospedajeProductoController();
