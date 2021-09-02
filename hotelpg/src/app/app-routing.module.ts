import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { AdministradorFormComponent } from './components/administrador/administrador-form/administrador-form.component';
import { AdministradorListComponent } from './components/administrador/administrador-list/administrador-list.component';
import { HabitacionListComponent } from './components/habitacion/habitacion-list/habitacion-list.component';
import { CategoriaListComponent } from './components/habitacion/categoria-list/categoria-list.component';
import { HospedajeFormComponent } from './components/hospedaje/hospedaje-form/hospedaje-form.component';
import { HospedajeListComponent } from './components/hospedaje/hospedaje-list/hospedaje-list.component';
import { HotelListComponent } from './components/hotel/hotel-list/hotel-list.component';
import { HotelFormComponent } from './components/hotel/hotel-form/hotel-form.component';
import { HotelViewComponent } from './components/hotel/hotel-view/hotel-view.component';
import { ProductoFormComponent } from './components/producto/producto-form/producto-form.component';
import { ProductoListComponent } from './components/producto/producto-list/producto-list.component';
import { UsuarioOpFormComponent } from './components/usuario-op/usuario-op-form/usuario-op-form.component';
import { UsuarioOpListComponent } from './components/usuario-op/usuario-op-list/usuario-op-list.component';
import { ReservaListComponent } from './components/reserva/reserva-list/reserva-list.component';
import { LoginComponent } from './components/login/login.component';
import { LoginResetPasswordComponent } from './components/resetpassword/login-reset-password/login-reset-password.component';
import { HuespedFormComponent } from './components/huesped/huesped-form/huesped-form.component';
import { HuespedListComponent } from './components/huesped/huesped-list/huesped-list.component';
import { ReportesListComponent } from './components/reportes/reportes-list/reportes-list.component';
import { PagoFormComponent } from './components/pago/pago-form/pago-form.component';
import { DosificacionFormComponent } from './components/dosificacion/dosificacion-form/dosificacion-form.component';
import { DosificacionViewComponent } from './components/dosificacion/dosificacion-view/dosificacion-view.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RoleGuardService as RoleGuard } from './services/role-guard.service';
import { DefaultRoutingService as DefaultRouting } from './services/default-routing.service';
import { HotelManageComponent } from './components/hotel/hotel-manage/hotel-manage.component';


