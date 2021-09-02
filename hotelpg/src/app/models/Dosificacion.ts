export interface Dosificacion {
    id_dosificacion?: number;
    numero_autorizacion?: number;
    fecha_limite_emision?: string;
    llave_dosificacion?: string;
    numero_inicial_factura?: number;
    numero_final_factura?: number;
    numero_actual_factura?: number;
    leyenda?: string;
    estado?: string;
    last_update?: string;
    id_usuario_op?: number;
    id_hotel?: number;
}
