
export interface Comprobante {
     id: any;
     tipoComprobanteId	:  any ;
     numeroComprobante	:  string ;
     preliquidacionId	:  string ;
     clienteId	:  string ;
     fechaEmision	:  number ;
     usuarioRegistroId: number;
     subtotal	:  number ;
     igv	:  number ;
     total	:  number ;
     motivo: string;
     descripcion: string ;
     facturaVinculadaId: string;
     estadoId: number;
     ordenCompra: string;
}


export interface ComprobanteDetalle {
     id: any;
     comprobanteId: any ;
     cantidad: number;
     descripcion: string ;
     subtotal: number ;
     igv: number ;
     total: number ;
     recargo: number;
}

export interface ReporteServicio {
     propietario: string;
     pos: string;
     ingreso: number;
     salida: number;
     seguro: number;
     picking: number;
     etiquetado: number;
     fechainicio: Date;
     fechaFin: Date;     
     total:number;
     totalsoles: number;
     subTotal:number;
     monedaId: number;
     simboloMoneda: string;
     moneda : string;
     anterior: number;
     porcentaje: number;
}
export interface VentaMensual {
     id : number;
     clienteId : number; 
     Propietario : string;
     subtotal : number ;
     anio : number;
     mes  : number;
     periodo : number;
}