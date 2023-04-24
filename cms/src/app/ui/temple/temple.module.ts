import {NgModule} from '@angular/core';

import {TempleRoutingModule} from './temple-routing.module';
import {TempleListComponent} from './temple-list/temple-list.component';
import {TempleManageComponent} from './temple-manage/temple-manage.component';
import {MaterialModule} from "../../material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {AngularEditorModule} from "@kolkov/angular-editor";
import {CommonModule} from "@angular/common";
import {ShareModule} from "../shared/share.module";
import {DialogTempleDetailComponent} from './dialog-temple-detail/dialog-temple-detail.component';

@NgModule({
  declarations: [
    TempleListComponent,
    TempleManageComponent,
    DialogTempleDetailComponent
  ],
  imports: [
    TempleRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    AngularEditorModule,
    CommonModule,
    ShareModule
  ],
  entryComponents: [
    DialogTempleDetailComponent
  ]
})
export class TempleModule {
}
