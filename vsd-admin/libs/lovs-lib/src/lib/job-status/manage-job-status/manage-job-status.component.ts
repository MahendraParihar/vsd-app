import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LabelService, NavigationService, SnackBarService } from '@vsd-frontend/core-lib';
import { Title } from '@angular/platform-browser';
import { ValidationUtil } from '@vsd-frontend/shared-ui-lib';
import { FileTypeEnum, IManageJobStatus, InputLength, LabelKey, MediaForEnum } from '@vsd-common/lib';
import { JobStatusService } from '../job-status.service';

@Component({
  selector: 'lovs-lib-manage-job-status',
  standalone: false,
  templateUrl: './manage-job-status.component.html',
  styleUrl: './manage-job-status.component.scss',
})
export class ManageJobStatusComponent implements OnInit {

  labelKeys = LabelKey;
  @Input() id!: number;
  pageTitle!: string;
  fileTypeEnum = FileTypeEnum;
  mediaForEnum = MediaForEnum;
  lovModel!: IManageJobStatus;

  formGroup: FormGroup = new FormGroup({
    jobStatus: new FormControl(null, [Validators.required, Validators.maxLength(InputLength.CHAR_50)]),
  });

  constructor( private service: JobStatusService,
              public labelService: LabelService, private title: Title,
              private snackBarService: SnackBarService,
              private navigation: NavigationService) {

    this.pageTitle = this.labelService.getLabel(this.id ? this.labelKeys.EDIT_JOB_STATUS : this.labelKeys.ADD_JOB_STATUS);
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
      jobStatus: this.lovModel.jobStatus,
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
    const payload: IManageJobStatus = {
      jobStatus: this.formGroup.value.jobStatus,
      imagePath: this.formGroup.value.uploadFiles,
    };
    if (this.id) {
      payload.jobStatusId = Number(this.id);
    }
    try {
      await this.service.manageJobStatus(payload);
      this.snackBarService.showSuccess(this.labelService.getLabel(this.id ? this.labelKeys.SUCCESS_DATA_UPDATED : this.labelKeys.SUCCESS_DATA_ADDED));
      this.onCancel();
    } catch (e) {
      this.snackBarService.showError(this.labelService.getLabel(this.labelKeys.ERROR_SOMETHING_WENT_WRONG));
    }
  }
}
