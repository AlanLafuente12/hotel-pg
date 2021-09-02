import { DetalleFactura } from './DetalleFactura';

export interface Factura {
    id_factura?: number;
    fecha_factura?: string;
    numero_factura?: string;
    estado?: string;
    nit_ci?: string;
    razon_social?: string;
    total?: string;
    codigo_control?: string;
    motivo_anulacion?: string;
    last_update?: string;
    id_usuario_op?: number;
    id_hotel?: number;
    id_hospedaje?: number;
    id_dosificacion?: number;
    detallesFactura?: DetalleFactura[];
}
