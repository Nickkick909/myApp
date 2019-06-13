import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { TabsPage } from '../tabs/tabs.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }]),
    
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
