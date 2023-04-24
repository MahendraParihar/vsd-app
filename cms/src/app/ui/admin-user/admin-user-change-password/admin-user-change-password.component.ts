import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {StringResources} from "../../../enum/string-resources";
import {HttpService} from "../../../service/http.service";
import {SnackBarService} from "../../../service/snack-bar.service";
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {NavigationService} from "../../../service/navigation.service";
import {ValidationUtil} from "../../../utilites/validation-util";
import {ServerResponseEnum} from "../../../enum/server-response-enum";
import {ApiUrlEnum} from "../../../enum/api-url-enum";
import {ResponseDataModel} from "../../../models/response-data.model";

@Component({
  selector: 'app-admin-user-change-password',
  templateUrl: './admin-user-change-password.component.html',
  styleUrls: ['./admin-user-change-password.component.scss']
})
export class AdminUserChangePasswordComponent implements OnInit, AfterViewInit, OnDestroy {

  stringRes = StringResources;

  hide = true;

  formGroup: UntypedFormGroup = this.fb.group([]);

  constructor(private httpService: HttpService,
              private snackBarService: SnackBarService,
              private navigationService: NavigationService,
              private fb: UntypedFormBuilder) {
  }

  get formControl() {
    return this.formGroup.controls;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

  onCancel(): void {
    this.navigationService.back();
  }

  async onSubmit(): Promise<void> {
    ValidationUtil.validateAllFormFields(this.formGroup);
    if (!this.formGroup.valid) {
      return;
    }

    const payload = {};

    const res: ResponseDataModel = await this.httpService.postRequest(ApiUrlEnum.LOGIN, payload, true);
    if (res) {
      switch (res.code) {
        case ServerResponseEnum.SUCCESS:
          this.snackBarService.showSuccess(res.message);
          break;
        case ServerResponseEnum.WARNING:
          this.snackBarService.showWarning(res.message);
          break;
        case ServerResponseEnum.ERROR:
          this.snackBarService.showError(res.message);
          break;
      }
    }
  }
}
