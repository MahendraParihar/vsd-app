import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';
import { remoteRoutes } from './entry.routes';
import { ManageMandalComponent } from '../manage-mandal/manage-mandal.component';
import { MandalListComponent } from '../mandal-list/mandal-list.component';
import { MandalDetailsComponent } from '../mandal-details/mandal-details.component';
import { MandalLibModule } from '@vsd-frontend/mandal-lib';

@NgModule({
  declarations: [
    RemoteEntryComponent,
    ManageMandalComponent,
    MandalListComponent,
    MandalDetailsComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(remoteRoutes), MandalLibModule],
  providers: [],
})
export class RemoteEntryModule {}
