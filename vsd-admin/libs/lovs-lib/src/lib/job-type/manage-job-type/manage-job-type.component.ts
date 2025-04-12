import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LabelService, NavigationService, SnackBarService } from '@vsd-frontend/core-lib';
import { Title } from '@angular/platform-browser';
import { ValidationUtil } from '@vsd-frontend/shared-ui-lib';
import { FileTypeEnum, IManageJobType, InputLength, LabelKey, MediaForEnum } from '@vsd-common/lib';
import { JobTypeService } from '../job-type.service';

@Component({
  selector: 'lovs-lib-manage-job-type',
  standalone: false,
  templateUrl: './manage-job-type.component.html',
  styleUrl: './manage-job-type.component.scss',
})
export class ManageJobTypeComponent implements OnInit {

  labelKeys = LabelKey;
  @Input() id!: number;
  pageTitle!: string;
  fileTypeEnum = FileTypeEnum;
  mediaForEnum = MediaForEnum;
  lovModel!: IManageJobType;

  formGroup: FormGroup = new FormGroup({
    jobType: new FormControl(null, [Validators.required, Validators.maxLength(InputLength.CHAR_50)]),
  });

  constructor( private service: JobTypeService,
              public labelService: LabelService, private title: Title,
              private snackBarService: SnackBarService,
              private navigation: NavigationService) {


    this.pageTitle = this.labelService.getLabel(this.id ? this.labelKeys.EDIT_JOB_TYPE : this.labelKeys.ADD_JOB_TYPE);
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
      jobType: this.lovModel.jobType,
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
    const payload: IManageJobType = {
      jobType: this.formGroup.value.jobType,
      imagePath: this.formGroup.value.uploadFiles,
    };
    if (this.id) {
      payload.jobTypeId = this.id;
    }
    try {
      await this.service.manageJobType(payload);
      this.snackBarService.showSuccess(this.labelService.getLabel(this.id ? this.labelKeys.SUCCESS_DATA_UPDATED : this.labelKeys.SUCCESS_DATA_ADDED));
      this.onCancel();
    } catch (e) {
      this.snackBarService.showError(this.labelService.getLabel(this.labelKeys.ERROR_SOMETHING_WENT_WRONG));
    }
  }
}
