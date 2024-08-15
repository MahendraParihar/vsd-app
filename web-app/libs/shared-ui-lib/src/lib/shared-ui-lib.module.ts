import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UikitIconComponent } from './uikit-icon/uikit-icon.component';
import { UikitLabelComponent } from './uikit-label/uikit-label.component';
import { UikitButtonComponent } from './uikit-button/uikit-button.component';

@NgModule({
  imports: [MatButtonModule, MatTooltipModule, MatIconModule, MatMenuModule, CommonModule],
  exports: [MatToolbarModule, UikitIconComponent, UikitButtonComponent, UikitLabelComponent],
  declarations: [UikitIconComponent, UikitLabelComponent, UikitButtonComponent],
})
export class SharedUiLibModule {}
