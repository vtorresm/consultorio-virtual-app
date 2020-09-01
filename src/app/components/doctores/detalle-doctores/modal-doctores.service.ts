import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalDoctoresService {

  modal = false;


  private notificacionUpload = new EventEmitter<any>();

  constructor() { }

  get notificarUpload(): EventEmitter<any> {
    return this.notificacionUpload;
  }

  // tslint:disable-next-line: typedef
  abrirModal() {
    this.modal = true;
  }

  // tslint:disable-next-line: typedef
  cerrarModal() {
    this.modal = false;
  }
}
