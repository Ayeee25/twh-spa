import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { FormControl, NgForm } from '@angular/forms';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { ProductoService } from 'src/app/_services/Mantenimiento/producto.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-nuevoproducto',
  templateUrl: './nuevoproducto.component.html',
  styleUrls: ['./nuevoproducto.component.css']
})
export class NuevoproductoComponent implements OnInit {
  model: any = {}  ;
  public filteredClientes: ReplaySubject<Dropdownlist[]> = new ReplaySubject<Dropdownlist[]>(1);
  public ClientesCtrl: FormControl = new FormControl();
  public ClientesFilterCtrl: FormControl = new FormControl();

  clientes: SelectItem[] = [];
  familias: SelectItem[] = [];
  unidadesMedida: SelectItem[] = [];

  constructor(private clienteService: ClienteService,
              private generalService: GeneralService,
              private alertify: ToastrService,
              private router: Router,
              private productoService: ProductoService) { }

  ngOnInit() {
    this.clienteService.getAllPropietarios('').subscribe(resp => {
      resp.forEach(element => {
        this.clientes.push({ value: element.id, label: element.razonSocial});
      });


    }, error => {
          }, () => {

            if (localStorage.getItem('searchPro1') === 'undefined' || localStorage.getItem('searchPro1') == null ) {
              this.model.ClienteId = 1;
          }
          else {
            this.model.ClienteId =  parseInt(localStorage.getItem('searchPro1'), 10);
          }



        });
    this.generalService.getValorTabla(13).subscribe(resp =>
      {
        resp.forEach(element => {
          this.familias.push({ value: element.id , label: element.valorPrincipal});
        });

      });
    this.generalService.getValorTabla(12).subscribe(resp =>
        {
          resp.forEach(element => {
            this.unidadesMedida.push({value: element.id, label: element.valorPrincipal });
          } );
        });

  }

  registrar(form: NgForm) {

    if (form.invalid) {
      return;
    }

    this.productoService.registrarProducto(this.model).subscribe(resp => {

    }, error => {
            this.alertify.error(error.error);
    }, () => {
          this.alertify.success('Se registró correctamente.');
          this.router.navigate(['mantenimiento/listadoproducto']);
    });

  }
  cancel(){
    this.router.navigate(['mantenimiento/listadoproducto']);
  }


}
