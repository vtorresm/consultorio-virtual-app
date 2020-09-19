import { Component, OnInit, Input } from '@angular/core';
import { Paciente } from '../paciente';
import { PacienteService } from '../paciente.service';
import { ModalService } from './modal.service';

import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { AuthService } from '../../login/auth.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
})
export class DetalleComponent implements OnInit {
  @Input() paciente: Paciente;

  titulo = 'Detalle del paciente';
  private fotoSeleccionada: File;
  progreso = 0;

  constructor(
    // private pacienteService: PacienteService,
    // private authService: AuthService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {}

  cerrarModal(): void  {
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }
}
