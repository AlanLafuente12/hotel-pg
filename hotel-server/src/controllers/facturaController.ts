import { json, Request, Response } from 'express';

const mysqlConnection = require('../database')

class FacturaController {
    
    public async listarFacturasHotel (req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        try {
            await mysqlConnection.query(`select * from factura where id_hotel = ?`, [id], (error: any, result: any) => {
                if(error)
                    return result.status(500).json(error);
                return res.status(200).json(result);
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    public async listarFacturasHospedaje (req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        try {
            await mysqlConnection.query(`select * from factura where id_hospedaje = ?`, [id], (error: any, result: any) => {
                if(error)
                    return result.status(500).json(error);
                return res.status(200).json(result);
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    public async obtenerFactura (req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        try {
            await mysqlConnection.query("select * from factura where id_factura = ?", [id], (error: any, result: any) => {
                if(error)
                    return res.status(500).json(error);
                if(result.length > 0)
                    return res.status(200).json(result[0]);
                return res.status(404).json({message:'No se encuentra la factura'});
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    public async obtenerDetallesFactura (req: Request, res: Response): Promise<any>{
        const { idfactura } = req.params;
        try {
            await mysqlConnection.query(`select * from detalle_factura where id_factura = ?`, [idfactura], (error: any, result: any) => {
                if(error)
                    return result.status(500).json(error);
                return res.status(200).json(result);
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    public async crearFactura (req: Request, res: Response): Promise<any> {
        console.log(req.body);
        try {
            await mysqlConnection.beginTransaction((error: any) => {
                if (error) { throw error; }
                mysqlConnection.query(
                    `insert into factura (
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
                    values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`, 
                    [req.body.fecha_factura,
                    req.body.numero_factura,
                    req.body.nit_ci, 
                    req.body.razon_social, 
                    req.body.total, 
                    req.body.codigo_control, 
                    req.body.id_usuario_op, 
                    req.body.id_hotel, 
                    req.body.id_hospedaje, 
                    req.body.id_dosificacion],
                    (error: any, result: any) =>  {
                    if (error) {
                        return mysqlConnection.rollback( () => {
                            throw error;
                        });
                    }
                    const id_factura = result.insertId;
                    for (const detalle of req.body.detallesFactura){
                        mysqlConnection.query(
                            `insert into detalle_factura (
                            cantidad, 
                            detalle, 
                            precio_unitario, 
                            subtotal, 
                            id_factura,
                            id_hospedaje_habitacion,
                            id_hospedaje_producto,
                            id_extra)
                            values (?, ?, ?, ?, ?, ?, ?, ?);`, 
                            [detalle.cantidad, 
                            detalle.detalle, 
                            detalle.precio_unitario, 
                            detalle.subtotal,
                            id_factura,
                            detalle.id_hospedaje_habitacion,
                            detalle.id_hospedaje_producto,
                            detalle.id_extra], 
                            (error: any, result: any) =>  {
                            if (error) {
                                return mysqlConnection.rollback( () => {
                                    throw error;
                                });
                            }
                        });

                        if (detalle.id_hospedaje_habitacion !== undefined){
                            mysqlConnection.query(
                                `update hospedaje_habitacion 
                                set dias_cancelados = dias_cancelados + ?
                                where id_hospedaje_habitacion = ?;`, 
                                [detalle.cantidad, 
                                detalle.id_hospedaje_habitacion], 
                                (error: any, result: any) =>  {
                                if (error) {
                                    return mysqlConnection.rollback( () => {
                                        throw error;
                                    });
                                }
                            });
                        }
                        if (detalle.id_hospedaje_producto !== undefined){
                            mysqlConnection.query(
                                `update hospedaje_producto 
                                set cantidad_cancelados = cantidad_cancelados + ?
                                where id_hospedaje_producto = ?;`, 
                                [detalle.cantidad, 
                                detalle.id_hospedaje_producto], 
                                (error: any, result: any) =>  {
                                if (error) {
                                    return mysqlConnection.rollback( () => {
                                        throw error;
                                    });
                                }
                            });
                        }
                        if (detalle.id_extra !== undefined){
                            mysqlConnection.query(
                                `update extra 
                                set cantidad_cancelados = cantidad_cancelados + ?
                                where id_extra = ?;`, 
                                [detalle.cantidad, 
                                detalle.id_extra], 
                                (error: any, result: any) =>  {
                                if (error) {
                                    return mysqlConnection.rollback( () => {
                                        throw error;
                                    });
                                }
                            });
                        }
                    }
                    mysqlConnection.query(
                        `update hospedaje set total_cancelado = total_cancelado + ? 
                        where id_hospedaje = ?`, 
                        [req.body.total, req.body.id_hospedaje],
                        (error: any, result: any) =>  {
                        if (error) {
                            return mysqlConnection.rollback( () => {
                                throw error;
                            });
                        }
                        mysqlConnection.commit( (error: any) => {
                            if (error) {
                                return mysqlConnection.rollback( () => {
                                    throw error;
                                });
                            }
                            return res.status(200).json({message:'Factura creada'});
                        });
                    });
                });
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async anularFactura (req: Request, res: Response): Promise<any> {
        const { idfactura } = req.params;
        try {
            await mysqlConnection.beginTransaction((error: any) => {
                if (error) { throw error; }
                mysqlConnection.query(`select * from detalle_factura where id_factura = ?;`, [idfactura],
                    (error: any, result: any) =>  {
                    if (error) {
                        return mysqlConnection.rollback( () => {
                            throw error;
                        });
                    }
                    for (const detalle of result){
                        if (detalle.id_hospedaje_habitacion !== null){
                            mysqlConnection.query(
                                `update hospedaje_habitacion 
                                set dias_cancelados = dias_cancelados - ?
                                where id_hospedaje_habitacion = ?;`, 
                                [detalle.cantidad, 
                                detalle.id_hospedaje_habitacion], 
                                (error: any, result: any) =>  {
                                if (error) {
                                    return mysqlConnection.rollback( () => {
                                        throw error;
                                    });
                                }
                            });
                        }
                        if (detalle.id_hospedaje_producto !== null){
                            mysqlConnection.query(
                                `update hospedaje_producto 
                                set cantidad_cancelados = cantidad_cancelados - ?
                                where id_hospedaje_producto = ?;`, 
                                [detalle.cantidad, 
                                detalle.id_hospedaje_producto], 
                                (error: any, result: any) =>  {
                                if (error) {
                                    return mysqlConnection.rollback( () => {
                                        throw error;
                                    });
                                }
                            });
                        }
                        if (detalle.id_extra !== null){
                            mysqlConnection.query(
                                `update extra 
                                set cantidad_cancelados = cantidad_cancelados - ?
                                where id_extra = ?;`, 
                                [detalle.cantidad, 
                                detalle.id_extra], 
                                (error: any, result: any) =>  {
                                if (error) {
                                    return mysqlConnection.rollback( () => {
                                        throw error;
                                    });
                                }
                            });
                        }
                    }
                    mysqlConnection.query(
                        `update factura set estado = 'A' where id_factura = ?;`, [idfactura],
                        (error: any, result: any) =>  {
                        if (error) {
                            return mysqlConnection.rollback( () => {
                                throw error;
                            });
                        }
                        mysqlConnection.query(
                            `select * from factura where id_factura = ?`, [idfactura],
                            (error: any, result: any) =>  {
                            if (error) {
                                return mysqlConnection.rollback( () => {
                                    throw error;
                                });
                            }
                            mysqlConnection.query(
                                `update hospedaje set total_cancelado = total_cancelado - ? 
                                where id_hospedaje = ?`, 
                                [result[0].total, result[0].id_hospedaje],
                                (error: any, result: any) =>  {
                                if (error) {
                                    return mysqlConnection.rollback( () => {
                                        throw error;
                                    });
                                }
                                mysqlConnection.commit( (error: any) => {
                                    if (error) {
                                        return mysqlConnection.rollback( () => {
                                            throw error;
                                        });
                                    }
                                    return res.status(200).json({message:'Factura anulada'});
                                });
                            });
                        });
                    });
                });
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async actualizarFactura (req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        try {
            await mysqlConnection.query("update factura set ? where id_factura = ?", [req.body, id], (error: any, result: any) => {
                if(error)
                    res.status(500).json(error);
                res.json({message:'Factura actualizada'});
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export const facturaController = new FacturaController();