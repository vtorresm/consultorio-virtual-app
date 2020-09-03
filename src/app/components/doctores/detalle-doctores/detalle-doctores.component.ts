import { Component, OnInit, Input } from '@angular/core';
import { Doctor } from '../doctor';
import { DoctorService } from '../doctor.service';
import { AuthService } from '../../login/auth.service';
import { ModalDoctoresService } from './modal-doctores.service';

import { HttpEventType } from '@angular/common/http';

import swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-doctores',
  templateUrl: './detalle-doctores.component.html',
  styleUrls: ['./detalle-doctores.component.css']
})
export class DetalleDoctoresComponent implements OnInit {
  @Input() doctor: Doctor;

  titulo = 'Detalle del doctor';
  private fotoSeleccionada: File;
  progreso = 0;

  constructor(
    private doctorService: DoctorService,
    private authService: AuthService,
    public modalDoctorService: ModalDoctoresService
    ) { }

  ngOnInit(): void {
  }

  seleccionarFoto(event): void {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      swal.fire(
        'Error seleccionar imagen: ',
        'El archivo debe ser del tipo imagen',
        'error'
      );
      this.fotoSeleccionada = null;
    }
  }

  subirFoto(): void {
    if (!this.fotoSeleccionada) {
      swal.fire('Error Upload: ', 'Debe seleccionar una foto', 'error');
    } else {
      this.doctorService
        .subirFoto(this.fotoSeleccionada, this.doctor.id)
        .subscribe((event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            const response: any = event.body;
            this.doctor = response.doctor as Doctor;

            this.modalDoctorService.notificarUpload.emit(this.doctor);
            swal.fire(
              'La foto se ha subido completamente!',
              response.mensaje,
              'success'
            );
          }
        });
    }
  }

  // tslint:disable-next-line: typedef
  cerrarModal() {
    this.modalDoctorService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }

}
