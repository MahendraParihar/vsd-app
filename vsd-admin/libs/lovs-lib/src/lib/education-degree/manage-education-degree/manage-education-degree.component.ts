import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LabelService, NavigationService, SnackBarService } from '@vsd-frontend/core-lib';
import { Title } from '@angular/platform-browser';
import { ValidationUtil } from '@vsd-frontend/shared-ui-lib';
import { FileTypeEnum, IManageEducationDegree, InputLength, LabelKey, MediaForEnum } from '@vsd-common/lib';
import { EducationDegreeService } from '../education-degree.service';

@Component({
  selector: 'lovs-lib-manage-education-degree',
  standalone: false,
  templateUrl: './manage-education-degree.component.html',
  styleUrl: './manage-education-degree.component.scss',
})
export class ManageEducationDegreeComponent implements OnInit {

  labelKeys = LabelKey;
  @Input() id!: number;
  pageTitle!: string;
  fileTypeEnum = FileTypeEnum;
  mediaForEnum = MediaForEnum;
  lovModel!: IManageEducationDegree;

  formGroup: FormGroup = new FormGroup({
    degree: new FormControl(null, [Validators.required, Validators.maxLength(InputLength.CHAR_50)]),
  });

  constructor( private service: EducationDegreeService,
              public labelService: LabelService, private title: Title,
              private snackBarService: SnackBarService,
              private navigation: NavigationService) {

    this.pageTitle = this.labelService.getLabel(this.id ? this.labelKeys.EDIT_EDUCATION_DEGREE : this.labelKeys.ADD_EDUCATION_DEGREE);
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
      degree: this.lovModel.degree,
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
    const payload: IManageEducationDegree = {
      degree: this.formGroup.value.degree,
      imagePath: this.formGroup.value.uploadFiles,
    };
    if (this.id) {
      payload.educationDegreeId = this.id;
    }
    try {
      await this.service.manageEducationDegree(payload);
      this.snackBarService.showSuccess(this.labelService.getLabel(this.id ? this.labelKeys.SUCCESS_DATA_UPDATED : this.labelKeys.SUCCESS_DATA_ADDED));
      this.onCancel();
    } catch (e) {
      this.snackBarService.showError(this.labelService.getLabel(this.labelKeys.ERROR_SOMETHING_WENT_WRONG));
    }
  }
}
