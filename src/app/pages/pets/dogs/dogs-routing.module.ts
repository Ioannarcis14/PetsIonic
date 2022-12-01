import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DogsPage } from './dogs.page';

const routes: Routes = [
  {
    path: '',
    component: DogsPage
  },
  {
    path: 'pet',
    loadChildren: () => import('./pet/pet.module').then( m => m.PetPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DogsPageRoutingModule {}
