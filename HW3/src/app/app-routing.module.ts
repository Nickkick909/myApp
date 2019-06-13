import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //{ path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'tab1', loadChildren: './tab1/tab1.module#Tab1PageModule' },
  { path: 'tab2', loadChildren: './tab2/tab2.module#Tab2PageModule' },
  { path: 'tab3', loadChildren: './tab3/tab3.module#Tab3PageModule' },
  { path: 'new-item', loadChildren: './new-item/new-item.module#NewItemPageModule' },
  { path: 'item-detail-page', loadChildren: './item-detail-page/item-detail-page.module#ItemDetailPagePageModule' },
  { path: 'order-detail-page', loadChildren: './order-detail-page/order-detail-page.module#OrderDetailPagePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
