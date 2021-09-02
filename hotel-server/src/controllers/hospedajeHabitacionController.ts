import { Request, Response } from 'express';

const mysqlConnection = require('../database')

class HospedajeHabitacionController {
    public async obtenerHospedajeHabitaciones (req: Request, res: Response): Promise<any>{
        const { idhosp } = req.params;//, idhab } = req.params;
        try {
            await mysqlConnection.query(`
                    select HH.id_hospedaje_habitacion, HH.check_in, HH.check_out, HH.tarifa, 
                    HH.dias_cancelados, HH.estado, HH.last_update, HH.id_usuario_op, 
                    HH.id_habitacion, HH.id_hospedaje, HB.nombre_habitacion, CA.nombre_categoria
                    from hospedaje_habitacion HH
                    inner join habitacion HB on HB.id_habitacion = HH.id_habitacion
                    inner join categoria_habitacion CA on CA.id_categoria_habitacion = HB.id_categoria_habitacion
                    where HH.id_hospedaje = ?;`,// and HH.id_habitacion = ?;`, 
                    [idhosp], (error: any, result: any) => {
                if(error)
                    return res.status(500).json(error);
                return res.status(200).json(result);
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    public async crearHospedajeHabitacion (req: Request, res: Response): Promise<any> {
        console.log(req.body);
        try {
            await mysqlConnection.beginTransaction((error: any) => {
                if (error) { throw error; }
                mysqlConnection.query(`insert into hospedaje_habitacion set ?`, [req.body], (error: any, result: any) =>  {
                    if (error) {
                        return mysqlConnection.rollback( () => {
                            throw error;
                        });
                    }
                    mysqlConnection.query(`update habitacion set ocupado = 't' where id_habitacion = ?`, [req.body.id_habitacion], (error: any, result: any) => {
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
                            return res.status(200).json({message:'Hospedaje_habitacion creado'});
                        });
                    });
                });
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async eliminarHospedajeHabitacion (req: Request, res: Response): Promise<void> {
        const { idhosp, idhab } = req.params;
        try {
            await mysqlConnection.beginTransaction((error: any) => {
                if (error) { throw error; }
                mysqlConnection.query(`delete from hospedaje_habitacion where id_hospedaje = ? and id_habitacion = ? and dias_cancelados = 0`, [idhosp, idhab], (error: any, result: any) =>  {
                    if (error) {
                        return mysqlConnection.rollback( () => {
                            throw error;
                        });
                    }
                    mysqlConnection.query(`update habitacion set ocupado = 'f' where id_habitacion = ?`, [idhab], (error: any, result: any) => {
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
                            return res.status(200).json({message:'Hospedaje_habitacion eliminado'});
                        });
                    });
                });
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async actualizarHospedajeHabitacion(req: Request, res: Response): Promise<any> {
        console.log(req.body);
        try {
            await mysqlConnection.query("update hospedaje_habitacion set dias_cancelados = ? where id_hospedaje_habitacion = ?", 
                [req.body.dias_cancelados, req.body.id_hospedaje_habitacion], (error: any, result: any) => {
                if(error)
                    res.status(500).json(error);
                res.json({message:'Hospedaje_habitacion actualizado'});
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export const hospedajeHabitacionController = new HospedajeHabitacionController();