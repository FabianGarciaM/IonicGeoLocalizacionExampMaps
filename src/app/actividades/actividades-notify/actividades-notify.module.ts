import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ActividadesNotifyPage } from './actividades-notify.page';

const routes: Routes = [
  {
    path: '',
    component: ActividadesNotifyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ActividadesNotifyPage]
})
export class ActividadesNotifyPageModule {}
