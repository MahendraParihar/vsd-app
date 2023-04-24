import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {StringResources} from "../../../enum/string-resources";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {SnackBarService} from "../../../service/snack-bar.service";
import {NavigationService} from "../../../service/navigation.service";
import {ActivatedRoute} from "@angular/router";
import {HttpService} from "../../../service/http.service";
import {ValidationUtil} from "../../../utilites/validation-util";
import {ResponseDataModel} from "../../../models/response-data.model";
import {ApiUrlEnum} from "../../../enum/api-url-enum";
import {ServerResponseEnum} from "../../../enum/server-response-enum";
import {FamilyModel, FamilyProfileModel} from "../../../models/family.model";
import {InputLength} from "../../../constants/input-length";
import {DropdownItem} from "../../../interfaces/dropdown-item";
import {JsonUtil} from "../../../utilites/json-util";
import 'lodash';
import {FileTypeEnum} from "../../../enum/file-type-enum";
import {MediaForEnum} from "../../../enum/media-for-enum";

declare var _: any;

@Component({
  selector: 'app-family-manage',
  templateUrl: './family-manage.component.html',
  styleUrls: ['./family-manage.component.scss']
})
export class FamilyManageComponent implements OnInit, AfterViewInit, OnDestroy {

  familyObj: FamilyModel;
  familyProfileObj: FamilyProfileModel;
  genderList: DropdownItem[];
  gotraList: DropdownItem[];
  maritalStatusList: DropdownItem[];
  educationList: DropdownItem[];
  familyCityVillageList: DropdownItem[];
  id: number;
  stringRes = StringResources;
  inputLength = InputLength;
  fileTypeEnum = FileTypeEnum;
  mediaForEnum = MediaForEnum;

  maxDate = new Date();
  minDate = new Date(1900, 1, 1);

  formGroup: UntypedFormGroup = this.fb.group({
    firstName: [null, [Validators.required, Validators.minLength(InputLength.MIN_NAME), Validators.maxLength(InputLength.MAX_NAME)]],
    middleName: [null, [Validators.required, Validators.minLength(InputLength.MIN_NAME), Validators.maxLength(InputLength.MAX_NAME)]],
    lastName: [null, [Validators.required, Validators.minLength(InputLength.MIN_NAME), Validators.maxLength(InputLength.MAX_NAME)]],
    emailId: [null, [Validators.required, Validators.email, Validators.maxLength(InputLength.MAX_EMAIL)]],
    contactNo: [null, [Validators.required, Validators.maxLength(InputLength.MAX_CONTACT_NUMBER)]],
    familyCityVillageId: [null, [Validators.required]]
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
    if (this.familyObj) {
      this.formGroup.patchValue({
        firstName: this.familyObj.firstName,
        lastName: this.familyObj.lastName,
        middleName: this.familyObj.middleName,
        emailId: this.familyObj.emailId,
        contactNo: this.familyObj.contactNo,
        familyCityVillageId: this.familyObj.cityVillageId
      });
    }
  }

  async loadDataById(id: number): Promise<void> {
    const payload = {
      id: id
    };
    const res: ResponseDataModel = await this.httpService.getRequest(ApiUrlEnum.FAMILY_MANAGE, payload, true);
    if (res) {
      switch (res.code) {
        case ServerResponseEnum.SUCCESS:
          this.familyObj = FamilyModel.fromJson(res.data.family);
          this.familyProfileObj = FamilyProfileModel.fromJson(res.data.familyProfile);
          this.bindData();
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

    const res: ResponseDataModel = await this.httpService.getRequest(ApiUrlEnum.FAMILY_MASTER, payload, true);
    if (res) {
      switch (res.code) {
        case ServerResponseEnum.SUCCESS:
          this.genderList = JsonUtil.getDropdownList(res.data.gender);
          this.gotraList = JsonUtil.getDropdownList(res.data.gotra);
          this.educationList = JsonUtil.getDropdownList(res.data.education);
          this.maritalStatusList = JsonUtil.getDropdownList(res.data.maritalStatus);
          this.familyCityVillageList = JsonUtil.getDropdownList(res.data.familyCityVillage);
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
    console.log(this.formGroup.value);
    ValidationUtil.validateAllFormFields(this.formGroup);
    if (!this.formGroup.valid) {
      return;
    }
    let payload;
    if (this.id > 0) {
      payload = {
        ...this.formGroup.value,
        ...this.formGroup.value.profile
      }
      delete payload.profile;
      if (payload.dateOfBirth) {
        payload.dateOfBirth = payload.dateOfBirth.toDate();
      }
    } else {
      payload = this.formGroup.value
    }
    let res: ResponseDataModel;
    if (this.id > 0) {
      res = await this.httpService.patchRequest(ApiUrlEnum.FAMILY_MANAGE, this.id, payload, true);
    } else {
      res = await this.httpService.postRequest(ApiUrlEnum.FAMILY_MANAGE, payload, true);
    }
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
