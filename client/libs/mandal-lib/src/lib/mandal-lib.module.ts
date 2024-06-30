import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageMandalComponent } from './manage-mandal/manage-mandal.component';
import { MandalComponent } from './mandal/mandal.component';
import { MandalDetailComponent } from './mandal-detail/mandal-detail.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ManageMandalComponent, MandalComponent, MandalDetailComponent],
  exports: [ManageMandalComponent, MandalComponent, MandalDetailComponent],
})
export class MandalLibModule {}
