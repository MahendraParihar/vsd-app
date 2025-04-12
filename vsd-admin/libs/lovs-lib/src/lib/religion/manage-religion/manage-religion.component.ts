import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LabelService, NavigationService, SnackBarService } from '@vsd-frontend/core-lib';
import { Title } from '@angular/platform-browser';
import { ValidationUtil } from '@vsd-frontend/shared-ui-lib';
import { FileTypeEnum, IManageReligion, InputLength, LabelKey, MediaForEnum } from '@vsd-common/lib';
import { ReligionService } from '../religion.service';

@Component({
  selector: 'lovs-lib-manage-religion',
  templateUrl: './manage-religion.component.html',
  standalone: false,
  styleUrl: './manage-religion.component.scss',
})
export class ManageReligionComponent implements OnInit {

  labelKeys = LabelKey;
  @Input() id!: number;
  pageTitle!: string;
  fileTypeEnum = FileTypeEnum;
  mediaForEnum = MediaForEnum;
  lovModel!: IManageReligion;

  formGroup: FormGroup = new FormGroup({
    religion: new FormControl(null, [Validators.required, Validators.maxLength(InputLength.CHAR_50)]),
  });

  constructor( private service: ReligionService,
              public labelService: LabelService, private title: Title,
              private snackBarService: SnackBarService,
              private navigation: NavigationService) {

    this.pageTitle = this.labelService.getLabel(this.id ? this.labelKeys.EDIT_RELIGION : this.labelKeys.ADD_RELIGION);
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
      religion: this.lovModel.religion,
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
    const payload: IManageReligion = {
      religion: this.formGroup.value.religion,
      imagePath: this.formGroup.value.uploadFiles,
    };
    if (this.id) {
      payload.religionId = Number(this.id);
    }
    try {
      await this.service.manageReligion(payload);
      this.snackBarService.showSuccess(this.labelService.getLabel(this.id ? this.labelKeys.SUCCESS_DATA_UPDATED : this.labelKeys.SUCCESS_DATA_ADDED));
      this.onCancel();
    } catch (e) {
      this.snackBarService.showError(this.labelService.getLabel(this.labelKeys.ERROR_SOMETHING_WENT_WRONG));
    }
  }
}
