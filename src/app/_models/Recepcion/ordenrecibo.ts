import { NumberSymbol } from "@angular/common";

export interface OrdenRecibo {
     ordenReciboId	:  any ;
     numOrden	:  string ;
     propietarioId	:  number ;
     propietario	:  string ;
     almacenId	:  number ;
     Almacen	:  string ;
     guiaRemision	:  string ;
     fechaEsperada	:  Date ;
     horaEsperada: string;
     fechaRegistro	:  Date ;
     EstadoID:  number ;
     equipotransporte: string;
     nombreEstado: string ;
     ubicacion: string;
     detalles: OrdenReciboDetalle[];
}

export interface OrdenReciboDetalle {
     id?: number;
     OrdenReciboId: number;
     linea: string;
     productoId: any;
     producto: string;
     Lote: string;
     HuellaId?: number;
     FechaRegistro?: Date;
     EstadoId: number;
     cantidad: number;
     cantidadRecibida?: number;
     cantidadFaltante?: number;
     cantidadSobrante?: number;
     fechaExpire?: Date;
     propietarioId: number;
}

