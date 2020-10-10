import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Paciente } from '../paciente';
import { PacienteService } from '../paciente.service';
import { Distrito } from '../../shared/distrito';

import swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-editar-paciente',
  templateUrl: './editar-paciente.component.html',
})
export class EditarPacienteComponent implements OnInit {
  public paciente: Paciente = new Paciente();
  // distritos: Distrito[];
  // distritos: Observable<Distrito[]>;
  titulo = 'Crear Paciente';

  errores: string[];

  constructor(
    private pacienteService: PacienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = +params.get('id');
      if (id) {
        this.pacienteService
          .getPaciente(id)
          .subscribe((paciente) => (this.paciente = paciente));
      }
    });

    // this.distritos =this.pacienteService.getDistritos();
    // this.pacienteService.getDistritos().subscribe(distritos => {
    //   this.distritos = distritos;
    //   console.log(distritos);
    // });

    // this.pacienteService
    //   .getDistritos()
    //   .subscribe((distritos) => (this.distritos = distritos));
  }

  create(): void {
    console.log(this.paciente);
    this.pacienteService.create(this.paciente).subscribe(
      (paciente) => {
        this.router.navigate(['/pacientes']);
        swal.fire(
          'Nuevo paciente',
          `El paciente ${paciente.nombreApellido} ha sido creado con éxito`,
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
    console.log(this.paciente);
    this.pacienteService.update(this.paciente).subscribe(
      (json) => {
        this.router.navigate(['/pacientes']);
        swal.fire(
          'Paciente Actualizado',
          `${json.mensaje}: ${json.Paciente.nombre}`,
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

  compararDistrito(o1: Distrito, o2: Distrito): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }

    // return o1 && o2 ? o1.id === o2.id : o1 === o2;

    return o1 === null || o2 === null || o1 === undefined || o2 === undefined
      ? false
      : o1.id === o2.id;
  }
}
