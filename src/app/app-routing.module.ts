import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContentComponent} from './shared/components/layout/content/content.component';
import {FullComponent} from './shared/components/layout/full/full.component';
import {full} from './shared/routes/full.routes';
import {content} from './shared/routes/routes';
import {ProductComponent} from './components/product/product.component';
import {CartComponent} from './components/cart/cart.component';
import {UserComponent} from './components/user/user.component';
import {CheckoutComponent} from './components/checkout/checkout.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    pathMatch: 'full'
  },

  {
    path: 'cart',
    component: CartComponent,
    pathMatch: 'full'
  },

  {
    path: 'user',
    component: UserComponent,
    pathMatch: 'full'
  },

  {
    path: 'checkout',
    component: CheckoutComponent,
    pathMatch: 'full'
  },


  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [[RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'legacy'
  })],
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
