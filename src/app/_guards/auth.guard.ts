import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService, private alertify: ToastrService) {
  }
  canActivate(next: ActivatedRouteSnapshot): boolean {

    if (this.authService.loggedIn()) {
      if (next.url.length > 0)
      {
        const menu =  localStorage.getItem('menu');
        if (menu.includes(next.url[0].path)) {
          return true;
        }

        this.alertify.error('No puede acceder');
        return false;
      }
      return true;
    }
    this.alertify.error('No puede acceder');
    this.router.navigate(['/login']);
  }
}
