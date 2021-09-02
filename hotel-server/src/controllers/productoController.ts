import { Request, Response } from 'express';

const mysqlConnection = require('../database')

class ProductoController {
    
    public async listarProductos (req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        try {
            await mysqlConnection.query("select * from producto where estado = 'a' and id_hotel = ? order by nombre_producto asc", [id], (error: any, result: any) => {
                if(error)
                    return result.status(500).json(error);
                return res.status(200).json(result);
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    public async listarProductosDisponibles (req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        try {
            await mysqlConnection.query("select * from producto where estado = 'a' and id_hotel = ? and stock > 0", [id], (error: any, result: any) => {
                if(error)
                    return result.status(500).json(error);
                return res.status(200).json(result);
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    public async obtenerProducto (req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        try {
            await mysqlConnection.query("select * from producto where id_producto = ?", [id], (error: any, result: any) => {
                if(error)
                    return res.status(500).json(error);
                if(result.length > 0)
                    return res.status(200).json(result[0]);
                return res.status(404).json({message:'No se encuentra el producto'});
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    public async crearProducto (req: Request, res: Response): Promise<any> {
        console.log(req.body);
        try {
            await mysqlConnection.query("insert into producto set ?", [req.body], (error: any, result: any) => {
                if(error)
                    res.status(500).json(error);
                res.json({message:'Producto creado'});
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async eliminarProducto (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            await mysqlConnection.query("update producto set estado = 'e' where id_producto = ?", [id], (error: any, result: any) => {
                if(error)
                    res.status(500).json(error);
                res.json({message:'Producto eliminado'});
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async actualizarProducto (req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        try {
            await mysqlConnection.beginTransaction((error: any) => {
                if (error) { throw error; }
                mysqlConnection.query(`select * from producto where id_producto = ?;`, [req.body.id_producto],
                    (error: any, result: any) =>  {
                    if (error) {
                        return mysqlConnection.rollback( () => {
                            throw error;
                        });
                    }
                    if (result[0].stock !== req.body.stock){
                        mysqlConnection.query(
                            `insert into ingreso_producto (
                                cantidad, 
                                id_usuario_op, 
                                id_hotel, 
                                id_producto)
                                values (?, ?, ?, ?);`, 
                                [req.body.stock - result[0].stock, 
                                req.body.id_usuario_op, 
                                req.body.id_hotel, 
                                req.body.id_producto], 
                            (error: any, result: any) =>  {
                            if (error) {
                                return mysqlConnection.rollback( () => {
                                    throw error;
                                });
                            }
                        });
                    }
                    mysqlConnection.query(
                        `update producto set ? where id_producto = ?`, [req.body, id],
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
                            return res.status(200).json({message:'Producto actualizado'});
                        });
                    });
                });
            });
        } catch (error) {
            res.status(500).json(error);
        }

    }
}

export const productoController = new ProductoController();