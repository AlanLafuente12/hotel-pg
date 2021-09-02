"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const hotelRoutes_1 = __importDefault(require("./routes/hotelRoutes"));
const categoriaHabitacionRoutes_1 = __importDefault(require("./routes/categoriaHabitacionRoutes"));
const huespedRoutes_1 = __importDefault(require("./routes/huespedRoutes"));
const dosificacionRoutes_1 = __importDefault(require("./routes/dosificacionRoutes"));
const habitacionRoutes_1 = __importDefault(require("./routes/habitacionRoutes"));
const hospedajeRoutes_1 = __importDefault(require("./routes/hospedajeRoutes"));
const productoRoutes_1 = __importDefault(require("./routes/productoRoutes"));
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
const subirArchivosRoutes_1 = __importDefault(require("./routes/subirArchivosRoutes"));
const administradorRoutes_1 = __importDefault(require("./routes/administradorRoutes"));
const usuarioOpRoutes_1 = __importDefault(require("./routes/usuarioOpRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const facturaRoutes_1 = __importDefault(require("./routes/facturaRoutes"));
const hospedajeHabitacionRoutes_1 = __importDefault(require("./routes/hospedajeHabitacionRoutes"));
const hospedajeProductoRoutes_1 = __importDefault(require("./routes/hospedajeProductoRoutes"));
//import fileUpload = require('express-fileupload');
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', 3000);
        this.app.use(morgan_1.default("dev"));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_fileupload_1.default());
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        //this.app.use('/api/hotel', auth, hotelRoutes);
        this.app.use('/api/hotel', hotelRoutes_1.default);
        this.app.use('/api/admin', administradorRoutes_1.default);
        this.app.use('/api/usuarioop', usuarioOpRoutes_1.default);
        this.app.use('/api/categoriahabitacion', categoriaHabitacionRoutes_1.default);
        this.app.use('/api/huesped', huespedRoutes_1.default);
        this.app.use('/api/hospedaje', hospedajeRoutes_1.default);
        this.app.use('/api/hospedajehabitacion', hospedajeHabitacionRoutes_1.default);
        this.app.use('/api/hospedajeproducto', hospedajeProductoRoutes_1.default);
        this.app.use('/api/factura', facturaRoutes_1.default);
        this.app.use('/api/dosificacion', dosificacionRoutes_1.default);
        this.app.use('/api/habitacion', habitacionRoutes_1.default);
        this.app.use('/api/producto', productoRoutes_1.default);
        this.app.use('/api/login', loginRoutes_1.default);
        this.app.use('/api/subir', subirArchivosRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
