"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require('jsonwebtoken');
var SEED = require('../jwt.config').SEED;
var auth = (req, res, next) => {
    // Comprobar si llega autorizacion
    if (!req.headers.authorization) {
        return res.status(403).send({
            ok: false,
            mensaje: 'La peticion no tiene la cabecera de authorization'
        });
    }
    // Limpiar el token y quitar comillas
    var token = req.headers.authorization.replace(/['"]+/g, '');
    // Verificar el token
    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                ok: false,
                mensaje: 'Token incorrecto',
                errors: err
            });
        }
        // Enviamos al usuario que esta ejecutando la accion
        req.usuario = decoded.usuario;
        next();
    });
};
exports.default = auth;
/*
exports.authVerificaSyssADMIN_ROLE = (req,res,next) => {
    var usuario = req.usuario[0];
    console.log(req.usuario);
    if (usuario.rol === 'ADMIN') {
        next();
        return ;
    }
    else{
        return res.status(401).send({
            ok: false,
            mensaje: 'Token incorrecto',
            errors: { message: 'no es administrador, no puede hacer eso'}
        });
    }
}

exports.authVerificaADMINEstablecimiento = (req,res,next) => {

    var usuario = req.usuario[0];
    var id= req.params.id;
    console.log(req.usuario);
    if (usuario.rolUsuario === 'ADMINISTRADOR') {
        next();
        return ;
    }
    else{
        return res.status(401).send({
            ok: false,
            mensaje: 'Token incorrecto',
            errors: { message: 'no es administradors, no puede hacer eo'}
        });
    }
}
*/ 
