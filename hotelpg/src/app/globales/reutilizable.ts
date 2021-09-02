// modelos
import { Factura } from '../models/Factura';
import { Hotel } from '../models/Hotel';
import { Dosificacion } from '../models/Dosificacion';
// modulos
import { PdfMakeWrapper, Txt, Table, Columns, Ul, QR } from 'pdfmake-wrapper';
import pdfFonts from 'pdfmake/build/vfs_fonts';
PdfMakeWrapper.setFonts(pdfFonts);
declare var require: any;
const convertir = require('numero-a-letras');

export abstract class Reutilizables{
    /*
    constructor(private hotelService: HotelService,
                private dosificacionService: DosificacionService) { }

    public getHotel(idHotel: number): Hotel{
        let hotel = {};
        this.hotelService.getHotel(idHotel.toString())
        .subscribe(
          (res: any) => {
            hotel = res;
          },
          (err: any) => {
            console.log(err);
          }
        );
        return hotel;
    }
    public getDosificacion(idDosificacion: number): Dosificacion{
        let dosificacion = {};
        this.dosificacionService.getDosificacion(idDosificacion.toString())
        .subscribe(
          (res: any) => {
            dosificacion = res;
          },
          (err: any) => {
            console.log(err);
          }
        );
        return dosificacion;
    }
    */
    public static generatePDF(factura: Factura, hotel: Hotel, dosificacion: Dosificacion): void{
        /*
        hotel = this.getHotel(factura.id_hotel);
        dosificacion = this.getDosificacion(factura.id_dosificacion);
        */
        const pdf = new PdfMakeWrapper();
        pdf.pageMargins([ 100, 40, 100, 20 ]);
        // Encabezado
        pdf.add(new Columns(
          [
            new Ul([
                'Hotel ' + hotel.nombre_hotel,
                hotel.direccion,
                hotel.departamento + '-Bolivia'
            ]).type('none').width(220).fontSize(11).end,
            new Txt('FACTURA').alignment('center').decoration('underline').fontSize(20).bold().width(170).end,
            new Ul([
                'NIT:',
                'FACTURA No:',
                'AUTORIZACIÓN No:',
                'ACTIVIDAD ECONÓMICA:'
            ]).type('none').width(140).fontSize(11).end,
            new Ul([
                hotel.nit,
                factura.numero_factura,
                dosificacion.numero_autorizacion,
                'Servicios'
            ]).type('none').width(100).fontSize(11).end
          ]).columnGap(10).end);
        // Datos factura
        const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        pdf.add('\n');
        pdf.add(new Columns(
          [
            new Txt('').width(80).end,
            new Ul([
                'Lugar y fecha:',
                'NIT:',
                'Razón Social:'
            ]).type('none').width(120).fontSize(12).end,
            new Ul([
                hotel.departamento + ', ' +
                  factura.fecha_factura.substring(8, 10) + ' de ' +
                  meses[parseInt(factura.fecha_factura.substring(6, 8), 10) - 1] + ' del ' +
                  factura.fecha_factura.substring(0, 4),
                factura.nit_ci,
                factura.razon_social
            ]).type('none').width(250).fontSize(12).end
          ]).columnGap(10).end);
        // Detalle factura
        pdf.add('\n');
        pdf.add(
          new Table([
            [   new Txt('Cantidad').bold().alignment('left').end,
                new Txt('Detalle').bold().alignment('left').end,
                new Txt('Precio Unitario').bold().alignment('right').end,
                new Txt('Subtotal').bold().alignment('right').end
            ],
            ...factura.detallesFactura.map(row =>
            [
                new Txt(row.cantidad).alignment('left').end,
                new Txt(row.detalle).alignment('left').end,
                new Txt(parseFloat(row.precio_unitario).toFixed(2)).alignment('right').end,
                new Txt(parseFloat(row.subtotal).toFixed(2)).alignment('right').end
            ]),
            [
                null,
                null,
                new Txt('Total Bs.').bold().alignment('right').end,
                new Txt(parseFloat(factura.total).toFixed(2)).alignment('right').end
            ]
          ]).widths([ '*', 250, '*', '*' ]).heights( rowIndex => rowIndex % 1 === 0 ? 16 : 0  ).layout('lightHorizontalLines').end
        );
        // Resumen
        pdf.add('\n');
        pdf.add(new Txt('Son ' +
            (convertir.NumerosALetras(factura.total).toUpperCase()).replace('PESOS', 'Bolivianos')).alignment('left').end);
        // Codigo de control / fecha limite de emision / Codigo QR
        pdf.add('\n');
        pdf.add(new Columns(
          [
            new Txt('').width(80).end,
            new Ul([
                '\n',
                'CÓDIGO DE CONTROL:',
                'FECHA LÍMITE DE EMISIÓN:'
            ]).type('none').width(180).fontSize(12).end,
            new Ul([
                '\n',
                factura.codigo_control,
                dosificacion.fecha_limite_emision.substring(8, 10) + '/' +
                dosificacion.fecha_limite_emision.substring(5, 7) + '/' +
                dosificacion.fecha_limite_emision.substring(0, 4)
            ]).type('none').width(160).fontSize(12).end,
            new QR( hotel.nit + '|' +
                    factura.numero_factura + '|' +
                    dosificacion.numero_autorizacion + '|' +
                    factura.fecha_factura.substring(8, 10) + '/' +
                    factura.fecha_factura.substring(5, 7) + '/' +
                    factura.fecha_factura.substring(0, 4) + '|' +
                    factura.total + '|0|' +
                    factura.codigo_control + '|0|0|0|0|0').fit(90).width(120).alignment('right').end
          ]).columnGap(10).end);
        // Leyendas general
        pdf.add('\n');
        pdf.add(
            new Txt('"ESTA FACTURA CONTRIBUYE AL DESARROLLO DEL PAÍS. EL USO ILÍCITO DE ÉSTA SERÁ SANCIONADO DE ACUERDO A LEY”')
            .alignment('center').end);
        // Leyenda dosificacion
        pdf.add('\n');
        if (dosificacion.leyenda === null){
            pdf.add(
                new Txt('"Ley Nº 453: Los servicios deben suministrarse en condiciones de inocuidad calidad y seguridad"')
                .alignment('center').fontSize(11).end);
        }else{
            pdf.add(
                new Txt(`"${dosificacion.leyenda}"`)
                .alignment('center').fontSize(11).end);
        }
        // Especificaciones pdf
        pdf.info({
            title: 'Factura',
            author: 'HotelPG',
            subject: 'Hotel ' + hotel.nombre_hotel,
        });
        pdf.pageSize('A4');
        pdf.pageOrientation('landscape');
        // para facturas anuladas
        if (factura.estado === 'A'){
            pdf.watermark( new Txt('ANULADA').color('red').end );
        }
        pdf.create().open();
    }
}
