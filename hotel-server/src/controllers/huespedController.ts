import { Request, Response } from 'express';

const mysqlConnection = require('../database')

class HuespedController {
    
    public async listarHuespedes (req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        try {
            await mysqlConnection.query("select * from huesped where estado = 'a' and id_hotel = ?", [id], (error: any, result: any) => {
                if(error)
                    return result.status(500).json(error);
                return res.status(200).json(result);
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    public async obtenerHuesped (req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        try {
            await mysqlConnection.query("select * from huesped where id_huesped = ?", [id], (error: any, result: any) => {
                if(error)
                    return res.status(500).json(error);
                if(result.length > 0)
                    return res.status(200).json(result[0]);
                return res.status(404).json({message:'No se encuentra el huesped'});
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    public async crearHuesped (req: Request, res: Response): Promise<any> {
        console.log(req.body);
        try {
            await mysqlConnection.query("insert into huesped set ?", [req.body], (error: any, result: any) => {
                if(error)
                    res.status(500).json(error);
                res.json({message:'Huesped creado'});
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async eliminarHuesped (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            await mysqlConnection.query("update huesped set estado = 'e' where id_huesped = ?", [id], (error: any, result: any) => {
                if(error)
                    res.status(500).json(error);
                res.json({message:'Huesped eliminado'});
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async actualizarHuesped (req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        try {
            await mysqlConnection.query("update huesped set ? where id_huesped = ?", [req.body, id], (error: any, result: any) => {
                if(error)
                    res.status(500).json(error);
                res.json({message:'Huesped actualizado'});
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export const huespedController = new HuespedController();