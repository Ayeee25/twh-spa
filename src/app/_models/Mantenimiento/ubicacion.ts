export interface Ubicacion {
    id: number;
    ubicacion: string;
    area: string;
    estado: string ;
}
export interface Master {
      Area : string;
      detalle : any[];
}
export interface Area {
    id: number;
    nombre: string;
}
export interface Nivel {
    id: string;
    descripcion: string;
}
export interface Almacen {
    id: number ;
    descripcion: string;
}
