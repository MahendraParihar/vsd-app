import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { ManageLovComponent } from '../manage-lov/manage-lov.component';
import { LovComponent } from '../lov/lov.component';
import { LovsLibModule } from '@vsd-frontend/lovs-lib';

@NgModule({
  declarations: [RemoteEntryComponent,
    LovComponent, ManageLovComponent,
  ],
  imports: [CommonModule, LovsLibModule, RouterModule.forChild([
    { path: ':type', component: LovComponent },
    { path: ':type/manage', component: ManageLovComponent },
    { path: ':type/manage/:id', component: ManageLovComponent },
  ])],
  providers: [],
})
export class RemoteEntryModule {}
