import { Request, Response } from 'express';

const mysqlConnection = require('../database')

class DosificacionController {
    
    public async listarDosificaciones (req: Request, res: Response): Promise<any>{
        const { idhotel } = req.params;
        try {
            await mysqlConnection.query("select * from dosificacion where id_hotel = ? order by last_update desc", [idhotel], (error: any, result: any) => {
                if(error)
                    return result.status(500).json(error);
                return res.status(200).json(result);
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    public async obtenerUltimaDosificacion (req: Request, res: Response): Promise<any>{
        const { idhotel } = req.params;
        try {
            await mysqlConnection.query("select * from dosificacion where id_hotel = ? and estado = 'a'", [idhotel], (error: any, result: any) => {
                if(error)
                    return res.status(500).json(error);
                return res.status(200).json(result[0]);
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }
    
    public async obtenerDosificacion (req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        try {
            await mysqlConnection.query("select * from dosificacion where id_dosificacion = ?", [id], (error: any, result: any) => {
                if(error)
                    return res.status(500).json(error);
                if(result.length > 0)
                    return res.status(200).json(result[0]);
                return res.status(404).json({message:'No se encuentra la dosificacion'});
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    public async crearDosificacion (req: Request, res: Response): Promise<any> {
        console.log(req.body);
        try {
            await mysqlConnection.beginTransaction((error: any) => {
                if (error) { throw error; }
                mysqlConnection.query(`call st_close_last_dosificacion(?);`, [req.body.id_hotel], (error: any, result: any) =>  {
                    if (error) {
                        return mysqlConnection.rollback( () => {
                            throw error;
                        });
                    }
                    mysqlConnection.query(`insert into dosificacion set ?`, [req.body], (error: any, result: any) => {
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
                            return res.status(200).json({message:'Dosificacion creada'});
                        });
                    });
                });
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async eliminarDosificacion (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            await mysqlConnection.query("update dosificacion set estado = 'e' where id_hotel = ?", [id], (error: any, result: any) => {
                if(error)
                    res.status(500).json(error);
                res.json({message:'Dosificacion eliminada'});
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export const dosificacionController = new DosificacionController();