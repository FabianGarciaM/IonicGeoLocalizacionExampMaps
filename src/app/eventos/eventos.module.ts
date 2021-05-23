import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EventosPage } from './eventos.page';

const routes: Routes = [
  {
    path: 'event',
    component: EventosPage,
    children: [
      { path: 'calendar-notify',  loadChildren: './calendar-notify/calendar-notify.module#CalendarNotifyPageModule' },
      { path: 'lista-notify',     loadChildren: './lista-notify/lista-notify.module#ListaNotifyPageModule' }

    ]
  },
  {
    path: '',
    redirectTo: 'event/lista-notify',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EventosPage]
})
export class EventosPageModule {}
