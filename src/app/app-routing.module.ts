import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './page/product/product.component';
import { PaymentComponent } from './page/payment/payment.component';
import { MainComponent } from './page/main/main.component';
const routes: Routes = [
  // { path: 'product/:storeID', component: ProductComponent },
  { path: 'test', component: ProductComponent },
  { 
    path: 'main/:storeID',
    component: MainComponent,
    // canActivate: [AuthGuard] 
  },
  { 
    path: 'product/:storeID',
    component: ProductComponent,
    // canActivate: [AuthGuard] 
  },
  { 
    path: 'payment/:storeID',
    component: PaymentComponent,
    // canActivate: [AuthGuard] 
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
