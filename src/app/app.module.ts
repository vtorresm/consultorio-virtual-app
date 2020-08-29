import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { PacienteService } from './components/pacientes/paciente.service';
import { DoctoresComponent } from './components/doctores/doctores.component';
import { DoctorService } from './components/doctores/doctor.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './components/pacientes/form.component';
import { FormDoctoresComponent } from './components/doctores/formDoctor.component';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from './paginator/paginator.component';

import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
registerLocaleData(localeES, 'es');

const routes: Routes = [
  { path: '', redirectTo: '/pacientes', pathMatch: 'full' },
  { path: 'pacientes', component: PacientesComponent },
  { path: 'doctores', component: DoctoresComponent },
  { path: 'pacientes/page/:page', component: PacientesComponent },
  { path: 'pacientes/form', component: FormComponent },
  { path: 'pacientes/form/:id', component: FormComponent },
  { path: 'doctores/formDoctor', component: FormDoctoresComponent },
  { path: 'doctores/formDoctor/:id', component: FormDoctoresComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PacientesComponent,
    FormComponent,
    FormDoctoresComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [PacienteService, { provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
