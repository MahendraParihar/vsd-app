import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { ManageMandalComponent } from '../manage-mandal/manage-mandal.component';
import { MandalListComponent } from '../mandal-list/mandal-list.component';
import { MandalDetailsComponent } from '../mandal-details/mandal-details.component';
import { MandalLibModule } from '@vsd-frontend/mandal-lib';

@NgModule({
  declarations: [RemoteEntryComponent, ManageMandalComponent,
    MandalListComponent,
    MandalDetailsComponent],
  imports: [CommonModule, MandalLibModule, RouterModule.forChild([
    {
      path: '',
      pathMatch: 'full',
      component: MandalListComponent,
    },
    {
      path: 'manage',
      component: ManageMandalComponent,
    },
    {
      path: 'manage/:id',
      component: ManageMandalComponent,
    },
    {
      path: ':id',
      component: MandalDetailsComponent,
    },
  ])],
  providers: [],
})
export class RemoteEntryModule {}
