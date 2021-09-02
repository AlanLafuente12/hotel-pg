import { Request, Response } from 'express';

const mysqlConnection = require('../database')

class HospedajeProductoController {
    public async obtenerHospedajeProductos (req: Request, res: Response): Promise<any>{
        const { idhosp } = req.params; //, idprod } = req.params;
        try {
            await mysqlConnection.query(`
                    select HP.id_hospedaje_producto, HP.cantidad, HP.total, HP.cantidad_cancelados, HP.id_producto, HP.id_hospedaje, PR.nombre_producto, PR.precio_unitario
                    from hospedaje_producto HP
                    inner join producto PR on HP.id_producto = PR.id_producto
                    where HP.id_hospedaje = ?;`,// and HP.id_producto = ?;`, 
                    [idhosp], (error: any, result: any) => {
                if(error)
                    return res.status(500).json(error);
                return res.status(200).json(result);
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    public async crearHospedajeProducto (req: Request, res: Response): Promise<any> {
        console.log(req.body);
        try {
            await mysqlConnection.beginTransaction((error: any) => {
                if (error) { throw error; }
                mysqlConnection.query(`select count(id_hospedaje_producto) as cantidad from hospedaje_producto where id_hospedaje = ? and id_producto = ?;`, [req.body.id_hospedaje, req.body.id_producto], (error: any, result: any) =>  {
                    if (error) {
                        return mysqlConnection.rollback( () => {
                            throw error;
                        });
                    }
                    const cantidad = result[0]['cantidad'];
                    if (cantidad == 0){
                        // crear
                        mysqlConnection.query(`insert into hospedaje_producto set ?`, [req.body], (error: any, result: any) =>  {
                            if (error) {
                                return mysqlConnection.rollback( () => {
                                    throw error;
                                });
                            }
                        });
                    }else{
                        // editar
                        mysqlConnection.query(`
                            update hospedaje_producto set cantidad = cantidad + ?, total = total + ? 
                            where id_hospedaje = ? and id_producto = ?`, 
                            [req.body.cantidad, req.body.total, req.body.id_hospedaje, req.body.id_producto], 
                        (error: any, result: any) =>  {
                            if (error) {
                                return mysqlConnection.rollback( () => {
                                    throw error;
                                });
                            }
                        });
                    }
                    mysqlConnection.query(`update producto set stock = stock - ? where id_producto = ?`, [req.body.cantidad, req.body.id_producto], (error: any, result: any) => {
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
                            return res.status(200).json({message:'Hospedaje_producto creado'});
                        });
                    });
                });
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async eliminarHospedajeProducto (req: Request, res: Response): Promise<void> {
        const { idhosp, idprod } = req.params;
        try {
            await mysqlConnection.beginTransaction((error: any) => {
                if (error) { throw error; }
                mysqlConnection.query(`select sum(cantidad) as cantidad from hospedaje_producto where id_hospedaje = ? and id_producto = ?`, [idhosp, idprod], (error: any, result: any) =>  {
                    if (error) {
                        return mysqlConnection.rollback( () => {
                            throw error;
                        });
                    }
                    const cantidad = result[0]['cantidad'];
                    mysqlConnection.query(`delete from hospedaje_producto where id_hospedaje = ? and id_producto = ? and cantidad_cancelados = 0`, [idhosp, idprod], (error: any, result: any) =>  {//`update producto set stock = stock + ? where id_producto = ?`, [req.body.cantidad, req.body.id_producto], (error: any, result: any) => {
                        if (error) {
                            return mysqlConnection.rollback( () => {
                            throw error;
                            });
                        }
                        mysqlConnection.query(`update producto set stock = stock + ? where id_producto = ?`, [cantidad, idprod], (error: any, result: any) => {
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
                                return res.status(200).json({message:'Hospedaje_producto eliminado'});
                            });
                        });
                    });
                });
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }
    public async actualizarHospedajeProducto(req: Request, res: Response): Promise<any> {
        console.log(req.body);
        try {
            await mysqlConnection.query("update hospedaje_producto set cantidad_cancelados = ? where id_hospedaje_producto = ?", 
                [req.body.cantidad_cancelados, req.body.id_hospedaje_producto], (error: any, result: any) => {
                if(error)
                    res.status(500).json(error);
                res.json({message:'Hospedaje_producto actualizado'});
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export const hospedajeProductoController = new HospedajeProductoController();