const routes: Routes = [
  { path: 'main', component: HotelViewComponent,
    data: { navbarTitle: 'Hoteles' }},
  // paths hoteles
  { path: 'hotel', component: HotelListComponent,
    canActivate: [RoleGuard],
    data: { navbarTitle: 'Hoteles', expectedRoles: ['admin'] }},
  { path: 'hotel/add', component: HotelFormComponent,
    canActivate: [RoleGuard],
    data: { navbarTitle: 'Hoteles', expectedRoles: ['admin'] }},
  { path: 'hotel/edit/:id', component: HotelFormComponent,
    canActivate: [RoleGuard],
    data: { navbarTitle: 'Hoteles', expectedRoles: ['admin'] }},
  { path: 'hotel/manage', component: HotelManageComponent,
    canActivate: [RoleGuard],
    data: { navbarTitle: 'Mi hotel', expectedRoles: ['gerente'] }},
  // paths administradores
  { path: 'admin', component: AdministradorListComponent,
    canActivate: [RoleGuard],
    data: { navbarTitle: 'Administradores', expectedRoles: ['admin'] }},
  { path: 'admin/add', component: AdministradorFormComponent,
    canActivate: [RoleGuard],
    data: { navbarTitle: 'Administradores', expectedRoles: ['admin'] }},
  { path: 'admin/edit/:id', component: AdministradorFormComponent,
    canActivate: [RoleGuard],
    data: { navbarTitle: 'Administradores', expectedRoles: ['admin'] }},
  // paths dosificaciones
  { path: 'dosificacion', component: DosificacionViewComponent,
    canActivate: [RoleGuard],
    data: { navbarTitle: 'Dosificaciones', expectedRoles: ['gerente'] }},
  { path: 'dosificacion/add', component: DosificacionFormComponent,
    canActivate: [RoleGuard],
    data: { navbarTitle: 'Dosificaciones', expectedRoles: ['gerente'] }},
  // paths usuarios gerentes
  { path: 'gerente', component: UsuarioOpListComponent,
    canActivate: [RoleGuard],
    data: { navbarTitle: 'Gerentes', expectedRoles: ['admin', 'gerente'] }},
  { path: 'gerente/add', component: UsuarioOpFormComponent,
    canActivate: [RoleGuard],
    data: { navbarTitle: 'Gerentes', expectedRoles: ['admin', 'gerente'] }},
  { path: 'gerente/edit/:id', component: UsuarioOpFormComponent,
    canActivate: [RoleGuard],
    data: { navbarTitle: 'Gerentes', expectedRoles: ['admin', 'gerente'] }},
  // paths usuarios empleados
  { path: 'empleado', component: UsuarioOpListComponent,
    canActivate: [RoleGuard],
    data: { navbarTitle: 'Empleados', expectedRoles: ['gerente'] }},
  { path: 'empleado/add', component: UsuarioOpFormComponent,
    canActivate: [RoleGuard],
    data: { navbarTitle: 'Empleados', expectedRoles: ['gerente'] }},
  { path: 'empleado/edit/:id', component: UsuarioOpFormComponent,
    canActivate: [RoleGuard],
    data: { navbarTitle: 'Empleados', expectedRoles: ['gerente'] }},
  // paths clientes
  { path: 'huesped', component: HuespedListComponent,
    canActivate: [RoleGuard],
    data: { navbarTitle: 'Huéspedes', expectedRoles: ['gerente', 'empleado'] }},
  { path: 'huesped/add', component: HuespedFormComponent,
    canActivate: [RoleGuard],
    data: { navbarTitle: 'Huéspedes', expectedRoles: ['gerente', 'empleado'] }},
  { path: 'huesped/edit/:id', component: HuespedFormComponent,
    canActivate: [RoleGuard],
    data: { navbarTitle: 'Huéspedes', expectedRoles: ['gerente', 'empleado'] }},
  // paths hospedajes
  { path: 'hospedaje', component: HospedajeListComponent,
    canActivate: [RoleGuard],
    data: { navbarTitle: 'Hospedajes', expectedRoles: ['gerente', 'empleado'] }},
  { path: 'hospedaje/view/:id', component: HospedajeFormComponent,
    canActivate: [RoleGuard],
    data: { navbarTitle: 'Hospedajes', expectedRoles: ['gerente', 'empleado'] }},
  { path: 'hospedaje/pago/:id', component: PagoFormComponent,
    canActivate: [RoleGuard],
    data: { navbarTitle: 'Hospedajes', expectedRoles: ['gerente', 'empleado'] }},
  // paths productos
  { path: 'producto', component: ProductoListComponent,
    canActivate: [RoleGuard],
    data: { navbarTitle: 'Productos', expectedRoles: ['gerente'] }},
  { path: 'producto/add', component: ProductoFormComponent,
    canActivate: [RoleGuard],
    data: { navbarTitle: 'Productos', expectedRoles: ['gerente'] }},
  { path: 'producto/edit/:id', component: ProductoFormComponent,
    canActivate: [RoleGuard],
    data: { navbarTitle: 'Productos', expectedRoles: ['gerente'] }},
  // paths habitaciones
  { path: 'habitacion', component: HabitacionListComponent,
    canActivate: [RoleGuard],
    data: { navbarTitle: 'Habitaciones', expectedRoles: ['gerente', 'empleado'] }},
  { path: 'categoria', component: CategoriaListComponent,
    canActivate: [RoleGuard],
    data: { navbarTitle: 'Categorías', expectedRoles: ['gerente', 'empleado'] }},
  // paths reserva
  { path: 'reserva', component: ReservaListComponent,
    canActivate: [RoleGuard],
    data: { navbarTitle: 'Reservas', expectedRoles: ['gerente', 'empleado'] }},
  // paths reportes
  { path: 'reporte', component: ReportesListComponent,
    canActivate: [RoleGuard],
    data: { navbarTitle: 'Reportes', expectedRoles: ['gerente'] }},
  // paths reset password
  { path: 'resetpassword', component: LoginResetPasswordComponent,
    canActivate: [RoleGuard],
    data: { navbarTitle: 'Cambiar Password', expectedRoles: ['admin', 'gerente', 'empleado'] }},
  // paths login
  { path: 'login', component: LoginComponent,
    data: { loginType: 'cliente' }},
  { path: 'login/personal', component: LoginComponent,
    data: { loginType: 'personal' }},
  { path: 'login/admin', component: LoginComponent,
    data: { loginType: 'admin' }},
  // path logout
  { path: 'logout', component: LogoutComponent },
  // path por defecto
  { path: '**',
    pathMatch: 'full',
    redirectTo: '',
    canActivate: [DefaultRouting]}
  /*
  { path: '',
    component: BaseLayoutComponent,
    children: [{ path: 'login', component: LoginComponent}] },
  { path: '',
    component: SiteLayoutComponent,
    children: [{ path: 'hotel', component: HotelListComponent}] },
  { path: '', pathMatch: 'full', redirectTo: 'hotel' }
  */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
