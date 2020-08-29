import { Component, OnInit } from '@angular/core';
import { Paciente } from './paciente';
import { PacienteService } from './paciente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public paciente: Paciente = new Paciente();
  titulo = 'Crear Paciente';

  errores: string[];

  constructor(private pacienteService: PacienteService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = +params.get('id');
      if (id) {
        this.pacienteService.getPaciente(id).subscribe((paciente) => this.paciente = paciente);
      }
    });
  }

  create(): void {
    this.pacienteService.create(this.paciente)
      .subscribe(
        paciente => {
          this.router.navigate(['/pacientes']);
          swal.fire('Nuevo paciente', `El paciente ${paciente.nombre} ha sido creado con éxito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  update(): void {
    this.pacienteService.update(this.paciente)
      .subscribe(
        json => {
          this.router.navigate(['/pacientes']);
          swal.fire('Paciente Actualizado', `${json.mensaje}: ${json.Paciente.nombre}`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

}
