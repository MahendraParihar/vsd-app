import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {RemoteEntryComponent} from './entry.component';
import {ManageMatrimonialComponent} from "../manage-matrimonial/manage-matrimonial.component";
import {MatrimonialDetailsComponent} from "../matrimonial-details/matrimonial-details.component";
import {MatrimonialListComponent} from "../matrimonial-list/matrimonial-list.component";

@NgModule({
  declarations: [RemoteEntryComponent, MatrimonialListComponent, ManageMatrimonialComponent, MatrimonialDetailsComponent],
  imports: [CommonModule, RouterModule.forChild([{
    path: '',
    pathMatch: 'full',
    component: MatrimonialListComponent
  },
    {
      path: 'manage',
      component: ManageMatrimonialComponent
    },
    {
      path: 'manage/:id',
      component: ManageMatrimonialComponent
    },
    {
      path: ':id',
      component: MatrimonialDetailsComponent
    }
  ])],
  providers: [],
})
export class RemoteEntryModule {
}
