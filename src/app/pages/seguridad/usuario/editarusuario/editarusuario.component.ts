import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';

import { Dropdownlist } from 'src/app/_models/Constantes';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SelectItem } from 'primeng/api';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';


@Component({
  selector: 'app-editarusuario',
  templateUrl: './editarusuario.component.html',
  styleUrls: ['./editarusuario.component.css']
})


export class EditarusuarioComponent implements OnInit {
  model: any = {}  ;
  id: number;
  clientes: SelectItem[] = [];
  jwtHelper = new JwtHelperService();
  decodedToken: any = {};
  private sub: any;
  public selected2: any;
  date: Date = new Date();
	settings = {
		bigBanner: true,
		timePicker: false,
		format: 'dd-MM-yyyy',
		defaultOpen: true
	};

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private clienteService: ClienteService,
              private router: Router,
              private toastr: ToastrService ) {  }

  tipos: Dropdownlist[] = [
    {val: 1, viewValue: 'Habilitado'},
    {val: 2, viewValue: 'Bloqueado'},
    {val: 3, viewValue: 'Eliminado'},
  ];

  ngOnInit() {

    let user  = localStorage.getItem('token');
    this.decodedToken = this.jwtHelper.decodeToken(user);
    console.log(this.decodedToken);

    this.clienteService.getAllClientes('').subscribe(list =>
      {


        list.forEach(element => {
            this.clientes.push({value : element.id.toString() , label : element.razonSocial});
        });

      });

    this.id  = this.activatedRoute.snapshot.params['uid'];

    this.userService.getUser(this.id).subscribe(resp => {


      //  if (resp.clientesids != null) {
      //     let array = resp.clientesids.split(',');
      //     this.model = resp;
      //     this.model.clientesids = array;
      //  } else {
      //     this.model = resp;
      //  }

       console.log(this.model);



       this.model.password = '*********'
      // this.selected2 = resp.estadoId ;
    }, error => {
       this.toastr.error(error);
    }, () => {

    });
  }
  actualizar(form: NgForm) {



    if (form.invalid) {
      return;
    }
    this.userService.actualizar(this.model).subscribe(resp => {
    }, error => {
       this.toastr.error(error);
    }, () => {
      this.toastr.success('Se actualizó correctamente.', 'Seguridad');
      this.router.navigate(['seguridad/listausuarios']);
    });
  }
  cancel() {
      this.router.navigate(['seguridad/listausuarios']);
    }

}
