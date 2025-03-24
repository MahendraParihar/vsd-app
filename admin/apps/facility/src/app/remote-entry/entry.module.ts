import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { remoteRoutes } from './entry.routes';
import { FacilityDetailsComponent } from '../facility-details/facility-details.component';
import { ManageFacilityComponent } from '../manage-facility/manage-facility.component';
import { FacilityListComponent } from '../facility-list/facility-list.component';
import { FacilityLibModule } from '@vsd-frontend/facility-lib';

@NgModule({
  declarations: [RemoteEntryComponent, FacilityListComponent, ManageFacilityComponent, FacilityDetailsComponent],
  imports: [CommonModule, RouterModule.forChild(remoteRoutes), FacilityLibModule],
  providers: [],
})
export class RemoteEntryModule {}
