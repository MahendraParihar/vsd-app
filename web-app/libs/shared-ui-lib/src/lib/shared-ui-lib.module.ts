import { NgModule } from '@angular/core';
import { UikitBannerComponent } from './uikit-banner/uikit-banner.component';
import { UikitIconComponent } from './uikit-icon/uikit-icon.component';
import { UikitButtonComponent } from './uikit-button/uikit-button.component';
import { UikitLabelComponent } from './uikit-label/uikit-label.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { UikitInputErrorComponent } from './uikit-input-error/uikit-input-error.component';
import { MatError } from '@angular/material/form-field';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatError,
  ],
  declarations: [
    UikitIconComponent,
    UikitLabelComponent,
    UikitButtonComponent,
    UikitBannerComponent,
    UikitInputErrorComponent,
  ],
  exports: [
    UikitIconComponent,
    UikitButtonComponent,
    UikitLabelComponent,
    UikitBannerComponent,
    UikitInputErrorComponent,
  ],
})
export class SharedUiLibModule {}
