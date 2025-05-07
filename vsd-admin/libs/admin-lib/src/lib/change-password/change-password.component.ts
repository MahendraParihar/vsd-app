import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, LabelService, NavigationPathEnum, SnackBarService } from '@vsd-frontend/core-lib';
import { ValidationUtil } from '@vsd-frontend/shared-ui-lib';
import { IChangePassword, InputLength, LabelKey } from '@vsd-common/lib';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'admin-lib-change-password',
  standalone: false,
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  labelService = inject(LabelService);
  authService = inject(AuthService);
  snackBarService = inject(SnackBarService);
  title = inject(Title);

  pageTitle!: string;
  labelKeys = LabelKey;
  inputLength = InputLength;

  @Output() addEvent = new EventEmitter<string>();
  @Output() editEvent = new EventEmitter<{ path: string; id: number }>();

  constructor() {
    this.pageTitle = this.labelService.getLabel(LabelKey.CHANGE_PASSWORD);
    this.title.setTitle(this.labelService.getLabel(LabelKey.CHANGE_PASSWORD));
  }

  formGroup: FormGroup = this.formBuilder.group({
    password: ['', [Validators.required]],
    newPassword: ['', [Validators.required]],
    repeatPassword: ['', [Validators.required]],
  });

  async submit() {
    ValidationUtil.validateAllFormFields(this.formGroup);
    if (!this.formGroup.valid) {
      return;
    }
    const payload = <IChangePassword>this.formGroup.value;
    const res = await this.authService.changePassword(payload);
    if (res) {
      this.snackBarService.showSuccess(LabelKey.SUCCESS_PASSWORD_CHANGE);
      this.router.navigate([NavigationPathEnum.HOME]);
    }
  }

  onCancel() {
    this.router.navigate([NavigationPathEnum.HOME]);
  }
}
