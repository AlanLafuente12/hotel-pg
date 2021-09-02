// Angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// Servicios
import { LoginService } from '../../../services/login.service';
import { HospedajeService } from '../../../services/hospedaje.service';
import { HabitacionService } from '../../../services/habitacion.service';
import { ProductoService } from '../../../services/producto.service';
import { HuespedService } from '../../../services/huesped.service';
import { HotelService } from '../../../services/hotel.service';
import { DosificacionService } from '../../../services/dosificacion.service';
import { FacturaService } from '../../../services/factura.service';
import { ExtraService } from '../../../services/extra.service';
// Modelos
import { Hospedaje, HospedajeHabitacion, HospedajeHuesped, HospedajeProducto } from '../../../models/Hospedaje';
import { Habitacion } from '../../../models/Habitacion';
import { Producto } from '../../../models/Producto';
import { Huesped } from '../../../models/Huesped';
import { Factura } from '../../../models/Factura';
import { Dosificacion } from '../../../models/Dosificacion';
import { Hotel } from '../../../models/Hotel';
import { Extra } from '../../../models/Extra';
// Modulos
import Swal from 'sweetalert2';
// Globales
import { Reutilizables } from '../../../globales/reutilizable';

@Component({
  selector: 'app-hospedaje-form',
  templateUrl: './hospedaje-form.component.html',
  styleUrls: []
})
export class HospedajeFormComponent implements OnInit {

  hospedajeHuespedes: HospedajeHuesped[];
  hospedajeHabitaciones: HospedajeHabitacion[];
  hospedajeProductos: HospedajeProducto[];

  idHospedaje: string;
  hospedaje: Hospedaje;

  habitacionesLibres: Habitacion[];
  huespedes: Huesped[];
  huespedesResult: Huesped[];
  productos: Producto[];
  extras: Extra[];
  facturas: Factura[];

  // Variables para los formulario
  advertirObligatoriosHuesped: boolean = false;
  advertirObligatoriosExtra: boolean = false;
  formularioHuesped: FormGroup;
  formularioExtra: FormGroup;
  huesped: Huesped = { };
  extra: Extra = {};

