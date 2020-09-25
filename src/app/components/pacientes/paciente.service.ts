import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { Paciente } from './paciente';
import { Distrito } from '../shared/distrito';

@Injectable({ providedIn: 'root' })
export class PacienteService {
  private urlEndPoint = 'http://localhost:8080/api/pacientes';

  constructor(private http: HttpClient, private router: Router) {}

  getDistritos(): Observable<Distrito[]> {
    return this.http.get<Distrito[]>(this.urlEndPoint + '/distritos');
  }

  getPacientes(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        console.log('PacienteService: tap 1');
        (response.content as Paciente[]).forEach((paciente) =>
          console.log(paciente.nombreApellido)
        );
      }),
      map((response: any) => {
        (response.content as Paciente[]).map((paciente) => {
          paciente.nombreApellido = paciente.nombreApellido;
          return paciente;
        });
        return response;
      }),
      tap((response) => {
        console.log('PacienteService: tap 2');
        (response.content as Paciente[]).forEach((paciente) =>
          console.log(paciente.nombreApellido)
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

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {
    const formData = new FormData();
    formData.append('photo', archivo);
    formData.append('id', id);

    const req = new HttpRequest(
      'POST',
      `${this.urlEndPoint}/upload`,
      formData,
      {
        reportProgress: true,
      }
    );

    return this.http.request(req);
  }
}
