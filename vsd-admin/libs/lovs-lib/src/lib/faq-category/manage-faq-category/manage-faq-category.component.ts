import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LabelService, NavigationService, SnackBarService } from '@vsd-frontend/core-lib';
import { Title } from '@angular/platform-browser';
import { ValidationUtil } from '@vsd-frontend/shared-ui-lib';
import { FileTypeEnum, IManageFaqCategory, InputLength, LabelKey, MediaForEnum } from '@vsd-common/lib';
import { FaqCategoryService } from '../faq-category.service';

@Component({
  selector: 'lovs-lib-manage-faq-category',
  standalone: false,
  templateUrl: './manage-faq-category.component.html',
  styleUrl: './manage-faq-category.component.scss',
})
export class ManageFaqCategoryComponent implements OnInit {

  labelKeys = LabelKey;
  @Input() id!: number;
  pageTitle!: string;
  fileTypeEnum = FileTypeEnum;
  mediaForEnum = MediaForEnum;
  lovModel!: IManageFaqCategory;

  formGroup: FormGroup = new FormGroup({
    faqCategory: new FormControl(null, [Validators.required, Validators.maxLength(InputLength.CHAR_50)]),
    url: new FormControl(null, [Validators.required, Validators.maxLength(InputLength.CHAR_100)]),
  });

  constructor( private service: FaqCategoryService,
              public labelService: LabelService, private title: Title,
              private snackBarService: SnackBarService,
              private navigation: NavigationService) {

    this.pageTitle = this.labelService.getLabel(this.id ? this.labelKeys.EDIT_FAQ_CATEGORY : this.labelKeys.ADD_FAQ_CATEGORY);
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
      faqCategory: this.lovModel.faqCategory,
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
    const payload: IManageFaqCategory = {
      faqCategory: this.formGroup.value.faqCategory,
      url: this.formGroup.value.url,
    };
    if (this.id) {
      payload.faqCategoryId = this.id;
    }
    try {
      await this.service.manageFaqCategory(payload);
      this.snackBarService.showSuccess(this.labelService.getLabel(this.id ? this.labelKeys.SUCCESS_DATA_UPDATED : this.labelKeys.SUCCESS_DATA_ADDED));
      this.onCancel();
    } catch (e) {
      this.snackBarService.showError(this.labelService.getLabel(this.labelKeys.ERROR_SOMETHING_WENT_WRONG));
    }
  }
}
