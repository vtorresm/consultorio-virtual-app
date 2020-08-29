import { Injectable } from '@angular/core';
import { Doctor } from './doctor';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable()
export class DoctorService {
  private urlEndPoint = 'http://localhost:8080/api/doctores';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) { }

  getDoctores(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        console.log('DoctorService: tap 1');
        (response.content as Doctor[]).forEach(doctor => console.log(doctor.nombre));
      }),
      map((response: any) => {
        (response.content as Doctor[]).map(doctor => {
          doctor.nombre = doctor.nombre.toUpperCase();
          return doctor;
        });
        return response;
      }),
      tap(response => {
        console.log('DoctorService: tap 2');
        (response.content as Doctor[]).forEach(doctor => console.log(doctor.nombre));
      })
    );
  }

  create(doctor: Doctor): Observable<Doctor> {
    return this.http.post(this.urlEndPoint, doctor, { headers: this.httpHeaders })
      .pipe(
        map((response: any) => response.doctor as Doctor),
        catchError(e => {

          if (e.status === 400) {
            return throwError(e);
          }

          console.error(e.error.mensaje);
          swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  getDoctor(id): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/doctores']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(doctor: Doctor): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${doctor.id}`, doctor, { headers: this.httpHeaders }).pipe(
      catchError(e => {

        if (e.status === 400) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Doctor> {
    return this.http.delete<Doctor>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

}
