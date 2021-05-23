import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ActividadesPage } from './actividades.page';

const routes: Routes = [
  {
    path: 'activ',
    component: ActividadesPage,
    children:[
      { path: 'actividades-notify', loadChildren: './actividades-notify/actividades-notify.module#ActividadesNotifyPageModule' },
      { path: 'traking', loadChildren: './traking/traking.module#TrakingPageModule' }
    ]
  },
  {
    path: '',
    redirectTo: 'activ/actividades-notify',
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
  declarations: [ActividadesPage]
})
export class ActividadesPageModule {}
