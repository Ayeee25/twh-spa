import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
declare var $: any;

@Component({
    selector: 'app-identificarrecibomultiple',
    templateUrl: './modalscan.component.html',
    styleUrls: ['./identificarrecibomultiple.component.css'],
  })

  export class ModalscanComponent implements OnInit  {
    model: any = {};

    @ViewChild('productserie') searchElement: ElementRef;

    constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
     }
    ngOnInit(): void {
      this.searchElement.nativeElement.focus();
    }
    RegisterProduct(){
      console.log('entre1');
      console.log(this.model.productserie);
    }
    RegisterMac(){
      console.log(this.model.macserie);
    }
    RegisterSerie(){
      console.log(this.model.serie);

    }
  }
