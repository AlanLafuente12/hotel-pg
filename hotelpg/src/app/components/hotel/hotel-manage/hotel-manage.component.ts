// Angular
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// Servicios
import { HotelService } from '../../../services/hotel.service';
import { LoginService } from '../../../services/login.service';
import { SubirArchivoService } from '../../../services/subir-archivo.service';
import { ImageService } from '../../../services/image.service';
// Modelos
import { Hotel } from '../../../models/Hotel';
// Modulos
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hotel-manage',
  templateUrl: './hotel-manage.component.html',
  styles: [
  ]
})
export class HotelManageComponent implements OnInit {

  public selectedFile: ImageSnippet;
  imagePath: string = null;

  formulario: FormGroup;
  hotel: Hotel = {};

  titulo: string;
  editando: boolean = false;
  advertirObligatorios: boolean = false;

  constructor(private hotelservice: HotelService,
              private loginService: LoginService,
              private subirArchivoService: SubirArchivoService,
              private router: Router,
              public activatedRoute: ActivatedRoute,
              private imageService: ImageService) {

    this.formulario = new FormGroup({
      nombre_hotel: new FormControl('', [
                                          Validators.required,
                                          Validators.minLength(3)
                                        ]),
      direccion: new FormControl('',  [
                                        Validators.required,
                                        Validators.minLength(7)
                                      ]),
      departamento: new FormControl('', Validators.required),
      nit: new FormControl('', [
                                      Validators.pattern(/^[0-9]*$/),
                                      Validators.minLength(7)
                                    ]),
      cantidad_estrellas: new FormControl('3', Validators.required),
      color: new FormControl('purple'),
    });

  }

  ngOnInit(): void {
    this.hotelservice.getHotel(this.loginService.idHotel)
      .subscribe(
        (res: any) => {
          this.hotel = res;
          this.formulario.setValue({
            nombre_hotel: this.hotel.nombre_hotel,
            direccion: this.hotel.direccion,
            departamento: this.hotel.departamento,
            nit: this.hotel.nit,
            cantidad_estrellas: this.hotel.cantidad_estrellas,
            color: this.hotel.color
          });
          this.probarColor(this.hotel.color);
          this.imagePath = this.imageService.getImagePath() + 'hotel-' + this.hotel.id_hotel + '.png';
          // this.imagePath = this.imageService.getImagePath() + this.hotel.logo;
        },
        (err: any) => {
          console.log(err);
        }
      );
    this.titulo = 'Hotel ' + this.loginService.nombreHotel;
  }

  modificarHotel(): void{
    if (this.formulario.valid)
    {
      this.cargarDatos();
      console.log(this.hotel);
      this.hotelservice.updateHotel(this.hotel.id_hotel.toString(), this.hotel)
      .subscribe(
        (res: any) => {
          // subir imagen
          if (this.selectedFile){
            console.log('subiendo imagen');
            this.subirArchivoService.subirImagen(this.selectedFile.file, this.hotel.id_hotel.toString()).subscribe(
              (res2) => {
                console.log('imagen subida con exito');
              },
              (err2) => {
                console.log('error subiendo imagen');
              });
          }
          console.log(res);
          Swal.fire(
            '¡Modificado!',
            'El elemento ha sido modificado con éxito',
            'success'
          );
          this.router.navigate(['hotel/manage']);
          this.editando = false;
          this.ngOnInit();
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
    this.hotel.id_administrador = parseInt(this.loginService.idUsuario, 10);

    // cargando valores de formulario en el objeto
    this.hotel.nombre_hotel = this.formulario.controls.nombre_hotel.value;
    this.hotel.direccion = this.formulario.controls.direccion.value;
    this.hotel.departamento = this.formulario.controls.departamento.value;
    this.hotel.nit = this.formulario.controls.nit.value;
    this.hotel.cantidad_estrellas = this.formulario.controls.cantidad_estrellas.value;
    this.hotel.color = this.formulario.controls.color.value;
  }


  processFile(imageInput: any): void{
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
    });

    reader.readAsDataURL(file);
  }

  probarColor(color: string): void{
    this.loginService.probarColor(color);
  }
}

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
