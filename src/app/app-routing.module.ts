import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginGuardService } from './services/login-guard.service';
import { MatTreeModule } from '@angular/material';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { 
    path: 'login', 
    loadChildren: './login/login.module#LoginPageModule' ,
    canActivate: [LoginGuardService]
  },
  { path: 'menu', 
    loadChildren: './menu/menu.module#MenuPageModule' ,
    canActivate: [AuthGuardService]
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardPageModule',
    canActivate: [AuthGuardService]
  }



 

  

  // },
  // { path: 'home', 
  //   loadChildren: './home/home.module#HomePageModule' , 
  //   canActivate: [AuthGuardService]
  // },
  // },
  // { path: 'eventos', loadChildren: './eventos/eventos.module#EventosPageModule' },
  // { path: 'calendar-notify', loadChildren: './eventos/calendar-notify/calendar-notify.module#CalendarNotifyPageModule' },
  // { path: 'lista-notify', loadChildren: './eventos/lista-notify/lista-notify.module#ListaNotifyPageModule' },
  // { path: 'event',redirectTo: 'eventos/lista-notify', pathMatch: 'full' },

  // { path: 'actividades', loadChildren: './actividades/actividades.module#ActividadesPageModule' },
  // { path: 'actividades-notify', loadChildren: './actividades/actividades-notify/actividades-notify.module#ActividadesNotifyPageModule' },
  
  
];
 

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    MatTreeModule
  ],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppRoutingModule { }
