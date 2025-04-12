import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LabelService, NavigationService, SnackBarService } from '@vsd-frontend/core-lib';
import { Title } from '@angular/platform-browser';
import { ValidationUtil } from '@vsd-frontend/shared-ui-lib';
import { JobCategoryService } from '../job-category.service';
import { FileTypeEnum, IManageJobCategory, InputLength, LabelKey, MediaForEnum } from '@vsd-common/lib';

@Component({
  selector: 'lovs-lib-manage-job-category',
  standalone: false,
  templateUrl: './manage-job-category.component.html',
  styleUrl: './manage-job-category.component.scss',
})
export class ManageJobCategoryComponent implements OnInit {

  labelKeys = LabelKey;
  @Input() id!: number;
  pageTitle!: string;
  fileTypeEnum = FileTypeEnum;
  mediaForEnum = MediaForEnum;
  lovModel!: IManageJobCategory;

  formGroup: FormGroup = new FormGroup({
    jobCategory: new FormControl(null, [Validators.required, Validators.maxLength(InputLength.CHAR_50)]),
  });

  constructor( private service: JobCategoryService,
              public labelService: LabelService, private title: Title,
              private snackBarService: SnackBarService,
              private navigation: NavigationService) {


    this.pageTitle = this.labelService.getLabel(this.id ? this.labelKeys.EDIT_JOB_CATEGORY : this.labelKeys.ADD_JOB_CATEGORY);
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
      jobCategory: this.lovModel.jobCategory,
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
    const payload: IManageJobCategory = {
      jobCategory: this.formGroup.value.jobCategory,
      imagePath: this.formGroup.value.uploadFiles,
    };
    if (this.id) {
      payload.jobCategoryId = this.id;
    }
    try {
      await this.service.manageJobCategory(payload);
      this.snackBarService.showSuccess(this.labelService.getLabel(this.id ? this.labelKeys.SUCCESS_DATA_UPDATED : this.labelKeys.SUCCESS_DATA_ADDED));
      this.onCancel();
    } catch (e) {
      this.snackBarService.showError(this.labelService.getLabel(this.labelKeys.ERROR_SOMETHING_WENT_WRONG));
    }
  }
}
