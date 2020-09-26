import { Especialidad } from '../shared/especialidad';
export class Reserva {
  id: number;
  nroReserva: string;
  tipoDocumento: string;
  nroDocumento: string;
  medico: string;
  horaCita: string;
  precio: number;
  createAt: string;
  especialidad: Especialidad;
}
