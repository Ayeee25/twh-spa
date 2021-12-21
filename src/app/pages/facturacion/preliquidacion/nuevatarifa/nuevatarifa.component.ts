import { Component, OnInit, ViewChild } from '@angular/core';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { FormControl, NgForm } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { FacturacionService } from 'src/app/_services/Facturacion/facturacion.service';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/_services/Mantenimiento/producto.service';
import { SelectItem } from 'primeng/api/selectitem';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { MatSelect } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nuevatarifa',
  templateUrl: './nuevatarifa.component.html',
  styleUrls: ['./nuevatarifa.component.css']
})
export class NuevatarifaComponent implements OnInit {

  model: any = {};
  clientes: SelectItem[] = [];
  productos: SelectItem[] = [];
  unidadMedida: SelectItem[] = [];
  tipotarifa: SelectItem[] = [];
  familia: SelectItem[] = [];

  public ClientesCtrl: FormControl = new FormControl();
  public ClientesFilterCtrl: FormControl = new FormControl();
  public filteredClientes: ReplaySubject<Dropdownlist[]> = new ReplaySubject<Dropdownlist[]>(1);


  public filteredProductos: ReplaySubject<Dropdownlist[]> = new ReplaySubject<Dropdownlist[]>(1);
  public ProductosCtrl: FormControl = new FormControl();
  public ProductosFilterCtrl: FormControl = new FormControl();

  protected _onDestroy = new Subject<void>();
  @ViewChild('singleSelect') singleSelect: MatSelect;

  constructor(
    private clienteService: ClienteService,
    private generalService: GeneralService,
    private facturacionService: FacturacionService,
    private alertify: ToastrService,
    private productoService: ProductoService,
    private router: Router
  ) { }

  ngOnInit() {


    this.clienteService.getAllPropietarios('').subscribe(resp => {
      resp.forEach(element => {
        this.clientes.push({ value: element.id , label: element.razonSocial});
      });


      }, error => {
      }, () => {
        if (localStorage.getItem('PropietarioId') === 'undefined' || localStorage.getItem('PropietarioId') == null ) {
          this.model.PropietarioId = 1;
      }
      else {
        this.model.PropietarioId =  parseInt(localStorage.getItem('PropietarioId'), 10);
      }
        this.productoService.getAll('', this.model.PropietarioId).subscribe(resp => {
        resp.forEach(element => {
           this.productos.push({value: element.id , label: element.descripcionLarga });

        });
      }, error => {

      }, () => {

      });

    });

    this.generalService.getValorTabla(9).subscribe(resp => {
       resp.forEach( element => {
        this.unidadMedida.push({value: element.id , label: element.valorPrincipal });
       }
      );
    });

    this.generalService.getValorTabla(22).subscribe(resp => {
      resp.forEach( element => {
       this.tipotarifa.push({value: element.id , label: element.valorPrincipal });
      }
     );

   });
    this.generalService.getValorTabla(13).subscribe(resp =>
    {
      resp.forEach(element => {
        this.familia.push({ value: element.id , label: element.valorPrincipal});
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

  registrar(form: NgForm){
    if (form.invalid) {
      return;
    }

    this.facturacionService.insertTarifa(this.model).subscribe(x => {

    }, error => {
      this.alertify.error(error);
    }, () => {
      this.alertify.success('Se actualizó correctamente.');
      this.router.navigate(['/facturacion/gestiontarifario' ]);
    });
  }

  CambioCliente(id){
    this.productos = [];

    this.productoService.getAll('', id.val).subscribe(resp => {

      resp.forEach(element => {
        this.productos.push({ value: element.id , label: element.descripcionLarga});
      });



     });
  }
  onChange(item){
    console.log(item.value);
    this.productos = [];

    this.productoService.getAll('', item.value).subscribe(resp => {

     resp.forEach(element => {
       this.productos.push({ value: element.id , label: element.descripcionLarga});
     });



    });
  }




}
