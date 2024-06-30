import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManageTempleComponent} from './manage-temple/manage-temple.component';
import {TempleComponent} from './temple/temple.component';
import {TempleDetailComponent} from './temple-detail/temple-detail.component';
import {TempleService} from "./temple.service";
import {CoreLibModule} from "@vsd-frontend/core-lib";
import {FormsModule} from "@angular/forms";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {SharedUiLibModule} from "@vsd-frontend/shared-ui-lib";

@NgModule({
  imports: [CommonModule,
    CoreLibModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    SharedUiLibModule,],
  declarations: [ManageTempleComponent, TempleComponent, TempleDetailComponent],
  exports: [ManageTempleComponent, TempleComponent, TempleDetailComponent],
  providers: [TempleService]
})
export class TempleLibModule {
}
