import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'Home',
    component: HomePage,
    children: [
      { 
        path: 'infhome',
        loadChildren: './infhome/infhome.module#InfhomePageModule'
      },
      { path: 'list-home', 
        loadChildren: './list-home/list-home.module#ListHomePageModule'
      }
    ]
   },
   {
     path:'',
     redirectTo: 'Home/list-home',
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
  declarations: [HomePage]
})
export class HomePageModule {}
