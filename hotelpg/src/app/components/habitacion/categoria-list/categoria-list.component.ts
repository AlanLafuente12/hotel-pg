// Angular
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
// Servicios
import { CategoriaHabitacionService } from '../../../services/categoria-habitacion.service';
import { LoginService } from '../../../services/login.service';
// Modelos
import { CategoriaHabitacion } from '../../../models/CategoriaHabitacion';
// Modulos
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: []
})
export class CategoriaListComponent implements OnInit {

  formulario: FormGroup;

  // categoria de habitacion a editar o crear
  categoriaHabitacion: CategoriaHabitacion = { };
  // lista de categorias de habitacion
  categoriasHabitacion: CategoriaHabitacion[];

  // variable que indica si se esta editando un elemento de la lista
  editando: boolean = false;
  advertirObligatorios: boolean = false;

  constructor(private categoriaHabitacionService: CategoriaHabitacionService,
              public activatedRoute: ActivatedRoute,
              private loginService: LoginService) {

    this.formulario = new FormGroup({
      nombre_categoria: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      cantidad_camas: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      tarifa_usual: new FormControl('', [
        Validators.required,
        Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')
      ]),
    });
  }

  ngOnInit(): void {
    this.obtenerCategoriasHabitacion();
  }

  obtenerCategoriasHabitacion(): void{
    this.categoriaHabitacionService.getCategoriasHabitacion(this.loginService.idHotel).subscribe(
      (res: any) => {
        this.categoriasHabitacion = res;
      },
      (err: any) => console.error(err)
    );
  }

  crearCategoria(): void{
    if (this.formulario.valid)
    {
      this.cargarDatos();
      this.categoriaHabitacionService.createCategoriaHabitacion(this.categoriaHabitacion)
      .subscribe(
        (res: any) => {
          console.log(res);
          Swal.fire(
            '¡Creado!',
            'El elemento ha sido creado con éxito',
            'success'
          );
          this.limpiarFormulario();
          this.obtenerCategoriasHabitacion();
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

  comenzarEdicionCategoria(categoria: CategoriaHabitacion): void{
    this.editando = true;
    // cargar el objeto (para guardar datos que no van a modificarse, ej. id)
    this.categoriaHabitacion = categoria;
    // cargar los datos del objeto al formulario
    this.formulario.controls.nombre_categoria.setValue(this.categoriaHabitacion.nombre_categoria);
    this.formulario.controls.cantidad_camas.setValue(this.categoriaHabitacion.cantidad_camas);
    this.formulario.controls.tarifa_usual.setValue(this.categoriaHabitacion.tarifa_usual);
  }

  editarCategoria(): void{
    if (this.formulario.valid)
    {
      this.cargarDatos();
      // tslint:disable-next-line: max-line-length
      this.categoriaHabitacionService.updateCategoriaHabitacion(this.categoriaHabitacion.id_categoria_habitacion.toString(), this.categoriaHabitacion)
      .subscribe(
        (res: any) => {
          console.log(res);
          Swal.fire(
            '¡Modificado!',
            'El elemento ha sido modificado con éxito',
            'success'
          );
          this.obtenerCategoriasHabitacion();
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

  eliminarCategoria(id: string): void{
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
        this.categoriaHabitacionService.deleteCategoriaHabitacion(id)
        .subscribe(
          (res: any) => {
            console.log(res);
            Swal.fire(
              '¡Eliminado!',
              'El elemento ha sido eliminado con éxito',
              'success'
            );
            this.obtenerCategoriasHabitacion();
          },
          (err: any) => {
            console.log(err);
          }
        );
      }
    });
  }

  cancelarEdicion(): void{
    this.editando = false;
    this.limpiarFormulario();
  }

  cargarDatos(): void{
    // cargando valores del usuario en el objeto
    this.categoriaHabitacion.id_usuario_op = parseInt(this.loginService.idUsuario, 10);
    this.categoriaHabitacion.id_hotel = parseInt(this.loginService.idHotel, 10);

    // cargando valores de formulario en el objeto
    this.categoriaHabitacion.nombre_categoria = this.formulario.controls.nombre_categoria.value;
    this.categoriaHabitacion.cantidad_camas = this.formulario.controls.cantidad_camas.value;
    this.categoriaHabitacion.tarifa_usual = this.formulario.controls.tarifa_usual.value;
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    this.categoriaHabitacion.last_update = date + ' ' + time;
  }

  limpiarFormulario(): void{
    // no advertir de obligatorios
    this.advertirObligatorios = false;
    // limpiar datos de objeto
    this.categoriaHabitacion = {};

    // limpiar datos de formulario
    this.formulario.controls.nombre_categoria.setValue('');
    this.formulario.controls.cantidad_camas.setValue('');
    this.formulario.controls.tarifa_usual.setValue('');
  }
}
