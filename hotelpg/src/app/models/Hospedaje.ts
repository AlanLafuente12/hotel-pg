export interface Hospedaje {
    id_hospedaje?: number;
    nombre_titular?: string;
    total_personas?: number;
    check_in?: string;
    check_out?: string;
    total_cancelado?: string;
    total_cuenta?: string;
    observacion?: string;
    estado?: string;
    last_update?: string;
    id_usuario_op?: number;
    id_hotel?: number;
}

export interface HospedajeProducto {
    id_hospedaje_producto?: number;
    cantidad?: string;
    total?: string;
    cantidad_cancelados?: string;
    id_producto?: number;
    id_hospedaje?: number;
    last_update?: string;
    id_usuario_op?: number;
    // atributos para mostrar en la vista hospedaje
    nombre_producto?: string;
    precio_unitario?: string;
}

export interface HospedajeHabitacion {
    id_hospedaje_habitacion?: number;
    check_in?: string;
    check_out?: string;
    tarifa?: string;
    dias_cancelados?: string;
    estado?: string;
    last_update?: string;
    id_usuario_op?: number;
    id_habitacion?: number;
    id_hospedaje?: number;
    // atributos para mostrar en la vista hospedaje
    nombre_habitacion?: string;
    nombre_categoria?: string;
}
export interface HospedajeHuesped {
    id_huesped?: number;
    id_hospedaje?: number;
    last_update?: string;
    id_usuario_op?: number;
    // atributos para mostrar en la vista hospedaje
    nombres?: string;
    primer_apellido?: string;
    segundo_apellido?: string;
    documento_identidad?: string;
}
