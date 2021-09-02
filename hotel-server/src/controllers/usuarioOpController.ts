import { Request, Response } from 'express';

const mysqlConnection = require('../database');
var validator = require('validator');
var bcrypt = require('bcrypt');

class UsuarioOpController {
    
    public async listarUsuarioOpGerente (req: Request, res: Response): Promise<any>{
        try {
            // await mysqlConnection.query("select * from usuario_operario where estado = 'a' and rol = 'gerente'", (error: any, result: any) => {
            await mysqlConnection.query(
                        `select U.id_usuario_op, U.nombre_usuario, U.nombres, U.primer_apellido, U.segundo_apellido, U.rol, U.id_hotel, H.nombre_hotel 
                        from usuario_operario U
                        inner join hotel H
                        on H.id_hotel = U.id_hotel
                        where U.estado = 'a' and U.rol = 'gerente';`, (error: any, result: any) => {
                    if(error)
                    return result.status(500).json(error);
                return res.status(200).json(result);
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    public async listarUsuarioOpDeHotel (req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        try {
            // await mysqlConnection.query("select * from usuario_operario where id_hotel = ? and estado = 'a'", [id], (error: any, result: any) => {
            await mysqlConnection.query(
                        `select U.id_usuario_op, U.nombre_usuario, U.nombres, U.primer_apellido, U.segundo_apellido, U.rol, U.id_hotel, H.nombre_hotel 
                        from usuario_operario U
                        inner join hotel H
                        on H.id_hotel = U.id_hotel
                        where U.id_hotel = ? and U.estado = 'a';`, [id], (error: any, result: any) => {
                if(error)
                    return result.status(500).json(error);
                return res.status(200).json(result);
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    public async obtenerUsuarioOp (req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        try {
            await mysqlConnection.query("select * from usuario_operario where id_usuario_op = ? and estado = 'a'", [id], (error: any, result: any) => {
                if(error)
                    return res.status(500).json(error);
                if(result.length > 0)
                    return res.status(200).json(result[0]);
                return res.status(404).json({message:'No se encuentra el usuario'});
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    public async crearUsuarioOp (req: Request, res: Response): Promise<any> {
        console.log(req.body);
        try {
            var nombre_usuario = req.body.nombre_usuario; 
            var password = req.body.password;
    
            var validate_nombre_usuario = !validator.isEmpty(nombre_usuario);
            var validate_password = !validator.isEmpty(password);
    
            if (validate_nombre_usuario && validate_password) {
                existeUsuarioOp(nombre_usuario,res)
                    .then(existe => {
                        if (existe) {
                            return res.status(200).send({
                                ok: false,
                                mensaje: "El nombre de usuario ya se encuentra en uso"
                            });
                        } else {
                            req.body.password = bcrypt.hashSync(password,10);
                            mysqlConnection.query("insert into usuario_operario set ?", [req.body], (error: any, result: any) => {
                                if(error)
                                    res.status(500).json(error);
                                res.json({message:'Usuario creado'});
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

    public async eliminarUsuarioOp (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            await mysqlConnection.query("update usuario_operario set estado = 'e' where id_usuario_op = ?", [id], (error: any, result: any) => {
                if(error)
                    res.status(500).json(error);
                res.json({message:'Usuario eliminado'});
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async actualizarUsuarioOp (req: Request, res: Response): Promise<any> {
        console.log(req.body);
        const { id } = req.params;
        try {
            var nombre_usuario = req.body.nombre_usuario;
            var validate_nombre_usuario = !validator.isEmpty(nombre_usuario);
    
            if (validate_nombre_usuario) {
                mysqlConnection.query( `update usuario_operario set 
                                        nombres = ?, 
                                        primer_apellido = ?, 
                                        segundo_apellido = ?, 
                                        rol = ?, 
                                        id_hotel = ? 
                                        where id_usuario_op = ? `, 
                                    [   req.body.nombres,
                                        req.body.primer_apellido, 
                                        req.body.segundo_apellido, 
                                        req.body.rol, 
                                        req.body.id_hotel, 
                                        id
                                    ], (error: any, result: any) => {
                    if(error)
                        res.status(500).json(error);
                    res.json({message:'Usuario actualizado'});
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

async function existeUsuarioOp (nombre_usuario: any, res: Response){
    try {
        return await new Promise((resolve, reject) => {
            mysqlConnection.query("select * from usuario_operario where nombre_usuario = ?", nombre_usuario, (error: any, result: any) => {
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

export const usuarioOpController = new UsuarioOpController();