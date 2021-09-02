import { Request, Response } from 'express';

const mysqlConnection = require('../database')

class ExtraController {
    public async obtenerExtras (req: Request, res: Response): Promise<any>{
        const { idhosp } = req.params;
        try {
            await mysqlConnection.query(`select * from extra where id_hospedaje = ?`, [idhosp], (error: any, result: any) => {
                if(error)
                    return res.status(500).json(error);
                return res.status(200).json(result);
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    public async crearExtra (req: Request, res: Response): Promise<any> {
        console.log(req.body);
        try {
            await mysqlConnection.query("insert into extra set ?", [req.body], (error: any, result: any) => {
                if(error)
                    res.status(500).json(error);
                res.json({message:'Extra creado'});
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async eliminarExtra (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            await mysqlConnection.query("delete from extra where id_extra = ?", [id], (error: any, result: any) => {
                if(error)
                    res.status(500).json(error);
                res.json({message:'Extra eliminado'});
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async actualizarExtra(req: Request, res: Response): Promise<any> {
        console.log(req.body);
        try {
            await mysqlConnection.query("update extra set cantidad_cancelados = ? where id_hospedaje = ?", 
                [req.body.cantidad_cancelados, req.body.id_hospedaje], (error: any, result: any) => {
                if(error)
                    res.status(500).json(error);
                res.json({message:'Extra actualizado'});
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export const extraController = new ExtraController();