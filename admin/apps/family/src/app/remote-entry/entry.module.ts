import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { remoteRoutes } from './entry.routes';
import { FamilyListComponent } from '../family-list/family-list.component';
import { ManageFamilyComponent } from '../manage-family/manage-family.component';
import { FamilyDetailsComponent } from '../family-details/family-details.component';
import { FamilyLibModule } from '@vsd-frontend/family-lib';

@NgModule({
  declarations: [RemoteEntryComponent, FamilyListComponent,
    ManageFamilyComponent,
    FamilyDetailsComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(remoteRoutes), FamilyLibModule],
  providers: [],
})
export class RemoteEntryModule {}
