"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
var validator = require('validator');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var SEED = require('../jwt.config').SEED;
const mysqlConnection = require('../database');
class LoginController {
    loginAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var body = req.body;
            var validate_usuario = !validator.isEmpty(body.nombre_usuario);
            var validate_password = !validator.isEmpty(body.password);
            if (validate_usuario && validate_password) {
                var sqlLoginAdmin = "select * from administrador where nombre_usuario = ? and estado = 'a'";
                yield mysqlConnection.query(sqlLoginAdmin, [body.nombre_usuario], (err, loginDB) => {
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
        });
    }
    cambiarPasswordAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params; // destructuring, obtener solo una parte de un objeto
            var validate_password = !validator.isEmpty(req.body.password);
            if (validate_password) {
                const password_bcrypt = bcrypt.hashSync(req.body.password, 10);
                var sqlLoginAdmin = "update administrador set password = ? where id_administrador = ?";
                yield mysqlConnection.query(sqlLoginAdmin, [password_bcrypt, id], (err, loginDB) => {
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
                });
            }
            else {
                return res.status(200).send({
                    ok: false,
                    message: "Introduzca datos correctos"
                });
            }
        });
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                yield mysqlConnection.query(sqlLoginUser, [body.nombre_usuario], (err, loginDB) => {
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
        });
    }
    cambiarPasswordUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params; // destructuring, obtener solo una parte de un objeto
            var validate_password = !validator.isEmpty(req.body.password);
            if (validate_password) {
                const password_bcrypt = bcrypt.hashSync(req.body.password, 10);
                var sqlLoginUser = "update usuario_operario set password = ? where id_usuario_op = ?";
                yield mysqlConnection.query(sqlLoginUser, [password_bcrypt, id], (err, loginDB) => {
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
                });
            }
            else {
                return res.status(200).send({
                    ok: false,
                    message: "Introduzca datos correctos"
                });
            }
        });
    }
}
;
exports.loginController = new LoginController();
