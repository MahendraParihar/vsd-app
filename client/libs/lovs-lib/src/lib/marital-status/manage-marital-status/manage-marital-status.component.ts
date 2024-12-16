import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LabelService, NavigationService, SnackBarService } from '@vsd-frontend/core-lib';
import { Title } from '@angular/platform-browser';
import { ValidationUtil } from '@vsd-frontend/shared-ui-lib';
import { FileTypeEnum, IManageMaritalStatus, InputLength, LabelKey, MediaForEnum } from '@vsd-common/lib';
import { MaritalStatusService } from '../marital-status.service';

@Component({
  selector: 'lib-manage-marital-status',
  templateUrl: './manage-marital-status.component.html',
  styleUrl: './manage-marital-status.component.scss',
})
export class ManageMaritalStatusComponent implements OnInit {

  labelKeys = LabelKey;
  id!: number;
  pageTitle!: string;
  fileTypeEnum = FileTypeEnum;
  mediaForEnum = MediaForEnum;
  lovModel!: IManageMaritalStatus;

  formGroup: FormGroup = new FormGroup({
    maritalStatus: new FormControl(null, [Validators.required, Validators.maxLength(InputLength.CHAR_50)]),
  });

  constructor(private activatedRoute: ActivatedRoute, private service: MaritalStatusService,
              public labelService: LabelService, private title: Title,
              private snackBarService: SnackBarService,
              private navigation: NavigationService) {
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    }
    this.pageTitle = this.labelService.getLabel(this.id ? this.labelKeys.EDIT_MANDAL : this.labelKeys.ADD_MANDAL);
    this.title.setTitle(this.pageTitle);
  }

  async ngOnInit() {
    await this.loadDetail();
  }

  async loadDetail() {
    if (!this.id) {
      return;
    }
    this.lovModel = await this.service.loadDetails(this.id);
    this.bindData();
  }

  bindData() {
    if (!this.lovModel) {
      return;
    }
    this.formGroup.patchValue({
      maritalStatus: this.lovModel.maritalStatus,
    });
  }

  onCancel() {
    this.navigation.back();
  }

  async updateDetails() {
    ValidationUtil.validateAllFormFields(this.formGroup);
    if (!this.formGroup.valid) {
      return;
    }
    console.log(this.formGroup);
    const payload: IManageMaritalStatus = {
      maritalStatus: this.formGroup.value.maritalStatus,
    };
    if (this.id) {
      payload.maritalStatusId = this.id;
    }
    try {
      await this.service.manageMaritalStatus(payload);
      this.snackBarService.showSuccess(this.labelService.getLabel(this.id ? this.labelKeys.SUCCESS_DATA_UPDATED : this.labelKeys.SUCCESS_DATA_ADDED));
      this.onCancel();
    } catch (e) {
      this.snackBarService.showError(this.labelService.getLabel(this.labelKeys.ERROR_SOMETHING_WENT_WRONG));
    }
  }
}
