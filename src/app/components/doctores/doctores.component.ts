import { Component, OnInit } from '@angular/core';
import { Doctor } from './doctor';
import { DoctorService } from './doctor.service';
import swal from 'sweetalert2';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-doctores',
  templateUrl: './doctores.component.html'
})
export class DoctoresComponent implements OnInit {

  doctores: Doctor[];
  paginador: any;

  constructor(private doctorService: DoctorService,
              private activatedRoute: ActivatedRoute) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

      this.doctorService.getDoctores(page)
        .pipe(
          tap(response => {
            console.log('DoctoresComponent: tap 3');
            (response.content as Doctor[]).forEach(doctor => console.log(doctor.nombre));
          })
        ).subscribe(response => {
          this.doctores = response.content as Doctor[];
          this.paginador = response;
        });
    });
  }

  delete(doctor: Doctor): void {
    swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al doctor ${doctor.nombre} ${doctor.apellido}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }as any).then((result) => {
      if (result.value) {

        this.doctorService.delete(doctor.id).subscribe(
          () => {
            this.doctores = this.doctores.filter(cli => cli !== doctor);
            swal.fire(
              'Doctor Eliminado!',
              `Doctor ${doctor.nombre} eliminado con éxito.`,
              'success'
            );
          }
        );

      }
    });
  }

}