  constructor(public loginService: LoginService,
              public hospedajeService: HospedajeService,
              public habitacionService: HabitacionService,
              public huespedService: HuespedService,
              public productoService: ProductoService,
              public facturaService: FacturaService,
              public dosificacionService: DosificacionService,
              public extraService: ExtraService,
              public hotelService: HotelService,
              private router: Router,
              public activatedRoute: ActivatedRoute) {

    // Formulario agregar nuevo huesped
    this.formularioHuesped = new FormGroup({
      nombres: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      primer_apellido: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      segundo_apellido: new FormControl('', [
        Validators.minLength(3)
      ]),
      documento_identidad: new FormControl('', [
        Validators.required,
        Validators.minLength(7)
      ]),
      fecha_nacimiento: new FormControl(''),
      estado_civil: new FormControl(''),
      ocupacion: new FormControl(''),
      nacionalidad: new FormControl('', [
        Validators.pattern(/^[a-zA-Z]*$/),
        Validators.minLength(3)
      ]),
      telefono: new FormControl('', [
        Validators.pattern(/^[0-9]*$/),
        Validators.minLength(7)
      ]),
      correo: new FormControl('', [
        Validators.email
      ])
    });

    // Formulario agregar servicio extra
    this.formularioExtra = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      precio_unitario: new FormControl('',  [
        Validators.required,
        Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')
      ]),
      cantidad: new FormControl('1',  [
        Validators.required,
        Validators.pattern(/^[0-9]*$/)
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
      this.obtenerHospedajeHuespedes();
      this.obtenerExtras();
      this.obtenerFacturas();
    }
  }

  realizarPago(): void{
    // abrir ventana
    this.router.navigate(['hospedaje/pago', this.hospedaje.id_hospedaje]);
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
  obtenerHospedajeHuespedes(): void{
    this.hospedajeService.getHospedajeHuespedes(this.idHospedaje).subscribe(
      (res: any) => {
        this.hospedajeHuespedes = res;
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
  //#endregion

  //#region "Obtener listas de objetos"
  obtenerHuespedes(): void{
    this.huespedService.getHuespedes(this.loginService.idHotel).subscribe(
      (res: any) => {
        this.huespedes = res;
      },
      (err: any) => console.error(err)
    );
  }
  obtenerHabitacionesLibres(): void{
    this.habitacionService.getHabitacionesLibres(this.loginService.idHotel).subscribe(
      (res: any) => {
        this.habitacionesLibres = res;
      },
      (err: any) => console.error(err)
    );
  }
  obtenerProductosDisponibles(): void{
    this.productoService.getProductosDisponibles(this.loginService.idHotel).subscribe(
      (res: any) => {
        this.productos = res;
      },
      (err: any) => console.error(err)
    );
  }
  obtenerFacturas(): void{
    this.facturaService.getFacturasHospedaje(this.idHospedaje).subscribe(
      (res: any) => {
        this.facturas = res;
      },
      (err: any) => console.error(err)
    );
  }
  //#endregion

  //#region "Acciones habitacion"
  agregarHabitacion(habitacion: Habitacion): void{
    const hospedajeHabitacion: HospedajeHabitacion  = { };
    hospedajeHabitacion.id_habitacion = habitacion.id_habitacion;
    hospedajeHabitacion.id_hospedaje = parseInt(this.idHospedaje, 10);
    hospedajeHabitacion.id_usuario_op = parseInt(this.loginService.idUsuario, 10);
    // se necesita ingresar convirtiendo a de la zona horaria
    hospedajeHabitacion.check_in = (this.hospedaje.check_in.substr(0, 10) + ' ' +
      (new Date (this.hospedaje.check_in)).toLocaleTimeString());
    hospedajeHabitacion.tarifa = habitacion.tarifa_usual;
    this.hospedajeService.createHospedajeHabitacion(hospedajeHabitacion).subscribe(
      (res: any) => {
        // actualizar la lista de habitaciones agregadas
        this.obtenerHospedajeHabitaciones();
        // actualizar la lista de habitaciones disponibles
        this.obtenerHabitacionesLibres();
        // actualizar el total
        this.obtenerHospedaje();
      },
      (err: any) => console.error(err)
    );
  }
  quitarHabitacion(hospedajeHabitacion: HospedajeHabitacion): void{
    if (this.calcularTotalCanceladoHabitacion(hospedajeHabitacion) === 0){
      console.log('hola mudno');
      this.hospedajeService.deleteHospedajeHabitacion(this.idHospedaje, hospedajeHabitacion.id_habitacion.toString()).subscribe(
        (res: any) => {
          // actualizar la lista de habitaciones agregadas
          this.obtenerHospedajeHabitaciones();
          // actualizar el total
          this.obtenerHospedaje();
        },
        (err: any) => console.error(err)
      );
    }else{
      Swal.fire(
        '¡Aviso!',
        'No se puede quitar una habitación con días cancelados',
        'warning'
      );
    }
  }
  //#endregion

  //#region "Acciones producto"
  agregarProducto(producto: Producto): void{
    const inputCantidad = document.getElementById(`producto_id${producto.id_producto}`) as HTMLInputElement;
    const cantidad = inputCantidad.value;
    const hospedajeProducto: HospedajeProducto = {};
    const total = parseFloat(producto.precio_unitario) * parseFloat(inputCantidad.value);
    hospedajeProducto.id_producto = producto.id_producto;
    hospedajeProducto.id_hospedaje = parseInt(this.idHospedaje, 10);
    hospedajeProducto.id_usuario_op = parseInt(this.loginService.idUsuario, 10);
    hospedajeProducto.total = total.toString();
    hospedajeProducto.cantidad = cantidad;
    this.hospedajeService.createHospedajeProducto(hospedajeProducto).subscribe(
      (res: any) => {
        // actualizar la lista de productos agregados
        this.obtenerHospedajeProductos();
        // actualizar la cantidad de productos disponibles
        this.obtenerProductosDisponibles();
        // actualizar el total
        this.obtenerHospedaje();
      },
      (err: any) => console.error(err)
      );
  }
  quitarProducto(hospedajeProducto: HospedajeProducto): void{
    if (this.calcularTotalCanceladoProducto(hospedajeProducto) === 0){
      this.hospedajeService.deleteHospedajeProducto(this.idHospedaje, hospedajeProducto.id_producto.toString()).subscribe(
        (res: any) => {
          // actualizar la lista de productos agregados
          this.obtenerHospedajeProductos();
          // actualizar el total
          this.obtenerHospedaje();
        },
        (err: any) => console.error(err)
      );
    }else{
      Swal.fire(
        '¡Aviso!',
        'No se puede quitar un producto parcial o totalmente cancelado',
        'warning'
      );
    }
  }
  //#endregion


  //#region "Acciones huesped"
  agregarHuesped(huesped: Huesped): void{
    const hospedajeHuesped: HospedajeHuesped = {};
    hospedajeHuesped.id_huesped = huesped.id_huesped;
    hospedajeHuesped.id_hospedaje = parseInt(this.idHospedaje, 10);
    hospedajeHuesped.id_usuario_op = parseInt(this.loginService.idUsuario, 10);
    this.hospedajeService.createHospedajeHuesped(hospedajeHuesped).subscribe(
      (res: any) => {
        // actualizar la lista de huespedes agregados
        this.obtenerHospedajeHuespedes();
        // actualizar numero personas
        this.obtenerHospedaje();
      },
      (err: any) => console.error(err)
      );
  }
  quitarHuesped(idHuesped: string): void{
    this.hospedajeService.deleteHospedajeHuesped(this.idHospedaje, idHuesped).subscribe(
      (res: any) => {
        // actualizar la lista de huespedes agregados
        this.obtenerHospedajeHuespedes();
        // actualizar numero personas
        this.obtenerHospedaje();
      },
      (err: any) => console.error(err)
    );
  }
  esAgregable(huespedNuevo: Huesped): boolean{
    // Verificar si el huesped ya ha sido agregado al hospedaje
    for (const huespedExistente of this.hospedajeHuespedes){
      if (huespedExistente.id_huesped === huespedNuevo.id_huesped){
        return false;
      }
    }
    return true;
  }
  buscarHuesped(texto: string): void{
    const auxResult: Huesped[] = [];
    texto = texto.toLowerCase();
    if (texto.length > 0){
      this.obtenerHuespedes();
      for (const huesped of this.huespedes){
        const nombres = huesped.nombres.toLowerCase();
        const primerApellido = huesped.primer_apellido.toLowerCase();
        const segundoApellido = huesped.segundo_apellido.toLowerCase();
        const nombreCompleto = `${nombres} ${primerApellido} ${segundoApellido}`;
        if (nombres.indexOf(texto) >= 0 ||
            primerApellido.indexOf(texto) >= 0 ||
            segundoApellido.indexOf(texto) >= 0 ||
            nombreCompleto.indexOf(texto) >= 0 ||
            huesped.documento_identidad.indexOf(texto) >= 0 ){
          auxResult.push(huesped);
        }
      }
    }
    this.huespedesResult = auxResult;
  }
  //#endregion


  //#region "Crear huesped"
  crearHuesped(): void{
    if (this.formularioHuesped.valid)
    {
      this.cargarDatosHuesped();
      console.log(this.huesped);
      this.huespedService.createHuesped(this.huesped)
      .subscribe(
        (res: any) => {
          console.log(res);
          Swal.fire(
            '¡Creado!',
            'El elemento ha sido creado con éxito',
            'success'
            );
          // cerrar modal
          document.getElementById('btnCloseAddHuesped').click();
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
    else{
      this.advertirObligatoriosHuesped = true;
    }
  }
  cargarDatosHuesped(): void{
    // cargando valores del usuario en el objeto
    this.huesped.id_usuario_op = parseInt(this.loginService.idUsuario, 10);
    this.huesped.id_hotel = parseInt(this.loginService.idHotel, 10);

    // cargando valores de formulario en el objeto
    this.huesped.nombres = this.formularioHuesped.controls.nombres.value;
    this.huesped.primer_apellido = this.formularioHuesped.controls.primer_apellido.value;
    this.huesped.segundo_apellido = this.formularioHuesped.controls.segundo_apellido.value;
    this.huesped.documento_identidad = this.formularioHuesped.controls.documento_identidad.value;
    this.huesped.fecha_nacimiento = this.formularioHuesped.controls.fecha_nacimiento.value === '' ?
      null : this.formularioHuesped.controls.fecha_nacimiento.value;
    this.huesped.estado_civil = this.formularioHuesped.controls.estado_civil.value;
    this.huesped.ocupacion = this.formularioHuesped.controls.ocupacion.value;
    this.huesped.nacionalidad = this.formularioHuesped.controls.nacionalidad.value;
    this.huesped.telefono = this.formularioHuesped.controls.telefono.value;
    this.huesped.correo = this.formularioHuesped.controls.correo.value;
  }
  //#endregion

  //#region "Crear extra"
  crearExtra(): void{
    if (this.formularioExtra.valid)
    {
      this.cargarDatosExtra();
      console.log(this.extra);
      this.extraService.createExtra(this.extra)
      .subscribe(
        (res: any) => {
          // actualizar la lista de extras
          this.obtenerExtras();
          // actualizar el total
          this.obtenerHospedaje();
          // cerrar modal
          document.getElementById('btnCloseAddExtra').click();
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
    else{
      this.advertirObligatoriosExtra = true;
    }
  }
  cargarDatosExtra(): void{
    // cargando valores del usuario en el objeto
    this.extra.id_usuario_op = parseInt(this.loginService.idUsuario, 10);
    this.extra.id_hotel = parseInt(this.loginService.idHotel, 10);
    this.extra.id_hospedaje = parseInt(this.idHospedaje, 10);

    // cargando valores de formulario en el objeto
    this.extra.nombre = this.formularioExtra.controls.nombre.value;
    this.extra.precio_unitario = this.formularioExtra.controls.precio_unitario.value;
    this.extra.cantidad = this.formularioExtra.controls.cantidad.value;
  }
  quitarExtra(extra: Extra): void{
    if (this.calcularTotalCanceladoExtra(extra) === 0){
      this.extraService.deleteExtra(extra.id_extra.toString()).subscribe(
        (res: any) => {
          // actualizar la lista de extras agregados
          this.obtenerExtras();
          // actualizar el total
          this.obtenerHospedaje();
        },
        (err: any) => console.error(err)
      );
    }else{
      Swal.fire(
        '¡Aviso!',
        'No se puede quitar un extra parcial o totalmente cancelado',
        'warning'
      );
    }
  }
  //#endregion


  //#region "Operaciones de calculo"
  calcularTotalCanceladoProducto(hospedajeProducto: HospedajeProducto): number{
    return parseInt(hospedajeProducto.cantidad_cancelados, 10) * parseFloat(hospedajeProducto.precio_unitario);
  }

  calcularTotalDeudaHabitacion(hospedajeHabitacion: HospedajeHabitacion): number{
    const currentdate = new Date();
    const differenceInTime = currentdate.getTime() - Date.parse(hospedajeHabitacion.check_in);
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    const dias = Math.ceil(differenceInDays);
    return dias * parseFloat(hospedajeHabitacion.tarifa);
  }
  calcularTotalCanceladoHabitacion(hospedajeHabitacion: HospedajeHabitacion): number{
    return parseInt(hospedajeHabitacion.dias_cancelados, 10) * parseFloat(hospedajeHabitacion.tarifa);
  }
  calcularTotalDeudaHospedaje(): any{
    return parseFloat(this.hospedaje.total_cuenta) - parseFloat(this.hospedaje.total_cancelado);
  }
  calcularTotalCanceladoExtra(extra: Extra): number{
    return parseFloat(extra.precio_unitario) * parseInt(extra.cantidad_cancelados, 10);
  }
  calcularTotalDeudaExtra(extra: Extra): number{
    return parseFloat(extra.precio_unitario) * parseInt(extra.cantidad, 10);
  }
  //#endregion

  //#region "Acciones de factura"
  anularFactura(factura: Factura): void{
    if (factura.estado === 'V'){
      Swal.fire({
        title: '¿Está seguro de anular esta factura?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.facturaService.anularFactura(factura.id_factura.toString())
          .subscribe(
            (res: any) => {
              console.log(res);
              Swal.fire(
                'Anulada!',
                'Factura anulada con éxito',
                'success'
                );
              this.obtenerHospedaje();
              this.obtenerHospedajeHabitaciones();
              this.obtenerHospedajeProductos();
              this.obtenerExtras();
              this.obtenerFacturas();
            },
            (err: any) => {
              console.log(err);
            }
          );
        }
      });
    }
  }
  mostrarFactura(factura: Factura): void{
    // crear variables para enviar al metodo que mostrara la factura
    let dosificacion: Dosificacion = {};
    let hotel: Hotel = {};
    // obtener detalles de factura
    this.facturaService.getDetallesFactura(factura.id_factura.toString()).subscribe(
      (res: any) => {
        factura.detallesFactura = res;
        // obtener dosificacion
        this.dosificacionService.getDosificacion(factura.id_dosificacion.toString()).subscribe(
          (res2: any) => {
            dosificacion = res2;
            // obtener hotel y sus datos
            this.hotelService.getHotel(this.loginService.idHotel).subscribe(
              (res3: any) => {
                hotel = res3;
                // Mostrar pdf de factura
                Reutilizables.generatePDF(factura, hotel, dosificacion);
              },
              (err: any) => console.error(err)
            );
          },
          (err: any) => console.error(err)
        );
      },
      (err: any) => console.error(err)
    );
  }
  //#endregion
}
