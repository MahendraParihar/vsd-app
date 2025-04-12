import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FamilyDetailComponent } from './family-detail/family-detail.component';
import { FamilyComponent } from './family/family.component';
import { ManageFamilyComponent } from './manage-family/manage-family.component';
import { CoreLibModule, ngxEditor } from '@vsd-frontend/core-lib';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { FamilyService } from './family.service';
import { MatDividerModule } from '@angular/material/divider';
import { NgxEditorModule } from 'ngx-editor';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MY_FORMATS } from '@vsd-common/lib';
import { SharedUiLibModule } from '@vsd-frontend/shared-ui-lib';
import { MatCardModule } from '@angular/material/card';
import { MatList, MatListItem } from '@angular/material/list';
import { AddressListComponent } from './address-list/address-list.component';
import { ContactNumberListComponent } from './contact-number-list/contact-number-list.component';
import { EducationListComponent } from './education-list/education-list.component';
import { MatrimonialProfileComponent } from './matrimonial-profile/matrimonial-profile.component';
import { ProfessionalProfileComponent } from './professional-profile/professional-profile.component';
import { VarsonListComponent } from './varson-list/varson-list.component';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { RouterLink } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    CoreLibModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    SharedUiLibModule,
    MatCardModule,
    NgxEditorModule.forRoot(ngxEditor),
    MatNativeDateModule,
    MatDatepickerModule,
    MatDividerModule,
    MatList,
    MatListItem,
    RouterLink,
  ],
  declarations: [
    FamilyDetailComponent,
    FamilyComponent,
    ManageFamilyComponent,
    AddressListComponent,
    ContactNumberListComponent,
    EducationListComponent,
    MatrimonialProfileComponent,
    ProfessionalProfileComponent,
    VarsonListComponent,
  ],
  exports: [FamilyDetailComponent, FamilyComponent, ManageFamilyComponent],
  providers: [FamilyService, provideMomentDateAdapter(MY_FORMATS)],
})
export class FamilyLibModule {}
