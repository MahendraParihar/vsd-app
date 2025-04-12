import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ButtonComponent } from './ui/ui-button/button.component';
import { LabelComponent } from './ui/ui-label/ui-label.component';
import { UiInputErrorComponent } from './ui/ui-input-error/ui-input-error.component';
import { UiConfirmationMenuComponent } from './ui/ui-confirmation-menu/ui-confirmation-menu.component';
import { UiAlertDialogComponent } from './ui/ui-alert-dialog/ui-alert-dialog.component';
import { UiStatusChangeButtonComponent } from './ui/ui-status-change-button/ui-status-change-button.component';
import { UiUploadFormComponent } from './ui/ui-upload-form/ui-upload-form.component';
import { UiAddressFormComponent } from './ui/ui-address-form/ui-address-form.component';
import { UiSeoFormComponent } from './ui/ui-seo-form/ui-seo-form.component';
import { UiSocialLinkFormComponent } from './ui/ui-social-link/ui-social-link-form.component';
import { ImageDragDirective } from './ui/ui-upload-form/directive/image-drag.directive';
import { UiMemberPostComponent } from './ui/ui-member-post/ui-member-post.component';
import { UiFamilySelectComponent } from './ui/ui-family-select/ui-family-select.component';
import { UiImageComponent } from './ui/ui-img/ui-image.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UiHeaderComponent } from './ui/ui-header/ui-header.component';
import { CoreLibModule } from '@vsd-frontend/core-lib';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UiBreadcrumbComponent } from './ui/ui-breadcrumb/ui-breadcrumb.component';
import { MatListModule } from '@angular/material/list';

@NgModule({
  imports: [
    CommonModule,
    CoreLibModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatInputModule,
    MatChipsModule,
    NgIf,
    MatSelectModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatListModule,
  ],
  declarations: [
    ButtonComponent,
    LabelComponent,
    UiInputErrorComponent,
    UiConfirmationMenuComponent,
    UiAlertDialogComponent,
    UiAlertDialogComponent,
    UiStatusChangeButtonComponent,
    UiUploadFormComponent,
    UiAddressFormComponent,
    UiSeoFormComponent,
    UiSocialLinkFormComponent,
    ImageDragDirective,
    UiImageComponent,
    UiMemberPostComponent,
    UiFamilySelectComponent,
    UiHeaderComponent,
    UiBreadcrumbComponent,
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
    UiStatusChangeButtonComponent,
    UiUploadFormComponent,
    UiAddressFormComponent,
    UiSocialLinkFormComponent,
    UiSeoFormComponent,
    ImageDragDirective,
    UiImageComponent,
    UiMemberPostComponent,
    UiFamilySelectComponent,
    UiHeaderComponent,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
})
export class SharedUiLibModule {}
