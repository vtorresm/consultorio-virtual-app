import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap, map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import swal from 'sweetalert2';

import { Doctor } from './doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private urlEndPoint = 'http://localhost:8080/api/doctores';

  constructor(private http: HttpClient, private router: Router) {}

  getDoctores(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        console.log('DoctorService: tap 1');
        (response.content as Doctor[]).forEach((doctor) =>
          console.log(doctor.nombre)
        );
      }),
      map((response: any) => {
        (response.content as Doctor[]).map((doctor) => {
          doctor.nombre = doctor.nombre;
          return doctor;
        });
        return response;
      }),
      tap((response) => {
        console.log('DoctorService: tap 2');
        (response.content as Doctor[]).forEach((doctor) =>
          console.log(doctor.nombre)
        );
      })
    );
  }

  create(doctor: Doctor): Observable<Doctor> {
    return this.http.post(this.urlEndPoint, doctor).pipe(
      map((response: any) => response.doctor as Doctor),
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

  getDoctor(id): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        if (e.status !== 401 && e.error.mensaje) {
          this.router.navigate(['/doctores']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  update(doctor: Doctor): Observable<any> {
    return this.http
      .put<any>(`${this.urlEndPoint}/${doctor.id}`, doctor)
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

  delete(id: number): Observable<Doctor> {
    return this.http.delete<Doctor>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }
}