import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { PacienteService } from './components/pacientes/paciente.service';
import { DoctoresComponent } from './components/doctores/doctores.component';
import { DoctorService } from './components/doctores/doctor.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EditarPacienteComponent } from './components/pacientes/editar-paciente/editar-paciente.component';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from './components/pacientes/paginator/paginator.component';
import { PaginatorDoctorComponent } from './components/doctores/paginator-doctor/paginator-doctor.component';
import { EditarDoctorComponent } from './components/doctores/editar-doctor/editar-doctor.component';
import { LoginComponent } from './components/login/login.component';

import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';

import { AuthGuard } from './components/login/guards/auth.guard';
import { RoleGuard } from './components/login/guards/role.guard';
import { TokenInterceptor } from './components/login/interceptors/token.interceptor';
import { AuthInterceptor } from './components/login/interceptors/auth.interceptor';
import { DetalleDoctoresComponent } from './components/doctores/detalle-doctores/detalle-doctores.component';
import { HomeComponent } from './components/home/home.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { EditarReservaComponent } from './components/reservas/editar-reserva/editar-reserva.component';
import { DetalleReservaComponent } from './components/reservas/detalle-reserva/detalle-reserva.component';
import { PaginatorReservaComponent } from './components/reservas/paginator-reserva/paginator-reserva.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {MatSelectModule} from '@angular/material/select';

registerLocaleData(localeES, 'es');
import { from } from 'rxjs';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'pacientes', component: PacientesComponent },
  { path: 'pacientes/page/:page', component: PacientesComponent },
  {
    path: 'pacientes/editar-paciente',
    component: EditarPacienteComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_ADMIN' },
  },
  {
    path: 'pacientes/editar-paciente/:id',
    component: EditarPacienteComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_ADMIN' },
  },
  { path: 'doctores', component: DoctoresComponent },
  { path: 'doctores/page/:page', component: DoctoresComponent },
  { path: 'doctores/editar-doctor', component: EditarDoctorComponent },
  { path: 'doctores/editar-doctor/:id', component: EditarDoctorComponent },
  { path: 'doctores/page/:page', component: DoctoresComponent },
  { path: 'reservas', component: ReservasComponent },
  { path: 'reservas/page/:page', component: ReservasComponent },
  {
    path: 'reservas/editar-reserva',
    component: EditarReservaComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_ADMIN' },
  },
  {
    path: 'reservas/editar-reserva/:id',
    component: EditarReservaComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_ADMIN' },
  },
  { path: 'login', component: LoginComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PacientesComponent,
    EditarPacienteComponent,
    PaginatorComponent,
    PaginatorDoctorComponent,
    DoctoresComponent,
    EditarDoctorComponent,
    LoginComponent,
    DetalleDoctoresComponent,
    HomeComponent,
    ReservasComponent,
    EditarReservaComponent,
    DetalleReservaComponent,
    PaginatorReservaComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatSelectModule
  ],
  providers: [
    PacienteService,
    DoctorService,
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
