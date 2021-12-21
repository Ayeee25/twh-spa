import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrdenReciboService } from 'src/app/_services/Recepcion/ordenrecibo.service';
import { ActionEventArgs, AgendaService, DayService, DragAndDropService, EventSettingsModel, GroupModel, MonthService, RenderCellEventArgs, ResizeService, ResourceDetails, ScheduleComponent, TimelineMonthService, TimelineViewsService, TimeScaleModel, Timezone, TreeViewArgs, View, WeekService, WorkHoursModel, WorkWeekService } from '@syncfusion/ej2-angular-schedule';
import { ConfirmationService, DialogService, MessageService } from 'primeng';
import { loadCldr, L10n } from "@syncfusion/ej2-base";
import { enableRipple } from '@syncfusion/ej2-base';

 enableRipple(false);

declare var $: any;
// loadCldr(
//   require('cldr-data/supplemental/numberingSystems.json'),
//   require('cldr-data/main/es-PE/ca-gregorian.json'),
//   require('cldr-data/main/es-PE/numbers.json'),
//   require('cldr-data/main/es-PE/timeZoneNames.json'));


L10n.load({
  'es-PE': {
    schedule: {
      day: "Día",
      week: "Semana",
      workWeek: "Semana Trabajo",
      month: "Mes",
      agenda: "Agenda",
      weekAgenda: "agenda Semana",
      workWeekAgenda: "Agenda Semana Trabajo",
      monthAgenda: "Agenda Mes",
      today: "Hoy",
      noEvents: "Sin eventos",
      emptyContainer: "An diesem Tag sind keine Veranstaltungen geplant.",
      allDay: "Todo el Día",
      start: "Inicio",
      end: "Fin",
      more: "Más",
      close: "Cerrar",
      cancel: "Cancelar",
      noTitle: "Sin Título",
      delete: "Borrar",
      deleteEvent: "Borrar Horario",
      deleteMultipleEvent: "Borrar Evento Multiple",
      selectedItems: "Items Seleccionados",
      deleteSeries: "Ganze Serie",
      edit: "Editar",
      editSeries: "Ganze Horario",
      createEvent: "Registrar Horario",
      subject: "Asunto",
      addTitle: "Agregar Título",
      moreDetails: "Más Detalle",
      save: "Grabar",
      timelineWeek: "Timeline-Semana",
      newEvent:"Registro de Horario",
      editEvent: "Editar Horario",
      saveButton: "Grabar",
      cancelButton: "Cancelar",
      deleteButton: "Eliminar",
      editContent: "¿Esta seguro de editar el horario?",
      deleteContent: "¿Esta seguro de eliminar el horario?",
    },
    calendar:
    {
      today: "Hoy"
    }
  }
});


@Component({
  selector: 'app-programacion',
  templateUrl: './programacion.component.html',
  styleUrls: ['./programacion.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ConfirmationService, MessageService, DialogService,DayService, WeekService, WorkWeekService, MonthService, AgendaService,
              TimelineMonthService,TimelineViewsService,ResizeService,DragAndDropService],
})
export class ProgramacionComponent implements OnInit {



  @ViewChild("schedule", { static: true })
  public scheduleObj: ScheduleComponent;


  public weekFirstDay: number = 1;
  public workWeekDays: number[] = [0,1,2,3,4,5,6];
  public timeScale: TimeScaleModel = { enable: true, interval: 60, slotCount: 1 };
  public dateFormat: string = "dd/MM/yyyy";
  public dateTimeFormat: string = "dd/MM/yyyy hh:mm a";
  public timezone: Timezone = new Timezone();
  public fechaInicio: Date = new Date();
  public fechaFin: Date = new Date();
  public showHeaderBar: boolean = true;
  public rowAutoHeight: boolean = true;
  public showWeekend: boolean = true;
  public showQuickInfo: Boolean = false;
  public allowDragAndDrop: Boolean = false;
  public allowResizing: Boolean = false;
  public virtualscroll: Boolean = true;
  public allowMultipleCategory: Boolean = true;
  public scheduleViews: View[] = ['Day','WorkWeek','TimelineWeek'];
  public currentView: View = 'TimelineWeek';
  public scheduleHours: WorkHoursModel  = { highlight: true, start: '07:00', end: '23:00' };
  public dataHorario: Object[] = []
  public dataLHorario: Object[] = []
  public resourceEmpleados: Object[] = []
  public resourcePuestos:   Object[] = []
  public cargoDataSource: Object[] = [];

  public eventSettings: EventSettingsModel = {
        dataSource: this.dataHorario,
        fields: {
            subject: { title: 'Conference Name', name: 'Subject' },
            description: { title: 'Summary', name: 'Description' },
            startTime: { title: 'From', name: 'StartTime' },
            endTime: { title: 'To', name: 'EndTime' }
        }
    };
  public group: GroupModel = { allowGroupEdit: true, resources: ['Conferences'] };


      public resourceDataSource: Object[] = [
        { Text: 'Puerta 1', Id: 40, Color: '#1aaa55' },
        { Text: 'Puerta 2', Id: 41, Color: '#357cd2' },
        { Text: 'Puerta 3', Id: 48, Color: '#7fa900' },
        { Text: 'Puerta 4', Id: 49, Color: '#787060' }
    ];



  constructor(private modal: NgbModal
    ,     private ordenRecibo: OrdenReciboService) {}
  ngOnInit(): void {


  }
  getEmployeeName(value: ResourceDetails | TreeViewArgs): string {
    return ((value as ResourceDetails).resourceData) ?
        (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField] as string
        : (value as TreeViewArgs).resourceName;
}
getEmployeeDesignation(value: ResourceDetails | TreeViewArgs): string {
    let resourceName: string = this.getEmployeeName(value);
    return (resourceName === 'Puerta 1') ? 'Almacén ACH (2)' : (resourceName === 'Robert') ?
        'Almacén ACH (2)' : 'Almacén ACH (2)';
}
getEmployeeImage(value: ResourceDetails | TreeViewArgs): string {
    let resourceName: string = this.getEmployeeName(value);
    return resourceName.replace(' ', '-').toLowerCase();
}


}


