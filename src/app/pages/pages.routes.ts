import { ProgramacionComponent } from './programacion/programacion.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListaordenreciboComponent } from './prerecibo/ordenrecibo/listaordenrecibo/listaordenrecibo.component';
import { AuthGuard } from '../_guards/auth.guard';
import { ListadoequipotransporteComponent } from './prerecibo/equipotransporte/listadoequipotransporte/listadoequipotransporte.component';
import { NuevaordenrecibodetalleComponent } from './prerecibo/ordenrecibo/nuevaordenrecibodetalle/nuevaordenrecibodetalle.component';
import { VerordenreciboComponent } from './prerecibo/ordenrecibo/verordenrecibo/verordenrecibo.component';
import { EditarordenreciboComponent } from './prerecibo/ordenrecibo/editarordenrecibo/editarordenrecibo.component';
import { AsignarpuertaComponent } from './prerecibo/puerta/asignarpuerta/asignarpuerta.component';
// tslint:disable-next-line: max-line-length
import { VincularequipotransporteComponent } from './prerecibo/equipotransporte/vincularequipotransporte/vincularequipotransporte.component';
import { NuevaordenreciboComponent } from './prerecibo/ordenrecibo/nuevaordenrecibo/nuevaordenrecibo.component';
import { ListaordenrecibidaComponent } from './recibo/ordenrecibo/listaordenrecibida/listaordenrecibida.component';
import { IdentificarreciboComponent } from './recibo/ordenrecibo/identificarrecibo/identificarrecibo.component';
import { IdentificarrecibomultipleComponent } from './recibo/ordenrecibo/identificarrecibomultiple/identificarrecibomultiple.component';
import { AcomodopalletsComponent } from './recibo/ordenrecibo/acomodopallets/acomodopallets.component';
import { AlmacenamientoComponent } from './recibo/ordenrecibo/almacenamiento/almacenamiento.component';
import { ListadoequipotransporteentranteComponent } from './recibo/ordenrecibo/listadoequipotransporteentrante/listadoequipotransporteentrante.component';
import { ListadoclienteComponent } from './mantenimiento/cliente/listadocliente/listadocliente.component';
import { NuevoclienteComponent } from './mantenimiento/cliente/nuevocliente/nuevocliente.component';
import { VerdetalleclienteComponent } from './mantenimiento/cliente/verdetallecliente/verdetallecliente.component';
import { ListadopropietarioComponent } from './mantenimiento/propietario/listadopropietario/listadopropietario.component';
import { NuevopropietarioComponent } from './mantenimiento/propietario/nuevopropietario/nuevopropietario.component';
import { ListadoproductoComponent } from './mantenimiento/producto/listadoproducto/listadoproducto.component';
import { ListarubicacionComponent } from './mantenimiento/ubicacion/listarubicacion/listarubicacion.component';
import { NuevoproductoComponent } from './mantenimiento/producto/nuevoproducto/nuevoproducto.component';
import { VerproductoComponent } from './mantenimiento/producto/verproducto/verproducto.component';
import { EditarproductoComponent } from './mantenimiento/producto/editarproducto/editarproducto.component';
import { NuevahuelladetalleComponent } from './mantenimiento/producto/nuevahuelladetalle/nuevahuelladetalle.component';
import { ListadoinventarioComponent } from './inventario/inventariogeneral/listadoinventario/listadoinventario.component';
import { AjustesinventarioComponent } from './inventario/inventariogeneral/ajustesinventario/ajustesinventario.component';
import { AjusteinventariodetalleComponent } from './inventario/inventariogeneral/ajusteinventariodetalle/ajusteinventariodetalle.component';
import { NuevoajusteComponent } from './inventario/inventariogeneral/nuevoajuste/nuevoajuste.component';
import { KardexgeneralComponent } from './inventario/inventariogeneral/kardexgeneral/kardexgeneral.component';
import { ListaordensalidaComponent } from './despacho/ordensalida/listaordensalida/listaordensalida.component';
import { NuevaordensalidaComponent } from './despacho/ordensalida/nuevaordensalida/nuevaordensalida.component';
import { EditarordensalidaComponent } from './despacho/ordensalida/editarordensalida/editarordensalida.component';
import { NuevaordensalidadetalleComponent } from './despacho/ordensalida/nuevaordensalidadetalle/nuevaordensalidadetalle.component';
import { VerordensalidaComponent } from './despacho/ordensalida/verordensalida/verordensalida.component';
import { PlanificarpickingComponent } from './despacho/picking/planificarpicking/planificarpicking.component';
import { ConfirmarpinckingComponent } from './despacho/picking/confirmarpincking/confirmarpincking.component';
import { ListadoTrabajoPendienteComponent } from './despacho/picking/listadotrabajopendiente/listadotrabajopendiente.component';
import { Listado2trabajoasignadoComponent } from './despacho/carga/listado2trabajoasignado/listado2trabajoasignado.component';
import { ConfirmarmovimientoComponent } from './despacho/carga/confirmarmovimiento/confirmarmovimiento.component';
// tslint:disable-next-line: max-line-length
import { PendientespreliquidacionComponent } from './facturacion/preliquidacion/pendientespreliquidacion/pendientespreliquidacion.component';
import { GestionpreliquidacionComponent } from './facturacion/preliquidacion/gestionpreliquidacion/gestionpreliquidacion.component';
import { GestiontarifarioComponent } from './facturacion/preliquidacion/gestiontarifario/gestiontarifario.component';
import { NuevatarifaComponent } from './facturacion/preliquidacion/nuevatarifa/nuevatarifa.component';
import { EditartarifaComponent } from './facturacion/preliquidacion/editartarifa/editartarifa.component';
import { PendienteCargaComponent } from './despacho/carga/listadopendientescarga/pendientecarga.component';
import { EquipotransportesalidaComponent } from './despacho/equipotransportesalida/equipotransportesalida.component';
import { ListadocargaComponent } from './despacho/carga/listadocarga/listadocarga.component';
import { ListarolesComponent } from './seguridad/rol/listaroles/listaroles.component';

