import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from './ui/ui-button/button.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { LabelComponent } from './ui/ui-label/ui-label.component';
import { UiInputComponent } from './ui/ui-input/ui-input.component';
import { UiInputErrorComponent } from './ui/ui-input-error/ui-input-error.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { UiConfirmationMenuComponent } from './ui/ui-confirmation-menu/ui-confirmation-menu.component';
import { UiAlertDialogComponent } from './ui/ui-alert-dialog/ui-alert-dialog.component';
import { UiWarningDialogComponent } from './ui/ui-warning-dialog/ui-warning-dialog.component';
import { UiStatusChangeButtonComponent } from './ui/ui-status-change-button/ui-status-change-button.component';

@NgModule({
  declarations: [
    ButtonComponent,
    LabelComponent,
    UiInputComponent,
    UiInputErrorComponent,
    UiConfirmationMenuComponent,
    UiAlertDialogComponent,
    UiWarningDialogComponent,
    UiStatusChangeButtonComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  exports: [
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    ButtonComponent,
    LabelComponent,
    UiInputComponent,
    UiInputErrorComponent,
    ReactiveFormsModule,
    MatInputModule,
    UiConfirmationMenuComponent,
    UiAlertDialogComponent,
    UiWarningDialogComponent,
    UiStatusChangeButtonComponent
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedUiLibModule {}
