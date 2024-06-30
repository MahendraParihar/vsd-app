import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {RemoteEntryComponent} from './entry.component';
import {FamilyListComponent} from "../family-list/family-list.component";
import {ManageFamilyComponent} from "../manage-family/manage-family.component";
import {FamilyDetailsComponent} from "../family-details/family-details.component";
import {FamilyLibModule} from "@vsd-frontend/family-lib";

@NgModule({
  declarations: [RemoteEntryComponent, FamilyListComponent, ManageFamilyComponent, FamilyDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: FamilyListComponent
    },
      {
        path: 'manage',
        component: ManageFamilyComponent
      },
      {
        path: 'manage/:id',
        component: ManageFamilyComponent
      },
      {
        path: ':id',
        component: FamilyDetailsComponent
      }
    ]),
    FamilyLibModule
  ],
  providers: [],
})
export class RemoteEntryModule {
}
