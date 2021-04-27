import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';

import {ProductComponent} from './product.component';
import {ProductRoutingModule} from './product-routing.module';
import {AppModule} from '../../app.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule,
    AppModule
  ],
  declarations: [ProductComponent]
})
export class ProductModule {
}
