import { Request, Response } from 'express';
const mysqlConnection = require('../database');
//import { mysqlConnection } from '../database';

class HotelController {
    
    public async listarHoteles (req: Request, res: Response): Promise<any>{
        try {
            await mysqlConnection.query("select * from hotel where estado = 'a'", (error: any, result: any) => {
                if(error)
                    return result.status(500).json(error);
                return res.status(200).json(result);
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    public async obtenerHotel (req: Request, res: Response): Promise<any>{
        const { id } = req.params; // destructuring, obtener solo una parte de un objeto
        try {
            await mysqlConnection.query("select * from hotel where id_hotel = ?", [id], (error: any, result: any) => {
                //console.log(req.usuario[0]);
                if(error)
                    return res.status(500).json(error);
                if(result.length > 0)
                    return res.status(200).json(result[0]);
                return res.status(404).json({message:'No se encuentra el hotel'});
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    public async crearHotel (req: Request, res: Response): Promise<any> {
        console.log(req.body);
        try {
            await mysqlConnection.query("insert into hotel set ?", [req.body], (error: any, result: any) => {
                if(error)
                    res.status(500).json(error); 
                //return res.status(200).send({params: req.body});
                res.json({
                    message:'Hotel creado', 
                    insertId: result.insertId
                    //direccion: req.body['direccion']
                });
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async crearHotel2 (req: Request, res: Response): Promise<any> {
        console.log(req.body);
        try {
            await mysqlConnection.beginTransaction((error: any) => {
                if (error) { throw error; }
                mysqlConnection.query('insert into hotel set ?', [req.body], (error: any, result: any) =>  {
                    if (error) {
                        return mysqlConnection.rollback( () => {
                            throw error;
                        });
                    }
                    mysqlConnection.query('select last_insert_id();', (error: any, result: any) => {
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
                            return res.status(200).json(res.json({
                                message:'Hotel creado', 
                                insertId: result[0]
                            }));  
                        });
                    });
                });
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async eliminarHotel (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            await mysqlConnection.query("update hotel set estado = 'e' where id_hotel = ?", [id], (error: any, result: any) => {
                if(error)
                    res.status(500).json(error);
                res.json({message:'Hotel eliminado'});
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async actualizarHotel (req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        try {
            await mysqlConnection.query("update hotel set ? where id_hotel = ?", [req.body, id], (error: any, result: any) => {
                if(error)
                    res.status(500).json(error);
                res.json({message:'Hotel actualizado'});
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export const hotelController = new HotelController();