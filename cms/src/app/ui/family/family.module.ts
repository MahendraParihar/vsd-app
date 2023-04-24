import {NgModule} from '@angular/core';

import {FamilyRoutingModule} from './family-routing.module';
import {FamilyManageComponent} from './family-manage/family-manage.component';
import {FamilyListComponent} from './family-list/family-list.component';
import {MaterialModule} from "../../material.module";
import {ShareModule} from "../shared/share.module";
import {CommonModule} from "@angular/common";
import {FlexLayoutModule} from "@angular/flex-layout";
import {AngularEditorModule} from "@kolkov/angular-editor";
import {FamilyDetailComponent} from './family-detail/family-detail.component';
import {FamilyPersonalDetailComponent} from './family-personal-detail/family-personal-detail.component';
import {FamilyProfessionalDetailComponent} from './family-professional-detail/family-professional-detail.component';
import { FamilyAddressesComponent } from './family-addresses/family-addresses.component';
import { FamilyMatrimonialDetailComponent } from './family-matrimonial-detail/family-matrimonial-detail.component';
import { FamilyContactDetailsComponent } from './family-contact-details/family-contact-details.component';
import { ManageContactDetailsDialogComponent } from './dialog/manage-contact-details-dialog/manage-contact-details-dialog.component';
import { FamilyPersonalDetailManageComponent } from './family-personal-detail-manage/family-personal-detail-manage.component';


@NgModule({
  declarations: [
    FamilyManageComponent,
    FamilyListComponent,
    FamilyDetailComponent,
    FamilyPersonalDetailComponent,
    FamilyProfessionalDetailComponent,
    FamilyAddressesComponent,
    FamilyMatrimonialDetailComponent,
    FamilyContactDetailsComponent,
    ManageContactDetailsDialogComponent,
    FamilyPersonalDetailManageComponent
  ],
  imports: [
    FamilyRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    AngularEditorModule,
    CommonModule,
    ShareModule
  ],
  /*providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        floatLabel: '',
        appearance: ''
      }
    }
  ],*/
})
export class FamilyModule {
}
