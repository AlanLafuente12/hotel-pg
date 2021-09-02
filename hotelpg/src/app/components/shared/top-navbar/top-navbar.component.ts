// Angular
import { Component, OnInit, Input  } from '@angular/core';
// Servicios
import { LoginService } from '../../../services/login.service';
import { ImageService } from '../../../services/image.service';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: []
})
export class TopNavbarComponent implements OnInit {

  // estas variables sirven para mostrar los titulos
  @Input() navbarTitle: string;

  constructor(public loginService: LoginService,
              public imageService: ImageService){
  }

  ngOnInit(): void {
    /*
    if (this.navbarTitle === 'Página principal'){
      alert('Pagina principal');
    }
    */
  }
  getImageSrc(): string{
    // return this.imageService.getImagePath() + this.loginService.logo;
    return this.imageService.getImagePath() + 'hotel-' + this.loginService.idHotel + '.png';
  }
  logout(): void{
    console.log('logout');
    this.loginService.logout();
  }
}
