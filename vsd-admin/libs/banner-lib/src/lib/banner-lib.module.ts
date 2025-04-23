import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerService } from './banner.service';
import { ManageBannerComponent } from './manage-banner/manage-banner.component';
import { BannerComponent } from './banner/banner.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { SharedUiLibModule } from '@vsd-frontend/shared-ui-lib';
import { CoreLibModule } from '@vsd-frontend/core-lib';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS } from '@vsd-common/lib';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [BannerComponent, ManageBannerComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    SharedUiLibModule,
    MatCardModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDividerModule,
    CoreLibModule,
    MatSlideToggle,
  ],
  providers: [BannerService, provideMomentDateAdapter(MY_FORMATS)],
  exports: [BannerComponent, ManageBannerComponent],
})
export class BannerLibModule {}
