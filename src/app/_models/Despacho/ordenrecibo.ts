import { NumberSymbol } from '@angular/common';

export interface OrdenSalida {
     id: any;
     ordenSalidaId: any ;
     numOrden: string ;
     propietarioId: number ;
     propietario: string ;
     almacenId: number ;
     Almacen: string ;
     guiaRemision: string ;
     fechaRequerida: Date ;
     horaRequerida: string;
     fechaRegistro: Date ;
     EstadoID: number ;
     equipotransporte: string;
     NombreEstado: string ;
     ubicacion: string;
     clienteId: number;
     direccionId: number;
     tipoServicio: string;
     detalles: OrdenSalidaDetalle[];
}

export interface OrdenSalidaDetalle {
     id?: number;
     OrdenReciboId: number;
     linea: string;
     ProductoId: any;
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

