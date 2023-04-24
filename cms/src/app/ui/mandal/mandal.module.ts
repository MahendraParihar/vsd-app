import {NgModule} from '@angular/core';

import {MandalRoutingModule} from './mandal-routing.module';
import {MandalListComponent} from './mandal-list/mandal-list.component';
import {MandalManageComponent} from './mandal-manage/mandal-manage.component';
import {TrusteeListComponent} from './trustee-list/trustee-list.component';
import {TrusteeManageComponent} from './trustee-manage/trustee-manage.component';
import {MaterialModule} from "../../material.module";
import {MandalMemberManageComponent} from "./mandal-member-manage/mandal-member-manage.component";
import {ShareModule} from "../shared/share.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [
    MandalListComponent,
    MandalManageComponent,
    TrusteeListComponent,
    TrusteeManageComponent,
    MandalMemberManageComponent
  ],
  imports: [
    MandalRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    CommonModule,
    ShareModule
  ]
})
export class MandalModule {
}
