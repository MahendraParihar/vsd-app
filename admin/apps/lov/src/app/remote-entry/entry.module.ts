import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { remoteRoutes } from './entry.routes';
import { ManageLovComponent } from '../manage-lov/manage-lov.component';
import { LovComponent } from '../lov/lov.component';
import { LovsLibModule } from '@vsd-frontend/lovs-lib';

@NgModule({
  declarations: [RemoteEntryComponent, LovComponent, ManageLovComponent],
  imports: [CommonModule, RouterModule.forChild(remoteRoutes), LovsLibModule],
  providers: [],
})
export class RemoteEntryModule {}
