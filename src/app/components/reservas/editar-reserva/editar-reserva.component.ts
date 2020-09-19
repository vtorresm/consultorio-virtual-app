import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReservaService } from '../reserva.service';
import { Reserva } from '../reserva';

import swal from 'sweetalert2';

@Component({
  selector: 'app-editar-reserva',
  templateUrl: './editar-reserva.component.html',
  styleUrls: ['./editar-reserva.component.css'],
})
export class EditarReservaComponent implements OnInit {
  public reserva: Reserva = new Reserva();
  titulo = 'Crear Reserva';

  errores: string[];

  constructor(
    private reservaService: ReservaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = +params.get('id');
      if (id) {
        this.reservaService
          .getReserva(id)
          .subscribe((reserva) => (this.reserva = reserva));
      }
    });
  }

  create(): void {
    this.reservaService.create(this.reserva).subscribe(
      (reserva) => {
        this.router.navigate(['/reservas']);
        swal.fire(
          'Nueva reserva',
          `La reserva ${reserva.nroReserva} ha sido creado con éxito`,
          'success'
        );
      },
      (err) => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  update(): void {
    console.log(this.reserva);
    this.reservaService.update(this.reserva).subscribe(
      (json) => {
        this.router.navigate(['/reservas']);
        swal.fire(
          'Reserva Actualizada',
          `${json.mensaje}: ${json.Reserva.nroReserva}`,
          'success'
        );
      },
      (err) => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }
}
