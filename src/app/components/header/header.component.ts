import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  title = 'Paracas Salud';

  constructor(public authService: AuthService, private router: Router) {}
  logout(): void {
    const username = this.authService.usuario.username;
    this.authService.logout();
    swal.fire(
      'Logout',
      `Hola ${username}, has cerrado sesión con éxito!`,
      'success'
    );
    this.router.navigate(['/login']);
  }
}
