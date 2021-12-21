import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/app/_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { MustMatch } from './must-match.directive';



@Component({
  selector: 'app-cambiarpassword',
  templateUrl: './cambiarpassword.component.html',
  styleUrls: ['./cambiarpassword.component.css']
})
export class CambiarpasswordComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
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
	}

  constructor(private userService: UserService,
    private activatedRoute: ActivatedRoute,  
    private clienteService: ClienteService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService ) {  }
    


  tipos: Dropdownlist[] = [
    {val: 1, viewValue: 'Habilitado'},
    {val: 2, viewValue: 'Bloqueado'},
    {val: 3, viewValue: 'Eliminado'},
  ];
  get f() { return this.registerForm.controls; }
  ngOnInit() {



    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
  });



    var user  = localStorage.getItem('token');
    this.decodedToken = this.jwtHelper.decodeToken(user);
    console.log(this.decodedToken);

    this.clienteService.getAllClientes("" ).subscribe(list => 
      { 
        
        
        list.forEach(element => {
            this.clientes.push({value : element.id.toString() ,label : element.razonSocial});
        })
          
      })

     this.id  = this.activatedRoute.snapshot.params["uid"];

     this.userService.getUser(this.id).subscribe(resp => { 
       
       

       
       console.log(this.model);

      

      
      //this.selected2 = resp.estadoId ;
    }, error => {
       this.toastr.error(error);
    }, () => { 
        
    });
  }
  actualizar(){
    this.submitted = true;
    
    if (this.registerForm.invalid) {
      return;
  }
    // if (form.invalid) {
    //   return; 
    // }
    this.userService.actualizarpassword(this.model).subscribe(resp => { 
      }, error => {
        this.toastr.error(error);
      }, () => { 
        this.toastr.success("Se actualizó correctamente.", "Seguridad");
        this.router.navigate(['seguridad/listausuarios']);
     });
  }
  cancel(){
      this.router.navigate(['seguridad/listausuarios']);
    }

}
