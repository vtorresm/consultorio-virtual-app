import { Injectable } from '@angular/core';
import { Paciente } from './paciente';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class PacienteService {
  private urlEndPoint = 'http://localhost:8080/api/pacientes';

  constructor(private http: HttpClient, private router: Router) {}

  getPacientes(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        console.log('PacienteService: tap 1');
        (response.content as Paciente[]).forEach((paciente) =>
          console.log(paciente.nombre)
        );
      }),
      map((response: any) => {
        (response.content as Paciente[]).map((paciente) => {
          paciente.nombre = paciente.nombre;
          return paciente;
        });
        return response;
      }),
      tap((response) => {
        console.log('PacienteService: tap 2');
        (response.content as Paciente[]).forEach((paciente) =>
          console.log(paciente.nombre)
        );
      })
    );
  }

  create(paciente: Paciente): Observable<Paciente> {
    return this.http.post(this.urlEndPoint, paciente).pipe(
      map((response: any) => response.paciente as Paciente),
      catchError((e) => {
        if (e.status === 400) {
          return throwError(e);
        }

        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }

        return throwError(e);
      })
    );
  }

  getPaciente(id): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        if (e.status !== 401 && e.error.mensaje) {
          this.router.navigate(['/pacientes']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  update(paciente: Paciente): Observable<any> {
    return this.http
      .put<any>(`${this.urlEndPoint}/${paciente.id}`, paciente)
      .pipe(
        catchError((e) => {
          if (e.status === 400) {
            return throwError(e);
          }
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
        })
      );
  }

  delete(id: number): Observable<Paciente> {
    return this.http.delete<Paciente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }
}
