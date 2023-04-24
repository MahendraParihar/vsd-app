import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {StringResources} from "../../../enum/string-resources";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {HttpService} from "../../../service/http.service";
import {SnackBarService} from "../../../service/snack-bar.service";
import {NavigationService} from "../../../service/navigation.service";
import {ValidationUtil} from "../../../utilites/validation-util";
import {ResponseDataModel} from "../../../models/response-data.model";
import {ServerResponseEnum} from "../../../enum/server-response-enum";
import {ApiUrlEnum} from "../../../enum/api-url-enum";
import {AdminUserModel} from "../../../models/admin-user.model";
import {ActivatedRoute} from "@angular/router";
import {DropdownItem} from "../../../interfaces/dropdown-item";
import {InputLength} from "../../../constants/input-length";
import {JsonUtil} from "../../../utilites/json-util";

@Component({
  selector: 'app-admin-user-edit-profile',
  templateUrl: './admin-user-edit-profile.component.html',
  styleUrls: ['./admin-user-edit-profile.component.scss']
})
export class AdminUserEditProfileComponent implements OnInit, AfterViewInit, OnDestroy {

  dataLoaded: boolean = false;

  adminUserObj: AdminUserModel;
  id: number;
  stringRes = StringResources;
  inputLength = InputLength;

  cityVillageList: DropdownItem[];
  adminRoleList: DropdownItem[];
  adminStatusList: DropdownItem[];

  formGroup: UntypedFormGroup = this.fb.group({
    firstName: [null, [Validators.required, Validators.minLength(InputLength.MIN_NAME), Validators.maxLength(InputLength.MAX_NAME)]],
    lastName: [null, [Validators.required, Validators.minLength(InputLength.MIN_NAME), Validators.maxLength(InputLength.MAX_NAME)]],
    emailId: [null, [Validators.required, Validators.email, Validators.maxLength(InputLength.MAX_EMAIL)]],
    contactNo: [null, [Validators.required, Validators.maxLength(InputLength.MAX_CONTACT_NUMBER)]],
    cityVillageId: [null, [Validators.required]],
    statusId: [null, [Validators.required]],
    startDate: [null, [Validators.required]],
    endDate: [null, []],
    deactiveReason: [null, [Validators.maxLength(InputLength.CHAR_500)]]
  });

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
    await this.loadMasterData();
    await this.loadDataById();
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

  onStatusChange(): void {
    if (this.formGroup.value.statusId != this.adminUserObj.adminUserStatusId) {
      this.formGroup.controls["deactiveReason"].setValidators(Validators.required);
      this.formGroup.controls["deactiveReason"].updateValueAndValidity();
    } else {
      this.formGroup.controls["deactiveReason"].setErrors(null);
      this.formGroup.controls["deactiveReason"].clearValidators();
      this.formGroup.controls["deactiveReason"].updateValueAndValidity();
    }
  }

  onCancel(): void {
    this.navigationService.back();
  }

  bindData(): void {
    if (this.adminUserObj) {
      this.formGroup.patchValue({
        firstName: this.adminUserObj.firstName,
        lastName: this.adminUserObj.lastName,
        emailId: this.adminUserObj.emailId,
        contactNo: this.adminUserObj.contactNo,
        cityVillageId: this.adminUserObj.cityVillageId,
        startDate: this.adminUserObj.startDate,
        endDate: this.adminUserObj.endDate,
        statusId: this.adminUserObj.adminUserStatusId,
        deactiveReason: this.adminUserObj.deactiveReason,
      });
    }
  }

  async loadDataById(): Promise<void> {
    const res: ResponseDataModel = await this.httpService.getRequest(ApiUrlEnum.ADMIN_MANAGE, {}, true);
    if (res) {
      switch (res.code) {
        case ServerResponseEnum.SUCCESS:
          this.adminUserObj = AdminUserModel.fromJson(res.data);
          this.bindData();
          this.dataLoaded = true;
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

    let payload:any = {
      adminId: 0,
      firstName : this.formGroup.value.firstName,
      lastName : this.formGroup.value.lastName,
      emailId : this.formGroup.value.emailId,
      contactNo : this.formGroup.value.contactNo,
      cityVillageId : this.formGroup.value.cityVillageId,
      startDate : this.formGroup.value.startDate,
      roleId : this.formGroup.value.roleId,
      statusId : this.formGroup.value.statusId
    };

    if(this.formGroup.value.endDate){
      payload['endDate'] = this.formGroup.value.endDate
    }
    if(this.formGroup.value.deactiveReason){
      payload['reason'] = this.formGroup.value.deactiveReason
    }

    const res: ResponseDataModel = await this.httpService.putRequest(ApiUrlEnum.ADMIN_MANAGE, payload, true);
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

  async loadMasterData(): Promise<void> {
    const payload = {};

    const res: ResponseDataModel = await this.httpService.getRequest(ApiUrlEnum.ADMIN_MASTER_DATA, payload, true);
    if (res) {
      switch (res.code) {
        case ServerResponseEnum.SUCCESS:
          this.cityVillageList = JsonUtil.getDropdownList(res.data.cityVillageList);
          this.adminRoleList = JsonUtil.getDropdownList(res.data.adminRole);
          this.adminStatusList = JsonUtil.getDropdownList(res.data.adminStatus);
          break;
        case ServerResponseEnum.WARNING:
          break;
        case ServerResponseEnum.ERROR:
          this.snackBarService.showError(res.message);
          break;
      }
    }
  }
}
