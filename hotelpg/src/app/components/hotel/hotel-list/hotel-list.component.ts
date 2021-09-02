// Angular
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// Servicios
import { HotelService } from '../../../services/hotel.service';
import { ImageService } from '../../../services/image.service';
// Modelos
import { Hotel } from '../../../models/Hotel';
// Modulos
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: []
})
export class HotelListComponent implements OnInit {

  hoteles: Hotel[];

  constructor(private hotelService: HotelService,
              private router: Router,
              private imageService: ImageService,
              public activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.obtenerHoteles();
  }

  getImageSrc(hotel: Hotel): string{
    return this.imageService.getImagePath() + 'hotel-' + hotel.id_hotel + '.png';
    // return this.imageService.getImagePath() + hotel.logo;
  }

  obtenerHoteles(): void{
    this.hotelService.getHoteles().subscribe(
      (res: any) => {
        this.hoteles = res;
      },
      (err: any) => console.error(err)
    );
  }

  editarHotel(id: string): void{
    this.router.navigate(['hotel/edit', id]);
  }

  eliminarHotel(id: string): void{
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
        this.hotelService.deleteHotel(id)
        .subscribe(
          (res: any) => {
            console.log(res);
            Swal.fire(
              '¡Eliminado!',
              'El elemento ha sido eliminado con éxito',
              'success'
            );
            this.obtenerHoteles();
          },
          (err: any) => {
            console.log(err);
          }
        );
      }
    });
  }
}
