import { Distrito } from '../shared/distrito';
export class Paciente {
  id: number;
  nombreApellido: string;
  dni: string;
  gender: string;
  email: string;
  cellPhone: string;
  birthDate: Date;
  address: string;
  createAt: string;
  distrito: Distrito;
}
