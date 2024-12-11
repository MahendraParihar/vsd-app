import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManageMandalComponent} from './manage-mandal/manage-mandal.component';
import {MandalComponent} from './mandal/mandal.component';
import {MandalDetailComponent} from './mandal-detail/mandal-detail.component';
import {MandalService} from "./mandal.service";
import {CoreLibModule} from "@vsd-frontend/core-lib";
import {FormsModule} from "@angular/forms";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {SharedUiLibModule} from "@vsd-frontend/shared-ui-lib";
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [CommonModule,
    CoreLibModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    SharedUiLibModule, MatCardModule],
  declarations: [ManageMandalComponent, MandalComponent, MandalDetailComponent],
  exports: [ManageMandalComponent, MandalComponent, MandalDetailComponent],
  providers: [MandalService]
})
export class MandalLibModule {
}
