import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListHomePage } from './list-home.page';
import { UpdatePage } from 'src/app/modals/modalupdate/update/update.page';

const routes: Routes = [
  {
    path: '',
    component: ListHomePage,
  }

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListHomePage],
  entryComponents: [
    UpdatePage
  ]
})
export class ListHomePageModule {}
