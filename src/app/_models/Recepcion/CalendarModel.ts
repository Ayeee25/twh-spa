import { CalendarEventAction } from 'angular-calendar';
import { startOfDay, endOfDay } from 'date-fns';

export class CalendarEventModel
{
    id?: number;
    title: string;
    descripcion: string;
    start: Date;
    end: Date;
    color: {
        primary: string;
        secondary: string;
    };
    actions?: CalendarEventAction[];
    allDay?: boolean;
    cssClass?: string;
    resizable?: {
        beforeStart?: boolean;
        afterEnd?: boolean;
    };
    draggable?: boolean;
    meta?: {
        location: string,
        notes: string
    };
    capacidad: number;
    registrados: number;
    asistentes: number;
    url: string;
    observaciones: string;
    estado: string;
    registro: boolean;
    usuario: number;
    idtipo:number;
    /**
     * Constructor
     *
     * @param data
     */
    constructor(data?)
    {
        data = data || {};
        this.id = data.id;
        this.title = data.title || '';
        this.descripcion = data.descripcion || '';
        this.start = new Date(data.start);
        this.end = new Date(data.end);
        this.color = {
            primary  : data.color && data.color.primary || '#F44336',
            secondary: data.color && data.color.secondary || '#F44336'
        };
        this.draggable = data.draggable;
        this.resizable = {
            beforeStart: data.resizable && data.resizable.beforeStart || true,
            afterEnd   : data.resizable && data.resizable.afterEnd || true
        };
        this.actions = data.actions || [];
        this.allDay = data.allDay || false;
        this.cssClass = data.cssClass || '';
        this.meta = {
            location: data.meta && data.meta.location || '',
            notes   : data.meta && data.meta.notes || ''
        };
        this.capacidad   = data.capacidad || 15;
        this.registrados = data.registrados || 0;
        this.asistentes  = data.asistentes || 0;
        this.url = data.url || '';
        this.observaciones = data.observaciones || '';
        this.estado = data.estado || '';
        this.registro = data.registro || true;
    }
}
