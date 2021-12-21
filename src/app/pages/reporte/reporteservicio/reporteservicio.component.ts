import { Component, OnInit } from '@angular/core';
import { ReporteServicio, VentaMensual } from 'src/app/_models/Facturacion/Comprobante';
import { FacturacionService } from 'src/app/_services/Facturacion/facturacion.service';

@Component({
  selector: 'app-reporteservicio',
  templateUrl: './reporteservicio.component.html',
  styleUrls: ['./reporteservicio.component.scss']
})
export class ReporteservicioComponent implements OnInit {
  model: any = [];
  totalsoles: number = 0;

  totaltotal: number = 0;
  totaldolares : number = 0;

  totalanteriorsoles : number= 0;
  porcentajesoles: number = 0;
  totalanteriordolares : number= 0;
  porcentajedolares: number = 0;

  porcentajetotal: number = 0;

  simbol1: string;
  simbol2: string;
  simbol3: string;


  porcentajeGoal: number = 0;
  totalanterior: number = 0;
  porcentajetotaltotal: number = 0;


  basicData: any;
  basicOptions: any;

  pos1: any[] =[] ;
  pos2: any[] =[] ;
  pos3: any[] =[] ;


  servicios: ReporteServicio[] =  [];
  ventamensual: VentaMensual[] = [];

  //totalventa

  data_final = '0' ;


    constructor(public facturacionServicio: FacturacionService) { }

    ngOnInit() {
 
      this.facturacionServicio.getVentaMensual().subscribe(x=>{
      

        

        x.forEach(x => {
          if(x.clienteId == 1){
            this.pos1.push(x.subtotal)
          }
          if(x.clienteId == 18){
            this.pos2.push(x.subtotal)
          }
          if(x.clienteId == 19){
            this.pos3.push(x.subtotal)
          }

        });

        this.basicData = {
          labels: [ 'Diciembre-2020' ,  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
          datasets: [
              {
                  label: 'Nestle',
                  data: this.pos1,
                  fill: false,
                  borderColor: '#42A5F5'
              },
              {
                  label: 'BCM',
                  data:  this.pos2,
                  fill: false,
                  borderColor: '#FFA726'
              },
              {
                label: 'WOW',
                data: this.pos3,
                fill: false,
                borderColor: '#787060'
            },
  //           {
  //             label: 'Motores Agro',
  //             data: [28, 48, 40, 19, 86, 27, 90],
  //             fill: false,
  //             borderColor: '#FFA726'
  //         },
  //         {
  //           label: 'IAPES',
  //           data: [28, 48, 40, 19, 86, 27, 90],
  //           fill: false,
  //           borderColor: '#FFA726'
  //         },
  //         {
  //           label: 'ENSAMBLE ',
  //           data: [28, 48, 40, 19, 86, 27, 90],
  //           fill: false,
  //           borderColor: '#FFA726'
  //       },
  //       {
  //         label: 'INFRA ',
  //         data: [28, 48, 40, 19, 86, 27, 90],
  //         fill: false,
  //         borderColor: '#FFA726'
  //     },
  //     {
  //       label: 'DIMAX ',
  //       data: [28, 48, 40, 19, 86, 27, 90],
  //       fill: false,
  //       borderColor: '#FFA726'
  //   },
  //   {
  //     label: 'GRUPO VEGA ',
  //     data: [28, 48, 40, 19, 86, 27, 90],
  //     fill: false,
  //     borderColor: '#FFA726'
  // },
  // {
  //   label: 'SYS PORT ',
  //   data: [28, 48, 40, 19, 86, 27, 90],
  //   fill: false,
  //   borderColor: '#FFA726'
  // },
  
          ]
      }
  
        console.log(this.pos1)
      });


   

      let charve = [];
      let charmes = [];


      this.facturacionServicio.getReporteServicio().subscribe(resp => {
        this.servicios =  resp;

      

        this.servicios.forEach( x=> {
          
          

          if(x.monedaId == 185) {
            x.totalsoles = x.subTotal;

            this.totalanterior = this.totalanterior + x.anterior ;

            this.totalanteriorsoles  = this.totalanteriorsoles +  x.anterior;
            this.totalsoles = this.totalsoles  + x.subTotal; 
          }
          if(x.monedaId == 186) {
            x.totalsoles = x.subTotal *  3.65;
            this.totalanterior = this.totalanterior + ( x.anterior * 3.65);

            this.totalanteriordolares  = this.totalanteriordolares +  x.anterior ;
            this.totaldolares = this.totaldolares  + x.subTotal; 

            }

            this.totaltotal = this.totaltotal +  x.totalsoles;
            this.porcentajeGoal = (this.totaltotal * 100) / 300000 ;
        });

        this.porcentajesoles = (this.totalsoles * 100) / this.totalanteriorsoles;
        this.porcentajedolares = (this.totaldolares * 100) / this.totalanteriordolares;

        this.porcentajetotaltotal  =  (this.totaltotal * 100)  / this.totalanterior 


        if( this.porcentajesoles < 100) {
          this.simbol1 = '-';
        }
        else {
          this.porcentajesoles = this.porcentajesoles  - 100;
          this.simbol1 = '+';
        } 
        if( this.porcentajedolares < 100) {
          this.simbol2 = '-';
        }
        else {
          this.porcentajedolares = this.porcentajedolares  - 100;
          this.simbol2 = '+';
        } 
        if( this.porcentajetotaltotal < 100) {
          this.simbol3 = '-';
        }
        else {
          this.porcentajetotaltotal = this.porcentajetotaltotal  - 100;
          this.simbol3 = '+';
        } 
        
      }, () => {
        
      


      });





    }
    applyLightTheme() {
      this.basicOptions = {
          legend: {
              labels: {
                  fontColor: '#495057'
              }
          },
          scales: {
              xAxes: [{
                  ticks: {
                      fontColor: '#495057'
                  }
              }],
              yAxes: [{
                  ticks: {
                      fontColor: '#495057'
                  }
              }]
          }
      };
    }
    
}
