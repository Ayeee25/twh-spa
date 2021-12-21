import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  model: any = {};
  public loading = false;

  constructor(private authService: AuthService, private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
    const rememberme =  localStorage.getItem('Name');
    this.model.recuerdame = true;
    this.model.username = rememberme;
  }
  login(form: NgForm) {
    this.loading = true;
    if (form.invalid) {
      return;
    }
    this.loading = true;
    this.authService.login(this.model).subscribe(resp => {


    }, error => {
        if ('Unauthorized' === error.statusText) {
           this.toastr.error('usuario y/o contraseña incorrecta', 'TWH');
        }
        else if ('Bloqueado' === error.statusText) {
           this.toastr.error('usuario bloqueado');
        }
        else if ('Eliminado' === error.statusText) {
           this.toastr.error('usuario eliminado');
        }
        else {
          this.toastr.error(error.statusText, 'TWH');
        }

    }, () => {
      this.router.navigate(['/dashboard']);
    });
  }

}
