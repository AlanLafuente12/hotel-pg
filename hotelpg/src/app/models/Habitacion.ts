export interface Habitacion {
    id_habitacion?: number;
    nombre_habitacion?: string;
    ocupado?: string;
    estado?: string;
    last_update?: string;
    id_usuario_op?: number;
    id_categoria_habitacion?: number;
    id_hotel?: number;
    // no es parte del objeto
    nombre_categoria?: string;
    tarifa_usual?: string;
}
