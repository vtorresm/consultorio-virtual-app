import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modal = false;

  private notificacionUpload = new EventEmitter<any>();

  constructor() {}

  get notificarUpload(): EventEmitter<any> {
    return this.notificacionUpload;
  }

  abrirModal(): void {
    this.modal = true;
  }

  cerrarModal(): void {
    this.modal = false;
  }
}
