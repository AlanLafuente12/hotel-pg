import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HotelListComponent } from './components/hotel/hotel-list/hotel-list.component';
import { HotelFormComponent } from './components/hotel/hotel-form/hotel-form.component';

import { BaseLayoutComponent } from './base-layout-component';
import { SiteLayoutComponent } from './site-layout-component';

// servicios
import { HotelService } from './services/hotel.service';
import { DosificacionService } from './services/dosificacion.service';

// componentes
import { LoginComponent } from './components/login/login.component';
import { TopNavbarComponent } from './components/shared/top-navbar/top-navbar.component';
import { AdministradorFormComponent } from './components/administrador/administrador-form/administrador-form.component';
import { AdministradorListComponent } from './components/administrador/administrador-list/administrador-list.component';
import { UsuarioOpListComponent } from './components/usuario-op/usuario-op-list/usuario-op-list.component';
import { UsuarioOpFormComponent } from './components/usuario-op/usuario-op-form/usuario-op-form.component';
import { ProductoListComponent } from './components/producto/producto-list/producto-list.component';
import { ProductoFormComponent } from './components/producto/producto-form/producto-form.component';
import { HabitacionListComponent } from './components/habitacion/habitacion-list/habitacion-list.component';
import { HospedajeFormComponent } from './components/hospedaje/hospedaje-form/hospedaje-form.component';
import { HospedajeListComponent } from './components/hospedaje/hospedaje-list/hospedaje-list.component';
import { ReservaListComponent } from './components/reserva/reserva-list/reserva-list.component';
import { LoginResetPasswordComponent } from './components/resetpassword/login-reset-password/login-reset-password.component';
import { CategoriaListComponent } from './components/habitacion/categoria-list/categoria-list.component';
import { HuespedFormComponent } from './components/huesped/huesped-form/huesped-form.component';
import { HuespedListComponent } from './components/huesped/huesped-list/huesped-list.component';
import { ReportesListComponent } from './components/reportes/reportes-list/reportes-list.component';
import { PagoFormComponent } from './components/pago/pago-form/pago-form.component';
import { DosificacionFormComponent } from './components/dosificacion/dosificacion-form/dosificacion-form.component';
import { DosificacionViewComponent } from './components/dosificacion/dosificacion-view/dosificacion-view.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HotelViewComponent } from './components/hotel/hotel-view/hotel-view.component';
import { LogoutComponent } from './components/logout/logout.component';
import { HotelManageComponent } from './components/hotel/hotel-manage/hotel-manage.component';
import { LoadingComponent } from './components/shared/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HotelListComponent,
    HotelFormComponent,
    LoginComponent,
    SiteLayoutComponent,
    BaseLayoutComponent,
    TopNavbarComponent,
    AdministradorFormComponent,
    AdministradorListComponent,
    UsuarioOpListComponent,
    UsuarioOpFormComponent,
    ProductoListComponent,
    ProductoFormComponent,
    HabitacionListComponent,
    HospedajeFormComponent,
    HospedajeListComponent,
    ReservaListComponent,
    LoginResetPasswordComponent,
    CategoriaListComponent,
    HuespedFormComponent,
    HuespedListComponent,
    ReportesListComponent,
    PagoFormComponent,
    DosificacionFormComponent,
    DosificacionViewComponent,
    FooterComponent,
    HotelViewComponent,
    LogoutComponent,
    HotelManageComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    HotelService,
    DosificacionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
