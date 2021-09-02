// Angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// Servicios
import { LoginService } from '../../../services/login.service';
import { HospedajeService } from '../../../services/hospedaje.service';
import { HabitacionService } from '../../../services/habitacion.service';
import { ProductoService } from '../../../services/producto.service';
import { FacturaService } from '../../../services/factura.service';
import { HotelService } from '../../../services/hotel.service';
import { DosificacionService } from '../../../services/dosificacion.service';
import { ExtraService } from '../../../services/extra.service';
// Modelos
import { Hospedaje, HospedajeHabitacion, HospedajeProducto } from '../../../models/Hospedaje';
import { DetalleFactura } from '../../../models/DetalleFactura';
import { Factura } from '../../../models/Factura';
import { Hotel } from '../../../models/Hotel';
import { Dosificacion } from '../../../models/Dosificacion';
import { Extra } from '../../../models/Extra';
// Globales
import { Reutilizables } from '../../../globales/reutilizable';
// Modulos
import Swal from 'sweetalert2';
// Codigo de control
declare function generateControlCode( authorizationNumber: any,
                                      invoiceNumber: any,
                                      nitci: any,
                                      dateOfTransaction: any,
                                      transactionAmount: any,
                                      dosageKey: any): any;

@Component({
  selector: 'app-pago-form',
  templateUrl: './pago-form.component.html',
  styleUrls: []
})
export class PagoFormComponent implements OnInit {

  diasAPagar: number;
  cantidadAPagar: number;

  factura: Factura = { total: '0', detallesFactura: [] };
  dosificacion: Dosificacion;
  hotel: Hotel;

  idHospedaje: string;
  hospedaje: Hospedaje;
  hospedajeHabitaciones: HospedajeHabitacion[];
  hospedajeProductos: HospedajeProducto[];
  extras: Extra[];

  // Variables para el formulario crear huesped
  advertirObligatorios: boolean = false;
  formulario: FormGroup;

