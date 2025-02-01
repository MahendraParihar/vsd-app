import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from './ui/ui-button/button.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { LabelComponent } from './ui/ui-label/ui-label.component';
import { UiInputErrorComponent } from './ui/ui-input-error/ui-input-error.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { UiConfirmationMenuComponent } from './ui/ui-confirmation-menu/ui-confirmation-menu.component';
import { UiAlertDialogComponent } from './ui/ui-alert-dialog/ui-alert-dialog.component';
import { UiWarningDialogComponent } from './ui/ui-warning-dialog/ui-warning-dialog.component';
import { UiStatusChangeButtonComponent } from './ui/ui-status-change-button/ui-status-change-button.component';
import { UiAddressFormComponent } from './ui/ui-address-form/ui-address-form.component';
import { MatSelectModule } from '@angular/material/select';
import { UiUploadFormComponent } from './ui/ui-upload-form/ui-upload-form.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CoreLibModule } from '@vsd-frontend/core-lib';
import { ImageDragDirective } from './ui/ui-upload-form/directive/image-drag.directive';
import { UiSeoFormComponent } from './ui/ui-seo-form/ui-seo-form.component';
import { MatChipsModule } from '@angular/material/chips';
import { UiSocialLinkFormComponent } from './ui/ui-social-link/ui-social-link-form.component';
import { UiImageComponent } from './ui/ui-img/ui-image.component';
import { UiMemberPostComponent } from './ui/ui-member-post/ui-member-post.component';
import { UiFamilySelectComponent } from './ui/ui-family-select/ui-family-select.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    ButtonComponent,
    LabelComponent,
    UiInputErrorComponent,
    UiConfirmationMenuComponent,
    UiAlertDialogComponent,
    UiWarningDialogComponent,
    UiStatusChangeButtonComponent,
    UiUploadFormComponent,
    UiAddressFormComponent,
    UiSeoFormComponent,
    UiSocialLinkFormComponent,
    ImageDragDirective,
    UiImageComponent,
    UiMemberPostComponent,
    UiFamilySelectComponent,
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
    MatChipsModule,
    NgIf,
    MatSelectModule,
    MatProgressBarModule,
    CoreLibModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    ButtonComponent,
    LabelComponent,
    UiInputErrorComponent,
    ReactiveFormsModule,
    MatInputModule,
    UiConfirmationMenuComponent,
    UiAlertDialogComponent,
    UiWarningDialogComponent,
    UiStatusChangeButtonComponent,
    UiUploadFormComponent,
    UiAddressFormComponent,
    UiSocialLinkFormComponent,
    UiSeoFormComponent,
    ImageDragDirective,
    UiImageComponent,
    UiMemberPostComponent,
    UiFamilySelectComponent
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
