import {NgModule} from '@angular/core';

import {CurrentAffairRoutingModule} from './current-affair-routing.module';
import {CurrentAffairListComponent} from './current-affair-list/current-affair-list.component';
import {CurrentAffairManageComponent} from './current-affair-manage/current-affair-manage.component';
import {MaterialModule} from "../../material.module";
import {ShareModule} from "../shared/share.module";
import {CommonModule} from "@angular/common";
import {FlexLayoutModule} from "@angular/flex-layout";


@NgModule({
  declarations: [
    CurrentAffairListComponent,
    CurrentAffairManageComponent
  ],
  imports: [
    CurrentAffairRoutingModule,
    CommonModule,
    ShareModule,
    FlexLayoutModule,
    MaterialModule
  ]
})
export class CurrentAffairModule {
}
