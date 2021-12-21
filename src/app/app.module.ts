import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './_services/auth.service';
import { ToastrModule } from 'ngx-toastr';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';
import { APP_ROUTES } from './app.routes';
import { NgxLoadingModule } from 'ngx-loading';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule as CalendarModule2, DateAdapter } from 'angular-calendar';

import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';

import { ScheduleModule } from '@syncfusion/ej2-angular-schedule'
import { WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';

export function momentAdapterFactory() {
  return adapterFactory(moment);
};


@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      PagesComponent
   ],
   imports: [
      BrowserModule,
      SharedModule,
      HttpClientModule,
      CommonModule,
      APP_ROUTES,
      ToastrModule.forRoot(),
      FormsModule,
      BrowserAnimationsModule,
      SweetAlert2Module.forRoot({ }),
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      NgxLoadingModule.forRoot({}),
      NgbModule,
      CalendarModule2.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory,
      }),
      ScheduleModule



   ],
   providers: [
      AuthService
      ,WeekService,MonthService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
