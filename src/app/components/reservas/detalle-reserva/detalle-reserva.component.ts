import { Component, OnInit, Input } from '@angular/core';
import { Reserva } from '../reserva';
import { ReservaService } from '../reserva.service';
import { ModalReservaService } from './modal-reserva.service';

@Component({
  selector: 'app-detalle-reserva',
  templateUrl: './detalle-reserva.component.html',
  styleUrls: ['./detalle-reserva.component.css']
})
export class DetalleReservaComponent implements OnInit {
  @Input() reserva: Reserva;

  titulo = 'Detalle de la reserva';

  constructor(public modalReservaService: ModalReservaService) { }

  ngOnInit(): void {
  }

  cerrarModal(): void {
    this.modalReservaService.cerrarModal();
  }

}
