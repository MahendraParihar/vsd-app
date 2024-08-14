import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UikitIconComponent } from './uikit-icon/uikit-icon.component';

@NgModule({
  imports: [
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatMenuModule,
    CommonModule,
  ],
  exports: [MatToolbarModule, UikitIconComponent],
  declarations: [UikitIconComponent],
})
export class SharedUiLibModule {}
