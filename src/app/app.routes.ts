import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages/pages.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';


const appRoutes: Routes = [

  {path : 'login', component : LoginComponent} ,
  {
       path: '',
       component: PagesComponent,
       // canActivate: [AuthGuard],
       loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
   },
   { path: '**', component: NopagefoundComponent },

];


export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash : true , onSameUrlNavigation: 'reload' } );
