import { Request, Response } from 'express';

const mysqlConnection = require('../database')

class HospedajeController {
    public async listarHospedajes (req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        try {
            await mysqlConnection.beginTransaction((error: any) => {
                if (error) { throw error; }
                mysqlConnection.query(`call prc_calcular_totales();`, (error: any, result: any) =>  {
                    if (error) {
                        return mysqlConnection.rollback( () => {
                            throw error;
                        });
                    }
                    mysqlConnection.query(`select * from hospedaje where estado = 'a' and id_hotel = ?`, [id], (error: any, result: any) => {
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
                            return res.status(200).json(result);
                        });
                    });
                });
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async obtenerHospedaje (req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        try {
            await mysqlConnection.beginTransaction((error: any) => {
                if (error) { throw error; }
                mysqlConnection.query(`call prc_calcular_totales();`, (error: any, result: any) =>  {
                    if (error) {
                        return mysqlConnection.rollback( () => {
                            throw error;
                        });
                    }
                    mysqlConnection.query("select * from hospedaje where id_hospedaje = ?", [id], (error: any, result: any) => {
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
                            if(result.length > 0)
                                return res.status(200).json(result[0]);
                            return res.status(404).json({message:'No se encuentra el hospedaje'});
                        });
                    });
                });
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async crearHospedaje (req: Request, res: Response): Promise<any> {
        console.log(req.body);
        try {
            await mysqlConnection.query("insert into hospedaje set ?", [req.body], (error: any, result: any) => {
                if(error)
                    res.status(500).json(error);
                res.json({
                    message:'Hospedaje creado', 
                    insertId: result.insertId
                    //direccion: req.body['direccion']
                });
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async eliminarHospedaje (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            await mysqlConnection.query("update hospedaje set estado = 'e' where id_hospedaje = ?", [id], (error: any, result: any) => {
                if(error)
                    res.status(500).json(error);
                res.json({message:'Hospedaje eliminado'});
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async actualizarHospedaje (req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        try {
            await mysqlConnection.query("update hospedaje set ? where id_hospedaje = ?", [req.body, id], (error: any, result: any) => {
                if(error)
                    res.status(500).json(error);
                res.json({message:'Hospedaje actualizado'});
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }


    // HUESPED
    public async obtenerHospedajeHuespedes (req: Request, res: Response): Promise<any>{
        const { idhosp } = req.params; //, idhues } = req.params;
        try {
            await mysqlConnection.query(`
                    select HH.id_hospedaje, HH.id_huesped, HP.nombres, HP.primer_apellido, HP.segundo_apellido, HP.documento_identidad
                    from hospedaje_huesped HH
                    inner join huesped HP on HH.id_huesped = HP.id_huesped
                    where HH.id_hospedaje = ?;`,// and HH.id_huesped = ?;`, 
                    [idhosp], (error: any, result: any) => {
                if(error)
                    return res.status(500).json(error);
                return res.status(200).json(result);
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    public async crearHospedajeHuesped (req: Request, res: Response): Promise<any> {
        console.log(req.body);
        try {
            await mysqlConnection.beginTransaction((error: any) => {
                if (error) { throw error; }
                mysqlConnection.query("insert into hospedaje_huesped set ?", [req.body], (error: any, result: any) =>  {
                    if (error) {
                        return mysqlConnection.rollback( () => {
                            throw error;
                        });
                    }
                    mysqlConnection.query(`update hospedaje set total_personas = total_personas +1 where id_hospedaje = ?`, [req.body.id_hospedaje], (error: any, result: any) => {
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
                            return res.status(200).json({message:'Hospedaje_huesped creado'});
                        });
                    });
                });
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async eliminarHospedajeHuesped (req: Request, res: Response): Promise<void> {
        const { idhosp, idhues } = req.params;
        try {
            await mysqlConnection.beginTransaction((error: any) => {
                if (error) { throw error; }
                mysqlConnection.query("delete from hospedaje_huesped where id_hospedaje = ? and id_huesped = ?", [idhosp, idhues], (error: any, result: any) =>  {
                    if (error) {
                        return mysqlConnection.rollback( () => {
                            throw error;
                        });
                    }
                    mysqlConnection.query(`update hospedaje set total_personas = total_personas -1 where id_hospedaje = ?`, [idhosp], (error: any, result: any) => {
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
                            return res.status(200).json({message:'Hospedaje_huesped eliminado'});
                        });
                    });
                });
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export const hospedajeController = new HospedajeController();