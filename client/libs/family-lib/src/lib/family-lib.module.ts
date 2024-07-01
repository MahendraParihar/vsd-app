import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FamilyDetailComponent} from './family-detail/family-detail.component';
import {FamilyComponent} from './family/family.component';
import {ManageFamilyComponent} from './manage-family/manage-family.component';
import {CoreLibModule} from "@vsd-frontend/core-lib";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {FormsModule} from "@angular/forms";
import {SharedUiLibModule} from "@vsd-frontend/shared-ui-lib";
import {FamilyService} from "./family.service";

@NgModule({
  imports: [CommonModule,
    CoreLibModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    SharedUiLibModule,],
  declarations: [FamilyDetailComponent, FamilyComponent, ManageFamilyComponent],
  exports: [FamilyDetailComponent, FamilyComponent, ManageFamilyComponent],
  providers:[FamilyService]
})
export class FamilyLibModule {}
