// import { Component, OnInit, Input } from '@angular/core';
// import { Paciente } from '../paciente';
// import { PacienteService } from '../paciente.service';
// import { ModalService } from './modal.service';

// import swal from 'sweetalert2';
// import { HttpEventType } from '@angular/common/http';
// import { AuthService } from '../../usuarios/auth.service';

// @Component({
//   selector: 'detalle-paciente',
//   templateUrl: './detalle.component.html',
//   styleUrls: ['./detalle.component.css'],
// })
// export class DetalleComponent implements OnInit {
//   @Input() paciente: Paciente;

//   titulo: string = 'Detalle del paciente';
//   private fotoSeleccionada: File;
//   progreso: number = 0;

//   constructor(
//     private pacienteService: PacienteService,
//     private authService: AuthService,
//     private modalService: ModalService
//   ) {}

//   ngOnInit() {}

//   seleccionarFoto(event) {
//     this.fotoSeleccionada = event.target.files[0];
//     this.progreso = 0;
//     console.log(this.fotoSeleccionada);
//     if (this.fotoSeleccionada.type.indexOf('image') < 0) {
//       swal(
//         'Error seleccionar imagen: ',
//         'El archivo debe ser del tipo imagen',
//         'error'
//       );
//       this.fotoSeleccionada = null;
//     }
//   }

//   subirFoto() {
//     if (!this.fotoSeleccionada) {
//       swal('Error Upload: ', 'Debe seleccionar una foto', 'error');
//     } else {
//       this.pacienteService
//         .subirFoto(this.fotoSeleccionada, this.paciente.id)
//         .subscribe((event) => {
//           if (event.type === HttpEventType.UploadProgress) {
//             this.progreso = Math.round((event.loaded / event.total) * 100);
//           } else if (event.type === HttpEventType.Response) {
//             const response: any = event.body;
//             this.paciente = response.paciente as Paciente;

//             this.modalService.notificarUpload.emit(this.paciente);
//             swa.fire(
//               'La foto se ha subido completamente!',
//               response.mensaje,
//               'success'
//             );
//           }
//         });
//     }
//   }

//   cerrarModal() {
//     this.modalService.cerrarModal();
//     this.fotoSeleccionada = null;
//     this.progreso = 0;
//   }
// }
