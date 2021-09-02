// Angular
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// Servicios
import { HabitacionService } from '../../../services/habitacion.service';
import { CategoriaHabitacionService } from '../../../services/categoria-habitacion.service';
import { LoginService } from '../../../services/login.service';
// Modelos
import { Habitacion } from '../../../models/Habitacion';
import { CategoriaHabitacion } from '../../../models/CategoriaHabitacion';
// Modulos
import Swal from 'sweetalert2';

@Component({
  selector: 'app-habitacion-list',
  templateUrl: './habitacion-list.component.html',
  styleUrls: []
})
export class HabitacionListComponent implements OnInit {

  formulario: FormGroup;

  habitacion: Habitacion = { };
  // lista de habitaciones
  habitaciones: Habitacion[];
  // lista de categorias de habitacion
  categorias: CategoriaHabitacion[];


  modoEdicion: boolean = false;
  editando: boolean = false;
  advertirObligatorios: boolean = false;

  constructor(private habitacionService: HabitacionService,
              private categoriaHabitacionService: CategoriaHabitacionService,
              public activatedRoute: ActivatedRoute,
              private router: Router,
              public loginService: LoginService) {

    this.formulario = new FormGroup({
      nombre_habitacion: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      id_categoria_habitacion: new FormControl('', Validators.required)
    });
  }

  onNavigate(value: any): void{
    if (value === 'categorias'){
      this.router.navigate(['categoria']);
    }
    else{
      console.log('categoria ', value);
    }
  }

  ngOnInit(): void {
    this.obtenerHabitaciones();
  }

  obtenerHabitaciones(): void{
    this.habitacionService.getHabitaciones(this.loginService.idHotel).subscribe(
      (res: any) => {
        this.habitaciones = res;
        this.cargarCategorias();
      },
      (err: any) => console.error(err)
    );
  }

  crearHabitacion(): void{
    if (this.formulario.valid)
    {
      this.cargarDatos();
      this.habitacionService.createHabitacion(this.habitacion)
      .subscribe(
        (res: any) => {
          console.log(res);
          Swal.fire(
            '¡Creado!',
            'El elemento ha sido creado con éxito',
            'success'
          );
          this.limpiarFormulario();
          this.obtenerHabitaciones();
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
    else{
      this.advertirObligatorios = true;
    }
  }

  comenzarEdicionHabitacion(habitacion: Habitacion): void{
    this.editando = true;
    // cargar el objeto (para guardar datos que no van a modificarse, ej. id)
    this.habitacion = habitacion;
    // cargar los datos del objeto al formulario
    this.formulario.controls.nombre_habitacion.setValue(this.habitacion.nombre_habitacion);
    this.formulario.controls.id_categoria_habitacion.setValue(this.habitacion.id_categoria_habitacion);
    console.log(this.habitacion.id_categoria_habitacion);
  }

  editarHabitacion(): void{
    if (this.formulario.valid)
    {
      this.cargarDatos();
      // tslint:disable-next-line: max-line-length
      this.habitacionService.updateHabitacion(this.habitacion.id_habitacion.toString(), this.habitacion)
      .subscribe(
        (res: any) => {
          console.log(res);
          Swal.fire(
            '¡Modificado!',
            'El elemento ha sido modificado con éxito',
            'success'
          );
          this.obtenerHabitaciones();
          this.limpiarFormulario();
          // cambiar el estado de editando a falso
          this.editando = false;
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
    else{
      this.advertirObligatorios = true;
    }
  }

  switchModoEdicion(): void{
    this.editando = false;
    this.limpiarFormulario();
    this.modoEdicion = !this.modoEdicion;
  }

  cargarCategorias(): void{
    // obtener los lista de categorias
    this.categoriaHabitacionService.getCategoriasHabitacion(this.loginService.idHotel).subscribe(
      (res: any) => {
        this.categorias = res;
      },
      (err: any) => console.error(err)
    );
  }

  devolverNombreCategoria(idCategoria: number): string{
    let nombreCategoria = '';
    if (this.categorias){
      for (const categoria of this.categorias){
        if (categoria.id_categoria_habitacion === idCategoria){
          nombreCategoria = categoria.nombre_categoria;
          break;
        }
      }
    }
    return nombreCategoria;
  }

  eliminarHabitacion(habitacion: Habitacion): void{
    if (habitacion.ocupado !== 't'){
      Swal.fire({
        title: '¿Está seguro de eliminar este elemento?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.habitacionService.deleteHabitacion(habitacion.id_habitacion.toString())
          .subscribe(
            (res: any) => {
              console.log(res);
              Swal.fire(
                '¡Eliminado!',
                'El elemento ha sido eliminado con éxito',
                'success'
              );
              this.obtenerHabitaciones();
            },
            (err: any) => {
              console.log(err);
            }
          );
        }
      });
    }else{
      Swal.fire(
        '¡Advertencia!',
        'No puede eliminar una habitación ocupada',
        'warning'
      );
    }
  }

  cancelarEdicion(): void{
    this.editando = false;
    this.limpiarFormulario();
  }

  cargarDatos(): void{
    // cargando valores del usuario en el objeto
    this.habitacion.id_usuario_op = parseInt(this.loginService.idUsuario, 10);
    this.habitacion.id_hotel = parseInt(this.loginService.idHotel, 10);

    // cargando valores de formulario en el objeto
    this.habitacion.nombre_habitacion = this.formulario.controls.nombre_habitacion.value;
    this.habitacion.id_categoria_habitacion = this.formulario.controls.id_categoria_habitacion.value;
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    this.habitacion.last_update = date + ' ' + time;

    // vaciando variables que no seran insertadas
    this.habitacion.nombre_categoria = undefined;
    this.habitacion.tarifa_usual = undefined;
  }

  limpiarFormulario(): void{
    // no advertir de obligatorios
    this.advertirObligatorios = false;
    // limpiar datos de objeto
    this.habitacion = {};

    // limpiar datos de formulario
    this.formulario.controls.nombre_habitacion.setValue('');
    this.formulario.controls.id_categoria_habitacion.setValue('');
  }
}
