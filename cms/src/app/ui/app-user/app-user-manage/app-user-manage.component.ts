import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {StringResources} from "../../../enum/string-resources";
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {SnackBarService} from "../../../service/snack-bar.service";
import {NavigationService} from "../../../service/navigation.service";
import {ActivatedRoute} from "@angular/router";
import {HttpService} from "../../../service/http.service";
import {ValidationUtil} from "../../../utilites/validation-util";
import {ResponseDataModel} from "../../../models/response-data.model";
import {ApiUrlEnum} from "../../../enum/api-url-enum";
import {ServerResponseEnum} from "../../../enum/server-response-enum";
import {AppUserModel} from "../../../models/app-user.model";

@Component({
  selector: 'app-app-user-manage',
  templateUrl: './app-user-manage.component.html',
  styleUrls: ['./app-user-manage.component.scss']
})
export class AppUserManageComponent implements OnInit, AfterViewInit, OnDestroy {

  appUserObj: AppUserModel;
  id: number;
  stringRes = StringResources;
  formGroup: UntypedFormGroup = this.fb.group([]);

  constructor(private httpService: HttpService,
              private snackBarService: SnackBarService,
              private navigationService: NavigationService,
              private activatedRoute: ActivatedRoute,
              private fb: UntypedFormBuilder) {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  get formControl() {
    return this.formGroup.controls;
  }

  async ngOnInit(): Promise<void> {
    if (this.id) {
      await this.loadDataById(this.id);
    }
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

  onCancel(): void {
    this.navigationService.back();
  }

  bindData(): void {
    if (this.appUserObj) {
      this.formGroup.patchValue({});
    }
  }

  async loadDataById(id: number): Promise<void> {
    ValidationUtil.validateAllFormFields(this.formGroup);
    if (!this.formGroup.valid) {
      return;
    }

    const payload = {};

    const res: ResponseDataModel = await this.httpService.getRequest(ApiUrlEnum.LOGIN, payload, true);
    if (res) {
      switch (res.code) {
        case ServerResponseEnum.SUCCESS:
          this.appUserObj = AppUserModel.fromJson(res.data);
          this.bindData();
          break;
        case ServerResponseEnum.WARNING:
          break;
        case ServerResponseEnum.ERROR:
          this.snackBarService.showError(res.message);
          break;
      }
    }
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
          this.navigationService.back();
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