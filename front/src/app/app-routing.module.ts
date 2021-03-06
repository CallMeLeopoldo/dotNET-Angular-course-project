import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [

  {path: '', component: HomeComponent, data: {breadcrumb: 'Home'}},
  {path: 'testerror', component: TestErrorComponent, data: {breadcrumb: 'Test Error'}},
  {path: 'servererror', component: ServerErrorComponent, data: {breadcrumb: 'Server Error'}},
  {path: 'notfounderror', component: NotFoundComponent, data: {breadcrumb: 'Not Found'}},

  {path: 'shop', loadChildren: () => import('./shop/shop.module')
    .then(module => module.ShopModule), data: {breadcrumb: 'Shop'}},

  {path: 'basket', loadChildren: () => import('./basket/basket.module')
    .then(module => module.BasketModule), data: {breadcrumb: 'Basket'}},

  {path: 'checkout',  canActivate: [AuthGuard], loadChildren: () => import('./checkout/checkout.module')
    .then(module => module.CheckoutModule), data: {breadcrumb: 'Checkout'}},

  {path: 'account',
    loadChildren: () => import('./account/account.module')
    .then(module => module.AccountModule), data: {breadcrumb: {skip: true}}},

  {path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
