import { Component, OnInit } from '@angular/core';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editarpropietario',
  templateUrl: './editarpropietario.component.html',
  styleUrls: ['./editarpropietario.component.css']
})
export class EditarpropietarioComponent implements OnInit {

  tipodocumento: Dropdownlist[] = [];
  model: any = {}  ;
  id: number;
  constructor(private generalService: GeneralService,
              private clienteService: ClienteService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private alertify: ToastrService ) { }

  ngOnInit() {
    this.id  = this.activatedRoute.snapshot.params.uid;



    this.generalService.getValorTabla(15).subscribe(resp =>
      {
        resp.forEach(element => {
          this.tipodocumento.push({ val: element.id , viewValue: element.valorPrincipal});
        });

        console.log(this.tipodocumento);

        this.clienteService.getPropietario(this.id).subscribe(cliente => {
          this.model = cliente;
          console.log(this.model);
        });

      });

  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  registrar(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.model.id = this.id;

    this.clienteService.editOwner(this.model).subscribe(resp => {
    }, error => {
       this.alertify.error(error);
    }, () => {
      this.alertify.success('Se registró correctamente.');
      this.router.navigate(['mantenimiento/listadopropietario']);
    });

  }
  cancel(){
    this.router.navigate(['mantenimiento/listadopropietario']);
  }


}
