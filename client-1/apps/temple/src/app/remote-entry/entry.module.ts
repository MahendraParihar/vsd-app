import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { TempleListComponent } from '../temple-list/temple-list.component';
import { ManageTempleComponent } from '../manage-temple/manage-temple.component';
import { TempleDetailsComponent } from '../temple-details/temple-details.component';
import { TempleLibModule } from '@vsd-frontend/temple-lib';

@NgModule({
  declarations: [RemoteEntryComponent,
    TempleListComponent,
    ManageTempleComponent,
    TempleDetailsComponent,
  ],
  imports: [CommonModule, TempleLibModule, RouterModule.forChild([
    {
      path: '',
      pathMatch: 'full',
      component: TempleListComponent,
    },
    {
      path: 'manage',
      component: ManageTempleComponent,
    },
    {
      path: 'manage/:id',
      component: ManageTempleComponent,
    },
    {
      path: ':id',
      component: TempleDetailsComponent,
    },
  ])],
  providers: [],
})
export class RemoteEntryModule {}
