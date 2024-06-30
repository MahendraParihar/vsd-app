import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageTempleComponent } from './manage-temple/manage-temple.component';
import { TempleComponent } from './temple/temple.component';
import { TempleDetailComponent } from './temple-detail/temple-detail.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ManageTempleComponent, TempleComponent, TempleDetailComponent],
  exports: [ManageTempleComponent, TempleComponent, TempleDetailComponent],
})
export class TempleLibModule {}
