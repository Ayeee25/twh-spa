import { Component, OnInit } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { OrdenSalidaService } from 'src/app/_services/Despacho/ordensalida.service';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api/selectitem';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/_common/datepicker.extend';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nuevaordensalida',
  templateUrl: './nuevaordensalida.component.html',
  styleUrls: ['./nuevaordensalida.component.css'],
  providers: [
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ]
})
export class NuevaordensalidaComponent implements OnInit {
  public loading = false;
  model: any = {};
  es: any;
  clientes: SelectItem[] = [];
  almacenes: SelectItem[] = [];
  propietarios: SelectItem[] = [];
  direcciones: SelectItem[] = [];

  dateInicio: Date = new Date(Date.now()) ;


  IdNuevaOrden = 0;

  date: Date = new Date();
settings = {
  bigBanner: true,
  timePicker: false,
  format: 'dd-MM-yyyy',
  defaultOpen: true
};

  constructor(private clienteService: ClienteService,
              private ordenSalidaService: OrdenSalidaService,
              private alertify: ToastrService ,
              private generealService: GeneralService,
              private router: Router
    ) { }

  ngOnInit() {

    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
      dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
      dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
      monthNames: [ 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre' ],
      monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ],
      today: 'Hoy',
      clear: 'Borrar'
  };


    this.generealService.getAllAlmacenes().subscribe(resp => {
    resp.forEach(element => {
      this.almacenes.push({ value: element.id ,  label : element.descripcion});
    });




    this.clienteService.getAllPropietarios('').subscribe(resp2 => {
      resp2.forEach(element => {
        this.propietarios.push({ value: element.id , label: element.razonSocial});
      });

      }, error => {
      }, () => {

        if (localStorage.getItem('PropietarioId') === 'undefined' || localStorage.getItem('PropietarioId') == null ) {
          this.model.PropietarioId = 1;
        }
        else {
          this.model.PropietarioId =  parseInt(localStorage.getItem('PropietarioId'), 10);
        }

        if (localStorage.getItem('Estado') == null || localStorage.getItem('Estado') === 'undefined') {
           this.model.EstadoId = 131;
        }
        else {
            this.model.EstadoId = parseInt(localStorage.getItem('Estado'), 10);
        }
        if (localStorage.getItem('AlmacenId') == null || localStorage.getItem('AlmacenId') === 'undefined') {
          this.model.AlmacenId = 1;
        }
        else {
            this.model.AlmacenId = parseInt(localStorage.getItem('AlmacenId'), 10);
        }


        this.clienteService.getAllClientesxPropietarios(this.model.PropietarioId).subscribe(resp2 => {
          resp2.forEach(element => {
            this.clientes.push({ value: element.id , label: element.razonSocial});
          });


          }, error => {
          }, () => {
        });
    });

  });


  }







  onChangePropietario(propietario) {
    console.log(propietario);

    this.clientes = [];

    this.clienteService.getAllClientesxPropietarios(propietario.value).subscribe(resp => {
      resp.forEach(element => {
        this.clientes.push({ value: element.id , label: element.razonSocial});
      });


      }, error => {
      }, () => {
    });
  }

  onChangeCliente(cliente){
    this.direcciones = [];

    this.clienteService.getAllDirecciones(cliente.value).subscribe(resp => {
      resp.forEach(element => {
        this.direcciones.push({
          value: element.iddireccion
          , label: element.direccion  + ' [ ' + element.departamento + ' - ' +  element.provincia + ' - ' + element.distrito + ' ] '  });
      });


      }, error => {
      }, () => {
    });
  }
  registrar(form: NgForm){
    this.loading = true;

    this.model.Propietario = this.propietarios.filter(x => x.value === this.model.PropietarioId)[0].label;
    this.model.TipoRegistroId = 170;

    if (form.invalid) {
         return;
    }
    this.ordenSalidaService.RegistarOrdenSalida(this.model).subscribe(resp =>
      {
        this.model = resp;
        console.log(this.model);
      }, error => {
         this.alertify.error(error);
         console.log(error);
         this.loading = false;
      }, () => {
        this.alertify.success('Se registró correctamente.');
        this.router.navigate(['/picking/verordensalida',  this.model ]);
      });


  }

}
