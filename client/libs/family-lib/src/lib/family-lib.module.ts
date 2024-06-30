import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FamilyDetailComponent } from './family-detail/family-detail.component';
import { FamilyComponent } from './family/family.component';
import { ManageFamilyComponent } from './manage-family/manage-family.component';

@NgModule({
  imports: [CommonModule],
  declarations: [FamilyDetailComponent, FamilyComponent, ManageFamilyComponent],
  exports: [FamilyDetailComponent, FamilyComponent, ManageFamilyComponent],
})
export class FamilyLibModule {}
