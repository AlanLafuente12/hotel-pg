"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
var validator = require('validator');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var SEED = require('../jwt.config').SEED;
const mysqlConnection = require('../database');
class LoginController {
    loginAdmin(req, res) {
        var body = req.body;
        var validate_usuario = !validator.isEmpty(body.nombre_usuario);
        var validate_password = !validator.isEmpty(body.password);
        if (validate_usuario && validate_password) {
            var sqlLoginAdmin = "SELECT * from administrador where nombre_usuario = ? and estado = 'a'";
            mysqlConnection.query(sqlLoginAdmin, [body.nombre_usuario], (err, loginDB) => {
                if (err) {
                    return res.status(500).send({
                        ok: false,
                        mensaje: 'Error al intentar iniciar sesion',
                        errors: err
                    });
                }
                if (loginDB.length === 0) {
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
                var token = jwt.sign({ usuario: loginDB }, SEED, {
                    expiresIn: 3600
                });
                return res.status(200).send({
                    ok: true,
                    mensaje: 'Login correcto',
                    usuario: loginDB[0],
                    tokenUsuario: token
                });
            });
        }
        else {
            return res.status(200).send({
                ok: false,
                message: "Introduzca datos correctos"
            });
        }
    }
}
;
exports.loginController = new LoginController();
