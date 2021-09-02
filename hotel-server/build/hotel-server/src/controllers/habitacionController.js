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
exports.habitacionController = void 0;
const mysqlConnection = require('../database');
class HabitacionController {
    listarHabitaciones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield mysqlConnection.query(`
                    select  H.id_habitacion, H.nombre_habitacion, H.ocupado, H.estado, 
                            H.last_update, H.id_usuario_op, H.id_hotel, H.id_categoria_habitacion, C.nombre_categoria, C.tarifa_usual
                    from habitacion H
                    inner join categoria_habitacion C on C.id_categoria_habitacion = H.id_categoria_habitacion
                    where H.estado = 'a' and H.id_hotel = ?`, [id], (error, result) => {
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
    listarHabitacionesLibres(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield mysqlConnection.query(`
                    select  H.id_habitacion, H.nombre_habitacion, H.ocupado, H.estado, 
                            H.last_update, H.id_usuario_op, H.id_hotel, H.id_categoria_habitacion, C.nombre_categoria, C.tarifa_usual
                    from habitacion H
                    inner join categoria_habitacion C on C.id_categoria_habitacion = H.id_categoria_habitacion
                    where H.estado = 'a' and H.id_hotel = ? and H.ocupado = 'f'`, [id], (error, result) => {
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
    obtenerHabitacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield mysqlConnection.query("select * from habitacion where id_habitacion = ?", [id], (error, result) => {
                    if (error)
                        return res.status(500).json(error);
                    if (result.length > 0)
                        return res.status(200).json(result[0]);
                    return res.status(404).json({ message: 'No se encuentra la habitacion' });
                });
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    crearHabitacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            try {
                yield mysqlConnection.query("insert into habitacion set ?", [req.body], (error, result) => {
                    if (error)
                        res.status(500).json(error);
                    res.json({ message: 'Habitacion creada' });
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    eliminarHabitacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield mysqlConnection.query("update habitacion set estado = 'e' where id_habitacion = ?", [id], (error, result) => {
                    if (error)
                        res.status(500).json(error);
                    res.json({ message: 'Habitacion eliminada' });
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    actualizarHabitacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield mysqlConnection.query("update habitacion set ? where id_habitacion = ?", [req.body, id], (error, result) => {
                    if (error)
                        res.status(500).json(error);
                    res.json({ message: 'Habitacion actualizada' });
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.habitacionController = new HabitacionController();
