import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UpdatePage } from './update.page';

const routes: Routes = [
  {
    path: 'update',
    component: UpdatePage,
    children:[
      {
        path:'update/:folder',
        loadChildren: './update.page'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UpdatePage]
})
export class UpdatePageModule {}
