import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LabelService, NavigationService, SnackBarService } from '@vsd-frontend/core-lib';
import { Title } from '@angular/platform-browser';
import { ValidationUtil } from '@vsd-frontend/shared-ui-lib';
import { FileTypeEnum, IManageJobSubCategory, InputLength, LabelKey, MediaForEnum } from '@vsd-common/lib';
import { JobSubCategoryService } from '../job-sub-category.service';

@Component({
  selector: 'lovs-lib-manage-job-sub-category',
  standalone: false,
  templateUrl: './manage-job-sub-category.component.html',
  styleUrl: './manage-job-sub-category.component.scss',
})
export class ManageJobSubCategoryComponent implements OnInit {

  labelKeys = LabelKey;
  @Input() id!: number;
  pageTitle!: string;
  fileTypeEnum = FileTypeEnum;
  mediaForEnum = MediaForEnum;
  lovModel!: IManageJobSubCategory;

  formGroup: FormGroup = new FormGroup({
    jobSubCategory: new FormControl(null, [Validators.required, Validators.maxLength(InputLength.CHAR_50)]),
    jobCategoryId: new FormControl(null, [Validators.required]),
  });

  constructor( private service: JobSubCategoryService,
              public labelService: LabelService, private title: Title,
              private snackBarService: SnackBarService,
              private navigation: NavigationService) {


    this.pageTitle = this.labelService.getLabel(this.id ? this.labelKeys.EDIT_JOB_SUB_CATEGORY : this.labelKeys.ADD_JOB_SUB_CATEGORY);
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
      jobSubCategory: this.lovModel.jobSubCategory,
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
    const payload: IManageJobSubCategory = {
      jobSubCategory: this.formGroup.value.jobSubCategory,
      jobCategoryId: this.formGroup.value.jobCategoryId,
      imagePath: this.formGroup.value.uploadFiles,
    };
    if (this.id) {
      payload.jobSubCategoryId = this.id;
    }
    try {
      await this.service.manageJobSubCategory(payload);
      this.snackBarService.showSuccess(this.labelService.getLabel(this.id ? this.labelKeys.SUCCESS_DATA_UPDATED : this.labelKeys.SUCCESS_DATA_ADDED));
      this.onCancel();
    } catch (e) {
      this.snackBarService.showError(this.labelService.getLabel(this.labelKeys.ERROR_SOMETHING_WENT_WRONG));
    }
  }
}
