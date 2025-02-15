import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { TempleListComponent } from '../temple-list/temple-list.component';
import { ManageTempleComponent } from '../manage-temple/manage-temple.component';
import { TempleDetailsComponent } from '../temple-details/temple-details.component';
import { TempleLibModule } from '@vsd-frontend/temple-lib';
import { remoteRoutes } from './entry.routes';

@NgModule({
  declarations: [
    RemoteEntryComponent,
    TempleListComponent,
    ManageTempleComponent,
    TempleDetailsComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(remoteRoutes), TempleLibModule],
  providers: [],
})
export class RemoteEntryModule {}
