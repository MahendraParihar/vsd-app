import {NgModule} from '@angular/core';

import {MatrimonialRoutingModule} from './matrimonial-routing.module';
import {MatrimonialListComponent} from './matrimonial-list/matrimonial-list.component';
import {MatrimonialManageComponent} from './matrimonial-manage/matrimonial-manage.component';
import {MaterialModule} from "../../material.module";
import {ShareModule} from "../shared/share.module";


@NgModule({
  declarations: [
    MatrimonialListComponent,
    MatrimonialManageComponent
  ],
  imports: [
    ShareModule,
    MatrimonialRoutingModule,
    MaterialModule
  ]
})
export class MatrimonialModule {
}
