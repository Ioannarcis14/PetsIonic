import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetsPage } from './pets.page';

const routes: Routes = [
  {
    path: '',
    component: PetsPage,
    children: [
      {
        path: 'cats',
        loadChildren: () => import('./cats/cats.module').then( m => m.CatsPageModule)
      },
      {
        path: 'dogs',
        loadChildren: () => import('./dogs/dogs.module').then( m => m.DogsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetsPageRoutingModule {}
