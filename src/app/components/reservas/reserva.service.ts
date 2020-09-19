import { Injectable } from '@angular/core';
import { Reserva } from './reserva';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private urlEndPoint = 'http://localhost:8090/api/reservas';

  constructor(private http: HttpClient, private router: Router) {}

  getReservas(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/listar/').pipe(
      tap((response: any) => {
        console.log('ReservaService: tap 1');
        (response.content as Reserva[]).forEach((reserva) =>
          console.log(reserva.nroReserva)
        );
      }),
      map((response: any) => {
        (response.content as Reserva[]).map((reserva) => {
          reserva.nroReserva = reserva.nroReserva;
          return reserva;
        });
        return response;
      }),
      tap((response) => {
        console.log('ReservaService: tap 2');
        (response.content as Reserva[]).forEach((reserva) =>
          console.log(reserva.nroReserva)
        );
      })
    );
  }

  create(reserva: Reserva): Observable<Reserva> {
    return this.http.post(this.urlEndPoint, reserva).pipe(
      map((response: any) => response.reserva as Reserva),
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

  getReserva(id): Observable<Reserva> {
    return this.http.get<Reserva>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        if (e.status !== 401 && e.error.mensaje) {
          this.router.navigate(['/reservas']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  update(reserva: Reserva): Observable<any> {
    return this.http
      .put<any>(`${this.urlEndPoint}/${reserva.id}`, reserva)
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

  delete(id: number): Observable<Reserva> {
    return this.http.delete<Reserva>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }
}
