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
exports.categoriaHabitacionController = void 0;
const mysqlConnection = require('../database');
class CategoriaHabitacionController {
    listarCategoriasHabitacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mysqlConnection.query("select * from categoria_habitacion where estado = 'a' and id_hotel = ?", [req.body.id_hotel], (error, result) => {
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
    obtenerCategoriaHabitacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield mysqlConnection.query("select * from categoria_habitacion where id_categoria_habitacion = ?", [id], (error, result) => {
                    if (error)
                        return res.status(500).json(error);
                    if (result.length > 0)
                        return res.status(200).json(result[0]);
                    return res.status(404).json({ message: 'no se encuentra la categoria de habitacion' });
                });
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    crearCategoriaHabitacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            try {
                yield mysqlConnection.query("insert into categoria_habitacion set ?", [req.body], (error, result) => {
                    if (error)
                        res.status(500).json(error);
                    res.json({ message: 'categoria de habitacion creada' });
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    eliminarCategoriaHabitacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield mysqlConnection.query("update categoria_habitacion set estado = 'e' where id_categoria_habitacion = ?", [id], (error, result) => {
                    if (error)
                        res.status(500).json(error);
                    res.json({ message: 'categoria de habitacion eliminada' });
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    actualizarCategoriaHabitacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield mysqlConnection.query("update categoria_habitacion set ? where id_categoria_habitacion = ?", [req.body, id], (error, result) => {
                    if (error)
                        res.status(500).json(error);
                    res.json({ message: 'categoria de habitacion actualizada' });
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.categoriaHabitacionController = new CategoriaHabitacionController();
