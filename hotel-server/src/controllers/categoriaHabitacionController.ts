import { Request, Response } from 'express';

const mysqlConnection = require('../database')

class CategoriaHabitacionController {
    
    public async listarCategoriasHabitacion (req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        try {
            await mysqlConnection.query("select * from categoria_habitacion where estado = 'a' and id_hotel = ?", [id], (error: any, result: any) => {
                if(error)
                    return result.status(500).json(error);
                return res.status(200).json(result);
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    public async obtenerCategoriaHabitacion (req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        try {
            await mysqlConnection.query("select * from categoria_habitacion where id_categoria_habitacion = ?", [id], (error: any, result: any) => {
                if(error)
                    return res.status(500).json(error);
                if(result.length > 0)
                    return res.status(200).json(result[0]);
                return res.status(404).json({message:'No se encuentra la categoria de habitacion'});
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    public async crearCategoriaHabitacion (req: Request, res: Response): Promise<any> {
        console.log(req.body);
        try {
            await mysqlConnection.query("insert into categoria_habitacion set ?", [req.body], (error: any, result: any) => {
                if(error)
                    res.status(500).json(error);
                res.json({message:'Categoria de habitacion creada'});
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async eliminarCategoriaHabitacion (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            await mysqlConnection.query("update categoria_habitacion set estado = 'e' where id_categoria_habitacion = ?", [id], (error: any, result: any) => {
                if(error)
                    res.status(500).json(error);
                res.json({message:'Categoria de habitacion eliminada'});
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async actualizarCategoriaHabitacion (req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        try {
            await mysqlConnection.query("update categoria_habitacion set ? where id_categoria_habitacion = ?", [req.body, id], (error: any, result: any) => {
                if(error)
                    res.status(500).json(error);
                res.json({message:'Categoria de habitacion actualizada'});
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export const categoriaHabitacionController = new CategoriaHabitacionController();