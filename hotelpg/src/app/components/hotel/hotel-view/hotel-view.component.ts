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
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-hotel-view',
  templateUrl: './hotel-view.component.html',
  styleUrls: []
})
export class HotelViewComponent implements OnInit {

  hoteles: Hotel[];

  constructor(private hotelService: HotelService,
              private router: Router,
              private imageService: ImageService,
              public activatedRoute: ActivatedRoute,
              public loginService: LoginService) {
  }

  ngOnInit(): void {
    this.obtenerHoteles();
  }

  getImageSrc(hotel: Hotel): string{
    return this.imageService.getImagePath() + 'hotel-' + hotel.id_hotel + '.png';
  }

  obtenerHoteles(): void{
    this.hotelService.getHoteles().subscribe(
      (res: any) => {
        this.hoteles = res;
      },
      (err: any) => console.error(err)
    );
  }
}
