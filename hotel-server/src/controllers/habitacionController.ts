import { Request, Response } from 'express';

const mysqlConnection = require('../database')

class HabitacionController {
    
    public async listarHabitaciones (req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        try {
            await mysqlConnection.query(`
                    select  H.id_habitacion, H.nombre_habitacion, H.ocupado, H.estado, 
                            H.last_update, H.id_usuario_op, H.id_hotel, H.id_categoria_habitacion, C.nombre_categoria, C.tarifa_usual
                    from habitacion H
                    inner join categoria_habitacion C on C.id_categoria_habitacion = H.id_categoria_habitacion
                    where H.estado = 'a' and H.id_hotel = ? order by H.nombre_habitacion asc`,
                    [id], (error: any, result: any) => {
                if(error)
                    return result.status(500).json(error);
                return res.status(200).json(result);
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    public async listarHabitacionesLibres (req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        try {
            await mysqlConnection.query(`
                    select  H.id_habitacion, H.nombre_habitacion, H.ocupado, H.estado, 
                            H.last_update, H.id_usuario_op, H.id_hotel, H.id_categoria_habitacion, C.nombre_categoria, C.tarifa_usual
                    from habitacion H
                    inner join categoria_habitacion C on C.id_categoria_habitacion = H.id_categoria_habitacion
                    where H.estado = 'a' and H.id_hotel = ? and H.ocupado = 'f'`,
                    [id], (error: any, result: any) => {
                if(error)
                    return result.status(500).json(error);
                return res.status(200).json(result);
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    public async obtenerHabitacion (req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        try {
            await mysqlConnection.query("select * from habitacion where id_habitacion = ?", [id], (error: any, result: any) => {
                if(error)
                    return res.status(500).json(error);
                if(result.length > 0)
                    return res.status(200).json(result[0]);
                return res.status(404).json({message:'No se encuentra la habitacion'});
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    public async crearHabitacion (req: Request, res: Response): Promise<any> {
        console.log(req.body);
        try {
            await mysqlConnection.query("insert into habitacion set ?", [req.body], (error: any, result: any) => {
                if(error)
                    res.status(500).json(error);
                res.json({message:'Habitacion creada'});
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async eliminarHabitacion (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            await mysqlConnection.query("update habitacion set estado = 'e' where id_habitacion = ?", [id], (error: any, result: any) => {
                if(error)
                    res.status(500).json(error);
                res.json({message:'Habitacion eliminada'});
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async actualizarHabitacion (req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        try {
            await mysqlConnection.query("update habitacion set ? where id_habitacion = ?", [req.body, id], (error: any, result: any) => {
                if(error)
                    res.status(500).json(error);
                res.json({message:'Habitacion actualizada'});
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export const habitacionController = new HabitacionController();