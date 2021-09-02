// Angular
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// Servicios
import { LoginService } from '../../../services/login.service';
import { ProductoService } from '../../../services/producto.service';
// Modelos
import { Producto } from '../../../models/Producto';
// Modulos
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: []
})
export class ProductoFormComponent implements OnInit {

  formulario: FormGroup;
  producto: Producto  = { };

  titulo: string;
  editando: boolean = false;
  advertirObligatorios: boolean = false;

  constructor(private productoService: ProductoService,
              private router: Router,
              public activatedRoute: ActivatedRoute,
              private loginService: LoginService) {

    this.formulario = new FormGroup({
      nombre_producto: new FormControl('',  [
                                              Validators.required,
                                              Validators.minLength(3)
                                            ]),
      precio_unitario: new FormControl('',  [
                                              Validators.required,
                                              Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')
                                            ]),
      stock: new FormControl('0',  [
                                    Validators.required,
                                    Validators.pattern(/^[0-9]*$/)
                                  ])
    });

  }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params.id){
      this.productoService.getProducto(params.id)
        .subscribe(
          (res: any) => {
            this.producto = res;
            this.formulario.setValue({
              nombre_producto: this.producto.nombre_producto,
              precio_unitario: this.producto.precio_unitario,
              stock: this.producto.stock
            });
          },
          (err: any) => {
            console.log(err);
          }
        );
      this.editando = true;
    }
    if (this.editando){
      this.titulo = 'Editar Producto';
      console.log('editar');
    }
    else{
      this.titulo = 'Agregar Producto';
      console.log('agregar');
    }
  }

  crearProducto(): void{
    if (this.formulario.valid){
      this.cargarDatos();
      this.productoService.createProducto(this.producto)
      .subscribe(
        (res: any) => {
          console.log(res);
          Swal.fire(
            '¡Creado!',
            'El elemento ha sido creado con éxito',
            'success'
          );
          this.router.navigate(['producto']);
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

  modificarProducto(): void{
    if (this.formulario.valid){
      this.cargarDatos();
      this.productoService.updateProducto(this.producto.id_producto.toString(), this.producto)
      .subscribe(
        (res: any) => {
          console.log(res);
          Swal.fire(
            '¡Modificado!',
            'El elemento ha sido modificado con éxito',
            'success'
          );
          this.router.navigate(['producto']);
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

  cargarDatos(): void{
    // cargando valores del usuario en el objeto
    this.producto.id_usuario_op = parseInt(this.loginService.idUsuario, 10);
    this.producto.id_hotel = parseInt(this.loginService.idHotel, 10);

    // cargando valores de formulario en el objeto
    this.producto.nombre_producto = this.formulario.controls.nombre_producto.value;
    this.producto.precio_unitario = this.formulario.controls.precio_unitario.value;
    this.producto.stock = this.formulario.controls.stock.value;
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    this.producto.last_update = date + ' ' + time;
  }
}
