import { ProgramacionComponent } from './programacion/programacion.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { PAGES_ROUTES } from './pages.routes';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import {DragDropModule} from 'primeng/dragdrop';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import {ProgressBarModule} from 'primeng/progressbar';
import { MatButtonModule } from '@angular/material/button';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {CalendarModule} from 'primeng/calendar';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListaordenreciboComponent } from './prerecibo/ordenrecibo/listaordenrecibo/listaordenrecibo.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatTableModule } from '@angular/material/table';
import { ListadoequipotransporteComponent } from './prerecibo/equipotransporte/listadoequipotransporte/listadoequipotransporte.component';
import { NuevaordenrecibodetalleComponent } from './prerecibo/ordenrecibo/nuevaordenrecibodetalle/nuevaordenrecibodetalle.component';
import { VerordenreciboComponent } from './prerecibo/ordenrecibo/verordenrecibo/verordenrecibo.component';
import { EditarordenreciboComponent } from './prerecibo/ordenrecibo/editarordenrecibo/editarordenrecibo.component';
import { AsignarpuertaComponent } from './prerecibo/puerta/asignarpuerta/asignarpuerta.component';
// tslint:disable-next-line: max-line-length
import { MatSelectModule } from '@angular/material/select';
// tslint:disable-next-line: max-line-length
import { VincularequipotransporteComponent } from './prerecibo/equipotransporte/vincularequipotransporte/vincularequipotransporte.component';
import { DialogBuscarEmpTransporte } from './prerecibo/equipotransporte/vincularequipotransporte/DialogBuscarEmpTransporte';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatOptionModule, MatNativeDateModule } from '@angular/material/core';
import { DialogBuscarProducto } from './modal/ModalBuscarProducto/ModalBuscarProducto.component';
import { DialogAsignarPuerta } from './modal/ModalAsignarPuerta/ModalAsignarPuerta.component';
import { DialogAsignarTrabajador } from './modal/ModalAsignarTrabajador/ModalAsignarTrabajador.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogBuscarPlaca } from './prerecibo/equipotransporte/vincularequipotransporte/DialogBuscarPlaca';
import { DialogBuscarChofer } from './prerecibo/equipotransporte/vincularequipotransporte/DialogBuscarChofer';
import { NuevaordenreciboComponent } from './prerecibo/ordenrecibo/nuevaordenrecibo/nuevaordenrecibo.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EquipotransportesalidaComponent } from './despacho/equipotransportesalida/equipotransportesalida.component';
import { ListadocargaComponent } from './despacho/carga/listadocarga/listadocarga.component';
import { PendienteCargaComponent } from './despacho/carga/listadopendientescarga/pendientecarga.component';
import { EditartarifaComponent } from './facturacion/preliquidacion/editartarifa/editartarifa.component';
import { NuevatarifaComponent } from './facturacion/preliquidacion/nuevatarifa/nuevatarifa.component';
import { ListaordenrecibidaComponent } from './recibo/ordenrecibo/listaordenrecibida/listaordenrecibida.component';
import { IdentificarreciboComponent } from './recibo/ordenrecibo/identificarrecibo/identificarrecibo.component';
import { IdentificarrecibomultipleComponent } from './recibo/ordenrecibo/identificarrecibomultiple/identificarrecibomultiple.component';
import { ListadovehiculoComponent } from './mantenimiento/vehiculo/listadovehiculo/listadovehiculo.component';
import { ListadochoferComponent } from './mantenimiento/chofer/listadochofer/listadochofer.component';
import { ListadoproveedorComponent } from './mantenimiento/proveedor/listadoproveedor/listadoproveedor.component';
import { ListadoproductoComponent } from './mantenimiento/producto/listadoproducto/listadoproducto.component';
import { AcomodopalletsComponent } from './recibo/ordenrecibo/acomodopallets/acomodopallets.component';
import { AlmacenamientoComponent, DialogExcepciones } from './recibo/ordenrecibo/almacenamiento/almacenamiento.component';
import { NgbdModalConfirmRetiro, ConfirmarmovimientoComponent } from './despacho/carga/confirmarmovimiento/confirmarmovimiento.component';
import { SpeedDialFabComponent } from './prerecibo/speed-dial-fab/speed-dial-fab.component';
import { ListadoequipotransporteentranteComponent } from './recibo/ordenrecibo/listadoequipotransporteentrante/listadoequipotransporteentrante.component';
import { ListadoinventarioComponent } from './inventario/inventariogeneral/listadoinventario/listadoinventario.component';
import { NuevoproductoComponent } from './mantenimiento/producto/nuevoproducto/nuevoproducto.component';
import { VerproductoComponent, DialogEditarHuella, DialogNuevoHuella } from './mantenimiento/producto/verproducto/verproducto.component';
import { NuevahuelladetalleComponent, DialogNuevaHuellaDetalle } from './mantenimiento/producto/nuevahuelladetalle/nuevahuelladetalle.component';
import { AjustesinventarioComponent } from './inventario/inventariogeneral/ajustesinventario/ajustesinventario.component';
import { AjusteinventariodetalleComponent } from './inventario/inventariogeneral/ajusteinventariodetalle/ajusteinventariodetalle.component';
import { NuevoajusteComponent } from './inventario/inventariogeneral/nuevoajuste/nuevoajuste.component';
import { ListaordensalidaComponent } from './despacho/ordensalida/listaordensalida/listaordensalida.component';
import { NuevaordensalidaComponent } from './despacho/ordensalida/nuevaordensalida/nuevaordensalida.component';
import { ListadoclienteComponent, DialogAgregarDireccion } from './mantenimiento/cliente/listadocliente/listadocliente.component';
import { NuevoclienteComponent } from './mantenimiento/cliente/nuevocliente/nuevocliente.component';
import { VerdetalleclienteComponent } from './mantenimiento/cliente/verdetallecliente/verdetallecliente.component';
import { DialogNuevoCliente, ListadopropietarioComponent } from './mantenimiento/propietario/listadopropietario/listadopropietario.component';
import { NuevopropietarioComponent } from './mantenimiento/propietario/nuevopropietario/nuevopropietario.component';
import { NuevaordensalidadetalleComponent } from './despacho/ordensalida/nuevaordensalidadetalle/nuevaordensalidadetalle.component';
import { VerordensalidaComponent } from './despacho/ordensalida/verordensalida/verordensalida.component';
import { PlanificarpickingComponent } from './despacho/picking/planificarpicking/planificarpicking.component';
import { ListadoTrabajoPendienteComponent } from './despacho/picking/listadotrabajopendiente/listadotrabajopendiente.component';
// tslint:disable-next-line: max-line-length
import { PendientespreliquidacionComponent } from './facturacion/preliquidacion/pendientespreliquidacion/pendientespreliquidacion.component';
import { GestionpreliquidacionComponent } from './facturacion/preliquidacion/gestionpreliquidacion/gestionpreliquidacion.component';
import { Listado2trabajoasignadoComponent } from './despacho/carga/listado2trabajoasignado/listado2trabajoasignado.component';
import { KardexgeneralComponent } from './inventario/inventariogeneral/kardexgeneral/kardexgeneral.component';
import { ConfirmarpinckingComponent } from './despacho/picking/confirmarpincking/confirmarpincking.component';
import { GestiontarifarioComponent } from './facturacion/preliquidacion/gestiontarifario/gestiontarifario.component';
import { EditarproductoComponent } from './mantenimiento/producto/editarproducto/editarproducto.component';
import { EditarordensalidaComponent } from './despacho/ordensalida/editarordensalida/editarordensalida.component';
import { ListarubicacionComponent } from './mantenimiento/ubicacion/listarubicacion/listarubicacion.component';
import { DialogNuevaFactura } from './modal/ModalNuevaFactura/ModalNuevaFactura.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import {ToolbarModule} from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import {StepsModule} from 'primeng/steps';
import {SidebarModule} from 'primeng/sidebar';
import {ToastModule} from 'primeng/toast';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { ModalscanComponent } from './recibo/ordenrecibo/identificarrecibomultiple/modalscan.component';
import { TooltipModule } from 'primeng/tooltip';
import {InputSwitchModule} from 'primeng/inputswitch';