  constructor(public loginService: LoginService,
              public facturaService: FacturaService,
              public hospedajeService: HospedajeService,
              public habitacionService: HabitacionService,
              public productoService: ProductoService,
              public hotelService: HotelService,
              public dosificacionService: DosificacionService,
              public extraService: ExtraService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    // Formulario agregar nuevo huesped
    this.formulario = new FormGroup({
      nit: new FormControl('0', [
        Validators.required,
        Validators.minLength(1)
      ]),
      razon_social: new FormControl('SIN NOMBRE', [
        Validators.required,
        Validators.minLength(3)
      ])
    });

  }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params.id){
      console.log('id hospedaje ', params.id);
      // guardar idHospedaje
      this.idHospedaje = params.id;
      // obtener objetos
      this.obtenerHospedaje();
      this.obtenerHospedajeHabitaciones();
      this.obtenerHospedajeProductos();
      this.obtenerExtras();
      this.obtenerHotel();
      this.obtenerDosificacion();
    }
  }

  //#region "Obtener objetos de hospedaje"
  obtenerHospedaje(): void{
    this.hospedajeService.getHospedaje(this.idHospedaje).subscribe(
      (res: any) => {
        this.hospedaje = res;
      },
      (err: any) => console.error(err)
    );
  }
  obtenerHospedajeHabitaciones(): void{
    this.hospedajeService.getHospedajeHabitaciones(this.idHospedaje).subscribe(
      (res: any) => {
        this.hospedajeHabitaciones = res;
      },
      (err: any) => console.error(err)
    );
  }
  obtenerHospedajeProductos(): void{
    this.hospedajeService.getHospedajeProductos(this.idHospedaje).subscribe(
      (res: any) => {
        this.hospedajeProductos = res;
      },
      (err: any) => console.error(err)
    );
  }
  obtenerExtras(): void{
    this.extraService.getExtras(this.idHospedaje).subscribe(
      (res: any) => {
        this.extras = res;
      },
      (err: any) => console.error(err)
    );
  }
  obtenerHotel(): void{
    this.hotelService.getHotel(this.loginService.idHotel).subscribe(
      (res: any) => {
        this.hotel = res;
      },
      (err: any) => console.error(err)
    );
  }
  obtenerDosificacion(): void{
    this.dosificacionService.getLastDosificacion(this.loginService.idHotel).subscribe(
      (res: any) => {
        this.dosificacion = res;
        console.log(this.dosificacion);
      },
      (err: any) => console.error(err)
    );
  }
  //#endregion

  //#region "Agregar detalles"
  agregarProducto(producto: HospedajeProducto): void{
    // obtener la cantidad a pagar seleccionada
    const inputCantidad = document.getElementById(`producto_id${producto.id_hospedaje_producto}`) as HTMLInputElement;
    const cantidad = inputCantidad.value;
    // actualizar cantidad productos cancelados
    producto.cantidad_cancelados = ( parseInt(producto.cantidad_cancelados, 10) + parseInt(cantidad, 10) ).toString();
    // verificar si ya se ha agregado
    let agregado = false;
    for (const detalle of this.factura.detallesFactura){
      if (detalle.detalle === producto.nombre_producto){
        detalle.cantidad = (parseInt(detalle.cantidad, 10) + parseInt(cantidad, 10)).toString();
        detalle.subtotal = (parseFloat(detalle.subtotal) + (parseInt(cantidad, 10) * parseFloat(producto.precio_unitario))).toString();
        detalle.id_hospedaje_producto = producto.id_hospedaje_producto;
        agregado = true;
        break;
      }
    }
    if (!agregado){
      const detalle: DetalleFactura = {};
      detalle.detalle = producto.nombre_producto;
      detalle.cantidad = cantidad;
      detalle.precio_unitario = producto.precio_unitario;
      detalle.subtotal = (parseInt(cantidad, 10) * parseFloat(producto.precio_unitario)).toString();
      detalle.id_hospedaje_producto = producto.id_hospedaje_producto;
      this.factura.detallesFactura.push(detalle);
    }
    this.calcularTotal();
  }
  agregarExtra(extra: Extra): void{
    // obtener la cantidad a pagar seleccionada
    const inputCantidad = document.getElementById(`extra_id${extra.id_extra}`) as HTMLInputElement;
    const cantidad = inputCantidad.value;
    // actualizar cantidad productos cancelados
    extra.cantidad_cancelados = ( parseInt(extra.cantidad_cancelados, 10) + parseInt(cantidad, 10) ).toString();
    // verificar si ya se ha agregado
    let agregado = false;
    for (const detalle of this.factura.detallesFactura){
      if (detalle.detalle === extra.nombre){
        detalle.cantidad = (parseInt(detalle.cantidad, 10) + parseInt(cantidad, 10)).toString();
        detalle.subtotal = (parseFloat(detalle.subtotal) + (parseInt(cantidad, 10) * parseFloat(extra.precio_unitario))).toString();
        detalle.id_extra = extra.id_extra;
        agregado = true;
        break;
      }
    }
    if (!agregado){
      const detalle: DetalleFactura = {};
      detalle.detalle = extra.nombre;
      detalle.cantidad = cantidad;
      detalle.precio_unitario = extra.precio_unitario;
      detalle.subtotal = (parseInt(cantidad, 10) * parseFloat(extra.precio_unitario)).toString();
      detalle.id_extra = extra.id_extra;
      this.factura.detallesFactura.push(detalle);
    }
    this.calcularTotal();
  }
  agregarHabitacion(habitacion: HospedajeHabitacion): void{
    // obtener la cantidad a pagar seleccionada
    const inputCantidad = document.getElementById(`habitacion_id${habitacion.id_hospedaje_habitacion}`) as HTMLInputElement;
    const cantidad = inputCantidad.value;
    // actualizar dias cancelados
    habitacion.dias_cancelados = ( parseInt(habitacion.dias_cancelados, 10) + parseInt(cantidad, 10) ).toString();
    // verificar si ya se ha agregado
    let agregado = false;
    for (const detalle of this.factura.detallesFactura){
      if (detalle.detalle === `Día(s) habitación ${habitacion.nombre_categoria} ${habitacion.nombre_habitacion}`){
        detalle.cantidad = (parseInt(detalle.cantidad, 10) + parseInt(cantidad, 10)).toString();
        detalle.subtotal = (parseFloat(detalle.subtotal) + (parseInt(cantidad, 10) * parseFloat(habitacion.tarifa))).toString();
        detalle.id_hospedaje_habitacion = habitacion.id_hospedaje_habitacion;
        agregado = true;
        break;
      }
    }
    if (!agregado){
      const detalle: DetalleFactura = {};
      detalle.detalle = `Día(s) habitación ${habitacion.nombre_categoria} ${habitacion.nombre_habitacion}`;
      detalle.cantidad = cantidad;
      detalle.precio_unitario = habitacion.tarifa;
      detalle.subtotal = (parseInt(cantidad, 10) * parseFloat(habitacion.tarifa)).toString();
      detalle.id_hospedaje_habitacion = habitacion.id_hospedaje_habitacion;
      this.factura.detallesFactura.push(detalle);
    }
    this.calcularTotal();
  }
  //#endregion

  //#region "Operaciones de calculo"
  // producto
  calcularTotalDeudaProducto(hospedajeProducto: HospedajeProducto): number{
    return (parseInt(hospedajeProducto.cantidad, 10) * parseFloat(hospedajeProducto.precio_unitario))
    - this.calcularTotalCanceladoProducto(hospedajeProducto);
  }
  calcularTotalCanceladoProducto(hospedajeProducto: HospedajeProducto): number{
    return parseInt(hospedajeProducto.cantidad_cancelados, 10) * parseFloat(hospedajeProducto.precio_unitario);
  }
  calcularCantidadDeudaProducto(hospedajeProducto: HospedajeProducto): number{
    return parseInt(hospedajeProducto.cantidad, 10) - parseInt(hospedajeProducto.cantidad_cancelados, 10);
  }
  // extra
  calcularTotalDeudaExtra(extra: Extra): number{
    return (parseInt(extra.cantidad, 10) * parseFloat(extra.precio_unitario))
    - this.calcularTotalCanceladoExtra(extra);
  }
  calcularTotalCanceladoExtra(extra: Extra): number{
    return parseInt(extra.cantidad_cancelados, 10) * parseFloat(extra.precio_unitario);
  }
  calcularCantidadDeudaExtra(extra: Extra): number{
    return parseInt(extra.cantidad, 10) - parseInt(extra.cantidad_cancelados, 10);
  }
  // habitaciones
  calcularTotalDeudaHabitacion(hospedajeHabitacion: HospedajeHabitacion): number{
    return (this.calcularDiasTranscurridos(hospedajeHabitacion.check_in) * parseFloat(hospedajeHabitacion.tarifa))
    - this.calcularTotalCanceladoHabitacion(hospedajeHabitacion);
  }
  calcularTotalCanceladoHabitacion(hospedajeHabitacion: HospedajeHabitacion): number{
    return parseInt(hospedajeHabitacion.dias_cancelados, 10) * parseFloat(hospedajeHabitacion.tarifa);
  }
  calcularDiasDeudaHabitacion(hospedajeHabitacion: HospedajeHabitacion): number{
    return this.calcularDiasTranscurridos(hospedajeHabitacion.check_in) - parseInt(hospedajeHabitacion.dias_cancelados, 10);
  }
  calcularDiasTranscurridos(fecha: string): number{
    const currentdate = new Date();
    const differenceInTime = currentdate.getTime() - Date.parse(fecha);
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    const dias = Math.ceil(differenceInDays);
    return dias;
  }
  //#endregion


  realizarPago(): void{
    if (this.formulario.valid)
    {
      if (this.factura.detallesFactura.length !== 0)
      {
        if (this.dosificacion !== null)
        {
          if (this.hotel.nit !== '' && this.hotel.nit !== null)
          {
            this.cargarDatos();
            console.log(this.factura);
            // Mostrar pdf de factura
            Reutilizables.generatePDF(this.factura, this.hotel, this.dosificacion);
            // * CREAR FACTURA
            this.facturaService.createFactura(this.factura)
            .subscribe(
              (res: any) => {
                console.log(res);
                Swal.fire(
                  '¡Creado!',
                  'El elemento ha sido creado con éxito',
                  'success'
                  );
                this.router.navigate(['hospedaje/view', this.idHospedaje]);
              },
              (err: any) => {
                console.log(err);
              }
            ); // */
          }
          else{
            Swal.fire(
              '¡Advertencia!',
              'El hotel no dispone de un Nit',
              'warning'
              );
          }
        }
        else{
          Swal.fire(
            '¡Advertencia!',
            'No se encuentra una dosificación',
            'warning'
            );
        }
      }
      else{
        Swal.fire(
          '¡Advertencia!',
          'No hay elementos que facturar',
          'warning'
          );
      }
    }
    else{
      this.advertirObligatorios = true;
    }
  }

  cargarDatos(): void{
    // cargando valores de formulario en el objeto
    this.factura.nit_ci = this.formulario.controls.nit.value;
    this.factura.razon_social = this.formulario.controls.razon_social.value;
    // cargando valores del usuario en el objeto
    this.factura.id_usuario_op = parseInt(this.loginService.idUsuario, 10);
    this.factura.id_hotel = parseInt(this.loginService.idHotel, 10);
    this.factura.id_hospedaje = parseInt(this.idHospedaje, 10);
    this.factura.id_dosificacion = this.dosificacion.id_dosificacion;
    this.factura.numero_factura = this.dosificacion.numero_actual_factura.toString();
    this.factura.fecha_factura = `${new Date().getFullYear()}/${('0' + (new Date().getMonth() + 1)).slice(-2)}/${('0' + (new Date().getDate())).slice(-2)}`;
    console.log(this.factura);
    console.log(this.factura.fecha_factura.replace(/\//g, ''));
    // this.factura.codigo_control = generateControlCode
    // ('6004004541556', '565398', '1679177', '20080505', '77256,6', '#Vti+GE\\sdnsdHf4JjKtC*ImSWzyIsct[yqQUGVmb)AEV]rxC$Cua@#F*bR4-rti');
    // * GENERAR CODIGO DE CONTROL
    this.factura.codigo_control = generateControlCode(
      this.dosificacion.numero_autorizacion,
      this.factura.numero_factura,
      this.factura.nit_ci,
      this.factura.fecha_factura.replace(/\//g, ''),
      this.factura.total.replace('.', ','),
      this.dosificacion.llave_dosificacion);
    // */
  }

  calcularTotal(): void{
    let total = 0;
    for (const detalle of this.factura.detallesFactura){
      total += parseFloat(detalle.subtotal);
    }
    this.factura.total = total.toString();
  }
}
