import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  
  { path: 'item-detail-page', loadChildren: './item-detail-page/item-detail-page.module#ItemDetailPagePageModule' },
  { path: 'add-item', loadChildren: './add-item/add-item.module#AddItemPageModule' },
  { path: 'order-detail-page', loadChildren: './order-detail-page/order-detail-page.module#OrderDetailPagePageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}