import { ListarolesComponent } from './seguridad/rol/listaroles/listaroles.component';
import { AngularDualListBoxModule } from 'angular-dual-listbox';

import { AsignaropcionesComponent } from './seguridad/rol/asignaropciones/asignaropciones.component';
import { TreeviewModule } from 'ngx-treeview';
import { ListadopedidoComponent } from './despacho/pedido/listadopedido/listadopedido.component';
import { EditarpropietarioComponent } from './mantenimiento/propietario/editarpropietario/editarpropietario.component';
import { NuevopedidoComponent } from './despacho/pedido/nuevopedido/nuevopedido.component';
import { VerordenpedidoComponent } from './despacho/pedido/verordenpedido/verordenpedido.component';
import { NuevopedidosalidadetalleComponent } from './despacho/pedido/nuevopedidosalidadetalle/nuevopedidosalidadetalle.component';
import { EditarpedidoComponent } from './despacho/pedido/editarpedido/editarpedido.component';
import {BlockUIModule} from 'primeng/blockui';
import {PanelModule} from 'primeng/panel';
import { CambiarpasswordComponent } from './seguridad/usuario/cambiarpassword/cambiarpassword.component';
import { DialogOverviewExampleDialog, ListausuariosComponent } from './seguridad/usuario/listausuarios/listausuarios.component';
import { NuevousuarioComponent } from './seguridad/usuario/nuevousuario/nuevousuario.component';
import { EditarusuarioComponent } from './seguridad/usuario/editarusuario/editarusuario.component';
import { ReporteservicioComponent } from './reporte/reporteservicio/reporteservicio.component';
import { ChartModule } from 'primeng';



