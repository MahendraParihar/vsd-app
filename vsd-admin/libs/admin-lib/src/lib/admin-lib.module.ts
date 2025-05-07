import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminListComponent } from './list/admin-list.component';
import { ManageAdminComponent } from './manage/manage-admin.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { SharedUiLibModule } from '@vsd-frontend/shared-ui-lib';
import { AuthService, CoreLibModule, ngxEditor } from '@vsd-frontend/core-lib';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NgxEditorModule } from 'ngx-editor';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS } from '@vsd-common/lib';

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
  ],
  providers: [AuthService, provideMomentDateAdapter(MY_FORMATS)],
  declarations: [AdminListComponent, ManageAdminComponent, ChangePasswordComponent],
  exports: [AdminListComponent, ManageAdminComponent, ChangePasswordComponent],
})
export class AdminLibModule {}
