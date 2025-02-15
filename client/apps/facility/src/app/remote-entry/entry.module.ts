import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { remoteRoutes } from './entry.routes';
import { FacilityDetailsComponent } from '../facility-details/facility-details.component';
import { FacilityListComponent } from '../facility-list/facility-list.component';
import { ManageFacilityComponent } from '../manage-facility/manage-facility.component';
import { FacilityLibModule } from '@vsd-frontend/faclity-lib';

@NgModule({
  declarations: [
    RemoteEntryComponent,
    FacilityDetailsComponent,
    FacilityListComponent,
    ManageFacilityComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(remoteRoutes),
    FacilityLibModule,
  ],
  providers: [],
})
export class RemoteEntryModule {}
