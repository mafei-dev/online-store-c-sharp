import {Routes} from '@angular/router';


export const content: Routes = [
  {
    path: 'sample-page',
    loadChildren: () => import('../../components/sample/sample.module').then(m => m.SampleModule)
  },
  {
    path: 'products',
    loadChildren: () => import('../../components/product/product.module').then(m => m.ProductModule)
  }

];
