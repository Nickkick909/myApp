import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ItemDetailPagePage } from './item-detail-page.page';

const routes: Routes = [
  {
    path: '',
    component: ItemDetailPagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule ,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ItemDetailPagePage]
})
export class ItemDetailPagePageModule {}
