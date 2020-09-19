import { Component, OnInit } from '@angular/core';
import { Reserva } from './reserva';
import { ReservaService } from './reserva.service';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ModalReservaService } from '../reservas/detalle-reserva/modal-reserva.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css'],
})
export class ReservasComponent implements OnInit {
  reservas: Reserva[];
  paginador: any;
  reservaSeleccionado: Reserva;

  constructor(
    private reservaService: ReservaService,
    private modalReservasService: ModalReservaService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

      this.reservaService
        .getReservas(page)
        .pipe(
          tap((response) => {
            console.log('ReservasComponent: tap 3');
            (response.content as Reserva[]).forEach((reserva) =>
              console.log(reserva.nroReserva)
            );
          })
        )
        .subscribe((response) => {
          this.reservas = response.content as Reserva[];
          this.paginador = response;
        });
    });

    this.modalReservasService.notificarUpload.subscribe(doctor => {
      this.reservas = this.reservas.map(reservaOriginal => {
        if (doctor.id === reservaOriginal.id) {
          reservaOriginal.id = doctor.id;
        }
        return reservaOriginal;
      });
    });
  }

  delete(reserva: Reserva): void {
    swal
      .fire({
        title: 'Está seguro?',
        text: `¿Seguro que desea eliminar la Reserva ${reserva.id} ${reserva.nroReserva}?`,
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
          this.reservaService.delete(reserva.id).subscribe(() => {
            this.reservas = this.reservas.filter((cli) => cli !== reserva);
            swal.fire(
              'Reserva Eliminada!',
              `Reserva ${reserva.nroReserva} eliminado con éxito.`,
              'success'
            );
          });
        }
      });
  }

  abrirModal(reserva: Reserva): void {
    this.reservaSeleccionado = reserva;
    this.modalReservasService.abrirModal();
  }
}