import { CalendarModule as CalendarModule2 , DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';


@NgModule({
  declarations: [
    DashboardComponent,
    ListaordenreciboComponent,
    ListadoequipotransporteComponent,
    NuevaordenrecibodetalleComponent,
    VerordenreciboComponent,
    EditarordenreciboComponent,
    AsignarpuertaComponent,
    VincularequipotransporteComponent,
    ListaordenreciboComponent,
    DialogBuscarProducto,
    DialogAsignarPuerta,
    DialogAsignarTrabajador,
    DialogBuscarEmpTransporte,
    DialogBuscarChofer,
    DialogBuscarPlaca,
    DialogNuevaFactura,
    NuevaordenreciboComponent,
    EquipotransportesalidaComponent,
    ListadocargaComponent,
    EditartarifaComponent,
    NuevatarifaComponent,
    NuevaordenreciboComponent,
    ListaordenreciboComponent,
    NuevaordenrecibodetalleComponent,
    VerordenreciboComponent,
    VincularequipotransporteComponent,
    AsignarpuertaComponent,
    ListaordenrecibidaComponent,
    IdentificarreciboComponent,
    IdentificarrecibomultipleComponent,
    ListadovehiculoComponent,
    ListadochoferComponent,
    ListadoproveedorComponent,
    ListadoproductoComponent,
    ListadoequipotransporteComponent,
    AcomodopalletsComponent,
    AlmacenamientoComponent,
    NgbdModalConfirmRetiro,
    DialogExcepciones,
    SpeedDialFabComponent,
    ListadoequipotransporteentranteComponent,
    EditarordenreciboComponent,
    ListadoinventarioComponent,
    NuevoproductoComponent,
    VerproductoComponent,
    DialogEditarHuella,
    NuevahuelladetalleComponent,
    DialogNuevoHuella,
    DialogNuevaHuellaDetalle,
    AjustesinventarioComponent,
    AjusteinventariodetalleComponent,
    NuevoajusteComponent ,
    ListaordensalidaComponent,
    NuevaordensalidaComponent,
    ListadoclienteComponent,
    NuevoclienteComponent,
    VerdetalleclienteComponent,
    DialogNuevoCliente,
    ListadopropietarioComponent,
    NuevopropietarioComponent,
    DialogAgregarDireccion,
    NuevaordensalidadetalleComponent,
    VerordensalidaComponent,
    PlanificarpickingComponent,
    PendienteCargaComponent,
    ListadoTrabajoPendienteComponent,
    EquipotransportesalidaComponent,
    PendientespreliquidacionComponent,
    GestionpreliquidacionComponent,
    DialogAsignarPuerta,
    DialogAsignarTrabajador,
    Listado2trabajoasignadoComponent,
    ConfirmarmovimientoComponent,
    ListadocargaComponent,
    KardexgeneralComponent,
    ConfirmarpinckingComponent,
    GestiontarifarioComponent,
    NuevatarifaComponent,
    EditartarifaComponent ,
    EditarproductoComponent,
    EditarordensalidaComponent,
    ListarubicacionComponent,
    ModalscanComponent,
    ListarolesComponent,
    ListausuariosComponent,
    DialogOverviewExampleDialog,
    NuevousuarioComponent,
    AsignaropcionesComponent,
    ListadopedidoComponent,
    EditarpropietarioComponent,
    NuevopedidoComponent,
    VerordenpedidoComponent,
    NuevopedidosalidadetalleComponent,
    EditarpedidoComponent,
    CambiarpasswordComponent,
    EditarusuarioComponent,
    ReporteservicioComponent,
    ProgramacionComponent

  ],
  exports: [

  ],
  imports: [
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    CalendarModule,
    ConfirmDialogModule,
    ProgressBarModule,
    ButtonModule,
    DropdownModule,
    DragDropModule,
    SweetAlert2Module,
    MatPaginatorModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatDatepickerModule,
    MatOptionModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSelectModule,
    NgxLoadingModule,
    NgxMaterialTimepickerModule,
    NgbModule,
    MatInputModule,
    ToolbarModule,
    SplitButtonModule,
    StepsModule,
    SidebarModule,
    ToastModule,
    DynamicDialogModule,
    TooltipModule,
    InputSwitchModule,
    AngularDualListBoxModule,
    TreeviewModule.forRoot(),
    BlockUIModule,
    PanelModule,
    CalendarModule2.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    ChartModule,
    ScheduleModule


  ],
  providers: [
  ],
  entryComponents: [
    DialogBuscarProducto,
    DialogAsignarPuerta,
    DialogAsignarTrabajador,
    DialogBuscarEmpTransporte,
    DialogBuscarPlaca,
    DialogBuscarChofer,
    DialogNuevaFactura,
    ModalscanComponent,
    DialogOverviewExampleDialog
  ],
})

export class PagesModule {
}