import { AsignaropcionesComponent } from './seguridad/rol/asignaropciones/asignaropciones.component';
import { ListadopedidoComponent } from './despacho/pedido/listadopedido/listadopedido.component';
import { EditarpropietarioComponent } from './mantenimiento/propietario/editarpropietario/editarpropietario.component';
import { NuevopedidoComponent } from './despacho/pedido/nuevopedido/nuevopedido.component';
import { VerordenpedidoComponent } from './despacho/pedido/verordenpedido/verordenpedido.component';
import { NuevopedidosalidadetalleComponent } from './despacho/pedido/nuevopedidosalidadetalle/nuevopedidosalidadetalle.component';
import { EditarpedidoComponent } from './despacho/pedido/editarpedido/editarpedido.component';
import { CambiarpasswordComponent } from './seguridad/usuario/cambiarpassword/cambiarpassword.component';
import { ListausuariosComponent } from './seguridad/usuario/listausuarios/listausuarios.component';
import { NuevousuarioComponent } from './seguridad/usuario/nuevousuario/nuevousuario.component';
import { EditarusuarioComponent } from './seguridad/usuario/editarusuario/editarusuario.component';
import { ReporteservicioComponent } from './reporte/reporteservicio/reporteservicio.component';


const pagesRoutes: Routes = [
    {path : 'dashboard', component : DashboardComponent } ,

    {path : 'recibo/listaordenrecibo', component : ListaordenreciboComponent, canActivate: [AuthGuard]} ,
    {path : 'recibo/equipotransporte', component : ListadoequipotransporteComponent, canActivate: [AuthGuard]} ,
    {path : 'recibo/nuevaordenrecibo', component : NuevaordenreciboComponent, canActivate: [AuthGuard]} ,
    {path : 'recibo/nuevaordenrecibodetalle/:uid', component : NuevaordenrecibodetalleComponent, canActivate: [AuthGuard]} ,
    {path : 'recibo/verordenrecibo/:uid', component : VerordenreciboComponent, canActivate: [AuthGuard]} ,
    {path : 'recibo/editarordenrecibo/:uid', component : EditarordenreciboComponent, canActivate: [AuthGuard]} ,
    {path : 'recibo/asignarpuerta/:uid/:uid2', component : AsignarpuertaComponent, canActivate: [AuthGuard]} ,
    {path : 'recibo/vincularequipotransporte/:uid', component : VincularequipotransporteComponent, canActivate: [AuthGuard]} ,
    {path : 'recibo/listaordenrecibida/:uid', component : ListaordenrecibidaComponent, canActivate: [AuthGuard]} ,



    {path : 'recibo/nuevaordenrecibo', component : NuevaordenreciboComponent, canActivate: [AuthGuard]} ,
  //  {path : 'recibo/listaordenrecibo', component : ListaordenreciboComponent, canActivate: [AuthGuard]} ,
    {path : 'recibo/equipotransporte', component : ListadoequipotransporteComponent, canActivate: [AuthGuard]} ,
    {path : 'recibo/nuevaordenrecibodetalle/:uid', component : NuevaordenrecibodetalleComponent, canActivate: [AuthGuard]} ,
    {path : 'recibo/verordenrecibo/:uid', component : VerordenreciboComponent, canActivate: [AuthGuard]} ,
    {path : 'recibo/editarordenrecibo/:uid', component : EditarordenreciboComponent, canActivate: [AuthGuard]} ,
    {path : 'recibo/asignarpuerta/:uid/:uid2', component : AsignarpuertaComponent, canActivate: [AuthGuard]} ,
    {path : 'recibo/vincularequipotransporte/:uid', component : VincularequipotransporteComponent, canActivate: [AuthGuard]} ,

    {path : 'recibo/programacion', component : ProgramacionComponent, canActivate: [AuthGuard]} ,

    {path : 'recibo/identificarrecibo/:uid/:uid2', component : IdentificarreciboComponent, canActivate: [AuthGuard]} ,
    {path : 'recibo/identificarrecibomultiple/:uid/:uid2', component : IdentificarrecibomultipleComponent, canActivate: [AuthGuard]} ,

    {path : 'seguridad/listaroles', component : ListarolesComponent , canActivate: [AuthGuard]} ,
    {path : 'seguridad/listausuarios', component : ListausuariosComponent , canActivate: [AuthGuard]} ,
    {path : 'seguridad/listausuarios', component : EditarpropietarioComponent , canActivate: [AuthGuard]} ,
    {path : 'seguridad/nuevousuario', component : NuevousuarioComponent , canActivate: [AuthGuard]} ,
    {path : 'seguridad/editarusuario/:uid', component : EditarusuarioComponent, canActivate: [AuthGuard]} ,
    {path : 'seguridad/asignaropciones/:uid', component : AsignaropcionesComponent , canActivate: [AuthGuard]} ,
    {path : 'seguridad/cambiarpassword/:uid', component : CambiarpasswordComponent, canActivate: [AuthGuard]} ,

    {path : 'recibo/acomodopallets/:uid/:uid2', component : AcomodopalletsComponent, canActivate: [AuthGuard]} ,
    {path : 'recibo/almacenamiento/:uid/:uid2', component : AlmacenamientoComponent, canActivate: [AuthGuard]} ,
    {path : 'recibo/equipotransporteentrante', component : ListadoequipotransporteentranteComponent, canActivate: [AuthGuard]} ,

    {path : 'mantenimiento/listadopropietario', component : ListadopropietarioComponent, canActivate: [AuthGuard]} ,
    {path : 'mantenimiento/nuevopropietario', component : NuevopropietarioComponent, canActivate: [AuthGuard]} ,
    {path : 'mantenimiento/editarpropietario/:uid', component : EditarpropietarioComponent, canActivate: [AuthGuard]} ,
    {path : 'mantenimiento/listadoproducto', component : ListadoproductoComponent, canActivate: [AuthGuard]} ,
    {path : 'mantenimiento/listadocliente', component : ListadoclienteComponent, canActivate: [AuthGuard]} ,

    {path : 'mantenimiento/listarubicacion', component : ListarubicacionComponent, canActivate: [AuthGuard]} ,
    {path : 'mantenimiento/nuevocliente', component : NuevoclienteComponent, canActivate: [AuthGuard]} ,
    {path : 'mantenimiento/verdetallecliente/:uid', component : VerdetalleclienteComponent, canActivate: [AuthGuard]} ,
    {path : 'mantenimiento/nuevoproducto', component : NuevoproductoComponent, canActivate: [AuthGuard] } ,
    {path : 'mantenimiento/verproducto/:uid', component : VerproductoComponent, canActivate: [AuthGuard]} ,
    {path : 'mantenimiento/editarproducto/:uid', component : EditarproductoComponent, canActivate: [AuthGuard]} ,
    {path : 'mantenimiento/nuevahuelladetalle/:uid/:uid2', component : NuevahuelladetalleComponent, canActivate: [AuthGuard]} ,

    {path : 'inventario/inventariogeneral', component : ListadoinventarioComponent, canActivate: [AuthGuard]} ,
    {path : 'inventario/ajusteinventario', component : AjustesinventarioComponent, canActivate: [AuthGuard]} ,
    {path : 'inventario/ajusteinventariodetalle/:uid', component : AjusteinventariodetalleComponent, canActivate: [AuthGuard]} ,
    {path : 'inventario/nuevoajuste/:uid/:uid2', component : NuevoajusteComponent, canActivate: [AuthGuard]} ,
    {path : 'inventario/kardexgeneral', component : KardexgeneralComponent, canActivate: [AuthGuard]} ,

    {path : 'picking/listaordensalida', component : ListaordensalidaComponent, canActivate: [AuthGuard]} ,
    {path : 'picking/nuevaordensalida', component : NuevaordensalidaComponent, canActivate: [AuthGuard]} ,
    {path : 'picking/editaordensalida/:uid', component : EditarordensalidaComponent, canActivate: [AuthGuard]} ,
    {path : 'picking/nuevaordensalidadetalle/:uid', component : NuevaordensalidadetalleComponent, canActivate: [AuthGuard]} ,
    {path : 'picking/verordensalida/:uid', component : VerordensalidaComponent, canActivate: [AuthGuard]} ,
    {path : 'picking/planificarpicking', component : PlanificarpickingComponent, canActivate: [AuthGuard]},
    {path : 'picking/confirmarpicking', component : ConfirmarpinckingComponent, canActivate: [AuthGuard]} ,
    {path : 'picking/confirmarpicking', component : ConfirmarpinckingComponent, canActivate: [AuthGuard]} ,
    {path : 'picking/listadotrabajopendiente', component : ListadoTrabajoPendienteComponent, canActivate: [AuthGuard]} ,
    {path : 'picking/listado2trabajoasignado', component : Listado2trabajoasignadoComponent, canActivate: [AuthGuard]} ,
    {path : 'picking/confirmarmovimiento/:uid', component : ConfirmarmovimientoComponent, canActivate: [AuthGuard]} ,

    {path : 'pedido/listadopedido', component : ListadopedidoComponent, canActivate: [AuthGuard]} ,
    {path : 'pedido/nuevopedido', component : NuevopedidoComponent, canActivate: [AuthGuard]} ,
    {path : 'pedido/editarpedido/:uid', component : EditarpedidoComponent, canActivate: [AuthGuard]} ,
    {path : 'pedido/verordenpedido/:uid', component : VerordenpedidoComponent, canActivate: [AuthGuard]} ,
    {path : 'pedido/nuevopedidosalidadetalle/:uid', component : NuevopedidosalidadetalleComponent, canActivate: [AuthGuard]} ,


    {path : 'facturacion/pendientespreliquidacion', component : PendientespreliquidacionComponent, canActivate: [AuthGuard]} ,
    {path : 'facturacion/gestionpreliquidacion', component : GestionpreliquidacionComponent, canActivate: [AuthGuard]} ,
    {path : 'facturacion/gestiontarifario', component : GestiontarifarioComponent, canActivate: [AuthGuard]} ,
    {path : 'facturacion/nuevatarifa', component : NuevatarifaComponent, canActivate: [AuthGuard]} ,
    {path : 'facturacion/editartarifa/:uid', component : EditartarifaComponent, canActivate: [AuthGuard]} ,

    {path : 'despacho/pendienteCarga', component : PendienteCargaComponent, canActivate: [AuthGuard]} ,
    {path : 'despacho/equipotransportesalida/:uid', component : EquipotransportesalidaComponent, canActivate: [AuthGuard]} ,
    {path : 'despacho/listadocarga', component : ListadocargaComponent, canActivate: [AuthGuard]} ,

    {path : 'reporte/reporteservicio', component : ReporteservicioComponent, canActivate: [AuthGuard]} ,



    {path : '', redirectTo : '/dashboard', pathMatch: 'full'},
];
export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );

