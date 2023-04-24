import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputErrorComponent} from "../common-ui/input-error/input-error.component";
import {AddressSelectorComponent} from "./components/address-selector/address-selector.component";
import {MaterialModule} from "../../material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {AngularEditorModule} from "@kolkov/angular-editor";
import {FileSelectorComponent} from './components/file-selector/file-selector.component';
import {ImageDragDirective} from "./directive/image-drag.directive";
import {UserSelectorComponent} from './components/user-selector/user-selector.component';
import {SearchFormComponent} from './components/search-form/search-form.component';
import {AdminShortInfoComponent} from './components/admin-short-info/admin-short-info.component';
import {NoDataFoundComponent} from './components/no-data-found/no-data-found.component';
import {StatusButtonDirective} from "./directive/status-button.directive";
import {DateTimePipe} from "./pipe/date-time.pipe";

@NgModule({
  declarations: [
    AddressSelectorComponent,
    InputErrorComponent,
    FileSelectorComponent,
    ImageDragDirective,
    StatusButtonDirective,
    UserSelectorComponent,
    SearchFormComponent,
    AdminShortInfoComponent,
    NoDataFoundComponent,
    DateTimePipe
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    AngularEditorModule,
  ],
  exports: [
    AddressSelectorComponent,
    InputErrorComponent,
    FileSelectorComponent,
    ImageDragDirective,
    StatusButtonDirective,
    UserSelectorComponent,
    SearchFormComponent,
    AdminShortInfoComponent,
    NoDataFoundComponent,
    FlexLayoutModule,
    DateTimePipe
  ],
})
export class ShareModule {
}
