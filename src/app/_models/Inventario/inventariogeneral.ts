export interface InventarioGeneral {
     id?: number ;
     lodNum?: string ;
     lodId?: number;
     productoId?: any ;
     descripcionLarga?: string ;
     codigo?: string;
     ubicacionId?: number ;
     ubicacion?: string ;
     lotNum?: string ;
     fechaExpire?: Date ;
     fechaManufactura?: Date;
     untQty?: number ;
     untPak?: number ;
     fechaRegistro?: Date ;
     fechaUltMovimiento?: Date;
     usuarioIngreso?: number;
     ubicacionIdUlt?: number;
     ubicacionUltima?: string;
     huellaId?: number;
     codigoHuella?: string;
     linea?: string;
     estado?: string;
     estadoId?: number;
     ordenReciboId?: any;
     OrdenReciboDetalleId?: number;
     almacenId?: number ;
     cantidad_productos?: number;
     almacen?: string;
     seriado?: boolean;
     scanComplete?: boolean;
     scanQty?: number;
     referencia?: string;
}


export interface InventarioDetalle {
     inventarioId?: number;
     codigoProducto?: any ;
     codigoMac?: any;
     codigoSerie?: any ;
     productoId?: any;
}
