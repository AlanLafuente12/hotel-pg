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
exports.facturaController = void 0;
const mysqlConnection = require('../database');
class FacturaController {
    listarFacturasHotel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield mysqlConnection.query(`select * from factura where id_hotel = ?`, [id], (error, result) => {
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
    listarFacturasHospedaje(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield mysqlConnection.query(`select * from factura where id_hospedaje = ?`, [id], (error, result) => {
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
    obtenerFactura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield mysqlConnection.query("select * from factura where id_factura = ?", [id], (error, result) => {
                    if (error)
                        return res.status(500).json(error);
                    if (result.length > 0)
                        return res.status(200).json(result[0]);
                    return res.status(404).json({ message: 'No se encuentra la factura' });
                });
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    obtenerDetallesFactura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idfactura } = req.params;
            try {
                yield mysqlConnection.query(`select * from detalle_factura where id_factura = ?`, [idfactura], (error, result) => {
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
    crearFactura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            try {
                yield mysqlConnection.beginTransaction((error) => {
                    if (error) {
                        throw error;
                    }
                    mysqlConnection.query(`insert into factura (
                    fecha_factura,
                    numero_factura, 
                    nit_ci, 
                    razon_social, 
                    total, 
                    codigo_control, 
                    id_usuario_op, 
                    id_hotel, 
                    id_hospedaje, 
                    id_dosificacion)
                    values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`, [req.body.fecha_factura,
                        req.body.numero_factura,
                        req.body.nit_ci,
                        req.body.razon_social,
                        req.body.total,
                        req.body.codigo_control,
                        req.body.id_usuario_op,
                        req.body.id_hotel,
                        req.body.id_hospedaje,
                        req.body.id_dosificacion], (error, result) => {
                        if (error) {
                            return mysqlConnection.rollback(() => {
                                throw error;
                            });
                        }
                        const id_factura = result.insertId;
                        for (const detalle of req.body.detallesFactura) {
                            mysqlConnection.query(`insert into detalle_factura (
                            cantidad, 
                            detalle, 
                            precio_unitario, 
                            subtotal, 
                            id_factura,
                            id_hospedaje_habitacion,
                            id_hospedaje_producto,
                            id_extra)
                            values (?, ?, ?, ?, ?, ?, ?, ?);`, [detalle.cantidad,
                                detalle.detalle,
                                detalle.precio_unitario,
                                detalle.subtotal,
                                id_factura,
                                detalle.id_hospedaje_habitacion,
                                detalle.id_hospedaje_producto,
                                detalle.id_extra], (error, result) => {
                                if (error) {
                                    return mysqlConnection.rollback(() => {
                                        throw error;
                                    });
                                }
                            });
                            if (detalle.id_hospedaje_habitacion !== undefined) {
                                mysqlConnection.query(`update hospedaje_habitacion 
                                set dias_cancelados = dias_cancelados + ?
                                where id_hospedaje_habitacion = ?;`, [detalle.cantidad,
                                    detalle.id_hospedaje_habitacion], (error, result) => {
                                    if (error) {
                                        return mysqlConnection.rollback(() => {
                                            throw error;
                                        });
                                    }
                                });
                            }
                            if (detalle.id_hospedaje_producto !== undefined) {
                                mysqlConnection.query(`update hospedaje_producto 
                                set cantidad_cancelados = cantidad_cancelados + ?
                                where id_hospedaje_producto = ?;`, [detalle.cantidad,
                                    detalle.id_hospedaje_producto], (error, result) => {
                                    if (error) {
                                        return mysqlConnection.rollback(() => {
                                            throw error;
                                        });
                                    }
                                });
                            }
                            if (detalle.id_extra !== undefined) {
                                mysqlConnection.query(`update extra 
                                set cantidad_cancelados = cantidad_cancelados + ?
                                where id_extra = ?;`, [detalle.cantidad,
                                    detalle.id_extra], (error, result) => {
                                    if (error) {
                                        return mysqlConnection.rollback(() => {
                                            throw error;
                                        });
                                    }
                                });
                            }
                        }
                        mysqlConnection.query(`update hospedaje set total_cancelado = total_cancelado + ? 
                        where id_hospedaje = ?`, [req.body.total, req.body.id_hospedaje], (error, result) => {
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
                                return res.status(200).json({ message: 'Factura creada' });
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
    anularFactura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idfactura } = req.params;
            try {
                yield mysqlConnection.beginTransaction((error) => {
                    if (error) {
                        throw error;
                    }
                    mysqlConnection.query(`select * from detalle_factura where id_factura = ?;`, [idfactura], (error, result) => {
                        if (error) {
                            return mysqlConnection.rollback(() => {
                                throw error;
                            });
                        }
                        for (const detalle of result) {
                            if (detalle.id_hospedaje_habitacion !== null) {
                                mysqlConnection.query(`update hospedaje_habitacion 
                                set dias_cancelados = dias_cancelados - ?
                                where id_hospedaje_habitacion = ?;`, [detalle.cantidad,
                                    detalle.id_hospedaje_habitacion], (error, result) => {
                                    if (error) {
                                        return mysqlConnection.rollback(() => {
                                            throw error;
                                        });
                                    }
                                });
                            }
                            if (detalle.id_hospedaje_producto !== null) {
                                mysqlConnection.query(`update hospedaje_producto 
                                set cantidad_cancelados = cantidad_cancelados - ?
                                where id_hospedaje_producto = ?;`, [detalle.cantidad,
                                    detalle.id_hospedaje_producto], (error, result) => {
                                    if (error) {
                                        return mysqlConnection.rollback(() => {
                                            throw error;
                                        });
                                    }
                                });
                            }
                            if (detalle.id_extra !== null) {
                                mysqlConnection.query(`update extra 
                                set cantidad_cancelados = cantidad_cancelados - ?
                                where id_extra = ?;`, [detalle.cantidad,
                                    detalle.id_extra], (error, result) => {
                                    if (error) {
                                        return mysqlConnection.rollback(() => {
                                            throw error;
                                        });
                                    }
                                });
                            }
                        }
                        mysqlConnection.query(`update factura set estado = 'A' where id_factura = ?;`, [idfactura], (error, result) => {
                            if (error) {
                                return mysqlConnection.rollback(() => {
                                    throw error;
                                });
                            }
                            mysqlConnection.query(`select * from factura where id_factura = ?`, [idfactura], (error, result) => {
                                if (error) {
                                    return mysqlConnection.rollback(() => {
                                        throw error;
                                    });
                                }
                                mysqlConnection.query(`update hospedaje set total_cancelado = total_cancelado - ? 
                                where id_hospedaje = ?`, [result[0].total, result[0].id_hospedaje], (error, result) => {
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
                                        return res.status(200).json({ message: 'Factura anulada' });
                                    });
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
    actualizarFactura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield mysqlConnection.query("update factura set ? where id_factura = ?", [req.body, id], (error, result) => {
                    if (error)
                        res.status(500).json(error);
                    res.json({ message: 'Factura actualizada' });
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.facturaController = new FacturaController();
