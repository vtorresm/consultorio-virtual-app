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
import { FormComponent } from './components/pacientes/form.component';
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

registerLocaleData(localeES, 'es');

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'pacientes', component: PacientesComponent },
  { path: 'doctores', component: DoctoresComponent },
  { path: 'reservas', component: ReservasComponent },
  { path: 'pacientes/page/:page', component: PacientesComponent },
  {
    path: 'pacientes/form',
    component: FormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_ADMIN' },
  },
  {
    path: 'pacientes/form/:id',
    component: FormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_ADMIN' },
  },
  { path: 'doctores/page/:page', component: DoctoresComponent },
  { path: 'doctores/editar-doctor', component: EditarDoctorComponent },
  { path: 'doctores/editar-doctor/:id', component: EditarDoctorComponent },
  { path: 'doctores/page/:page', component: DoctoresComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PacientesComponent,
    FormComponent,
    PaginatorComponent,
    PaginatorDoctorComponent,
    DoctoresComponent,
    EditarDoctorComponent,
    LoginComponent,
    DetalleDoctoresComponent,
    HomeComponent,
    ReservasComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
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
