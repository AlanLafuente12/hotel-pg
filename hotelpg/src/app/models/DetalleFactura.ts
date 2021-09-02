export interface DetalleFactura {
    id_detalle_factura?: number;
    cantidad?: string;
    detalle?: string;
    precio_unitario?: string;
    subtotal?: string;
    id_factura?: number;
    id_hospedaje_habitacion?: number;
    id_hospedaje_producto?: number;
    id_extra?: number;
}
