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
const autenticacion_1 = __importDefault(require("./middlewares/autenticacion"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const facturaRoutes_1 = __importDefault(require("./routes/facturaRoutes"));
const hospedajeHabitacionRoutes_1 = __importDefault(require("./routes/hospedajeHabitacionRoutes"));
const hospedajeProductoRoutes_1 = __importDefault(require("./routes/hospedajeProductoRoutes"));
const extraRoutes_1 = __importDefault(require("./routes/extraRoutes"));
const imageRoutes_1 = __importDefault(require("./routes/imageRoutes"));
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
        this.app.use('/api/admin', autenticacion_1.default, administradorRoutes_1.default);
        this.app.use('/api/usuarioop', autenticacion_1.default, usuarioOpRoutes_1.default);
        this.app.use('/api/categoriahabitacion', autenticacion_1.default, categoriaHabitacionRoutes_1.default);
        this.app.use('/api/huesped', autenticacion_1.default, huespedRoutes_1.default);
        this.app.use('/api/hospedaje', autenticacion_1.default, hospedajeRoutes_1.default);
        this.app.use('/api/hospedajehabitacion', autenticacion_1.default, hospedajeHabitacionRoutes_1.default);
        this.app.use('/api/hospedajeproducto', autenticacion_1.default, hospedajeProductoRoutes_1.default);
        this.app.use('/api/extra', autenticacion_1.default, extraRoutes_1.default);
        this.app.use('/api/factura', autenticacion_1.default, facturaRoutes_1.default);
        this.app.use('/api/dosificacion', autenticacion_1.default, dosificacionRoutes_1.default);
        this.app.use('/api/habitacion', autenticacion_1.default, habitacionRoutes_1.default);
        this.app.use('/api/producto', autenticacion_1.default, productoRoutes_1.default);
        this.app.use('/api/subir', autenticacion_1.default, subirArchivosRoutes_1.default);
        this.app.use('/api/login', loginRoutes_1.default);
        this.app.use('/api/image', imageRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
