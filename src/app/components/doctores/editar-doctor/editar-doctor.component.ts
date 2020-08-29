import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DoctorService } from '../doctor.service';
import { Doctor } from '../doctor';

import swal from 'sweetalert2';

@Component({
  selector: 'app-editar-doctor',
  templateUrl: './editar-doctor.component.html',
})
export class EditarDoctorComponent implements OnInit {

  public doctor: Doctor = new Doctor();
  titulo = 'Crear Doctor';

  errores: string[];

  constructor(private doctorService: DoctorService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = +params.get('id');
      if (id) {
        this.doctorService.getDoctor(id).subscribe((doctor) => this.doctor = doctor);
      }
    });
  }

  create(): void {
    this.doctorService.create(this.doctor)
      .subscribe(
        doctor => {
          this.router.navigate(['/doctores']);
          swal.fire('Nuevo doctor', `El doctor ${doctor.nombre} ha sido creado con éxito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  update(): void {
    this.doctorService.update(this.doctor)
      .subscribe(
        json => {
          this.router.navigate(['/doctores']);
          swal.fire('Doctor Actualizado', `${json.mensaje}: ${json.Doctor.nombre}`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

}
