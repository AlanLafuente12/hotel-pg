import { Request, Response } from 'express';

const mysqlConnection = require('../database');
var validator = require('validator');
var bcrypt = require('bcrypt');

class AdministradorController {
    
    public async listarAdmin (req: Request, res: Response): Promise<any>{
        try {
            await mysqlConnection.query("select * from administrador where estado = 'a'", (error: any, result: any) => {
                if(error)
                    return result.status(500).json(error);
                return res.status(200).json(result);
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    public async obtenerAdmin (req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        try {
            await mysqlConnection.query("select * from administrador where id_administrador = ? and estado = 'a'", [id], (error: any, result: any) => {
                if(error)
                    return res.status(500).json(error);
                if(result.length > 0)
                    return res.status(200).json(result[0]);
                return res.status(404).json({message:'No se encuentra el admin'});
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    public async crearAdmin (req: Request, res: Response): Promise<any> {
        console.log(req.body);
        try {
            var nombre_usuario = req.body.nombre_usuario; 
            var password = req.body.password;
    
            var validate_nombre_usuario = !validator.isEmpty(nombre_usuario);
            var validate_password = !validator.isEmpty(password);
    
            if (validate_nombre_usuario && validate_password) {
                existeAdmin(nombre_usuario,res)
                    .then(existe => {
                        if (existe) {
                            return res.status(200).send({
                                ok: false,
                                mensaje: "El nombre de usuario ya se encuentra en uso"
                            });
                        } else {
                            var password_encriptado = bcrypt.hashSync(password,10);
                            mysqlConnection.query("insert into administrador (nombre_usuario, password) values (?, ?);", [nombre_usuario, password_encriptado], (error: any, result: any) => {
                                if(error)
                                    res.status(500).json(error);
                                res.json({message:'Admin creado'});
                            });
                        }
    
                    });
            }else{
                return res.status(200).send({
                    ok: false,
                    message: "Datos incorrectos"
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async eliminarAdmin (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            await mysqlConnection.query("update administrador set estado = 'e' where id_administrador = ?", [id], (error: any, result: any) => {
                if(error)
                    res.status(500).json(error);
                res.json({message:'Admin eliminado'});
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async actualizarAdmin (req: Request, res: Response): Promise<any> {
        console.log(req.body);
        const { id } = req.params;
        try {
            var nombre_usuario = req.body.nombre_usuario;
            var validate_nombre_usuario = !validator.isEmpty(nombre_usuario);
    
            if (validate_nombre_usuario) {
                existeAdmin(nombre_usuario,res)
                    .then(existe => {
                        if (existe) {
                            return res.status(200).send({
                                ok: false,
                                mensaje: "El nombre de usuario ya se encuentra en uso"
                            });
                        } else {
                            mysqlConnection.query("update administrador set nombre_usuario = ? where id_administrador = ?", [nombre_usuario, id], (error: any, result: any) => {
                                if(error)
                                    res.status(500).json(error);
                                res.json({message:'Admin actualizado'});
                            });
                        }
    
                    });
            }else{
                return res.status(200).send({
                    ok: false,
                    message: "Datos incorrectos"
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

}

async function existeAdmin (nombre_usuario: any, res: Response){
    try {
        return await new Promise((resolve, reject) => {
            mysqlConnection.query("select * from administrador where nombre_usuario = ?", nombre_usuario, (error: any, result: any) => {
                if(error){   
                    return res.status(500).send({
                        ok: false,
                        message: "Error al verificar el nombre de usuario"
                    });
                }
                if(result.length > 0){
                    resolve(true);    
                }
                resolve(false);    
            });
        });
    } catch (error) {
        res.status(500).json(error);
    }
}

export const administradorController = new AdministradorController();