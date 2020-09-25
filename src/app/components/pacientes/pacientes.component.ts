import { Component, OnInit } from '@angular/core';
import { Paciente } from './paciente';
import { PacienteService } from './paciente.service';
import swal from 'sweetalert2';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from './detalle-pacientes/modal.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
})
export class PacientesComponent implements OnInit {
  pacientes: Paciente[];
  paginador: any;
  pacienteSeleccionado: Paciente;

  constructor(
    private pacienteService: PacienteService,
    private modalPacientesService: ModalService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

      this.pacienteService
        .getPacientes(page)
        .pipe(
          tap((response) => {
            console.log('PacientesComponent: tap 3');
            (response.content as Paciente[]).forEach((paciente) =>
              console.log(paciente.nombreApellido)
            );
          })
        )
        .subscribe((response) => {
          this.pacientes = response.content as Paciente[];
          this.paginador = response;
        });
    });
  }

  delete(paciente: Paciente): void {
    swal
      .fire({
        title: 'Está seguro?',
        text: `¿Seguro que desea eliminar al paciente ${paciente.nombreApellido}?`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
        reverseButtons: true,
      } as any)
      .then((result) => {
        if (result.value) {
          this.pacienteService.delete(paciente.id).subscribe(() => {
            this.pacientes = this.pacientes.filter((cli) => cli !== paciente);
            swal.fire(
              'Paciente Eliminado!',
              `Paciente ${paciente.nombreApellido} eliminado con éxito.`,
              'success'
            );
          });
        }
      });
  }

  abrirModal(paciente: Paciente): void {
    this.pacienteSeleccionado = paciente;
    this.modalPacientesService.abrirModal();
  }
}
