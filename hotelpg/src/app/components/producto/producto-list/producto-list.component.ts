// Angular
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// Servicios
import { LoginService } from '../../../services/login.service';
import { ProductoService } from '../../../services/producto.service';
// Modelos
import { Producto } from '../../../models/Producto';
// Modulos
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: []
})
export class ProductoListComponent implements OnInit {

  productos: Producto[];

  // para aumentar el stock
  formulario: FormGroup;
  producto: Producto = {};
  advertirObligatorios: boolean = false;

  constructor(private productoService: ProductoService,
              private router: Router,
              public activatedRoute: ActivatedRoute,
              private loginService: LoginService) {
    this.formulario = new FormGroup({
      stock: new FormControl('',  [
                                    Validators.required,
                                    Validators.pattern(/^[0-9]*$/)
                                  ])
    });
  }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void{
    this.productoService.getProductos(this.loginService.idHotel).subscribe(
      (res: any) => {
        this.productos = res;
      },
      (err: any) => console.error(err)
    );
  }

  editarProducto(id: string): void{
    this.router.navigate(['producto/edit', id]);
  }

  eliminarProducto(id: string): void{
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
        this.productoService.deleteProducto(id)
        .subscribe(
          (res: any) => {
            console.log(res);
            Swal.fire(
              '¡Eliminado!',
              'El elemento ha sido eliminado con éxito',
              'success'
            );
            this.obtenerProductos();
          },
          (err: any) => {
            console.log(err);
          }
        );
      }
    });
  }

  seleccionarProducto(producto: Producto): void{
    this.producto = producto;
  }
  aumentarStock(): void{
    if (this.formulario.valid)
    {
      this.cargarDatos();
      this.productoService.updateProducto(this.producto.id_producto.toString(), this.producto)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.obtenerProductos();
          // cerrar modal
          document.getElementById('btnCloseModal').click();
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
    this.producto.stock = (parseInt(this.producto.stock, 10) + parseInt(this.formulario.controls.stock.value, 10)).toString();
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    this.producto.last_update = date + ' ' + time;
  }
  limpiarFormulario(): void{
    // no advertir de obligatorios
    this.advertirObligatorios = false;
    // limpiar datos de objeto
    this.producto = {};
    // limpiar datos de formulario
    this.formulario.controls.stock.setValue('');
  }
}
