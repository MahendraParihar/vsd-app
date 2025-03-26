import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { remoteRoutes } from './entry.routes';
import { MatrimonialListComponent } from '../matrimonial-list/matrimonial-list.component';
import { ManageMatrimonialComponent } from '../manage-matrimonial/manage-matrimonial.component';
import { MatrimonialDetailsComponent } from '../matrimonial-details/matrimonial-details.component';
import { MatrimonialLibModule } from '@vsd-frontend/matrimonial-lib';

@NgModule({
  declarations: [
    RemoteEntryComponent,
    MatrimonialListComponent,
    ManageMatrimonialComponent,
    MatrimonialDetailsComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(remoteRoutes), MatrimonialLibModule],
  providers: [],
})
export class RemoteEntryModule {}
