import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';
import { FacilityListComponent } from '../facility-list/facility-list.component';
import { ManageFacilityComponent } from '../manage-facility/manage-facility.component';
import { FacilityDetailsComponent } from '../facility-details/facility-details.component';
import { FacilityLibModule } from '@vsd-frontend/faclity-lib';

@NgModule({
  declarations: [
    RemoteEntryComponent,
    FacilityListComponent,
    ManageFacilityComponent,
    FacilityDetailsComponent
  ],
  imports: [
    CommonModule,
    FacilityLibModule,
    RouterModule.forChild(
      [
        {
          path: '',
          pathMatch: 'full',
          component: FacilityListComponent,
        },
        {
          path: 'manage',
          component: ManageFacilityComponent,
        },
        {
          path: 'manage/:id',
          component: ManageFacilityComponent,
        },
        {
          path: ':id',
          component: FacilityDetailsComponent,
        },
      ],
    ),
  ],
  providers: [],
})
export class RemoteEntryModule {}
