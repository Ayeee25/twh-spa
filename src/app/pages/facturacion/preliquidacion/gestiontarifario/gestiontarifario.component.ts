import { Component, OnInit } from '@angular/core';

import {  Tarifa } from 'src/app/_models/Facturacion/preliquidacion';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { ReplaySubject, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';

import { FacturacionService } from 'src/app/_services/Facturacion/facturacion.service';
import { ProductoService } from 'src/app/_services/Mantenimiento/producto.service';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api/selectitem';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gestiontarifario',
  templateUrl: './gestiontarifario.component.html',
  styleUrls: ['./gestiontarifario.component.css']
})
export class GestiontarifarioComponent implements OnInit {



  columnDefinitions: any;

  clientes: SelectItem[] = [];
  productos2: Dropdownlist[] = [];

  productos: SelectItem[] = [];
  productosForDropdown: any[];
  public loading = false;
  tarifas: Tarifa[] = [];
  model: any  = {};
  ClienteId: number ;
  EstadoId: number;

  public filteredClientes: ReplaySubject<Dropdownlist[]> = new ReplaySubject<Dropdownlist[]>(1);
  public ClientesCtrl: FormControl = new FormControl();
  public ClientesFilterCtrl: FormControl = new FormControl();
  protected _onDestroy = new Subject<void>();

  constructor(  private clienteService: ClienteService,
                private alertify: ToastrService,
                private productoService: ProductoService,
                private router: Router,
                private facturacionService: FacturacionService) {

   }


  ngOnInit() {

    this.columnDefinitions = [
      {header: 'ACCIONES', field: 'numOrden' , width: '40px' },
      {header: 'PRODUCTO', field: 'numOrden'  ,  width: '180px' },
      {header: 'TIPO TARIFA', field: 'propietario'  , width: '100px'   },
      {header: 'UNIDAD MEDIDA', field: 'nombreEstado'  ,  width: '100px'  },
      {header: 'COSTO', field: 'guiaRemision' , width: '100px'  },
    ];




    this.clienteService.getAllPropietarios('').subscribe(resp => {
      resp.forEach(element => {
        this.clientes.push({ value: element.id , label: element.razonSocial});
      });

      this.model.PropietarioId =  parseInt(localStorage.getItem('PropietarioId'), 10);

      if (this.model.PropietarioId === undefined)
      {
          this.alertify.error('Seleccione un propietario');
          return ;
      }

      this.loading = true;


      this.facturacionService.getTarifas(this.model.PropietarioId, '').subscribe(list => {
            this.tarifas = list;
            this.loading = false;
          });
    } , error  => {

    }, () => {
      this.productoService.getAll('', this.model.PropietarioId).subscribe(resp2 => {
        resp2.forEach(element => {
           this.productos.push({ value: element.id , label: element.descripcionLarga });

        });
      }, error => {

      }, () => {

      });
    });

  }
  onChange(item){

    this.productos = [];
    this.model.ProductoId = '';
    this.productoService.getAll('', item.value).subscribe(resp => {

     resp.forEach(element => {
       this.productos.push({ value: element.id , label: element.descripcionLarga});
     });



    });
  }
  delete(id){
     this.facturacionService.deleteTarifa(id).subscribe(resp => {
          this.buscar();
     });
  }

  buscar(){
    this.loading = true;
    localStorage.setItem('PropietarioId', this.model.PropietarioId);

    if (this.model.PropietarioId === undefined)
    {
        this.alertify.error('Seleccione un propietario');
        return ;
    }
    if (this.model.ProductoId === undefined)
    {
        this.model.ProductoId = null;
    }


    this.facturacionService.getTarifas(this.model.PropietarioId, this.model.ProductoId).subscribe(list => {
      this.tarifas = list;
      this.loading = false;
    });

    // this.productoService.getAll('', this.model.PropietarioId ).subscribe(resp => {
    //      this.productos = resp;
    //      this.productosForDropdown = this.productos.map(x => x.descripcionLarga);

    // });
  }

}

