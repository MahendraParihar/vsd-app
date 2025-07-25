import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationUtil } from '@vsd-frontend/shared-ui-lib';
import { AuthService, LabelService, NavigationPathEnum, NavigationService } from '@vsd-frontend/core-lib';
import { ILogin, InputLength, LabelKey } from '@vsd-common/lib';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'main-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  router = inject(Router);

  labelKeys = LabelKey;
  hide = true;

  formGroup!: FormGroup;
  protected readonly length = length;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public labelService: LabelService,
    private pageTitle: Title,
  ) {
    this.formGroup = this.formBuilder.group({
      userName: [
        'mahendra.parihar10@gmail.com',
        [
          Validators.required,
          Validators.min(2),
          Validators.max(InputLength.MAX_EMAIL),
          Validators.pattern(ValidationUtil.EMAIL_REGEX),
        ],
      ],
      password: [
        'Mahendra@123',
        [
          Validators.required,
          Validators.min(2),
          Validators.max(InputLength.MAX_PASSWORD),
          Validators.pattern(ValidationUtil.PASSWORD_REGEX),
        ],
      ],
    });
    this.pageTitle.setTitle(this.labelService.getLabel(this.labelKeys.SIDE_MENU_LOGIN));
  }

  get formControl() {
    return this.formGroup.controls;
  }

  async submit() {
    ValidationUtil.validateAllFormFields(this.formGroup);
    if (!this.formGroup.valid) {
      return;
    }
    const payload = <ILogin>{
      userName: this.formGroup.value.userName,
      password: this.formGroup.value.password,
    };
    const res = await this.authService.signIn(payload);
    if (res) {
      this.router.navigate([NavigationPathEnum.HOME], { replaceUrl: true });
    }
  }
}
