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
exports.usuarioOpController = void 0;
const mysqlConnection = require('../database');
var validator = require('validator');
var bcrypt = require('bcrypt');
class UsuarioOpController {
    listarUsuarioOpGerente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // await mysqlConnection.query("select * from usuario_operario where estado = 'a' and rol = 'gerente'", (error: any, result: any) => {
                yield mysqlConnection.query(`select U.id_usuario_op, U.nombre_usuario, U.nombres, U.primer_apellido, U.segundo_apellido, U.rol, U.id_hotel, H.nombre_hotel 
                        from usuario_operario U
                        inner join hotel H
                        on H.id_hotel = U.id_hotel
                        where U.estado = 'a' and U.rol = 'gerente';`, (error, result) => {
                    if (error)
                        return result.status(500).json(error);
                    return res.status(200).json(result);
                });
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    listarUsuarioOpDeHotel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                // await mysqlConnection.query("select * from usuario_operario where id_hotel = ? and estado = 'a'", [id], (error: any, result: any) => {
                yield mysqlConnection.query(`select U.id_usuario_op, U.nombre_usuario, U.nombres, U.primer_apellido, U.segundo_apellido, U.rol, U.id_hotel, H.nombre_hotel 
                        from usuario_operario U
                        inner join hotel H
                        on H.id_hotel = U.id_hotel
                        where U.id_hotel = ? and U.estado = 'a';`, [id], (error, result) => {
                    if (error)
                        return result.status(500).json(error);
                    return res.status(200).json(result);
                });
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    obtenerUsuarioOp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield mysqlConnection.query("select * from usuario_operario where id_usuario_op = ? and estado = 'a'", [id], (error, result) => {
                    if (error)
                        return res.status(500).json(error);
                    if (result.length > 0)
                        return res.status(200).json(result[0]);
                    return res.status(404).json({ message: 'No se encuentra el usuario' });
                });
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    crearUsuarioOp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            try {
                var nombre_usuario = req.body.nombre_usuario;
                var password = req.body.password;
                var validate_nombre_usuario = !validator.isEmpty(nombre_usuario);
                var validate_password = !validator.isEmpty(password);
                if (validate_nombre_usuario && validate_password) {
                    existeUsuarioOp(nombre_usuario, res)
                        .then(existe => {
                        if (existe) {
                            return res.status(200).send({
                                ok: false,
                                mensaje: "El nombre de usuario ya se encuentra en uso"
                            });
                        }
                        else {
                            req.body.password = bcrypt.hashSync(password, 10);
                            mysqlConnection.query("insert into usuario_operario set ?", [req.body], (error, result) => {
                                if (error)
                                    res.status(500).json(error);
                                res.json({ message: 'Usuario creado' });
                            });
                        }
                    });
                }
                else {
                    return res.status(200).send({
                        ok: false,
                        message: "Datos incorrectos"
                    });
                }
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    eliminarUsuarioOp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield mysqlConnection.query("update usuario_operario set estado = 'e' where id_usuario_op = ?", [id], (error, result) => {
                    if (error)
                        res.status(500).json(error);
                    res.json({ message: 'Usuario eliminado' });
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    actualizarUsuarioOp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { id } = req.params;
            try {
                var nombre_usuario = req.body.nombre_usuario;
                var validate_nombre_usuario = !validator.isEmpty(nombre_usuario);
                if (validate_nombre_usuario) {
                    mysqlConnection.query(`update usuario_operario set 
                                        nombres = ?, 
                                        primer_apellido = ?, 
                                        segundo_apellido = ?, 
                                        rol = ?, 
                                        id_hotel = ? 
                                        where id_usuario_op = ? `, [req.body.nombres,
                        req.body.primer_apellido,
                        req.body.segundo_apellido,
                        req.body.rol,
                        req.body.id_hotel,
                        id
                    ], (error, result) => {
                        if (error)
                            res.status(500).json(error);
                        res.json({ message: 'Usuario actualizado' });
                    });
                }
                else {
                    return res.status(200).send({
                        ok: false,
                        message: "Datos incorrectos"
                    });
                }
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
function existeUsuarioOp(nombre_usuario, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield new Promise((resolve, reject) => {
                mysqlConnection.query("select * from usuario_operario where nombre_usuario = ?", nombre_usuario, (error, result) => {
                    if (error) {
                        return res.status(500).send({
                            ok: false,
                            message: "Error al verificar el nombre de usuario"
                        });
                    }
                    if (result.length > 0) {
                        resolve(true);
                    }
                    resolve(false);
                });
            });
        }
        catch (error) {
            res.status(500).json(error);
        }
    });
}
exports.usuarioOpController = new UsuarioOpController();
