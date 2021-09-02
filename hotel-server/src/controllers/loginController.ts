import { Request, Response, NextFunction } from 'express';

var validator = require('validator');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var SEED = require('../jwt.config').SEED;
const mysqlConnection = require('../database');

class LoginController {

    public async loginAdmin (req: Request, res: Response) {
        var body = req.body;
        var validate_usuario = !validator.isEmpty(body.nombre_usuario);
        var validate_password = !validator.isEmpty(body.password);
      
        if (validate_usuario && validate_password) {
            var sqlLoginAdmin = "select * from administrador where nombre_usuario = ? and estado = 'a'";
            await mysqlConnection.query(sqlLoginAdmin,[body.nombre_usuario], (err: any, loginDB: any) => {
                if (err) {
                    return res.status(500).send({
                        ok: false,
                        mensaje: 'Error al intentar iniciar sesion',
                        errors: err
                    });
                }
                if (loginDB.length === 0 ) {
                    return res.status(400).send({
                        ok: false,
                        mensaje: 'Credenciales incorrectas'
                       
                    });
                }
                if (!bcrypt.compareSync(body.password, loginDB[0].password)) {
                    return res.status(400).send({
                        ok: false,
                        mensaje: 'Credenciales incorrectas'
                      
                    });
                }
                loginDB[0].password = undefined;
                var token = jwt.sign({usuario: loginDB},SEED,{
                    expiresIn: 3600
                });
                return res.status(200).send({
                    ok: true,
                    mensaje: 'Login correcto',
                    usuario : loginDB[0],
                    tokenUsuario: token
                    
                });
            })
        } else {
            return res.status(200).send({
                ok: false,
                message: "Introduzca datos correctos"
            });
        }
    }
    public async cambiarPasswordAdmin (req: Request, res: Response) {
        const { id } = req.params; // destructuring, obtener solo una parte de un objeto

        var validate_password = !validator.isEmpty(req.body.password);
      
        if (validate_password) {
            const password_bcrypt = bcrypt.hashSync(req.body.password,10);
            var sqlLoginAdmin = "update administrador set password = ? where id_administrador = ?";
            await mysqlConnection.query(sqlLoginAdmin,[password_bcrypt, id], (err: any, loginDB: any) => {
                if (err) {
                    return res.status(500).send({
                        ok: false,
                        mensaje: 'Error al intentar cambiar el password',
                        errors: err
                    });
                }
                return res.status(200).send({
                    ok: true,
                    mensaje: 'Cambio de password correcto'
                    
                });
            })
        } else {
            return res.status(200).send({
                ok: false,
                message: "Introduzca datos correctos"
            });
        }
    }


    
    public async loginUser (req: Request, res: Response) {
        var body = req.body;
        var validate_usuario = !validator.isEmpty(body.nombre_usuario);
        var validate_password = !validator.isEmpty(body.password);
      
        if (validate_usuario && validate_password) {
            //var sqlLoginUser = `select * from usuario_operario where nombre_usuario = ? and estado = 'a'`;
            var sqlLoginUser = `
            select U.id_usuario_op, U.nombre_usuario, U.password, U.nombres, U.primer_apellido, U.segundo_apellido, U.rol, U.id_hotel, H.nombre_hotel, H.color
            from usuario_operario U
            inner join hotel H
            on H.id_hotel = U.id_hotel
            where nombre_usuario = ? and U.estado = 'a'`;
            await mysqlConnection.query(sqlLoginUser,[body.nombre_usuario], (err: any, loginDB: any) => {
                if (err) {
                    return res.status(500).send({
                        ok: false,
                        mensaje: 'Error al intentar iniciar sesion',
                        errors: err
                    });
                }
                if (loginDB.length === 0 ) {
                    return res.status(400).send({
                        ok: false,
                        mensaje: 'Credenciales incorrectas'
                       
                    });
                }
                if (!bcrypt.compareSync(body.password, loginDB[0].password)) {
                    return res.status(400).send({
                        ok: false,
                        mensaje: 'Credenciales incorrectas'
                      
                    });
                }
                loginDB[0].password = undefined;
                var token = jwt.sign({usuario: loginDB},SEED,{
                    expiresIn: 3600
                });
                return res.status(200).send({
                    ok: true,
                    mensaje: 'Login correcto',
                    usuario : loginDB[0],
                    tokenUsuario: token
                    
                });
            })
        } else {
            return res.status(200).send({
                ok: false,
                message: "Introduzca datos correctos"
            });
        }
    }
    public async cambiarPasswordUser (req: Request, res: Response) {
        const { id } = req.params; // destructuring, obtener solo una parte de un objeto

        var validate_password = !validator.isEmpty(req.body.password);
      
        if (validate_password) {
            const password_bcrypt = bcrypt.hashSync(req.body.password,10);
            var sqlLoginUser = "update usuario_operario set password = ? where id_usuario_op = ?";
            await mysqlConnection.query(sqlLoginUser,[password_bcrypt, id], (err: any, loginDB: any) => {
                if (err) {
                    return res.status(500).send({
                        ok: false,
                        mensaje: 'Error al intentar cambiar el password',
                        errors: err
                    });
                }
                return res.status(200).send({
                    ok: true,
                    mensaje: 'Cambio de password correcto'
                    
                });
            })
        } else {
            return res.status(200).send({
                ok: false,
                message: "Introduzca datos correctos"
            });
        }
    }
};

export const loginController = new LoginController();