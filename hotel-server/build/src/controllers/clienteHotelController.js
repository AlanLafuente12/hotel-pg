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
exports.clienteHotelController = void 0;
const mysqlConnection = require('../database');
class ClienteHotelController {
    listarClientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mysqlConnection.query("select * from cliente_hotel where estado = 'a' and id_hotel = ?", [req.body.id_hotel], (error, result) => {
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
    obtenerCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield mysqlConnection.query("select * from cliente_hotel where id_cliente_hotel = ?", [id], (error, result) => {
                    if (error)
                        return res.status(500).json(error);
                    if (result.length > 0)
                        return res.status(200).json(result[0]);
                    return res.status(404).json({ message: 'no se encuentra el cliente' });
                });
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    crearCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            try {
                yield mysqlConnection.query("insert into cliente_hotel set ?", [req.body], (error, result) => {
                    if (error)
                        res.status(500).json(error);
                    res.json({ message: 'cliente de hotel creado' });
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    eliminarCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield mysqlConnection.query("update cliente_hotel set estado = 'e' where id_cliente_hotel = ?", [id], (error, result) => {
                    if (error)
                        res.status(500).json(error);
                    res.json({ message: 'cliente de hotel eliminado' });
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    actualizarCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield mysqlConnection.query("update cliente_hotel set ? where id_cliente_hotel = ?", [req.body, id], (error, result) => {
                    if (error)
                        res.status(500).json(error);
                    res.json({ message: 'cliente de hotel actualizado' });
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.clienteHotelController = new ClienteHotelController();
